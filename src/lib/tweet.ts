export interface TweetMedia {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface Tweet {
  id: string;
  url: string;
  text: string;
  handle: string;
  name: string;
  avatar: string;
  date: string;
  media: TweetMedia[];
}

interface FxTweetResponse {
  tweet?: {
    url: string;
    text?: string;
    created_at: string;
    author: { screen_name: string; name: string };
    media?: {
      photos?: { url: string; width: number; height: number; altText?: string }[];
    };
  };
  message?: string;
}

// Requests are deduped per build so a post embedding the same tweet twice, or
// two pages rendering one thread, still only hits the API once.
const inFlight = new Map<string, Promise<Tweet | null>>();

// fxtwitter hands back the full-resolution upload, which is far larger than the
// ~600px the card renders at. pbs.twimg.com takes the format as a query param
// rather than a file extension: `/media/<key>?format=png&name=small`.
function toSmallVariant(url: string): string {
  const match = url.match(/^(https:\/\/pbs\.twimg\.com\/media\/[^.?]+)\.([a-z]+)/i);
  if (!match) return url;

  const [, base, format] = match;
  return `${base}?format=${format}&name=small`;
}

async function fetchTweet(id: string): Promise<Tweet> {
  const response = await fetch(`https://api.fxtwitter.com/i/status/${id}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const body = (await response.json()) as FxTweetResponse;
  if (!body.tweet) throw new Error(body.message ?? "no tweet in response");

  const { tweet } = body;

  return {
    id,
    url: tweet.url,
    text: tweet.text ?? "",
    handle: tweet.author.screen_name,
    name: tweet.author.name,
    // pbs.twimg.com/profile_images is a common blocklist entry, so avatars go
    // through the same proxy TwitterBadge uses.
    avatar: `https://unavatar.io/x/${tweet.author.screen_name}`,
    date: new Date(tweet.created_at).toISOString(),
    media: (tweet.media?.photos ?? []).map((photo) => {
      // `name=small` caps the longest edge at 680px, so scale the reported
      // dimensions to match and keep the intrinsic aspect ratio accurate.
      const scale = Math.min(1, 680 / Math.max(photo.width, photo.height));
      return {
        url: toSmallVariant(photo.url),
        width: Math.round(photo.width * scale),
        height: Math.round(photo.height * scale),
        alt: photo.altText ?? "",
      };
    }),
  };
}

/**
 * Fetches a tweet at build time. Returns `null` when the API is unreachable or
 * the tweet is gone, so an outage degrades the card to a plain link instead of
 * failing the deploy.
 */
export function getTweet(id: string): Promise<Tweet | null> {
  const pending = inFlight.get(id);
  if (pending) return pending;

  const request = fetchTweet(id).catch((error: unknown) => {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[tweet] ${id} unavailable, rendering link only: ${reason}`);
    return null;
  });

  inFlight.set(id, request);
  return request;
}

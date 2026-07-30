export interface Contribution {
  date: string;
  count: number;
  level: number;
}

export interface ContributionsResponse {
  contributions: Contribution[];
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  html_url: string;
  fork: boolean;
  private: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface GitHubActivityData {
  contributionsResult: ContributionsResponse;
  repositories: GitHubRepository[];
}

interface CachedGitHubActivity {
  cachedAt: number;
  data: GitHubActivityData;
}

export const CACHE_DURATION = 60 * 60 * 1000;
const STALE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;
const CACHE_KEY_PREFIX = "github-activity:v1:";
// Keep stalled upstreams from blocking rendering and stale-cache fallback.
export const GITHUB_REQUEST_TIMEOUT_MS = 5_000;

const cacheKey = (username: string) => `${CACHE_KEY_PREFIX}${username.toLowerCase()}`;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    // Each outbound request gets its own full timeout budget.
    signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

function isGitHubActivityData(value: unknown): value is GitHubActivityData {
  if (!value || typeof value !== "object") return false;

  const data = value as Partial<GitHubActivityData>;
  return Array.isArray(data.contributionsResult?.contributions) && Array.isArray(data.repositories);
}

function readCachedActivity(username: string): CachedGitHubActivity | null {
  try {
    const value = localStorage.getItem(cacheKey(username));
    if (!value) return null;

    const cached = JSON.parse(value) as Partial<CachedGitHubActivity>;
    if (
      typeof cached.cachedAt !== "number" ||
      !isGitHubActivityData(cached.data) ||
      Date.now() - cached.cachedAt > STALE_CACHE_DURATION
    ) {
      localStorage.removeItem(cacheKey(username));
      return null;
    }

    return cached as CachedGitHubActivity;
  } catch {
    return null;
  }
}

function writeCachedActivity(username: string, data: GitHubActivityData) {
  try {
    localStorage.setItem(cacheKey(username), JSON.stringify({ cachedAt: Date.now(), data }));
  } catch {
    // Storage can be unavailable in private browsing or when full.
  }
}

async function fetchFromNetwork(username: string): Promise<GitHubActivityData> {
  const encodedUsername = encodeURIComponent(username);
  const [contributionsResult, repositories] = await Promise.all([
    fetchJson<ContributionsResponse>(
      `https://github-contributions-api.jogruber.de/v4/${encodedUsername}?y=last`,
    ),
    fetchJson<GitHubRepository[]>(
      `https://api.github.com/users/${encodedUsername}/repos?sort=created`,
    ),
  ]);

  return { contributionsResult, repositories };
}

// Both the contributions calendar and the repository list need the same two
// responses, so in-flight requests are shared per username to keep a page with
// both components mounted down to a single round trip.
const inFlight = new Map<string, Promise<GitHubActivityData>>();

export function getGitHubActivity(username: string): Promise<GitHubActivityData> {
  const key = username.toLowerCase();
  const pending = inFlight.get(key);
  if (pending) return pending;

  const request = (async () => {
    const cached = readCachedActivity(username);

    if (cached && Date.now() - cached.cachedAt <= CACHE_DURATION) {
      return cached.data;
    }

    try {
      const data = await fetchFromNetwork(username);
      writeCachedActivity(username, data);
      return data;
    } catch (error) {
      if (!cached) throw error;
      return cached.data;
    }
  })();

  inFlight.set(key, request);
  request.catch(() => {}).finally(() => inFlight.delete(key));

  return request;
}

export function invalidateGitHubActivity(username: string) {
  try {
    localStorage.removeItem(cacheKey(username));
  } catch {
    // Ignore storage failures — the network fetch will still run.
  }
}

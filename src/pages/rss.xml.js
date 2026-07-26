import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    // @astrojs/rss appends a trailing slash by default; opt out to match
    // the site's `trailingSlash: 'never'` config.
    trailingSlash: false,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}`,
    })),
  });
}

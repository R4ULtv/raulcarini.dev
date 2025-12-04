import { getAllPosts } from "@/lib/content";
import { baseURL } from "@/lib/url";
import recapData from "@/app/recap/data.json";

export default async function sitemap() {
  const posts = await getAllPosts();

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseURL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseURL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseURL}/recap`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...(await Promise.all(
      Object.keys(recapData.years).map(async (year) => ({
        url: `${baseURL}/recap/${year}`,
        lastModified: new Date(`${year}-01-01`),
        changeFrequency: "yearly",
        priority: 0.7,
      })),
    )),
    ...posts.map((blog) => ({
      url: `${baseURL}/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.createdAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}

import { context, ContractPromiseBatch } from "near-sdk-as";
import { Blog, blogs, slugs } from "./model";

/**
 *
 * @dev create a new blog and add to storage
 */
export function createBlog(blogData: Blog): void {
  let tSlug = blogs.get(blogData.slug);
  if (tSlug !== null) {
    throw new Error(`the slug '${blogData.slug}' is not unique. Please use another one.`);
  }
  assert(blogData.content.length > 0, "Content is empty");
  assert(blogData.slug.length > 0, "Empty slug");
  assert(blogData.title.length > 0, "Empty title");
  blogs.set(blogData.slug, Blog.fromPayload(blogData));
  slugs.push(blogData.slug);
}

/**
 *
 * @param slug string representation used to query specific blog from storage
 *
 * @returns a blog with key @param slug
 */
export function viewBlog(slug: string): Blog | null {
  let blog = blogs.get(slug);
  return blog;
}

/**
 * @dev fetch and return all published blogs
 * @returns all published blogs
 *
 */
export function allBlogs(): Blog[] {
  return blogs.values();
}

/**
 * like a blog
 * @param slug is used to query for a blog from the storage
 */
export function likeBlog(slug: string): void {
  let blog = blogs.get(slug);
  if (blog) {
    blog.like();
    blogs.set(slug, blog);
  }
}

/**
 * buy a coffee for author of a blog
 * @param slug is used to query for a blog from storage
 */
export function buyCoffee(slug: string): void {
  const blog = blogs.get(slug);
  if (blog == null) {
    throw new Error("blog not found");
  }
  blog.donate(context.attachedDeposit);
  ContractPromiseBatch.create(blog.author).transfer(context.attachedDeposit);
  blogs.set(slug, blog);
}

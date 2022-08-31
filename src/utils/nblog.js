import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createBlog(blog) {
  return window.contract.createBlog({ blogData: blog });
}

export function likeBlog(slug) {
  return window.contract.likeBlog({ slug });
}

export async function tipAuthor(slug, amount) {
  const fAmount = parseNearAmount(amount + "");
  await window.contract.buyCoffee({ slug }, GAS, fAmount);
}

export async function viewBlog(slug) {
  return await window.contract.viewBlog({ slug });
}

export function allBlogs() {
  return window.contract.allBlogs();
}

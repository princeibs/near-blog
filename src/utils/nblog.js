import { parseNearAmount } from "near-api-js/lib/utils/format";

// amount of gas to send along with transaction
// Unused gas is returned to sender
const GAS = 100000000000000;

// This function creates a new blog
export function createBlog(blog) {
  return window.contract.createBlog({ blogData: blog });
}

// This function likes a blog with the give slug
export function likeBlog(slug) {
  return window.contract.likeBlog({ slug });
}

// This function tips an author a specific amount (in NEAR coins) for their blog
export async function tipAuthor(slug, amount) {
  const fAmount = parseNearAmount(amount + "");
  await window.contract.buyCoffee({ slug }, GAS, fAmount);
}

// This function returns a specific blog with the given slug
export async function viewBlog(slug) {
  return await window.contract.viewBlog({ slug });
}

// This function returns all blogs stored in the blockchain
export function allBlogs() {
  return window.contract.allBlogs();
}

import { PersistentUnorderedMap,PersistentVector, context } from "near-sdk-as";

/**
 * A class that representing blog created by an author.
 * It contains the details of the blog, including the author's wallet address.
 * {@link nearBindgen} - a decorator that makes this class serializable so it can be persisted on the blockchain level.
 */

@nearBindgen
export class Blog {
  id: string;
  slug: string;
  author: string;
  datePublished: u64;
  title: string;
  content: string;
  thumbnail: string;
  likes: Array<string>;
  
  public static fromPayload(blogData: Blog): Blog {
    const blog = new Blog();
    blog.id = blogData.id;
    blog.slug = blogData.slug;
    blog.author = context.sender;
    blog.datePublished = context.blockTimestamp;
    blog.title = blogData.title;
    blog.content = blogData.content;
    blog.thumbnail = blogData.thumbnail;
    blog.likes = [];

    return blog;
  }

  like(): void {
    // un-like a blog is the `sender` has already liked the blog
    if (this.likes.includes(context.sender)) {
      const index = this.likes.findIndex((i) => i == context.sender);
      if (index != -1) {
        this.likes.splice(index, 1);
      }
    } else {
      this.likes.push(context.sender);
    }
  }
}

/**
 * `blogs` - a key-value datastructure used to store blogs created by authors
 * the key is a unique identifier of the blog i.e the slug
 * the value is the blog object itself, referring to this class
 */
export const blogs = new PersistentUnorderedMap<string, Blog>("bls");

/**
 * A dynamic storage used to keep track of all slugs created
 */
export const slugs = new PersistentVector<string>("slug");

import React, { useState, useCallback, useEffect } from "react";
import { Navigation } from "./components";
import likeImg from "./assets/like-img.png";
import "./App.scss";
import { accountBalance } from "./utils/near";
import { Welcome } from "./pages";
import { allBlogs } from "./utils/nblog";
import { Link } from "react-router-dom";
import { readingTime } from "reading-time-estimator";

const data = [
  {
    id: "0",
    slug: "hello-world-92l9e",
    author: "ibs.testnet",
    datePublished: "Thur, 26 Aug.",
    title: "Hello World",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail: "https://picsum.photos/500/500",
    likesCount: "26",
  },
  {
    id: "1",
    slug: "firt-article-142nl9e",
    author: "ibs.testnet",
    datePublished: "Sat., 29 Aug.",
    title: "First Article",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail: "https://picsum.photos/500/500",
    likesCount: "14",
  },
  {
    id: "2",
    slug: "how-to-code-7qkd57",
    author: "dacade.testnet",
    datePublished: "Wed, 12 Sep.",
    title: "How To Code",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail: "https://picsum.photos/500/500",
    likesCount: "93",
  },
];

const App = () => {
  const account = window.walletConnection.account();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  //
  const blogsList = useCallback(async () => {
    try {
      setLoading(true);
      setBlogs(await allBlogs());
    } catch (e) {
      console.log({ e });
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    blogsList();
  }, []);

  return (
    <>
      {account.accountId ? (
        <>
          <Navigation />
          <div className="app__app">
            <div className="app-heading">Recent Blogs</div>
            {!loading ? (
              <div className="app-body">
                {blogs.map((blog) => (
                  <div className="preview" key={blog.slug}>
                    <img src={blog.thumbnail} />
                    <div className="preview-meta-0">
                      <div className="preview-meta-1">
                        <div className="preview-dp">
                          {new Date(
                            blog.datePublished / 1000000
                          ).toDateString()}
                        </div>
                        <div className="preview-rt">
                          {readingTime(blog.content).minutes} mins read
                        </div>
                      </div>
                      <div className="preview-author">
                        by <span>{blog.author}</span>
                      </div>
                    </div>
                    <div className="preview-title">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </div>
                    <div className="preview-preview">{blog.content}</div>
                    <hr />
                    <div className="preview-lc">
                      <img src={likeImg} />
                      <div>{blog.likes.length}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default App;

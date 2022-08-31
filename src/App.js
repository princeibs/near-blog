import React, { useState, useCallback, useEffect } from "react";
import { Navigation } from "./components";
import likeImg from "./assets/like-img.png";
import "./App.scss";
import { accountBalance } from "./utils/near";
import { Welcome } from "./pages";
import { allBlogs } from "./utils/nblog";
import { Link } from "react-router-dom";
import { readingTime } from "reading-time-estimator";

const App = () => {
  const account = window.walletConnection.account();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  // Query for all blogs on the blockchain
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
                  <div className="preview">
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

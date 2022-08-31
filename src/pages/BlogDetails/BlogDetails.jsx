import React, { useState, useEffect, useCallback } from "react";
import { Navigation } from "../../components";
import likeImg from "../../assets/like-img.png";
import { useParams } from "react-router";
import "./BlogDetails.scss";
import { likeBlog, viewBlog, tipAuthor } from "../../utils/nblog";
import { readingTime } from "reading-time-estimator";

const BlogDetails = () => {
  const [coffeeQty, setCoffeeQty] = useState(1);
  const [blog, setBlog] = useState();
  const { slug } = useParams();

  const like = async () => {
    try {
      await likeBlog(slug);
      window.location.reload();
    } catch (e) {
      console.log({ e });
    }
  };

  const tip = async () => {
    await tipAuthor(slug, coffeeQty).then(() =>
      alert("Successfully tipped author")
    );
    try {
    } catch (e) {
      console.log({ e });
    }
  };

  const blogDetails = useCallback(async () => {
    try {
      setBlog(await viewBlog(slug));
    } catch (e) {
      console.log({ e });
    }
  });

  useEffect(() => {
    blogDetails();
  }, []);

  return (
    <>
      <Navigation />
      {blog ? (
        <div className="app__details">
          <div className="details">
            <img src={blog.thumbnail} />
            <div className="details-meta-0">
              <div className="details-meta-1">
                <div className="details-dp">
                  {new Date(blog.datePublished / 1000000).toLocaleString()}
                </div>
                <div className="details-rt">
                  {readingTime(blog.content).minutes} mins read
                </div>
              </div>
              <div className="details-author">
                by <span>{blog.author}</span>
              </div>
            </div>
            <div className="details-title">{blog.title}</div>
            <div className="details-details">{blog.content}</div>
            <hr />
            <div className="details-lc">
              <div className="details-lc-1" onClick={() => like()}>
                <img src={likeImg} />
                <div>{blog.likes.length}</div>
              </div>
              <div className="details-lc-2">
                <span onClick={() => tip()}>Buy author {coffeeQty} coffee</span>
                <input
                  defaultValue={1}
                  min={1}
                  value={coffeeQty}
                  onChange={(e) => setCoffeeQty(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BlogDetails;

import React, { useState } from "react";
import { Navigation } from "../../components";
import { useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import "./Write.scss";
import { createBlog } from "../../utils/nblog";

const Write = () => {
  const [thumbnail, setThumbnail] = React.useState();
  const [blogTitle, setBlogTitle] = useState();
  const [blogContent, setBlogContent] = useState();
  const navigate = useNavigate();

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const create = async () => {
    const _uuid = uuid4();
    const _slug = `${slugify(blogTitle)}-${_uuid}`;
    const blogData = {
      id: _uuid,
      slug: _slug,
      title: blogTitle,
      content: blogContent,
      thumbnail: thumbnail,
    };

    await createBlog(blogData).then(() => {
      navigate("/");
      alert("Successfully created new blog");
    });
  };

  return (
    <>
      <Navigation />
      <div className="app__write">
        <div className="write">
          <div className="write-header">
            <img src={thumbnail} alt="thumbnail image" />
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="Enter thumbnail URL here"
            />
          </div>
          <div className="write-edit">
            <input
              className="write-title"
              placeholder="Blog title here"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
            <textarea
              className="write-content"
              placeholder="Blog content here"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
            />
          </div>
          <button className="publish-btn" onClick={() => create()}>
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default Write;

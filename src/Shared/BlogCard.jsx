import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./Blogcard.css";

const BlogCard = ({ blog }) => {
  // compute stable id and fallbacks so Link never becomes /blogs/undefined
  const blogId = blog.id || blog._id || "";
  const title = blog.title || "Untitled";
  const author = blog.author || blog.username || "Unknown";
  const date = blog.date || blog.createdAt || "";
  const photo = blog.photo || blog.image || "";
  const commentsCount = blog.comments?.length || 0;

  return (
    <div className="blog__card">
      <Card>
        <Link to={`/blogs/${blogId}`}>
          <div className="blog__img">
            <img src={photo} alt={title} />
          </div>
        </Link>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="blog__location d-flex align-items-center gap-1">
              <i className="ri-user-line"></i>
              {author}
            </span>
            <span className="blog__rating d-flex align-items-center gap-1">
              <span>{date ? new Date(date).toLocaleDateString() : ""}</span>
            </span>
          </div>

          <h5 className="blog__title">
            <Link to={`/blogs/${blogId}`}>
              <div>{title}</div>
            </Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {commentsCount} <span>Comments</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/blogs/${blogId}`}>
                <div>Read More</div>
              </Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BlogCard;

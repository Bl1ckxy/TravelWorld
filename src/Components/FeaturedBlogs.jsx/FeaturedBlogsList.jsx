import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import blogs from "../../assets/data/blogs";
import "./FeaturedBlogs.css";

const FeaturedBlogsList = () => {
  const featuredBlogs = blogs.filter((blog) => blog.featured);

  return (
    <Row>
      {featuredBlogs.map((blog) => (
        <Col lg="12" className="mb-4" key={blog.id}>
          <div className="featured-blog-card">
            <img
              src={blog.photo}
              alt={blog.title}
              className="featured-blog-img"
            />
            <div className="featured-blog-content">
              <h6>{blog.title}</h6>
              <Link to={`/blogs/${blog.id}`} className="read-more-link">
                Read More
              </Link>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default FeaturedBlogsList;

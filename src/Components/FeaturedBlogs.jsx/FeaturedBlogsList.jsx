import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import localBlogs from "../../assets/data/blogs";
import "./FeaturedBlogs.css";
import { BASE_URL } from "../../utils/config";

const FeaturedBlogsList = () => {
  const [featured, setFeatured] = useState(localBlogs.filter((b) => b.featured));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/blogs/featured`);
        if (!res.ok) throw new Error("No featured endpoint");
        const data = await res.json();
        if (mounted && Array.isArray(data)) setFeatured(data);
      } catch (err) {
        // fallback already set
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Row>
      {featured.map((blog) => (
        <Col lg="12" className="mb-4" key={blog.id || blog._id || blog.title}>
          <div className="featured-blog-card">
            <img src={blog.photo} alt={blog.title} className="featured-blog-img" />
            <div className="featured-blog-content">
              <h6>{blog.title}</h6>
              <Link to={`/blogs/${blog.id || blog._id}`} className="read-more-link">
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

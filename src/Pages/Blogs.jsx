import React from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../Shared/BlogCard";
import blogs from '../assets/data/blogs';

const Blogs = () => {
  return (
    <div>
      <CommonSection title={"All blogs"} />
      <section className="mt-4">
        <Container>
          <Row>
            {blogs.map((blog) => (
              <Col lg="4" md="6" sm="6" className="mb-4" key={blog.id}>
                <BlogCard blog={blog} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Blogs;

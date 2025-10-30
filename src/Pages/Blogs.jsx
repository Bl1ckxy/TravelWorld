import React, { useState, useEffect } from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../Shared/Newsletter";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import BlogCard from "../Shared/BlogCard";
import localBlogs from "../assets/data/blogs";
import "../styles/blogs.css";
import { BASE_URL } from "../utils/config";

const Blogs = () => {
  const [modal, setModal] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "user",
    photo: "",
    featured: false,
  });
  const [message, setMessage] = useState("");
  const [apiBlogs, setApiBlogs] = useState([]);
  const [combined, setCombined] = useState(localBlogs);
  const [loading, setLoading] = useState(false);

  const toggle = () => setModal(!modal);

  // helper to get stable id for dedupe
  const getId = (b) => b.id || b._id || "";

  const mergeLists = (localList, apiList) => {
    const map = new Map();
    localList.forEach((b) => map.set(getId(b), b));
    apiList.forEach((b) => {
      const key = getId(b);
      if (!map.has(key)) map.set(key, b);
      else {
        // prefer api blog (so updates from backend show)
        map.set(key, { ...map.get(key), ...b });
      }
    });
    return Array.from(map.values());
  };

  // load blogs from API and merge with local
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/blogs`);
        if (!res.ok) throw new Error("API fetch failed");
        const data = await res.json();
        if (mounted) {
          setApiBlogs(data);
          setCombined(mergeLists(localBlogs, data));
        }
      } catch (err) {
        // fallback to local only
        setCombined(localBlogs);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error("Failed to post blog");
      }

      const result = await response.json();
      // add to apiBlogs and refresh combined list
      const newApiBlogs = [result, ...apiBlogs];
      setApiBlogs(newApiBlogs);
      setCombined(mergeLists(localBlogs, newApiBlogs));

      setMessage("Blog published successfully!");
      setBlogData({
        title: "",
        content: "",
        author: "",
        photo: "",
        featured: false,
      });

      setTimeout(() => {
        toggle();
      }, 800);
    } catch (error) {
      console.error("Error posting blog:", error);
      setMessage("Failed to publish blog. Please try again.");
    }
  };

  return (
    <div>
      <CommonSection title={"All blogs"} />
      <section className="mt-4">
        <Container>
          <div className="write-blog-button-container mb-4">
            <Button color="primary" onClick={toggle}>
              Write Blog
            </Button>
          </div>

          {loading ? (
            <div className="loader-container">
              <div className="loader" />
              <div className="loading-text">Loading...</div>
            </div>
          ) : (
            <Row>
              {combined.map((blog) => (
                <Col lg="4" md="6" sm="6" className="mb-4" key={getId(blog) || blog.id}>
                  <BlogCard blog={blog} />
                </Col>
              ))}
            </Row>
          )}
        </Container>

        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>Write a Blog</ModalHeader>
          <ModalBody>
            {message && (
              <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>
                {message}
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" value={blogData.title} onChange={handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  type="textarea"
                  name="content"
                  id="content"
                  value={blogData.content}
                  onChange={handleChange}
                  rows="6"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="photo">Photo URL</Label>
                <Input type="text" name="photo" id="photo" value={blogData.photo} onChange={handleChange} />
              </FormGroup>
              <FormGroup check className="mb-3">
                <Label check>
                  <Input type="checkbox" name="featured" checked={blogData.featured} onChange={handleChange} />{" "}
                  Featured Blog
                </Label>
              </FormGroup>
              <Button color="primary" type="submit">
                Publish Blog
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </section>
      <Newsletter />
    </div>
  );
};

export default Blogs;

import React, { useContext, useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, ListGroup, Alert } from "reactstrap";
import avtar from "../assets/images/avatar.jpg";
import "../styles/Blogdetails.css";
import { useParams } from "react-router-dom";
import FeaturedBlogsList from "../Components/FeaturedBlogs.jsx/FeaturedBlogsList";
import Subtitle from "../Shared/Subtitle";
import Newsletter from "../Shared/Newsletter";
import { AuthContext } from "../context/AuthContext";
import localBlogs from "../assets/data/blogs";
import { BASE_URL } from "../utils/config";

const BlogDetails = () => {
  const { id } = useParams();
  const commentMsgRef = useRef("");
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentStatus, setCommentStatus] = useState(null);
  const [apiBlog, setApiBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  // static default user id (24 hex chars) to satisfy backend ObjectId
  const DEFAULT_USER_ID = "000000000000000000000000";

  // fetch blog from API if available
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/blogs/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        if (mounted) setApiBlog(data);
      } catch (err) {
        // ignore, fallback to local
        setApiBlog(null);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  // pick blog: prefer API then local
  const blog = apiBlog || localBlogs.find((b) => (b.id || b._id) === id);

  // if blog loads/changes, initialize comments from blog.comments (if present)
  useEffect(() => {
    if (blog) {
      setComments(Array.isArray(blog.comments) ? blog.comments : []);
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return <div className="error__msg">Blog not found</div>;
  }

  // safe accessors for different shapes
  const blogId = blog.id || blog._id || "";
  const title = blog.title || "Untitled";
  const author = blog.author || blog.username || "Unknown";
  const createdAt = blog.date || blog.createdAt || "";
  const photo = blog.photo || blog.image || "";
  const content = blog.content || blog.desc || blog.body || "";

  // helper: validate 24-hex ObjectId
  const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  const submitHandler = async (e) => {
    e.preventDefault();

    const commentMsg = commentMsgRef.current.value;
    if (!commentMsg) return;

    // use logged-in username if available, otherwise fallback to a guest name
    const username = (user && user.username) || "GuestUser";

    // prepare normalized comment for local UI
    const localComment = {
      username,
      comment: commentMsg,
      createdAt: new Date().toISOString(),
    };

    // if blogId looks like a valid ObjectId -> call backend, else just append locally
    if (isValidObjectId(blogId)) {
      const commentPayload = {
        username,
        comment: commentMsg,
        user: DEFAULT_USER_ID, // static user id for backend
      };

      try {
        const res = await fetch(`${BASE_URL}/comment/${blogId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(commentPayload),
        });

        if (!res.ok) {
          throw new Error("Failed to post comment");
        }

        const created = await res.json();

        const normalized = {
          username: created.username || username,
          comment: created.comment || commentMsg,
          createdAt: created.createdAt || new Date().toISOString(),
        };

        setComments((prev) => [...prev, normalized]);
        commentMsgRef.current.value = "";
        setCommentStatus("success");
      } catch (err) {
        console.error("Comment post error:", err);
        setCommentStatus("error");
      }
    } else {
      // local-only blog: append comment in UI and skip backend call to avoid ObjectId CastError
      setComments((prev) => [...prev, localComment]);
      commentMsgRef.current.value = "";
      setCommentStatus("success");
    }
  };

  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="blog__content">
                <div className="blog__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="blog__rating d-flex align-items-center gap-1">
                      <span>
                        <i className="ri-user-line"></i>
                        {author}
                      </span>
                    </span>
                  </div>
                  <div className="blog__extra-details">
                    <span>
                      <i className="ri-calendar-line"></i>
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString("en-in", options)
                        : ""}
                    </span>
                    <span>
                      <i className="ri-chat-3-line"></i>
                      {(comments?.length || 0)}{" "}
                      {comments?.length === 1 ? "Comment" : "Comments"}
                    </span>
                  </div>
                  <h5>Blog Content</h5>
                  <p>{content}</p>
                  {photo && <img src={photo} alt={title} />}
                </div>

                <div className="blog__reviews mt-4">
                  <h4>Comment </h4>
                  {commentStatus === "success" && (
                    <Alert color="success" toggle={() => setCommentStatus(null)}>
                      Comment successfully.
                    </Alert>
                  )}
                  {commentStatus === "error" && (
                    <Alert
                      color="danger"
                      className=""
                      toggle={() => setCommentStatus(null)}
                    >
                      Failed to add comment. Please try again.
                    </Alert>
                  )}
                  <Form onSubmit={submitHandler}>
                    <div className="review__input">
                      <input
                        type="text"
                        placeholder="Share your Thoughts"
                        required
                        ref={commentMsgRef}
                      />
                      <button className="primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {comments?.map((comment, index) => (
                      <div className="review__item" key={index}>
                        <img src={avtar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>
                                {comment.username ||
                                  comment.name ||
                                  "Anonymous"}
                              </h5>
                              <p>
                                {comment.createdAt
                                  ? new Date(comment.createdAt).toLocaleDateString(
                                      "en-in",
                                      options
                                    )
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <h6>
                            {comment.comment || comment.review || ""}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <div className="Featured__blogs">
                <div className="title">
                  <Subtitle subtitle={"Featured Blogs"} />
                </div>
                <div className="mx-auto md:text-center">
                  <FeaturedBlogsList lg={11} md={10} sm={11} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default BlogDetails;

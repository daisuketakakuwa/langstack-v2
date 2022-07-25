import React, { useEffect, useState } from "react";
import axios from "../infras/AxiosFactory";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Post } from "../pages/HomePage/PostSection";
import { ContentTextArea } from "../pages/PostPage/PostPageStyle";

export type PostModalProps = {
  post: Post;
  showModal: boolean;
  handleClose: () => void;
  handleAfterUpdate: () => void;
};

const PostModal = (props: PostModalProps): JSX.Element => {
  const { post, showModal, handleClose, handleAfterUpdate } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  const update = async () => {
    const request = {
      id: post.id,
      title,
      content,
    };
    await axios
      .put("/cards", request)
      .then((res) => {
        alert("UPDATE SUCCESS!!");
        handleAfterUpdate();
      })
      .catch((err) => {
        alert("UPDATE FAILED...");
      });
  };

  return (
    <>
      <Modal backdrop="static" centered show={showModal} onHide={handleClose}>
        <Modal.Header>
          <div>
            投稿日時：{post.post_date && post.post_date.substring(0, 10)}
            <br />
            ジャンル：{post.genre && post.genre.name}
            <br />
            タイトル：
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <ContentTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={update}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;

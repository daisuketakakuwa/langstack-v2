import React, { useState } from "react";

import { PostSectionStyled } from "./PostSectionStyle";
import PostCard from "../../../components/PostCard";
import PostModal from "../../../components/PostModal";

type Genre = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  post_date: string;
  genre: Genre;
  title: string;
  content: string;
};

type PostSectionProp = {
  posts: Post[];
  handleAfterUpdateProps: () => void;
};

const PostSection = (props: PostSectionProp): JSX.Element => {
  const { posts, handleAfterUpdateProps } = props;

  const [modalPost, setModalPost] = useState({} as Post);
  const [showModal, setShowModal] = useState(false);

  const openModal = (post: Post) => {
    setModalPost(post);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const handleAfterUpdate = () => {
    setShowModal(false);
    handleAfterUpdateProps();
  };

  return (
    <PostSectionStyled>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} handleOpenModal={openModal} />
      ))}
      <PostModal
        post={modalPost}
        showModal={showModal}
        handleClose={closeModal}
        handleAfterUpdate={handleAfterUpdate}
      />
    </PostSectionStyled>
  );
};

export default PostSection;

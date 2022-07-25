import React, { useState } from "react";

import {
  ContentSection,
  PostCard,
  PostSectionStyled,
  PostCardItem,
  PostSectionBar,
  PostCardHeaderLeft,
  PostCardHeaderRight,
} from "./PostSectionStyle";

import Button from "react-bootstrap/Button";
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
        <PostCard key={post.id}>
          <PostCardItem fontSize={15} fontFamily={100}>
            <div style={{ display: "flex" }}>
              <PostCardHeaderLeft>
                投稿日時：{post.post_date.substring(0, 10)}
                <br />
                ジャンル：{post.genre.name}
              </PostCardHeaderLeft>
              <PostCardHeaderRight>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openModal(post)}
                >
                  編集
                </Button>
              </PostCardHeaderRight>
            </div>
          </PostCardItem>
          <PostCardItem fontSize={20} fontFamily={800}>
            {post.title}
          </PostCardItem>
          <PostSectionBar />
          <ContentSection>{post.content}</ContentSection>
        </PostCard>
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

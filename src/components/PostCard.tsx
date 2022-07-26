import React from "react";

import {
  PostCardStyled,
  PostCardItem,
  PostCardHeaderLeft,
  PostCardHeaderRight,
  PostSectionBar,
  ContentSection,
} from "./PostCardStyle";
import Button from "react-bootstrap/Button";
import { Post } from "../pages/HomePage/PostSection";

export type PostCardProps = {
  post: Post;
  handleOpenModal: (post: Post) => void;
};

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post, handleOpenModal } = props;

  return (
    <PostCardStyled key={post.id}>
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
              onClick={() => handleOpenModal(post)}
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
    </PostCardStyled>
  );
};

export default PostCard;

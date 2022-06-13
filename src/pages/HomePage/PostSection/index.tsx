import {
  ContentSection,
  PostCard,
  PostSectionStyled,
  PostCardItem,
  PostSectionBar,
} from "./PostSectionStyle";

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
};

const PostSection = (props: PostSectionProp): JSX.Element => {
  const { posts } = props;
  return (
    <PostSectionStyled>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <PostCardItem fontSize={15} fontFamily={100}>
            投稿日時：{post.post_date.substring(0, 10)}
            <br />
            ジャンル：{post.genre.name}
          </PostCardItem>
          <PostCardItem fontSize={20} fontFamily={800}>
            {post.title}
          </PostCardItem>
          <PostSectionBar />
          <ContentSection>{post.content}</ContentSection>
        </PostCard>
      ))}
    </PostSectionStyled>
  );
};

export default PostSection;

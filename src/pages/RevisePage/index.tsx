import React, { useState, useEffect } from "react";
import axios from "../../infras/AxiosFactory";
import SwipeableViews from "react-swipeable-views";
import { Post } from "../HomePage/PostSection";
import {
  ContentSection,
  PostCard,
  PostCardItem,
  PostSectionBar,
} from "../HomePage/PostSection/PostSectionStyle";
import {
  DateInputStyled,
  FlexBox,
  RevisePageBox,
  RevisePageTitle,
  SearchButton,
} from "./RevisePageStyle";
import { GenreSelectBox } from "../PostPage/GenreSelect/GenreSelectStyle";
import { Genre } from "../PostPage/GenreSelect";
const RevisePage = (): JSX.Element => {
  // condition state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  // api response state
  const [genres, setGenres] = useState([] as Genre[]);
  const [posts, setPosts] = useState([] as Post[]);
  // page layout state
  const [searched, setSearched] = useState(false);
  const [index, setIndex] = useState(1);

  const search = async () => {
    await axios
      .get("/cards", {
        params: {
          fromDate,
          toDate,
          genreId: selectedGenre,
        },
      })
      .then((res) => {
        setPosts(res.data.cards);
      })
      .catch((err) => {
        alert("SEARCH ERROR...");
      });
    setSearched(true);
  };

  useEffect(() => {
    axios.get("/genres").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  return (
    <RevisePageBox>
      <FlexBox flexDirection="column">
        <RevisePageTitle>FROM</RevisePageTitle>
        <DateInputStyled
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <RevisePageTitle>TO</RevisePageTitle>
        <DateInputStyled
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <RevisePageTitle>GENRE</RevisePageTitle>
      </FlexBox>
      <GenreSelectBox
        name="genres"
        onChange={(e) => setSelectedGenre(e.target.value)}
        width="100%"
      >
        <option value="" />
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </GenreSelectBox>
      <SearchButton onClick={() => search()}>SEARCH</SearchButton>
      <h1 style={{ textAlign: "center" }}>
        {index}/{posts.length}
      </h1>
      <SwipeableViews onChangeIndex={(index) => setIndex(index + 1)}>
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
      </SwipeableViews>
    </RevisePageBox>
  );
};

export default RevisePage;

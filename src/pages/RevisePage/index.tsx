import React, { useState, useEffect } from "react";
import axios from "../../infras/AxiosFactory";
import SwipeableViews from "react-swipeable-views";
import { Post } from "../HomePage/PostSection";
import {
  DateInputStyled,
  FlexBox,
  RevisePageBox,
  RevisePageTitle,
  SearchButton,
} from "./RevisePageStyle";
import { GenreSelectBox } from "../PostPage/GenreSelect/GenreSelectStyle";
import { Genre } from "../PostPage/GenreSelect";
import PostModal from "../../components/PostModal";
import PostCard from "../../components/PostCard";
const RevisePage = (): JSX.Element => {
  // condition state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  // api response state
  const [genres, setGenres] = useState([] as Genre[]);
  const [posts, setPosts] = useState([] as Post[]);
  // page layout state
  const [index, setIndex] = useState(0);

  const [modalPost, setModalPost] = useState({} as Post);
  const [showModal, setShowModal] = useState(false);

  const openModal = (post: Post) => {
    setModalPost(post);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const handleAfterUpdate = async () => {
    setShowModal(false);
    // await search();
  };

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
        setIndex(0);
      })
      .catch((err) => {
        alert("SEARCH ERROR...");
        setIndex;
      });
  };

  useEffect(() => {
    axios.get("/genres").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [posts]);

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
        {index + 1}/{posts.length}
      </h1>
      <SwipeableViews index={index} onChangeIndex={(i) => setIndex(i)}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} handleOpenModal={openModal} />
        ))}
      </SwipeableViews>
      <PostModal
        post={modalPost}
        showModal={showModal}
        handleClose={closeModal}
        handleAfterUpdate={handleAfterUpdate}
      />
    </RevisePageBox>
  );
};

export default RevisePage;

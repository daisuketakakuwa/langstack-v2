import React, { useEffect, useState } from "react";
import {
  KeywordTextBox,
  KeywordTextBoxFrame,
  SearchButton,
  SearchPageTitle,
  SearchPageBox,
} from "./SearchPageStyle";
import PostSection, { Post } from "../HomePage/PostSection";
import axios from "../../infras/AxiosFactory";
import { Genre } from "../PostPage/GenreSelect";
import { GenreSelectBox } from "../PostPage/GenreSelect/GenreSelectStyle";

const SearchPage = (): JSX.Element => {
  const [posts, setPosts] = useState([] as Post[]);
  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState(false);
  const [genres, setGenres] = useState([] as Genre[]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const search = async () => {
    await axios
      .get("/cards", {
        params: {
          keyword,
          genreId: selectedGenre,
        },
      })
      .then((res) => {
        setPosts(res.data.cards);
      })
      .catch((err) => {
        alert("SEARCH ERROR...");
      });
  };

  const handleSearch = async () => {
    await search();
    setSearched(true);
  };

  const handleAfterUpdateProps = async () => {
    await search();
  };

  const switchSearchResult = (): JSX.Element => {
    if (!searched) {
      return <span />;
    } else if (posts.length === 0) {
      return <h3 style={{ textAlign: "center" }}>NO POSTS MATCHED</h3>;
    } else {
      return (
        <PostSection
          posts={posts}
          handleAfterUpdateProps={handleAfterUpdateProps}
        />
      );
    }
  };

  useEffect(() => {
    axios.get("/genres").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  return (
    <SearchPageBox>
      <SearchPageTitle>KEYWORD</SearchPageTitle>
      <KeywordTextBox
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchPageTitle>GENRE</SearchPageTitle>
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
      <KeywordTextBoxFrame>
        <SearchButton onClick={() => handleSearch()}>SEARCH</SearchButton>
      </KeywordTextBoxFrame>
      <SearchPageTitle>SEARCH RESULT</SearchPageTitle>
      {switchSearchResult()}
    </SearchPageBox>
  );
};

export default SearchPage;

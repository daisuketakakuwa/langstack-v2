import React, { useEffect, useState } from "react";
import {
  KeywordTextBox,
  KeywordTextBoxFrame,
  SearchButton,
  SearchPageTitle,
} from "./SearchPageStyle";
import PostSection, { Post } from "../HomePage/PostSection";
import axios from "../../infras/AxiosFactory";

const SearchPage = (): JSX.Element => {
  const [posts, setPosts] = useState([] as Post[]);
  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (keyword === "") {
      alert("FILL OUT KEYWORD");
      return;
    }
    await axios
      .get("/cards", {
        params: {
          keyword,
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

  const switchSearchResult = (): JSX.Element => {
    if (!searched) {
      return <span />;
    } else if (posts.length === 0) {
      return <h3 style={{ textAlign: "center" }}>NO POSTS MATCHED</h3>;
    } else {
      return <PostSection posts={posts} />;
    }
  };

  return (
    <React.Fragment>
      <SearchPageTitle>KEYWORD</SearchPageTitle>
      <KeywordTextBoxFrame>
        <KeywordTextBox
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <SearchButton onClick={() => search()}>SEARCH</SearchButton>
      </KeywordTextBoxFrame>
      <SearchPageTitle>SEARCH RESULT</SearchPageTitle>
      {switchSearchResult()}
    </React.Fragment>
  );
};

export default SearchPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ContentTextArea,
  PostButton,
  PostButtonBox,
  PostPageBox,
  PostPageTitle,
  TitleTextBox,
} from "./PostPageStyle";
import GenreSelect, { Genre } from "./GenreSelect";
import axios from "../../infras/AxiosFactory";

const PostPage = (): JSX.Element => {
  const [genres, setGenres] = useState([] as Genre[]);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genreSwitch, setGenreSwitch] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const post = async () => {
    if (title == "") {
      alert("PLEASE FILL OUT TITLE");
      return;
    }
    if (content == "") {
      alert("PLEASE FILL OUT CONTENT");
      return;
    }
    // genreSwitch true→NEW false->既存
    let request;
    if (genreSwitch) {
      if (newGenre == "") {
        alert("PLEASE FILL OUT GENRE");
        return;
      }
      request = {
        genreName: newGenre,
        title: title,
        content: content,
      };
    } else {
      if (selectedGenre == "") {
        alert("PLEASE FILL OUT GENRE");
        return;
      }
      request = {
        genreId: selectedGenre,
        title: title,
        content: content,
      };
    }
    await axios
      .post("/cards", request)
      .then((res) => {
        alert("POSTING SUCCESS!!");
      })
      .catch((err) => {
        alert("POSTING FAILED...");
      });
    navigate("/");
  };

  useEffect(() => {
    axios.get("/genres").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  return (
    <PostPageBox>
      <PostPageTitle>GENRE</PostPageTitle>
      <GenreSelect
        genres={genres}
        genreSwitch={genreSwitch}
        setGenreSwitch={setGenreSwitch}
        newGenre={newGenre}
        setNewGenre={setNewGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <PostPageTitle>TITLE</PostPageTitle>
      <TitleTextBox value={title} onChange={(e) => setTitle(e.target.value)} />
      <PostPageTitle>CONTENT</PostPageTitle>
      <ContentTextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <PostButtonBox>
        <PostButton onClick={() => post()}>POST</PostButton>
      </PostButtonBox>
    </PostPageBox>
  );
};

export default PostPage;

import React, { useState } from "react";
import styled from "styled-components";
import {
  GenreSelectBox,
  GenreTextBox,
  SwitchGenreButton,
} from "./GenreSelectStyle";

export type Genre = {
  id: string;
  name: string;
};

type GenreSelectProp = {
  genres: Genre[];
  genreSwitch: boolean;
  setGenreSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  newGenre: string;
  setNewGenre: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
};

const switchGenreInputField = (
  isNewGenre: boolean,
  genres: Genre[],
  newGenre: string,
  setNewGenre: React.Dispatch<React.SetStateAction<string>>,
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>
): JSX.Element => {
  if (isNewGenre) {
    return (
      <GenreTextBox
        value={newGenre}
        onChange={(e) => setNewGenre(e.target.value)}
      />
    );
  }
  return (
    <GenreSelectBox
      name="genres"
      onChange={(e) => setSelectedGenre(e.target.value)}
      width="70%"
    >
      <option value="" />
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </GenreSelectBox>
  );
};

const GenreSelect = (props: GenreSelectProp): JSX.Element => {
  const {
    genres,
    genreSwitch,
    setGenreSwitch,
    newGenre,
    setNewGenre,
    setSelectedGenre,
  } = props;

  return (
    <React.Fragment>
      {switchGenreInputField(
        genreSwitch,
        genres,
        newGenre,
        setNewGenre,
        setSelectedGenre
      )}
      <SwitchGenreButton onClick={() => setGenreSwitch(!genreSwitch)}>
        SWITCH
      </SwitchGenreButton>
    </React.Fragment>
  );
};

export default GenreSelect;

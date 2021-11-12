import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCategory } from "../state/search";
import Home from "./Home/Home";
const HomeSearch = () => {
  const dispatch = useDispatch();

  const selectorCategory = useSelector((state) => state.search);

  const onChangeHandler = (e) => {
    dispatch(searchCategory(e.target.value));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    searchCategory(selectorCategory);
  };

  return (
    <Home
      selectorActivity={selectorCategory}
      onChangeHandler={onChangeHandler}
      onSubmitHandler={onSubmitHandler}
    />
  );
};

export default HomeSearch;

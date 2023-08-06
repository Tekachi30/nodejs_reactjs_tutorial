import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    page: null,
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/addBook", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h1>Thêm book mới</h1>
      <input
        type="text"
        placeholder="tile"
        onChange={handlechange}
        name="title"
      />
      <input
        type="text"
        placeholder="author"
        onChange={handlechange}
        name="author"
      />
      <input
        type="number"
        placeholder="page"
        onChange={handlechange}
        name="page"
      />
      <br /> <br />
      <button onClick={handleClick}>Thêm book</button>
    </div>
  );
};

export default AddBook;

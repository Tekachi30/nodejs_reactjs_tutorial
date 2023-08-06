import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = () => {
  const [Books, setBook] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/readBook");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handelDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/deleteBook/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Shop Book Store News</h1>
      <div className="books">
        {Books.map((book) => (
          <div className="book">
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <span>{book.page}</span>

            <button className="update">Update</button>
            <button className="delete" onClick={() => handelDelete(book.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="bottom">
        <button>
          <Link to="/addBook">Thêm book mới</Link>
        </button>
      </div>
    </div>
  );
};

export default Books;

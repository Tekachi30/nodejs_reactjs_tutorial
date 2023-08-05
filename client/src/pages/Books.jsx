import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'

const Books = () => {
    const [Books, setBooks] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try {
                const res = await axios.get("http://localhost:8000/readBook")
                setBooks(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks()
    },[])

    return (
        <div>
            <h1>Shop Book Store News</h1>
            <div className="books">
                {Books.map(book=>(
                    <div className="book">
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <span>{book.page}</span>
                    </div>
                ))}
            </div>
            <div className="bottom">
            <button><Link to="/addBook">Add new book</Link></button>
            </div>
        </div>
    )
}

export default Books
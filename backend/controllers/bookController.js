const db = require("../models");
const Book = db.Book;

const test = async (req, res) => {
  try {
    res.json("Xin chào bé yêu đây là trang chủ!");
  } catch (error) {
    console.log(error);
  }
};

const readBook = async (req, res) => {
  try {
    const book = await Book.findAll();
    if (!book || book.length === 0) {
      res.json("Không có book nào!");
    } else {
      res.json(book);
    }
  } catch (error) {
    console.log(error);
  }
};

const addBook = async (req, res) => {
  const { title, author, page } = req.body;
  // Kiểm tra title không trùng
  const existingBook = await Book.findOne({ where: { title } });
  if (existingBook) {
    return res.status(400).json({ message: "Book với title này đã tồn tại." });
  }

  // Kiểm tra không được để trống và không để khoảng trắng
  if (!title || !author || !page) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin book." });
  }

  try {
    const book = await Book.create({
      title,
      author,
      page,
    });
    res.json({ book, message: "Thêm thành công!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  readBook,
  addBook,
};

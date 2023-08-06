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
      res.status(404).json("Không có book nào!");
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
    res.status(200).json({ book, message: "Thêm thành công!" });
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);

    // Kiểm tra xem cuốn sách có tồn tại hay không
    if (!book) {
      return res.status(404).json({ message: "Cuốn sách không tồn tại." });
    } else {
      await book.destroy();
      res.status(200).json({ message: "Cuốn sách đã được xóa thành công." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi xóa cuốn sách." });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  console.log(req.body);
  const { title, author, page } = req.body;
  try {
    const book = await Book.findByPk(bookId);

    // Kiểm tra xem cuốn sách có tồn tại hay không
    if (!book) {
      return res.status(404).json({ message: "Cuốn sách không tồn tại." });
    }

    // Kiểm tra xem author có chữ số trong đó
    if (/\d/.test(author)) {
      return res
        .status(400)
        .json({ message: "Tên tác giả không được chứa chữ số." });
    }

    // Thực hiện cập nhật cuốn sách
    await book.update({
      title: title,
      author: author,
      page: page,
    });

    res.status(200).json({ message: "Cuốn sách đã được cập nhật thành công." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  readBook,
  addBook,
  deleteBook,
  updateBook,
};

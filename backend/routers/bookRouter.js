const express = require("express");
const {
  test,
  readBook,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");
const routerBook = express.Router();

routerBook.get("/", test);
routerBook.get("/readBook", readBook);
routerBook.post("/addBook", addBook);
routerBook.delete("/deleteBook/:id", deleteBook);
routerBook.put("/updataBook/:id", updateBook);

module.exports = {
  routerBook,
};

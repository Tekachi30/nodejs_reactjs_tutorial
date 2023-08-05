const express = require("express");
const { test, readBook, addBook } = require("../controllers/bookController");
const routerBook = express.Router();

routerBook.get("/", test);
routerBook.get("/readBook", readBook);
routerBook.post("/addBook", addBook);

module.exports = {
  routerBook,
};

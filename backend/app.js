const express = require("express");
const cors = require("cors");

require("./config/connect");

const app = express();
const Port = 8000;

app.use(express.json());

app.use(express.static("uploads"));

app.use(
  cors({
    methods: ["GET", "POST", "DETELE", "UPDATE", "PUT", "PATCH"],
  })
);

// Gọi routerBook
const { routerBook } = require("./routers/bookRouter");

// Định tuyến router:
app.use(routerBook);

app.listen(Port, () => {
  console.log(`kết nối thành công với http://localhost:${Port}/`);
});

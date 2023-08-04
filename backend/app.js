import express from "express";

const app = express();
const Port = 8000;

app.listen(Port, () => {
  console.log(`kết nối thành công với http://localhost:${Port}/`);
});

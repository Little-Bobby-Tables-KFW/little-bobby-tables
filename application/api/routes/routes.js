const express = require("express");

const books = require("../controllers/bookController");

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.route("/books").get(books.listAll);
router.route("/books").post(books.create);
router.route("/books/:bookId").get(books.findOne);
router.route("/books/:bookId").put(books.update);
router.route("/books/:bookId").delete(books.delete);

module.exports = router;

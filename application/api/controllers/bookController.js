const Book = require("../models/bookModel.js");

exports.listAll = function (req, res) {
  if (req.query.bookname) {
    Book.findOne({ bookname: { $regex: req.query.bookname } }, function (
      err,
      book
    ) {
      if (err) return res.send(err);

      res.json(book);
    });
  } else {
    Book.find({}, function (err, book) {
      if (err) return res.send(err);

      res.json(book);
    });
  }
};

exports.findOne = (req, res) => {
  Book.findById(req.params.bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "Book not found with id " + req.params.bookId,
        });
      }
      res.send(book);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Book with id " + req.params.bookId,
      });
    });
};

exports.findByName = (req, res) => {
  Book.findOne({ bookname: req.params.name })
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "Book not found with id " + req.params.bookId,
        });
      }
      res.send(book);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Book with id " + req.params.bookId,
      });
    });
};

exports.create = (req, res) => {
  var newBook = new Book(req.body);
  console.log("New Book: " + req.body + " created");
  newBook.save(function (err, newBook) {
    if (err) return res.send(err);
    res.json(newBook);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Book content can not be empty",
    });
  }

  // Find book and update it with the request body
  Book.findByIdAndUpdate(req.params.bookId, {
    status: req.body.status,
    rentedBy: req.body.rentedBy,
    rentedDate: req.body.rentedDate,
  })
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "Book not found with id " + req.params.bookId,
        });
      } else {
        console.log("Book: " + book.bookId + ":" + book.bookname + " updated");
      }
      res.send(book);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error updating book with id " + req.params.bookId,
      });
    });
};

exports.delete = (req, res) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    return res.status(400).send({ message: "You haven't set a valid book ID" });
  }

  Book.deleteOne({ _id: bookId })
    .then(() => res.status(200).send({ message: "ok" }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Error deleting Book with id ${bookId}`, error: err })
    );
};

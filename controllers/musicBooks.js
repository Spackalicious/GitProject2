const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { bookSchema } = require('../schemas/validation_schema')

const getBooks = async (req, res) => {
    try {
      const result = await mongodb
        .getDb()
        .db()
        .collection('musicBooks')
        .find();
      result.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists); 
      }); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }    
};

const getIndividualBook = async (req, res) => {
    try {
      const bookId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('musicBooks')
        .find({ _id: bookId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }    
};

const newBook = async (req, res) => {
    const book = {
      title: req.body.title, 
      series: req.body.series, 
      level: req.body.level, 
      publisher: req.body.publisher
    };
    
    try {
      const validated = await bookSchema.validateAsync(book);
      const response = await mongodb
      .getDb()
      .db()
      .collection('musicBooks')
      .insertOne(validated);
      if (response.acknowledged) {
        res.status(201).json(response);
        console.log(`${book.firstName} ${book.lastName} successfully created.`);
      }
    } catch (error) {
      console.log(error);
      res.send(`Missing some data. \n${error}\nPlease try again.`);
    }
};

const updateBook = async (req, res) => {
    try {
      const bookId = new ObjectId(req.params.id);
      const book = {
          title: req.body.title, 
          series: req.body.series, 
          level: req.body.level, 
          publisher: req.body.publisher
        };
      const response = await mongodb
        .getDb()
        .db()
        .collection('musicBooks')
        .replaceOne({ _id: bookId }, book);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
        console.log(`${book.title} Level ${book.level} of ${book.series} successfully updated`);
      } else {
        res.status(500).json(response.error || `An error occured while trying to update ${book.title} Level ${book.level} of ${book.series}.`);
        console.log(`An error occured while trying to update ${book.title} Level ${book.level} of ${book.series}.`);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const removeBook = async (req, res) => {
    try {
      const bookId = new ObjectId(req.params.id);
      const delResponse = await mongodb
        .getDb()
        .db()
        .collection('musicBooks')
        .deleteOne({_id: bookId});
        console.log(delResponse);
        if (delResponse.deletedCount > 0 ) {
          res.status(200).send();
          console.log('Book successfully deleted');
        } else {
          res.status(500).json(delResponse.error || 'An error occured while trying to remove the book.');
        }
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};
  
  module.exports = {     
    getBooks
    , getIndividualBook
    , newBook
    , updateBook
    , removeBook
};








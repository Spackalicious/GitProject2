const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getBooks = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('musicBooks')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
  });    
};

const getIndividualBook = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid music book id to to find a music book');
  }
  const bookId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('musicBooks')
    .find({ _id: bookId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });  
};

const newBook = async (req, res) => {
  const book = {
    title: req.body.title, 
    series: req.body.series, 
    level: req.body.level, 
    publisher: req.body.publisher
  };

  const response = await mongodb.getDb().db().collection('musicBooks').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the music book');
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid music book id to update a music book');
  }
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
};

const removeBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid music book id to delete a music book');
  }
  const bookId = new ObjectId(req.params.id);
  const delResponse = await mongodb
    .getDb()
    .db()
    .collection('musicBooks')
    .remove({_id: bookId}, true);
    console.log(delResponse);
    if (delResponse.deletedCount > 0 ) {
      res.status(200).send();
      console.log('Book successfully deleted');
    } else {
      res.status(500).json(delResponse.error || 'An error occured while trying to delete the book.');
    }  
};
  
module.exports = {     
  getBooks
  , getIndividualBook
  , newBook
  , updateBook
  , removeBook
};








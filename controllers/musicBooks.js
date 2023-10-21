const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('musicBooks')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    // }).then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musicBook id to find a musicBook.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('musicBooks')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    // }).then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};

const createBook = async (req, res) => {
  const musicBook = {
    title: req.body.title,
    series: req.body.series,
    level: req.body.level,
    publisher: req.body.publisher
  };
  const response = await mongodb.getDb().db().collection('musicBooks').insertOne(musicBook);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the musicBook.');
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musicBook id to update a musicBook.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const musicBook = {
    title: req.body.title,
    series: req.body.series,
    level: req.body.level,
    publisher: req.body.publisher
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('musicBooks')
    .replaceOne({ _id: userId }, musicBook);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the musicBook.');
  }
};

const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musicBook id to delete a musicBook.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('musicBooks').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the musicBook.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};

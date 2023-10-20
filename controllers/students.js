const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getStudents = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('students')
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

const getOneStudent = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to find a student.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('students')
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

const createStudent = async (req, res) => {
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    parentName: req.body.parentName,
    email: req.body.email,
    phone: req.body.phone,
    favoriteSong: req.body.favoriteSong,
    birthday: req.body.birthday,
    birthYear: req.body.birthYear
  };
  const response = await mongodb.getDb().db().collection('students').insertOne(student);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the student.');
  }
};

const updateStudent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to update a student.');
  }
  const studentId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    parentName: req.body.parentName,
    email: req.body.email,
    phone: req.body.phone,
    favoriteSong: req.body.favoriteSong,
    birthday: req.body.birthday,
    birthYear: req.body.birthYear
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('students')
    .replaceOne({ _id: studentId }, student);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the student.');
  }
};

const deleteStudent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to delete a student.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('students').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the student.');
  }
};

module.exports = {
  getStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent
};

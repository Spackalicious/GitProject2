const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const { studentSchema } = require('../schemas/validation_schema')

// const getStudents = async (req, res) => {
//     try {
//       const result = await mongodb
//         .getDb()
//         .db()
//         .collection('students')
//         .find();
//       result.toArray().then((lists) => {
//           res.setHeader('Content-Type', 'application/json');
//           res.status(200).json(lists); 
//       }); 
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }    
// };

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
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });   
};

//   const getIndividualStudent = async (req, res) => {
//     try {
//       const studentId = new ObjectId(req.params.id);
//       const result = await mongodb
//         .getDb()
//         .db()
//         .collection('students')
//         .find({ _id: studentId });
//       result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//       });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }    
// };

const getIndividualStudent = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to find a student.');
  }
  const studentId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('students')
    .find({ _id: studentId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  }); 
};

const newStudent = async (req, res) => {
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
      res.status(500).json(response.error || 'Some error occurred while creating the student');
    }
    
    // try {
    //   const validated = await studentSchema.validateAsync(student);
    //   const response = await mongodb
    //   .getDb()
    //   .db()
    //   .collection('students')
    //   .insertOne(validated);
    //   if (response.acknowledged) {
    //     res.status(201).json(response);
    //     console.log(`${student.firstName} ${student.lastName} successfully created.`);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   res.send(`Missing some data. \n${error}\nPlease try again.`);
    // }
};

// const updateStudent = async (req, res) => {
//     try {
//       const studentId = new ObjectId(req.params.id);
//       const student = {
//           firstName: req.body.firstName,     
//           lastName: req.body.lastName, 
//           parentName: req.body.parentName, 
//           email: req.body.email, 
//           phone: req.body.phone, 
//           favoriteSong: req.body.favoriteSong, 
//           birthday: req.body.birthday,
//           birthYear: req.body.birthYear
//         };
//       const response = await mongodb
//         .getDb()
//         .db()
//         .collection('students')
//         .replaceOne({ _id: studentId }, student);
//       console.log(response);
//       if (response.modifiedCount > 0) {
//         res.status(204).send();
//         console.log(`${student.firstName} ${student.lastName} successfully updated`);
//       } else {
//         res.status(500).json(response.error || `An error occured while trying to update ${student.firstName} ${student.lastName}.`);
//         console.log(`An error occured while trying to update ${student.firstName} ${student.lastName}.`);
//       }
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
// };

const updateStudent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to update a student');
  }
  const studentId = new ObjectId(req.params.id);
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
    console.log(`${student.firstName} ${student.lastName} successfully updated`);
  } else {
    res.status(500).json(response.error || `An error occured while trying to update ${student.firstName} ${student.lastName}.`);
    console.log(`An error occured while trying to update ${student.firstName} ${student.lastName}.`);
  }
};

// const removeStudent = async (req, res) => {
//     try {
//       const studentId = new ObjectId(req.params.id);
//       const delResponse = await mongodb
//         .getDb()
//         .db()
//         .collection('students')
//         .deleteOne({_id: studentId});
//         console.log(delResponse);
//         if (delResponse.deletedCount > 0 ) {
//           res.status(200).send();
//           console.log('Contact successfully deleted');
//         } else {
//           res.status(500).json(delResponse.error || 'An error occured while trying to remove the student.');
//         }
//       } catch (err) {
//         res.status(500).json({ message: err.message });
//       }
//   };

const removeStudent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to delete a student.');
  }
  const studentId = new ObjectId(req.params.id);
  const delResponse = await mongodb
    .getDb()
    .db()
    .collection('students')
    .remove({_id: studentId}, true);
  console.log(delResponse);
  if (delResponse.deletedCount > 0 ) {
    res.status(200).send();
    console.log('Contact successfully deleted');
  } else {
    res.status(500).json(delResponse.error || 'An error occured while trying to remove the student.');
  }
};
  
  module.exports = {     
      getStudents
      , getIndividualStudent
      , newStudent
      , updateStudent
      , removeStudent
  };








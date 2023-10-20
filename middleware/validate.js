const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        parentName: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        favoriteSong: 'required|string',
        birthday: 'string',
        birthYear: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false, 
                message: 'Validation failed',
                data: err 
            });
        } else {
            next();
        }
    });
};

const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        series: 'required|string',
        level: 'required|string',
        publisher: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false, 
                message: 'Validation failed',
                data: err 
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveStudent, saveBook
};
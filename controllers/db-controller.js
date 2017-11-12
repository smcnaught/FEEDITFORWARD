const db = require("../models");

// Defining methods for the booksController
module.exports = {
  createUser: (req, res) => {
    db.User
      .create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  findUserById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(user => {
        if (user) {
          res.json(user);
        }
        else {
          res.status(404).send(`User with id=${req.params.id} not found.`);
        }
      })
      .catch(err => res.status(404).json(err));
  },
  findAllUsers: function (req, res) {
    db.User
      .findAll({
        order: [
          ['name', 'DESC']
        ]
      })
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  }
};

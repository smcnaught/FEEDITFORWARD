const db = require("../models");

const findOrCreateTags = (tagNames, results, callback) => {
  if (tagNames && tagNames.length > 0) {
    let tagName = tagNames[0];
    let remainingTagNames = tagNames.slice(1);
    db.Tag.findOrCreate(
      {
        where: {
          name: tagName
        },
        defaults: {
          name: tagName
        }
      })
      .then(([tag,created]) => {
        results.push(tag);
        findOrCreateTags(remainingTagNames, results,callback);
      })
      .catch(err => console.log(JSON.stringify(err, null, 2)));
  }
  else {
    callback(results);
  }
};

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
          ['organization', 'ASC']
        ]
      })
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  createDonation: (req, res) => {
    const tagNames = req.body.tags;

    findOrCreateTags(tagNames, [], tags => {
      db.Donation
        .create(req.body)
        .then(donation => {
          donation.setTags(tags);
          donation.save().then(
            donation => res.json(donation));
        })
        .catch(err => res.status(500).json(err));
    });
  },
  findDonationById: function (req, res) {
    db.Donation
      .findById(req.params.id)
      .then(donation => {
        if (donation) {
          res.json(donation);
        }
        else {
          res.status(404).send(`Donation with id=${req.params.id} not found.`);
        }
      })
      .catch(err => res.status(404).json(err));
  },
  findAllDonations: function (req, res) {
    db.Donation
      .findAll({
        order: [
          ['productName', 'ASC']
        ],
        include: [
          db.Tag
        ]
      })
      .then(donations => res.json(donations))
      .catch(err => res.status(500).json(err));
  }
};

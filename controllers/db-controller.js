const db = require("../models");

const findOrCreateTags = ([tagName, ...remainingTagNames], results, callback) => {
  if (tagName) {
    db.Tag.findOrCreate(
      {
        where: {
          name: tagName
        },
        defaults: {
          name: tagName
        }
      })
      .then(([tag, created]) => {
        results.push(tag);
        findOrCreateTags(remainingTagNames, results, callback);
      })
      .catch(err => console.log(JSON.stringify(err, null, 2)));
  }
  else {
    callback(results);
  }
};

const dbDonationToAPI = donation => {

  const tags = donation.Tags.map(tag => tag.name);
  const result = Object.assign(
    {
      tags: tags,
    },
    donation.dataValues
  );
  delete result.Tags;
  return result;
};

const dbDonationsToAPI = donations => donations.map(dbDonationToAPI);

// Defining methods for the booksController
module.exports = {
  createUser: (req, res) => {
    db.User
      .create(req.body)
      .then(user => {
        user.reload().then(
          reloaded => {
            console.log(reloaded.dataValues.id);
            res.json(reloaded.dataValues);
          }
        );
      })
      .catch(err => res.status(500).json(err));
  },
  findUserById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(user => {
        if (user) {
          res.json(user.dataValues);
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
          if (tags && tags.length > 0) {
            donation.setTags(tags);
          }
          donation.save().then(
            donation => {
              // For some reason the tags are not available at this point.
              // It may have something to do with the need for an include query to retrieve
              // them.
              donation.reload({include: [db.Tag]}).then(
                reloadedDonation => {
                  const result = Object.assign(
                    {tags: tagNames},
                    reloadedDonation.dataValues);
                  res.json(result);
                });
            }
          );
        })
        .catch(err => res.status(500).json(err));
    });
  },
  findDonationById: function (req, res) {
    db.Donation
      .findById(req.params.id,
        {
          include: [
            db.Tag
          ]
        })
      .then(donation => {
        if (donation) {
          res.json(dbDonationToAPI(donation));
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
      .then(donations => res.json(dbDonationsToAPI(donations)))
      .catch(err => res.status(500).json(err));
  },
  reserveItem: function (req, res){
    console.log("--reserveItem", req.params.userId);
    let values = {

      receiverId : req.params.userId,
      status : "reserved"
    }
    db.Donation
      .findById(req.params.itemId)
      .then(item =>{ 
        item.update(values)
        .then(result => res.json(result))
        .catch(error => res.json(error));
      })

      .catch(error => res.json(error))

  },
  unreserveItem: function (req, res) {
    let values = {
      receiverId : null,
      status : "available"
    }
    db.Donation
      .findById(req.params.itemId)
      .then(item => {
        item.update(values)
          .then(result => res.json(result))
          .catch(error => res.json(error));
      });

  },
  login: (req,res) => {
    db.User.findOne({where: {email: req.params.email}}).then( resp => {
      if (result.password === resp.dataValues.password) {
        const result = Object.assign({}, resp.dataValues);
        delete result.password;
        res.json(result);
      }
      else {
        res.status(401).send("Incorrect Username or Password");
      }
      })
      .catch( err => {
        console.log("err: " + err);
        res.status(404).send("user not found!");
    })
  }
};

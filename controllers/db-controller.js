const db = require("../models");
const search = require("../lib/search.js");
const map = require("../lib/map.js");

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
                  db.User.findById(reloadedDonation.donorId).then((donor) => {
                    const donorAddress = [
                      donor.addressStreet + ",",
                      donor.addressCity + ",",
                      donor.addressState,
                      donor.addressZip
                    ].join(" ");
                    const result = Object.assign(
                      {tags: tagNames},
                      reloadedDonation.dataValues);

                  map.getGeoPoint(
                    donorAddress,
                    (err, location) => {
                      if (err) {
                        res.json(result);
                      }
                      else {
                        let tags = reloadedDonation.Tags.map(tag => tag.name);

                        const indexableDonation = {
                          "id": reloadedDonation.id,
                          "product_name": reloadedDonation.productName,
                          "product_quantity": reloadedDonation.productQuantity,
                          "product_unit": reloadedDonation.productUnit,
                          "donor_id": reloadedDonation.donorId,
                          "receiver_id": reloadedDonation.receiverId,
                          "expiration": reloadedDonation.expiration,
                          "comments": reloadedDonation.comments,
                          "status": reloadedDonation.status,
                          "address_street": donor.addressStreet,
                          "address_city": donor.addressCity,
                          "address_state": donor.addressState,
                          "address_zip": donor.addressZip,
                          "organization": donor.organization,
                          "tags": tagNames,
                          "location": {
                            "lat": location.lat,
                            "lon": location.lng
                          }
                        };
                        console.log("indexableDonation: " + JSON.stringify(indexableDonation));

                        search.indexDonation(indexableDonation, (err, indexRes) => {
                          if (err) {
                            console.log(err);
                          }
                          else {
                            console.log(indexRes);
                          }
                          res.json(result);
                        });
                      }
                    });
                  });
                }
              );
            })
            .catch(err => res.status(500).json(err));
        });
    })
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
  }
};

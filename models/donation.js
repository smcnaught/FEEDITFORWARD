module.exports = function (sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
    productName: {
      type: DataTypes.STRING
    },
    productQuantity: {
      type: DataTypes.INTEGER
    },
    productUnit: {
      type: DataTypes.STRING
    },
    donatorId: {
      type: DataTypes.INTEGER
    },
    receiverId: {
      type: DataTypes.INTEGER
    },
    expiration: {
      type: DataTypes.DATE
    },
    comments: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    }
  });
  return Donation;
};

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
    donorId: {
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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
  return Donation;
};

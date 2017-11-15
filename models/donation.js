module.exports = function (sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
    product_name: {
      type: DataTypes.STRING
    },
    product_quantity: {
      type: DataTypes.INTEGER
    },
    product_unit: {
      type: DataTypes.STRING
    },
    donator_id: {
      type: DataTypes.INTEGER
    },
    receiver_id: {
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

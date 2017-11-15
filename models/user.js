module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    organization: {
      type: DataTypes.STRING
    },
    addressStreet: {
      type: DataTypes.STRING
      },
    addressCity: {
      type: DataTypes.STRING
      },
    addressState: {
      type: DataTypes.STRING
    },
    addressZip: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [
      // Create a unique index on name
      {
        unique: true,
        fields: ['email']
      }]
  });
  return User;
};

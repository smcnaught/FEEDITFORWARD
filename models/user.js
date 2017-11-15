module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING
    },
    address_street: {
      type: DataTypes.STRING
      },
    address_city: {
      type: DataTypes.STRING
      },
    address_state: {
      type: DataTypes.STRING
    },
    address_zip: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    email: {
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

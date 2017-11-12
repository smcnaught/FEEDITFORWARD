module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
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

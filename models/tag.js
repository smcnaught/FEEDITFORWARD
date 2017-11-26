module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: DataTypes.STRING
    }
  });
  return Tag;
};

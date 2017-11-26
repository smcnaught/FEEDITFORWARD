module.exports = (sequelize, DataTypes) => {
  const ItemTag = sequelize.define('ItemTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_id: {
      type: DataTypes.INTEGER,
      unique: 'item_tag_taggable'
    },
    taggable: {
      type: DataTypes.STRING,
      unique: 'item_tag_taggable'
    },
    taggable_id: {
      type: DataTypes.INTEGER,
      unique: 'item_tag_taggable',
      references: null
    }
  });
  return ItemTag;
}
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define("Donation", {
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
  Donation.associate = function(models) {
    Donation.belongsToMany(models.Tag, {
      through: {
        model: models.ItemTag,
        unique: false,
        scope: {
          taggable: 'donation'
        }
      },
      foreignKey: 'taggable_id',
      constraints: false
    });
    models.Tag.belongsToMany(Donation, {
      through: {
        model: models.ItemTag,
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
    });
  };

  return Donation;
};

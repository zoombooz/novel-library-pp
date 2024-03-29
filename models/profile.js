'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasOne(models.User, {
        foreignKey : 'ProfileId'
      })
    }
  }
  Profile.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name tidak boleh kosong"
        },
        notEmpty : {
          msg : "Name tidak boleh kosong"
        },
        minLength(value) {
          if (value.length < 5) {
            throw new Error('Name minimal berjumlah 5 karakter');
          }
        }
      }
    },
    phone: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Phone tidak boleh kosong"
        },
        notEmpty : {
          msg : "Phone tidak boleh kosong"
        },
        minLength(value) {
          if (value.length < 5) {
            throw new Error('Phone minimal berjumlah 8 karakter');
          }
        }
      }
    },
    gender: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Gender tidak boleh kosong"
        },
        notEmpty : {
          msg : "Gender tidak boleh kosong"
        }
      }
    },
    dateOfBirth: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Date of Birth tidak boleh kosong"
        },
        notEmpty : {
          msg : "Date of Birth tidak boleh kosong"
        },
        isBefore: {
          args : "2012-01-01",
          msg : "Anda harus berusia minimal 12 tahun untuk masuk"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
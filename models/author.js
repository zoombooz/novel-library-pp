'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get writtenBy(){
      return `Written by ${this.name}`
    }

    static associate(models) {
      // define association here'
      Author.hasMany(models.Book, {
        foreignKey : 'AuthorId'
      })
    }
  }
  Author.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name tidak boleh kosong"
        },
        notEmpty : {
          msg : "Name tidak boleh kosong"
        },minLength(value) {
          if (value.length < 5) {
            throw new Error('Name minimal berjumlah 5 karakter');
          }
        }
      }
    },
    age: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Age tidak boleh kosong"
        },
        notEmpty : {
          msg : "Age tidak boleh kosong"
        },minLength(value) {
          if (parseInt(value) < 4) {
            throw new Error('Age minimal berusia 4 tahun');
          }
        }
      }
    },
    gender: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Age tidak boleh kosong"
        },
        notEmpty : {
          msg : "Age tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};
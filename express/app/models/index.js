'use struct';

const Sequelize = require('sequelize');
const SequelizeVault = require('sequelize-vault');

// sequelize-vault
SequelizeVault.Vault.app = 'express';
SequelizeVault.Vault.address = process.env.VAULT_ADDR;

// sequelize
const sequelize = new Sequelize({
  database: 'test',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  operatorsAliases: false,
});

const schema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email_encrypted: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
};

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  email_encrypted: Sequelize.STRING,
  email: Sequelize.VIRTUAL,
}, {
  tableName: 'users',
  underscored: true,
});

SequelizeVault.default(User);

var db = {};
db.user = User;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.schema = schema;

module.exports = db;

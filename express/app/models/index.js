'use struct';

const Sequelize = require('sequelize');
const SequelizeVault = require('sequelize-vault');
const fs = require('fs');

// sequelize-vault
SequelizeVault.Vault.app = 'express';
const token = fs.readFileSync('/vault-token', 'utf-8').trim();
if (token !== '') {
  SequelizeVault.Vault.enabled = true;
  SequelizeVault.Vault.token = token;
  SequelizeVault.Vault.address = process.env.VAULT_ADDR;
}

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
  username: Sequelize.STRING,
  email_encrypted: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
};

const User = sequelize.define('user', {
  username: Sequelize.STRING,
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

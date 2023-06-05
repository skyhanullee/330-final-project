const request = require("supertest");
var jwt = require('jsonwebtoken');

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');
const { afterEach } = require("node:test");

describe("/login", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const user0 = {
    email: 'user0@mail.com',
    password: '123password'
  };
  const user1 = {
    email: 'user1@mail.com',
    password: '456password'
  }
})

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

  describe("before signup", () => {
    describe("POST /", () => {
      it("should return 401", async () => {
        const res = await request(server).post("/login").send(user0);
        expect(res.statusCode).toEqual(401);
      })
    })
  })
})
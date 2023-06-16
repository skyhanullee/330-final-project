const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

// const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Job = require('../models/job');

describe.only("/jobs", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(() => {
    testUtils.clearDB;
    consolee.log('deleted.')
  });

  const job0 = {
    "jobId": "123",
    "title": "[TEST] Senior Javascript Engineer",
    "description": "A legal automation company with the first employees of Amazon is looking for a Javascript ringer This Jobot Job is hosted by: Brian Moriarty Are you a fit? Easy Apply now by clicking the \"Apply Now\" button and sending us your resume. Salary: $150,000 - $190,000 per year A bit about us: A series C funded legal document automation company is looking to hire a senior Javascript/Typescript engineer. As a company, their combination of cutting edge technology, data analytics, and a world renown team …",
    "location": "Times Square, King County",
    "company": "Jobot",
    "salary": 97159.38,
    "createdAt": "2023-02-09T17:58:35Z",
    "latitude": 47.606389,
    "longitude": -122.330833,
    "url": "https://www.adzuna.com/land/ad/3915792488?se=3ts136ix7RG2WelpRG5a-w&utm_medium=api&utm_source=15ced00f&v=648F52509273F440670C8A66026A3FC40FDC8ECF",
    "isAdzuna": false,
  };
  const job1 = {
    "jobId": "456",
    "title": "[TEST] QA Analyst",
    "description": "Pay Scale $67,670 to $98,799 Savers Benefits Geographic & job eligibility rules may apply Work Address: Healthcare Plans Comprehensive coverage (medical/dental/vision) at a reasonable cost Specialized health programs - Improve wellness (quit smoking, counseling, diabetes management, chronic joint pain) Paid Time Off Sick Pay - Actual amount based on position and hours worked - Increases with length of service - 40 to 80 hours annually Vacation Pay - Actual amount based on position and hours wor…",
    "location": "Bellevue, King County",
    "company": "Savers | Value Village",
    "salary": 83988.98,
    "createdAt": "2023-06-09T12:06:33Z",
    "latitude": 47.61457,
    "longitude": -122.168358,
    "url": "https://www.adzuna.com/details/4143831936?utm_medium=api&utm_source=15ced00f",
    "isAdzuna": true,
  };

  describe('Before login', () => {
    describe('POST /', () => {
      it('should send 401 without a token', async () => {
        const res = await request(server).post("/jobs").send(job0);
        expect(res.statusCode).toEqual(401);
      });
      it('should send 401 with a bad token', async () => {
        const res = await request(server)
          .post("/jobs")
          .set('Authorization', 'Bearer BAD')
          .send(job0);
        expect(res.statusCode).toEqual(401);
      });
    });
    describe('GET /', () => {
      it('should send 200 to all users', async () => {
        const res = await request(server).get("/jobs");
        expect(res.statusCode).toEqual(200);
      });
    });
    describe('GET /:id', () => {
      it('should send 401 without a token', async () => {
        const res = await request(server).get("/jobs/123").send(job0);
        expect(res.statusCode).toEqual(401);
      });
      it('should send 401 with a bad token', async () => {
        const res = await request(server)
          .get("/jobs/456")
          .set('Authorization', 'Bearer BAD')
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
  });

  // describe.each([job0, job1])("POST / job %#", (job) => {
  //   it('should send 200 and store job', async () => {
  //     const res = await request(server)
  //       .post("/jobs")
  //       .send(job);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toMatchObject(job)
  //     const savedJob = await Job.findOne({ _id: res.body._id }).lean();
  //     expect(savedJob).toMatchObject(job);
  //   });
  // });
  describe('after login', () => {
    const user0 = {
      email: 'user0@mail.com',
      password: '123password'
    };
    const user1 = {
      email: 'user1@mail.com',
      password: '456password'
    }
    let token0;
    let adminToken;
    beforeEach(async () => {
      await request(server).post("/login/signup").send(user0);
      const res0 = await request(server).post("/login").send(user0);
      token0 = res0.body.token;
      await request(server).post("/login/signup").send(user1);
      await User.updateOne({ email: user1.email }, { $push: { roles: 'admin' } });
      const res1 = await request(server).post("/login").send(user1);
      adminToken = res1.body.token;
    });
    describe.each([job0, job1])("POST / job %#", (job) => {
      it('should send 200 to all users and store job', async () => {
        const res = await request(server)
          .post("/jobs")
          .set('Authorization', 'Bearer ' + token0)
          .send(job);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({ ...job, jobId: res.body.jobId })
        const savedJob = await Job.findOne({ _id: res.body._id }).lean();
        expect(savedJob).toMatchObject({ ...job, jobId: res.body.jobId });
      });
    });
    describe.each([job0, job1])("GET /:id job %#", (job) => {
      let originalJob;
      beforeEach(async () => {
        const res = await request(server)
          .post("/jobs")
          .set('Authorization', 'Bearer ' + adminToken)
          .send(job);
        originalJob = res.body;
      });
      it('should send 200 to normal user and return job', async () => {
        const res = await request(server)
          .get("/jobs/" + originalJob._id)
          .set('Authorization', 'Bearer ' + token0)
          .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(originalJob);
      });
      it('should send 200 to admin user and return job', async () => {
        const res = await request(server)
          .get("/jobs/" + originalJob._id)
          .set('Authorization', 'Bearer ' + adminToken)
          .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(originalJob);
      });
    });

    // it('should send 200 to admin user and return all jobs', async () => {
    //   const res = await request(server)
    //     .get("/jobs/")
    //     .set('Authorization', 'Bearer ' + adminToken)
    //     .send();
    //   expect(res.statusCode).toEqual(200);
    //   expect(res.body).toMatchObject(jobs);
    // });
  });
  describe.each([job0, job1])("PUT / job %#", (job) => {
    let originalJob;
    beforeEach(async () => {
      const res = await request(server)
        .post("/jobs")
        .set('Authorization', 'Bearer ' + adminToken)
        .send(job);
      originalJob = res.body;
    });
    it('should send 403 to normal user and not update job', async () => {
      const res = await request(server)
        .put("/jobs/" + originalJob._id)
        .set('Authorization', 'Bearer ' + token0)
        .send(job);
      expect(res.statusCode).toEqual(403);
      const newJob = await Job.findById(originalJob._id).lean();
      newJob._id = newJob._id.toString();
      expect(newJob).toMatchObject(originalJob);
    });
    it('should send 200 to admin user and update job', async () => {
      const res = await request(server)
        .put("/jobs/" + originalJob._id)
        .set('Authorization', 'Bearer ' + adminToken)
        .send(job);
      expect(res.statusCode).toEqual(200);
      const newJob = await Job.findById(originalJob._id).lean();
      newJob._id = newJob._id.toString();
      expect(newJob).toMatchObject(originalJob);
    });
  });

});

});

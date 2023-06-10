const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');
const Job = require('../models/job');

describe("/jobs", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const job0 = {
    "jobId": "3915792488",
    "title": "[AFTER MONGO DATABASE CHANGE] Senior Javascript Engineer",
    "description": "A legal automation company with the first employees of Amazon is looking for a Javascript ringer This Jobot Job is hosted by: Brian Moriarty Are you a fit? Easy Apply now by clicking the \"Apply Now\" button and sending us your resume. Salary: $150,000 - $190,000 per year A bit about us: A series C funded legal document automation company is looking to hire a senior Javascript/Typescript engineer. As a company, their combination of cutting edge technology, data analytics, and a world renown team …",
    "location": "Times Square, King County",
    "company": "Jobot",
    "salary": 97159.38,
    "createdAt": "2023-02-09T17:58:35Z",
    "latitude": 47.606389,
    "longitude": -122.330833,
    "url": "https://www.adzuna.com/land/ad/3915792488?se=3ts136ix7RG2WelpRG5a-w&utm_medium=api&utm_source=15ced00f&v=648F52509273F440670C8A66026A3FC40FDC8ECF"
  };
  const job1 = {
    "jobId": "4143831936",
    "title": "[AFTER MONGO DATABASE CHANGE] QA Analyst",
    "description": "Pay Scale $67,670 to $98,799 Savers Benefits Geographic & job eligibility rules may apply Work Address: Healthcare Plans Comprehensive coverage (medical/dental/vision) at a reasonable cost Specialized health programs - Improve wellness (quit smoking, counseling, diabetes management, chronic joint pain) Paid Time Off Sick Pay - Actual amount based on position and hours worked - Increases with length of service - 40 to 80 hours annually Vacation Pay - Actual amount based on position and hours wor…",
    "location": "Bellevue, King County",
    "company": "Savers | Value Village",
    "salary": 83988.98,
    "createdAt": "2023-06-09T12:06:33Z",
    "latitude": 47.61457,
    "longitude": -122.168358,
    "url": "https://www.adzuna.com/details/4143831936?utm_medium=api&utm_source=15ced00f"
  };

  describe.each([job0, job1])("POST / job %#", (job) => {
    it('should send 200 and store job', async () => {
      const res = await request(server)
        .post("/jobs")
        .send(job);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject(job)
      const savedJob = await Job.findOne({ _id: res.body._id }).lean();
      expect(savedJob).toMatchObject(job);
    });
  });

});

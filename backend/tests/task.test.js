const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Task = require("../models/task");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Task API", () => {
  it("should create a new task", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "This is a test task",
      status: "To Do",
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Task");
  });

  it("should get all tasks", async () => {
    await Task.create({ title: "Test Task 1", status: "To Do" });
    await Task.create({ title: "Test Task 2", status: "In Progress" });

    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should update a task", async () => {
    const task = await Task.create({ title: "Test Task", status: "To Do" });
    const response = await request(app)
      .patch(`/api/tasks/${task._id}`)
      .send({ status: "Done" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Done");
  });

  it("should delete a task", async () => {
    const task = await Task.create({ title: "Test Task", status: "To Do" });
    const response = await request(app).delete(`/api/tasks/${task._id}`);
    expect(response.status).toBe(200);
    const foundTask = await Task.findById(task._id);
    expect(foundTask).toBeNull();
  });
});

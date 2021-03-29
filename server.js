// const queue = require("@lib/queue")
const express = require("express");
const { Worker, Queue } = require("bullmq");

const queue = new Queue("MyQueue");

const app = express();
app.use(express.json());

app.post("/api/job", async (req, res) => {
  const { jobName, data } = req.body;
  await queue.add(jobName, data);
  return res.json("DONE")
});

const worker = new Worker("MyQueue", async (job) => {
  console.log(job.data);
});

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
  queue.clean();
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

app.listen(5000, () => {
  console.log(`Running on Port 5000`);
});

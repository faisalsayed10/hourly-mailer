import express from "express";
import { queue } from "./lib/queue";
import { Worker } from "bullmq";

const app = express();

const worker = new Worker("EmailQueue", async (job) => {
  console.log(job.data);
  // const jobs = await queue.getJobs(["wait", "completed"]);
  // console.log(jobs)
});

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
  queue.clean(0, 0, "completed");
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

app.listen(5000, () => {
  console.log(`Running on Port 5000`);
});

import express from "express";
import { queue } from "./lib/queue";
import { Worker } from "bullmq";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
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

app.listen(5000, async () => {
  await nextApp.prepare();
  console.log(`Running on Port 5000`);
});

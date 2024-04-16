import cron from "node-cron";

export const cronJobs = () => {
  //               ┌──────────────── second (optional)
  //               │ ┌────────────── minute
  //               │ │ ┌──────────── hour
  //               │ │ │   ┌──────── day of month
  //               │ │ │   │ ┌────── month
  //               │ │ │   │ │ ┌──── day of week
  //               │ │ │   │ │ │
  //               │ │ │   │ │ │
  //               * * *   * * *
  process.env.PROD_SERVER === "true" &&
    cron.schedule("0 0 */1 * * *", async () => {
      console.log("running a task every hour");
    });
};

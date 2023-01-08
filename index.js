const { spawn } = require("child-process");
const path = require("path");

const cron = require("node-cron");

const DB_NAME = `db`;
const ARCHIVE_PATH = path.join(__dirname, "backup", `${DB_NAME}.gzip`);

// run cron job “At every mid-night.”

cron.schedule("0 0 * * * *", () => backUpMongodb());

// db backup function
const backUpMongodb = () => {
  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    `gzip`,
  ]);
  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });
  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });
  child.stdout.on("error", (error) => {
    console.log("error:\n", error);
  });
  child.on("exit", (code, signal) => {
    if (code) console.log("process exit with code ", code);
    else if (signal) console.log("process killed with signal ", signal);
    else console.log("backup is successful ✅");
  });
};

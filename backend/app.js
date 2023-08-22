const express = require("express");
const redis = require("redis");
const redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
  enable_offline_queue: false,
});
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));

redisClient.connect();

app.get("/", async (req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
  }
  try {
    const response = await redisClient
      .multi()
      .get("count")
      .incr("count")
      .exec();
    const newValue = response[1];
    res.send({ count: newValue });
  } catch (error) {
    console.error("Error adding to counter:", error);
    res.status(500).send("Error adding to counter");
  }
});

app.get("/api/visitorCount", async (req, res) => {
  const value = await redisClient.get("count");
  res.send({ count: value });
});

app.listen(3000, () => console.log("Active"));

process.on("SIGINT", () => {
  redisClient.quit(() => {
    process.exit(0);
  });
});

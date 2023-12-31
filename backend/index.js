const express = require("express");
const redis = require("redis");
const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    port: 6379,
    host: "redis",
    enable_offline_queue: false,
  },
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

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

app.get("/", async (req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
  }
  try {
    await redisClient
      .multi()
      .get("count")
      .incr("count")
      .exec();
  const value = await getValueFromRedis("count");
  res.send({ count: value });
  } catch (error) {
    console.error("Error adding to counter:", error);
    res.status(500).send("Error adding to counter");
  }
});

app.get("/api/visitorCount", async (req, res) => {
  const value = await getValueFromRedis("count");
  res.send({ count: value });
});

function getValueFromRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

const server = app.listen(3001, () => console.log("Active"));

process.on("SIGINT", () => {
  redisClient.quit(() => {
    process.exit(0);
  });
});

module.exports = server;

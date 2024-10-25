const { MongoClient } = require("mongodb");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require("fs");
const { string, number } = require("yargs");

const argv = yargs(hideBin(process.argv))
  .option("database", {
    alias: "db",
    type: string,
    description: "Database name",
    demandOption: true,
  })
  .option("num_requests", {
    alias: "nr",
    type: number,
    description: "The minimum number of requests",
    default: 1,
  }).option("date", {
    alias: "d",
    type: string,
    description: "The date from where to start querying",
    default: "2024-04-01",
  })
  .argv;

const { database, num_requests, date } = argv;
console.log(`You provided: ${database}, ${num_requests}, ${date}`);

const uri = "mongodb://root:root@localhost:27017/";


async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(database);

    const cursor = db.collection("Client").aggregate([
      {
        $lookup: {
          from: "Request",
          localField: "requests.$id",
          foreignField: "_id",
          as: "requestDetails",
        },
      },
      {
        $addFields: {
          numberOfRequests: { $size: "$requestDetails" },
        },
      },
      {
        $match: {
          numberOfRequests: { $gt: num_requests },
          first_contact: { $gt: new Date(`${date}T00:00:00Z`) },
        },
      },
      {
        $project: {
          ip: 1,
        },
      },
      {
        $limit: 10000,
      },
    ]);

    const writeStream = fs.createWriteStream(`../results/more_than_${num_requests}_${database}.txt`);

    ips = new Set();
    for await (const doc of cursor) {
      ips.add(doc.ip);
    }

    ips.forEach(ip => {
      writeStream.write(`${ip}\n`);
    });

    writeStream.end();
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

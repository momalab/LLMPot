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
  .option("date", {
    alias: "d",
    type: string,
    description: "The date from where to start querying",
    default: "2024-04-01",
  }).argv;

const { database, date } = argv;
console.log("You provided: ");

Object.entries(argv).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

const uri = "mongodb://root:root@localhost:27017/";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(database);

    const distinctIps = await db.collection("Client").distinct("ip", {
      first_contact: { $gt: new Date(`${date}T00:00:00Z`) },
    });

    ips = new Set();
    injections = new Array();
    for await (const text of distinctIps) {
      if (text.includes(",")) {
        ip = text.split(",")[1];
        injection = text.split(",")[0];
        ips.add(ip);
        injections.push(`${ip}: ${injection}`);
      } else {
        ips.add(text);
      }
    }

    const distinctIpsStream = fs.createWriteStream(`../results/distinct_ips_${database}.txt`);
    const injectionStream = fs.createWriteStream(`../results/injection_${database}.txt`);

    injectionStream.write(`${ip}: ${injection}\n`);
    for await (const ip of ips) {
      distinctIpsStream.write(`${ip}\n`);
    }

    for await (const injection of injections) {
      injectionStream.write(`${injection}\n`);
    }

    distinctIpsStream.end();
    injectionStream.end();
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

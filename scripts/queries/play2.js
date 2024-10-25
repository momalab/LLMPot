const { MongoClient } = require("mongodb");

const uri = "mongodb://root:root@localhost:27017/";

database = "web";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(database);
    // let login_attempts = await db.collection("Request").find({
    //   "request": { $ne: {} }, $and: [{ "request.password": { $ne: {} } }]
    // }).toArray();

    // let count = login_attempts.length;
    // console.log(`Total number of matching login attempts: ${count}`);


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
        $requestDetails.forEach(element => {
          $match: {
            "element.request": {$ne: {}}
          }
        });
        ,
      },
      {
        $project: {
          ip: 1,
          requestDetails: "$requestDetails",
        },
      },
      {
        $limit: 10000,
      },
    ]);

    // count = cursor.length;
    // console.log(`Total number of matching login attempts: ${count}`);


    for await (const attempt of cursor) {
      console.log(attempt);
    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);

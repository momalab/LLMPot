db.Client.aggregate([
    {
        $lookup: {
            from: "Request",
            localField: "requests.$id",
            foreignField: "_id",
            as: "requestDetails"
        }
    },
    {
        $addFields: {
            numberOfRequests: { $size: "$requestDetails" }
        }
    },
    {
        $match: {
            numberOfRequests: {$gt: 1},
            first_contact: { $gt: new Date("2024-05-01T00:00:00Z") }
        }
    },
    {
        $project: {
            id: 1,
            ip: 1,
            number_of_requests: "$numberOfRequests",
            // requestDetails: "$requestDetails",
            first_contact: 1
        }
    },
    {
        $limit: 10000
    }
]);


// db.Client.find({first_contact: { $gt: new Date("2024-08-01T00:00:00Z") }});

// db.Request.count()
db.Client.find()

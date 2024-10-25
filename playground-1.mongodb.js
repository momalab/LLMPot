db.Client.aggregate([
    {
        $lookup: {
            from: "Request",
            localField: "requests.$id",
            foreignField: "_id",
            as: "requestDetails",
            pipeline: [
                {
                    $project: {
                        request_time: 1,
                        ip: 1,
                        _id: 0
                    }
                }
            ]
        }
    },
    {
        $addFields: {
            numberOfRequests: { $size: "$requestDetails" }
        }
    },
    {
        $match: {
            numberOfRequests: { $gt: 4 },
            first_contact: { $gt: new Date("2024-05-01T00:00:00Z") }
        }
    },
    {
        $project: {
            id: 1,
            ip: 1,
            number_of_requests: "$numberOfRequests",
            first_contact: 1
        }
    },
    {
        $limit: 10000
    },
    {
        $group: {
            _id: null,
            documents: { $push: "$$ROOT" },
            totalCount: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            documents: 1,
            totalCount: 1
        }
    }
]);


// db.Client.find({first_contact: { $gt: new Date("2024-08-01T00:00:00Z") }});

// db.Request.count()
db.Client.find()

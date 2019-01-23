// load data
// linking routes to a series of "data" sources
var friends = require("../data/friends");

// routing
module.exports = function (app) {

    // api get requests
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // api post requests
    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req, res) {
        var newUser = req.body;

        // check if user and photo are already in array. if they don't, change counter to false and add them to friends array.
        var exists = true;
        for (var i = 0; i < friends.length; i++) {
            if (newUser.name === friends[i].name && newUser.photo === friends[i].photo) {
                exists = true;
                break;
            } else {
                exists = false;
            }
        }
        if (!exists) {
            friends.push(newUser);
        }

        // Add up the differences to calculate the totalDiff
        // initialize and declare a variable for the lowest num to compare against and overwrite when there is a new low num
        var lowestDiff = 100;
        var matchName = '';
        var matchPhoto = '';

        // - 1 to exclude the newUser push
        for (var i = 0; i < friends.length - 1; i++) {
            // compare the difference between current user's scores against those from other users, question by question
            // go through all users
            var totalDiff = 0;
            for (var j = 0; j < 10; j++) {
                totalDiff += Math.abs(friends[i].scores[j] - newUser.scores[j]);
            }

            // The closest match will be the user with the least amount of difference.
            // compare scores
            if (totalDiff < lowestDiff) {
                lowestDiff = totalDiff;

                // set lowest match name and photo
                matchName = friends[i].name;
                matchPhoto = friends[i].photo;
            }
        }

        // sends data to api/friends as matchName and matchPhoto
        res.json({
            status: 'OK',
            matchName: matchName,
            matchPhoto: matchPhoto
        });
    });
};
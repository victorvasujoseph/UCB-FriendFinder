var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    var newUser = req.body;
    var exists = true;
    for (var i = 0; i < friends.length; i++) {
      if (
        newUser.name === friends[i].name &&
        newUser.photo === friends[i].photo
      ) {
        exists = true;
        break;
      } else {
        exists = false;
      }
    }
    if (!exists) {
      friends.push(newUser);
    }

    var lowestDiff = 100;
    var matchName = "";
    var matchPhoto = "";
    for (var i = 0; i < friends.length - 1; i++) {
      var totalDiff = 0;
      for (var j = 0; j < 10; j++) {
        totalDiff += Math.abs(friends[i].scores[j] - newUser.scores[j]);
      }
      if (totalDiff < lowestDiff) {
        lowestDiff = totalDiff;
        matchName = friends[i].name;
        matchPhoto = friends[i].photo;
      }
    }
    res.json({
      status: "OK",
      matchName: matchName,
      matchPhoto: matchPhoto
    });
  });
};

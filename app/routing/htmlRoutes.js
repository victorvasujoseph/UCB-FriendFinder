// load data
// linking routes to a series of "data" sources
var path = require("path");

// routing
module.exports = function(app) {
    
    // api get requests
    // A GET Route to /survey which should display the survey page.
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // A default, catch-all route that leads to home.html which displays the home page. 
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};
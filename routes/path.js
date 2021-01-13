const fs = require("fs");
const path = require("path");



module.exports = (app) => {

    var notesPow = {};
    app.get("/api/notes", function(err, res) {
        try {
            notesPow = fs.readFileSync("./db/db.json", "utf8");
            notesPow = JSON.parse(notesPow);
        } 
        catch (err) {
            console.log(err);
        }

        res.json(notesPow);
    });

    
    app.post("/api/notes", function(req, res) {
        try {
            notesPow = fs.readFileSync("./db/db.json", "utf8");
            notesPow = JSON.parse(notesPow)

            let notes = req.body;
            
            notesPow.push(notes);
            
            notesPow = JSON.stringify(notesPow);

            fs.writeFile("./db/db.json", notesPow, "utf8", function(err) {
                if (err) throw err;
            });

            res.json(JSON.parse(notesPow));
            
        } 
        catch (err) {
            console.log(err);
        }
        
        
    });

    

    app.delete("/api/notes/:id", function(req, res) {
        try {
            notesPow = fs.readFileSync("./db/db.json", "utf8");
            notesPow = JSON.parse(notesPow)

            notesPow = notesPow.filter(function(noteData) {
                return noteData.id != req.params.id;
            });
            
            notesPow = JSON.stringify(notesPow);

            fs.writeFile("./db/db.json", notesPow, "utf8", function(err) {
                if (err) throw err;
            });

            res.send(JSON.parse(notesPow));
        } 
        catch (err) {
            console.log(err);
        }
    });
    
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../note_taker/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../note_taker/index.html"))
    });

    app.get("/api/notes", function(req, res) {
        return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
    });
} 
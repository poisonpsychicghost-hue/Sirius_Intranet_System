console.log("this is a test", `${__dirname}`);
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require('fs');
const DATA_FILE = "data.json";

app.use(express.json());
app.use(express.static(__dirname));


//Test R0ute1
app.get('/', (req, res) => {
    res.send("Sirius Intranet Server Runnin on:", `${__dirname}`);

});

app.listen(PORT, () => {
    console.log(`Server started on https:localhost:${PORT}`);
});

//helper: Read All Memos from data.json
function readMemos() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        //if missing return blank list
        return {memos : [], notes: []};
    }
}

//Helper: Write memos to data.json
function writeMemos(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));  
}

//Get Memos and Notes
app.get('/api/all', (req, res) =>{
    const data = readMemos();
    res.json(data)
});

//Post new Memo
app.post('/api/memo', (req, res) => {
    const data = readMemos();
    data.memos.push(req.body.memo);
    writeMemos(data);
    res.json({status: 'ok' });
});

//Post new Notes
app.post('/api/note', (req, res) => {
    const data = readMemos();
    data.notes.push(req.body.note);
    writeMemos(data);
    res.json({status: 'ok' });
});
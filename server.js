const express = require("express");
const app = express();
const PORT = 3000;
const fs = require('fs');
const DATA_FILE = DataTransfer.json;

app.use(express.json());

//Test R0ute1
app.get('/', (req, res) => {
    res.send("Sirius Intranet Server Runnin!");
});

app.listen(PORT, () => {
    console.log('Server started on https:localhost:${PORT}');
});

//helper: Read All Memos from data.json
function readMemos() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        //if missing return blank list
        return [];
    }
}

//Helper: Write memos to data.json
function writeMemos(memos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(memos, null, 2));  
}

//Get all Memos
app.get('/memos', (req, res) => {
    const memos = readMemos();
    res.json(memos)
});

//Post new Memos
app.post('/memos'), (req, res) => {
    const memos = readMemos();
    memos.push(req.body.memo);
    writeMemos(memos);
    res.json({status: 'ok' });
};
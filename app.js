const express = require("express");
const app = express();
const PORT = 3000;
const fs = require('fs');
const DATA_FILE = "data.json";
const postBoardRoutes = require('./routes/postBoard');
const mainPageRoutes = require('./routes/mainPage');



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/health", (req, res) =>{
    res.send("Ok");
});

//Helper: Write memos to data.json
function writeMemos(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));  
}

//Get Memos and Notes
app.get('/api/all', (req, res) =>{
    const data = readMemos();
    res.json(data)
});

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static('css'));
app.use(express.static('assets'));
app.use('/sirius-notes-memo', postBoardRoutes);
app.use('/sirius-main', mainPageRoutes);

app.listen(PORT, () => {
    console.log(`Server runnin' on Port ${PORT}`);
});



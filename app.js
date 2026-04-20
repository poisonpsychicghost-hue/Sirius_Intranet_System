const express = require("express");
const app = express();
const PORT = 3000;
const fs = require('fs');
const DATA_FILE = "./data/data.json";
const postBoardRoutes = require('./src/routes/postBoard');
const mainPageRoutes = require('./src/routes/mainPage');



app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.get("/health", (req, res) =>{
    res.send("Ok");
});

app.get('/api/all', (req, res) => {
    const file = fs.readFileSync('./data/data.json');
    const data = JSON.parse(file);
    res.json(data);
});

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(express.static('public/js'));
app.use('/sirius-notes-memo', postBoardRoutes);
app.use('/sirius-main', mainPageRoutes);


app.post('/api/memo', (req, res) => {
  const memoText = req.body.memo;
  // Optionally add title/date fields here!
  fs.readFile(DATA_FILE, 'utf8', (err, file) => {
    if (err) return res.status(500).json({error: 'Read error'});
    const data = JSON.parse(file);
    data.memos.unshift({
      title: `Memo ${data.memos.length + 1}`,
      content: memoText,
      date: new Date().toISOString().split('T')[0]
    });
    fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), err => {
      if (err) return res.status(500).json({error: 'Write error'});
      res.json({ success: true });
    });
  });
});

app.post('/api/note', (req, res) => {
  const noteText = req.body.note;
  fs.readFile(DATA_FILE, 'utf8', (err, file) => {
    if (err) return res.status(500).json({error: 'Read error'});
    const data = JSON.parse(file);
    data.notes.unshift({
      title: `Note ${data.notes.length + 1}`,
      content: noteText,
      date: new Date().toISOString().split('T')[0]
    });
    fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), err => {
      if (err) return res.status(500).json({error: 'Write error'});
      res.json({ success: true });
    });
  });
});



app.listen(PORT, () => {
    console.log(`Server runnin' on Port ${PORT}`);
});



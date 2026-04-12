const express = require("express");
const app = express();
const PORT = 4000;
const fs = require('fs');
const DATA_FILE = "data.json";
const postBoardRoutes = require('./routes/postBoard');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/health", (req, res) =>{
    res.send("Ok");
});

app.use('/postboard', postBoardRoutes);

app.listen(PORT, () => {
    console.log(`Server runnin' on Port ${PORT}`);
});



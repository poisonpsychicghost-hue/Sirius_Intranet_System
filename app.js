const express = require("express");
const app = express();
const PORT = 3000;
const fs = require('fs');
const DATA_FILE = "data.json";

const mainPageRoutes = require('./routes/mainPage');



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/health", (req, res) =>{
    res.send("Ok");
});

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static('css'));
app.use(express.static('assets'));

app.use('/sirius-main', mainPageRoutes);

app.listen(PORT, () => {
    console.log(`Server runnin' on Port ${PORT}`);
});



const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

//Test R0ute1
app.get('/', (req, res) => {
    res.send("Sirius Intranet Server Runnin!");
});

app.listen(PORT, () => {
    console.log('Server started on https:localhost:${PORT}');
});
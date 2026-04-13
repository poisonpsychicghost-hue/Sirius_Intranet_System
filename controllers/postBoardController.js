//Constants
const fs = require('fs');
const path = require('path')

//Helper Functions
function getLatest(book, numberListed) {
    let sortedBook = book.sort((a, b) => new Date(b.date) - new Date(a.date) );
    let mostRecent = sortedBook.slice(0, numberListed)
    return {
        mostRecent
    };
};

function filterByKeyword(book, keyword, n) {
    let filteredBook = book.filter((book) => book.content.toLowerCase().includes(keyword.toLowerCase()));
    let sortedBook = filteredBook.sort((a, b) => new Date(b.date) - new Date(a.date) );
    return sortedBook.slice(0, n);
    
};


exports.getPostBoard = (req, res) => {
    const dataPath = path.join(__dirname, "../data/data.json");
    fs.readFile(dataPath, 'utf8', (err, file) => {
        if (err) {
            return res.status(500).send('Error Loading Data');
        }
    const data = JSON.parse(file);
    const recentMemos = getLatest(data.memos, 5).mostRecent;
    const recentNote = getLatest(data.notes, 5).mostRecent;
    const childNameMemo = filterByKeyword(data.memos, 'Ivy', 3);
    console.log("controller", childNameMemo)
    res.render('sirius-notes-memo', {
        recentMemos,
        recentNote,
        childNameMemo
    })
    });
};


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

function filterByKeyword(book, keyword) {
    let filteredBook = book.filter((book) => book.content.toLowerCase().includes(keyword.toLowerCase()));
    let sortedBook = filteredBook.sort((a, b) => new Date(b.date) - new Date(a.date) );
    let mostRecentFiltered = sortedBook.slice(0, 1);
    return {
        mostRecentFiltered
    };
};


exports.getPostBoard = (req, res) => {
    const dataPath = path.join(__dirname, "../data/data.json");
    fs.readFile(dataPath, 'utf8', (err, file) => {
        if (err) {
            return res.status(500).send('Error Loading Data');
        }
    const data = JSON.parse(file);
    const recentMemos = getLatest(data.memos, 3).mostRecent;
    const recentNote = getLatest(data.notes, 1).mostRecent;
    const childNameMemo = filterByKeyword(data.memos, 'Ivy').mostRecentFiltered[0];

    res.render('postboard', {
        recentMemos,
        recentNote,
        childNameMemo
    })
    });
};


document.addEventListener('DOMContentLoaded', function() {
//Notes
  const blogFormNote = document.getElementById('blogFormNote');
  const blogTextNote = document.getElementById('blogTextNote');
  const blogListNote = document.getElementById('blogListNote');

setInterval(() => {
  fetch('/api/all')
    .then(response => response.json())
    .then(data => {
      // Clear then rebuild notes
      blogListNote.innerHTML = '';
      data.notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        blogListNote.appendChild(li);
      });
      // Clear then rebuild memos
      blogListMemo.innerHTML = '';
      data.memos.forEach(memo => {
        const li = document.createElement('li');
        li.textContent = memo;
        blogListMemo.appendChild(li);
      });
    });
}, 3000); // Poll every 3 seconds

  // GET notes on load
  fetch('/api/all')
    .then(response => response.json())
    .then(data => {
      data.notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        blogListNote.appendChild(li);
      });
    });

  // Submit new note
  blogFormNote.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = blogTextNote.value.trim();
    if (text) {
      fetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: text })
      })
      .then(res => res.json())
      .then(response => {
        const li = document.createElement('li');
        li.textContent = text;
        blogListNote.appendChild(li);
        blogTextNote.value = '';
      });
    }
  });
//Memos
  const blogFormMemo = document.getElementById('blogFormMemo');
  const blogTextMemo = document.getElementById('blogTextMemo');
  const blogListMemo = document.getElementById('blogListMemo');

  // GET memos on load
  fetch('/api/all')
    .then(response => response.json())
    .then(data => {
      data.memos.forEach(memo => {
        const li = document.createElement('li');
        li.textContent = memo;
        blogListMemo.appendChild(li);
      });
    });

  // Submit new memo
  blogFormMemo.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = blogTextMemo.value.trim();
    if (text) {
      fetch('/api/memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memo: text })
      })
      .then(res => res.json())
      .then(response => {
        const li = document.createElement('li');
        li.textContent = text;
        blogListMemo.appendChild(li);
        blogTextMemo.value = '';
      });
    }
  });
});
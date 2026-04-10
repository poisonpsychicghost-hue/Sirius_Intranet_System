document.addEventListener('DOMContentLoaded', function() {
  // ----- Memo Section -----
  const blogFormMemo = document.getElementById('blogFormMemo');
  const blogTextMemo = document.getElementById('blogTextMemo');
  const blogListMemo = document.getElementById('blogListMemo');

  let memos = JSON.parse(localStorage.getItem('blogListMemo')) || [];
  blogListMemo.innerHTML = ""; // clear any static 'Content Coming Soon!' li's
  memos.forEach(function(memo) {
    const li = document.createElement('li');
    li.textContent = memo;
    blogListMemo.appendChild(li);
  });

  blogFormMemo.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = blogTextMemo.value.trim();
    if (text) {
      const li = document.createElement('li');
      li.textContent = text;
      blogListMemo.appendChild(li);
      memos.push(text);
      localStorage.setItem('blogListMemo', JSON.stringify(memos));
      blogTextMemo.value = '';
    }
  });

  // ----- Note Section -----
  const blogFormNote = document.getElementById('blogFormNote');
  const blogTextNote = document.getElementById('blogTextNote');
  const blogListNote = document.getElementById('blogListNote');

  let notes = JSON.parse(localStorage.getItem('blogListNote')) || [];
  blogListNote.innerHTML = ""; // clear any static 'Content Coming Soon!' li's
  notes.forEach(function(note) {
    const li = document.createElement('li');
    li.textContent = note;
    blogListNote.appendChild(li);
  });

  blogFormNote.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = blogTextNote.value.trim();
    if (text) {
      const li = document.createElement('li');
      li.textContent = text;
      blogListNote.appendChild(li);
      notes.push(text);
      localStorage.setItem('blogListNote', JSON.stringify(notes));
      blogTextNote.value = '';
    }
  });
});
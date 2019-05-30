"use strict";

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  var comment = document.querySelector('textarea').value;
  fetch('/addComment',
      {
        method: 'POST',
        body: comment,
      }).then(() => {
        location.reload();
  });
});

// Contact form: sends the entry to Netlify Forms in the background, then
// shows the thank-you popup so the visitor knows it worked. If this script
// doesn't run, the form still posts normally and lands on /thanks.html.
(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  var dialog = document.getElementById('thanks-dialog');
  var closeButton = document.getElementById('thanks-close');
  var errorBox = document.getElementById('form-error');
  if (!form || !dialog || !closeButton || !errorBox) return;

  var submitButton = form.querySelector('button[type="submit"]');
  var buttonText = submitButton.textContent;

  function showThanks() {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      closeButton.focus();
    } else {
      window.location.href = '/thanks.html'; // very old browsers
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorBox.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Form post failed: ' + response.status);
        form.reset();
        showThanks();
      })
      .catch(function () {
        errorBox.hidden = false;
      })
      .then(function () {
        submitButton.disabled = false;
        submitButton.textContent = buttonText;
      });
  });

  closeButton.addEventListener('click', function () {
    dialog.close();
  });

  // Clicking the dimmed area outside the popup also closes it.
  // (A click on the popup's own padding also targets the dialog, so check
  // whether the click landed outside its box.)
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var box = dialog.getBoundingClientRect();
    var outside = event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom;
    if (outside) dialog.close();
  });
})();

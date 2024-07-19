$(document).ready(function() {
    let token = '';
  
    $('#registerBtn').on('click', function() {
      const username = $('#username').val();
      const password = $('#password').val();
      $.ajax({
        url: '/register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username, password }),
        success: function(response) {
          alert('Registration successful');
        },
        error: function(error) {
          alert('Registration failed');
        }
      });
    });
  
    $('#loginBtn').on('click', function() {
      const username = $('#username').val();
      const password = $('#password').val();
      $.ajax({
        url: '/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username, password }),
        success: function(response) {
          token = response.token;
          $('#auth').hide();
          $('#notesApp').show();
          fetchNotes();
        },
        error: function(error) {
          alert('Login failed');
        }
      });
    });
  
    $('#createNoteBtn').on('click', function() {
      const title = prompt('Enter note title:');
      const content = prompt('Enter note content:');
      const color = prompt('Enter note color:');
      const tags = prompt('Enter tags (comma separated):').split(',');
      $.ajax({
        url: '/notes',
        method: 'POST',
        contentType: 'application/json',
        headers: { 'Authorization': `Bearer ${token}` },
        data: JSON.stringify({ title, content, color, tags }),
        success: function(response) {
          fetchNotes();
        },
        error: function(error) {
          alert('Failed to create note');
        }
      });
    });
  
    function fetchNotes() {
      $.ajax({
        url: '/notes',
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
        success: function(response) {
          $('#notes').empty();
          response.forEach(note => {
            const noteElement = $('<div class="note"></div>').text(note.title);
            $('#notes').append(noteElement);
          });
        },
        error: function(error) {
          alert('Failed to fetch notes');
        }
      });
    }
  });
  
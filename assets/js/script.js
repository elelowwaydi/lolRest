$(function() {
  displayRecords();
});

// cache elements
const $records = $('#records');

function displayRecords() {
  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/learncode/friends',
    success: function(data) {
      var len = data.length;

      for(var i=0; i<len; i++) {
        $records.append('<tr><td>' + data[i].id + '</td><td>' + data[i].name + '</td><td>' + data[i].drink + '</td></tr>');
      }
    }
  });
}

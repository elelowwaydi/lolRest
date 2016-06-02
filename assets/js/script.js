$(function() {
  displayRecords();
});

// cache elements
const $records = $('#records');
const $add = $('#add');
const $edit = $("#edit");
const $delete = $('#delete');

//get and display records
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

$add.hover(function() {
  $(this).find(".glyphicon").toggleClass("scale");
});

$edit.hover(function() {
  $(this).find(".glyphicon").toggleClass("write");
});

$delete.hover(function() {
  $(this).find(".glyphicon").toggleClass("rotate");
});

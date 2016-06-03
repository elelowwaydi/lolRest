$(function() {
    displayRecords();
});

// cache elements
const $records = $('#records');
const $add = $('#add');
const $edit = $("#edit");
const $delete = $('#delete');
const $btnAdd = $('#btn-add');
const $age = $('#age');
const $name = $('#name');
const $drinks = $('#drinks');
const $addModal = $('#addModal');

//get and display records
function displayRecords() {
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lloydaaron/friends',
        success: function(data) {
            var len = data.length;

            for (var i = 0; i < len; i++) {
                $records.append('<tr><td>' + data[i].id + '</td><td>' + data[i].name + '</td><td>' + data[i].age + '</td><td>' + data[i].drink + '</td></tr>');
            }
        }
    });
}

// hover animations
$add.hover(function() {
    $(this).find(".glyphicon").toggleClass("scale");
});

$edit.hover(function() {
    $(this).find(".glyphicon").toggleClass("write");
});

$delete.hover(function() {
    $(this).find(".glyphicon").toggleClass("rotate");
});

// add record
$btnAdd.click(function() {
    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/lloydaaron/friends',
        data: {
            name: $name.val(),
            age: $age.val(),
            drink: $drinks.val()
        },
        success: function(data) {
            retreiveData();
        }
    });

    $addModal.modal('toggle');
});

// retreive last record added
function retreiveData() {
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lloydaaron/friends',
        success: function(data) {
            var last = data.length - 1;
            $records.append('<tr><td>' + data[last].id + '</td><td>' + data[last].name + '</td><td>' + data[last].age + '</td><td>' + data[last].drink + '</td></tr>');
        }
    });
}



// select data
$(document).on("click", "tr", function() {
    $('tr').css("background-color", "#fff");
    $(this).css("background-color", "#F4F4F4");
    $edit.addClass("editable");
    $delete.addClass("deletable");
});

$("html").not("tr").click(function() {
  $edit.removeClass("editable");
  $delete.removeClass("deletable");
});

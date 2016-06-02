$(function() {
    displayRecords();
});

// cache elements
const $records = $('#records');
const $add = $('#add');
const $edit = $("#edit");
const $delete = $('#delete');
const $btnAdd = $('#btn-add');
const $id = $('#id');
const $name = $('#name');
const $drinks = $('#drinks');
const $addModal = $('#addModal');
//get and display records
function displayRecords() {
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/learncode/friends',
        success: function(data) {
            var len = data.length;

            for (var i = 0; i < len; i++) {
                $records.append('<tr><td>' + data[i].id + '</td><td>' + data[i].name + '</td><td>' + data[i].drink + '</td></tr>');
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
        url: 'http://rest.learncode.academy/api/learncode/friends',
        data: {
            id: $id.val(),
            name: $name.val(),
            drink: $drinks.val()
        },
        success: function(data) {
            console.log("Friend added!", data); //the new item is returned with an ID
        }
    });

    $addModal.modal('toggle');
});

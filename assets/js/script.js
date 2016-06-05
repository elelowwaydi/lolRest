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
const $drink = $('#drink');
const $addModal = $('#addModal');
const $editModal = $('#editModal');
const $btnEdit = $('#btn-edit');

//get and display records
function displayRecords() {
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lloydaaron/friends',
        success: function(data) {
            var len = data.length;

            for (var i = 0; i < len; i++) {
                $records.append('<tr class="data-row"><td class="data-id">' + data[i].id + '</td><td class="data-name">' + data[i].name + '</td><td class="data-age">' + data[i].age + '</td><td class="data-drink">' + data[i].drink + '</td></tr>');
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
            drink: $drink.val()
        },
        success: function(data) {
            retreiveData();
        }
    });
    // close modal
    $addModal.modal('toggle');
});

// retreive last record added
function retreiveData() {
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lloydaaron/friends',
        success: function(data) {
            var last = data.length - 1;
            $records.append('<tr class="data-row"><td class="data-id">' + data[last].id + '</td><td class="data-name">' + data[last].name + '</td><td class="data-age">' + data[last].age + '</td><td class="data-drink">' + data[last].drink + '</td></tr>');
        }
    });
}



// select data
$(document).on("click", ".data-row", function() {
    $('tr').css("background-color", "#fff");
    $(this).css("background-color", "#F4F4F4");
    $edit.addClass("editable");
    $delete.addClass("deletable");
    dataId = $(this).find(".data-id").html();
    dataName = $(this).find(".data-name").html();
    dataAge = $(this).find(".data-age").html();
    dataDrink = $(this).find(".data-drink").html();

});


$("html").not("tr").click(function() {
    $edit.removeClass("editable");
    $delete.removeClass("deletable");
});

// edit record
$edit.click(function() {
    $editModal.modal();
    $editModal.find("#name").val(dataName);
    $editModal.find("#age").val(dataAge);
    $editModal.find("#drink").val(dataDrink);
});


$btnEdit.click(function() {
    var newDataName = $editModal.find("#name").val();
    var newDataAge = $editModal.find("#age").val();
    var newDataDrink = $editModal.find("#drink").val();

    $.ajax({
        type: 'PUT',
        data: {
            name: newDataName,
            age: newDataAge,
            drink: newDataDrink
        },
        url: "http://rest.learncode.academy/api/lloydaaron/friends/" + dataId,
        success: function(data) {
            console.log('Record Updated Successfully!');
            var editThis = $records.find(".data-row:contains("+dataId+")");
            editThis.find(".data-name").html(newDataName);
            editThis.find(".data-age").html(newDataAge);
            editThis.find(".data-drink").html(newDataDrink);
        },
        error: function() {
            alert("error updating!");
        }
    });

    // close modal
    $editModal.modal('toggle');
});


// delete record
$delete.click(function() {
    $.ajax({
        type: 'DELETE',
        url: 'http://rest.learncode.academy/api/lloydaaron/friends/' + dataId,
        success: function() {
            //no data...just a success (200) status code
            $records.find(".data-row:contains("+dataId+")").remove();
            console.log('record Deleted Successfully!');

        }
    });
});

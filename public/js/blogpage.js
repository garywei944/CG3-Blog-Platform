
$(document).ready(function() {

    // TODO: change all of these to AJAX POST requests

    // click on "like" - add 'this' user and 'this blog' to the database table 'liked'
    $("#like").click(function() {
        console.log("liked the post")
    });

    // click on "follow" - add 'this' user and 'this blogger' to the database table 'follows'
    $("#follow").click(function() {
        console.log("followed the blogger")
    });


    // click on "read later" - future task
    $("#readLater").click(function() {
        alert("added to the read-later list")
    });
});


// $('#like').click(function(){                
//     // POST a request with the JSON-encoded entree to the backend
//     const input = {
//         user_id: $("#entreeId").val(),
//         post_id: $("#entreeName").val(),
//     };
//     console.log(input);

//     $.ajax({
//         type: "POST",
//         url: "/api/entrees/",
//         data: input,
//     }).done(function(data) {
//         // Successfully deleted entree
//         $("form").trigger("reset");
//         getAllEntrees();
//     }).fail(function(jqXHR) {
//         $("#error").html("The entree could not be deleted.");
//     });
// })



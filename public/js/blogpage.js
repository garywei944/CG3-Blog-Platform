
$(document).ready(function() {

    // TODO: change all of these to AJAX requests

    // click on the circle profile pic => switch to profile page 
    $(".circle").click(function(){
        window.location.href='profile.html'; // switch to profile page instead (when we have one)
    });

    // click on "read later" => show alert("placed ")
    $("#readLater").click(function() {
        alert("added to the read-later list")
    });

    // click on "like"
    $("#like").click(function() {
        alert("liked the post")
    });

    // click on "favorite"
    $("#follow").click(function() {
        alert("followed the blogger")
    });
});






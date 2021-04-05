
$(document).ready(function() {
    // click on the circle profile pic => switch to profile page 
    // <a href="homepage2.html"></a>
    $(".circle").click(function(){
        window.location.href='homepage2.html'; // switch to profile page instead (when we have one)
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
    $("#favorite").click(function() {
        alert("added to favorite the post")
    });
});






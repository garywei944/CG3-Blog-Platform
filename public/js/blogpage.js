
$(document).ready(function() {

    $.get('/blog/:post_id', function(data){
        
    $.get('/db/post/:post_id', function(data){
        console.log(data);
        data.results.forEach(function(item){
            let content = "<p>" + item.content + "<p>";
            $("#blogContent").append(content);
        })
    }, 'json');

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
    $("#favorite").click(function() {
        alert("added to favorite the post")
    });
});






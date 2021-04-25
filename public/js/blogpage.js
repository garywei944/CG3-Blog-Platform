
$(document).ready(function() {
    
    // click on "like" - add 'this' user and 'this blog' to the database table 'liked'
    $('#like').click(function(){                

        console.log("like button clicked")

        const input = {
            user_id: "this_user",
            post_id: "this_post"
        };
    
        console.log(input);
    
        $.ajax({
            type: "POST",
            url: "/api/blogpage_backend/",
            data:JSON.stringify(input),
            contentType: "application/json"
        })
        .done(function(data) {
            // Successfully deleted entree
        })
        .fail(function(jqXHR) {
            alert("error");
        });
    });

    // click on "follow" - add 'this' user and 'this blogger' to the database table 'follows'
    $("#follow").click(function() {
        console.log("follow button clicked")

        const input = {
            this_user_id: "this_user",
            poster_user_id: "poster_user"
        };
    
        console.log(input);
    
        $.ajax({
            type: "POST",
            url: "/api/blogpage_backend/",
            data: input,
        })
        .done(function(data) {
            // Successfully deleted entree
        })
        .fail(function(jqXHR) {
            alert("error");
        });
    });


    // click on "read later" - future task
    $("#readLater").click(function() {
        alert("added to the read-later list")
    });
});



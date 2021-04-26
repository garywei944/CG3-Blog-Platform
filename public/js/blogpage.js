
$(document).ready(function() {
    
    // click on "like" - add 'this' user and 'this blog' to the database table 'liked'
    $('#like').click(function(){                

        console.log("like button clicked")

        const input = {
            user_id: "Alex",
            post_id: 1
        };
    
        console.log(input);
    
        $.ajax({
            type: "POST",
            url: "/api/blogpage_backened_like",
            data: input,
        })
        .done(function(data) {
            console.log(user_id + " liked post " + post_id)
        })
        .fail(function(jqXHR) {
            console.log("failed to post like");
        });
    });

    // click on "follow" - add 'this' user and 'this blogger' to the database table 'follows'
    $("#follow").click(function() {
        console.log("follow button clicked")

        const input = {
            this_user_id: "Chris",
            poster_user_id: "Devin"
        };
        
        $.ajax({
            type: "POST",
            url: "/api/blogpage_backened_follow",
            data: input,
        })
        .done(function(data) {
            console.log(this_user_id + " followed user " + poster_user_id)
        })
        .fail(function(jqXHR) {
            console.log("failed to post follow");
        });
    });


    // click on "read later" - future task
    $("#readLater").click(function() {
        alert("added to the read-later list")
    });
});



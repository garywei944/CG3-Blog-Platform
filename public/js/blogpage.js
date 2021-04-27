$(document).ready(function () {

    let post_id = String(window.location.href).split("/").pop();
    let c_username = Cookies.get("cg3");

    // get poster id
    // poster_userid = $("#posterUser").text();
    // let link = ($(location).attr('origin') + "/") + (poster_userid ? poster_userid : "login")
    // $("#avatar-inpost").prop("href", link);

    // click on "like" - add 'this' user and 'this blog' to the database table 'liked'
    $('#like').click(function () {
        if (!user_cookie) {
            $(location).attr('href', '/login');
            return;
        }

        const input = {
            user_id: c_username,
            post_id: post_id
        };

        alert("liked post!")

        $.ajax({
            type: "POST",
            url: "/api/blogpage_backened_like",
            data: input,
        })
            .done(function (data) {
                // success
            })
            .fail(function (jqXHR) {
                console.log("failed to post like");
            });
    });

    // click on "follow" - add 'this' user and 'this blogger' to the database table 'follows'
    $("#follow").click(function () {
        if (!user_cookie) {
            $(location).attr('href', '/login');
            return;
        }

        const input = {
            this_user_id: c_username,
            post_id: post_id,
            // we send post_id to backend and let it query for the poster_user
        };

        alert("followed!")

        $.ajax({
            type: "POST",
            url: "/api/blogpage_backened_follow",
            data: input,
        })
            .done(function (data) {
                // success
            })
            .fail(function (jqXHR) {
                console.log("failed to post follow");
            });
    });


    // click on "read later" - future task
    $("#readLater").click(function () {
        if (!user_cookie) {
            $(location).attr('href', '/login');
            return;
        }
        // alert("added to the read-later list")
        alert("Coming soon...")
    });
});

$(document).ready(function () {
    // let num = 1;
    // //The content in each blog will be replaced with actual post when we are at the database step.
    // for (let i = 1; i < 7; i++) {
    //     post = "<tr><td class='list'><a>Blog " + num + "</a></td></tr>";
    //     $('#posts').append(post);
    //     num++;
    // }

    // let wlNum = 1;
    // for (let i = 1; i < 5; i++) {
    //     waitList = "<div class='wl'><a>Waitlist " + wlNum + "</a></div>";
    //     $('#later').append(waitList);
    //     wlNum++;
    // }

     $.get('/homepage', function(data){
        data.forEach(function(item){
            let post = "<tr><td class='list'><a>" + item.username + "</a></td></tr>";
            $('#posts').append(post);
        })
    }, 'json');

    $("#newpost").click(function () {
        window.location.href = 'postpage.html';
    });

    $("#home").click(function () {
        window.location.href = 'index.html';
    });

    $(".list").click(function () {
        window.location.href = 'blogpage.html';
    });

    $(".wl").click(function () {
        window.location.href = 'blogpage.html';
    })

});

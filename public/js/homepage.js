$(document).ready(function () {
    $.get('/api/homepage', function(data){
        data.results.forEach(function(item){
            let post = "<tr><td class='list'><a>" + item.title + "</a></td></tr>";
            $('#posts').append(post);
        })
    }, 'json').done(function(){
            $(".list").click(function () {
            window.location.href = 'blogpage.html';
        });
    });

    $("#newpost").click(function () {
        window.location.href = 'post.html';
    });

    $("#home").click(function () {
        window.location.href = 'index.html';
    });


    $(".wl").click(function () {
        window.location.href = 'blogpage.html';
    });

});

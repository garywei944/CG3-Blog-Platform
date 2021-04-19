$(document).ready(function () {
    $.get('/homepage', function(data){
        data.results.forEach(function(item){
            let post = "<tr><td class='list'><a>" + item.title + "</a></td></tr>";
            $('#posts').append(post);
        })
    }, 'json').done(function(){
        console.log($(".list"));
            $(".list").click(function () {
        window.location.href = 'blogpage.html';
        });
    });

    $("#newpost").click(function () {
        window.location.href = 'postpage.html';
    });

    $("#home").click(function () {
        window.location.href = 'index.html';
    });


    $(".wl").click(function () {
        window.location.href = 'blogpage.html';
    });

});

$(document).ready(function () {
    $.get('/api/homepage', function(data){
        let cnt = 0;
        data.results.forEach(function(item){
            if(cnt > 5){
                break;
            }
            let post = "<tr><td class='list'><a>" + item.title + "</a></td></tr>";
            $('#posts').append(post);
            cnt += 1;
        })
    }, 'json').done(function(){
        console.log($(".list"));
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

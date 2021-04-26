$(document).ready(function () {
    $.get('/api/homepage', function(data){
        data.forEach(function(item){
            let post = "<tr><td class='list' id='"+ item.post_id + "'><a>" + item.title + "</a></td></tr>";
            $('#posts').append(post);
        })
    }, 'json').done(function(){
            $(".list").click(function () {
            window.location.href = '/post/' + $(this).attr('id');
        });
    });
});

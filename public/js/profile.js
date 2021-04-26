let post_card_str = `
    <% posts.reverse().forEach(function(post) { %>
        <div id="<%= post.post_id %>" class="card mt-4 posts">
            <div class="card-body btn btn-outline-dark">
                <h5 class="card-title"><%= post.title %></h5>
                <p class="card-text"><%= post.content %></p>
                <p class="card-text"><%= post.post_time %></p>
            </div>
        </div>
    <% }); %>
`;

let post_render = ejs.compile(post_card_str, {});


$(function () {
    let username = $(location).attr('pathname').match(/.*\/(.*)/)[1];

    $.get('/api/' + username + '/posts', function (data) {
        let html = post_render({
            posts: data
        });
        $("#posts").empty().html(html);
    }, 'json').done(function () {
        $(".posts").on('click', function () {
            window.location.href = '/post/' + $(this).attr('id');
        });
    })

    // Remove Edit button if the username doesn't match
    // if(username!=)
})

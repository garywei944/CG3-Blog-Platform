let post_card_str = `
    <% posts.forEach(function(post) { %>
        <div class="card mt-4 posts">
            <div class="card-body btn btn-outline-dark text-left">
                <h5 class="card-title"><%= post.title %></h5>
                <p class="card-text"><%- post.content %></p>
                <p class="card-text"><%- new Date(post.post_time).toUTCString().slice(0,16) %></p>
                <a href="/post/<%= post.post_id %>" class="stretched-link"></a>
            </div>
        </div>
    <% }); %>
`;

let post_render = ejs.compile(post_card_str, {});

$(document).ready(function (){
    let $posts = $("#posts");
    $posts.empty();

    $.get('/api/homepage', function (data) {
        if (data.length === 0) return;
        $posts.html(post_render({
            posts: data
        }));
    });
})
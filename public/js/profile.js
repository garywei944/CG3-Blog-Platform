let post_card_str = `
    <% posts.reverse().forEach(function(post) { %>
        <div post_id="<%= post.post_id %>" class="card mt-4 posts">
            <div class="card-body btn btn-outline-dark">
                <h5 class="card-title"><%= post.title %></h5>
                <p class="card-text"><%= post.content %></p>
                <p class="card-text"><%= post.post_time %></p>
            </div>
        </div>
    <% }); %>
`;

let follower_item_str = `
    <% users.forEach(function(user) { %>
        <a username="<%= user.follower_name %>" class="dropdown-item" href="/<%= user.follower_name %>"><%= user.follower_name %></a>
    <% }); %>
`;
let following_item_str = `
    <% users.forEach(function(user) { %>
        <a username="<%= user.username %>" class="dropdown-item" href="/<%= user.username %>"><%= user.username %></a>
    <% }); %>
`;

let post_render = ejs.compile(post_card_str, {});
let follower_render = ejs.compile(follower_item_str, {});
let following_render = ejs.compile(following_item_str, {});

let username = $(location).attr('pathname').match(/.*\/(.*)/)[1];

$(function (events, handler) {
    // Remove Edit button if the username doesn't match
    let $edit_btn = $("#edit_btn");
    if (username !== user_cookie) {
        $edit_btn.html("Follow");
    } else {
        // TODO:
    }

    loadPosts();

    // Render Follower and Following dropdown list
    $.get('/api/' + username + '/follower', function (data) {
        let $follower_dropdown = $("#follower_dropdown");
        if (data.length === 0) {
            $follower_dropdown.append('<a class="dropdown-item" disabled>You don\'t have any followers</a>');
            return;
        }

        $follower_dropdown.empty().html(follower_render({
            users: data
        }));
        $("#follower_dropdown>a").attr('href', '/post/' + $(this).attr('username'));
    });

    $.get('/api/' + username + '/following', function (data) {
        let $following_dropdown = $("#following_dropdown");
        if (data.length === 0) {
            $following_dropdown.append('<a class="dropdown-item" disabled>You are not following anyone.</a>');
            return;
        }

        $following_dropdown.empty().html(following_render({
            users: data
        }));
        $("#following_dropdown>a").attr('href', '/post/' + $(this).attr('username'));
    });

    // blog_btn refresh the post list
    $("#blog_btn").on('click', loadPosts);
})

function loadPosts() {
    let $posts = $("#posts");
    $posts.empty();

    $.get('/api/' + username + '/posts', function (data) {
        if (data.length === 0) return;
        $posts.html(post_render({
            posts: data
        }));

        $(".posts").on('click', function () {
            $(location).attr('href', '/post/' + $(this).attr('post_id'));
        });
    });
}

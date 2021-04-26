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


$(function () {
    let post_render = ejs.compile(post_card_str, {});
    let follower_render = ejs.compile(follower_item_str, {});
    let following_render = ejs.compile(following_item_str, {});

    let username = $(location).attr('pathname').match(/.*\/(.*)/)[1];

    $.get('/api/' + username + '/posts', function (data) {
        if (data.length === 0) return;
        $("#posts").empty().html(post_render({
            posts: data
        }));
    }, 'json').done(function () {
        $(".posts").on('click', function () {
            $(location).attr('href', '/post/' + $(this).attr('post_id'));
        });
    });

    // Remove Edit button if the username doesn't match
    let $edit_btn = $("#edit_btn");
    if (username !== user_cookie) {
        $edit_btn.html("Follow");
    } else {
        // TODO:
    }

    // Render Follower and Following dropdown list
    $.get('/api/' + username + '/follower', function (data) {
        if (data.length === 0) return;
        $("#follower_dropdown").empty().html(follower_render({
            users: data
        }));
    }, 'json').done(function () {
        $("#follower_dropdown>a").href('/post/' + $(this).attr('username'));
    });

    $.get('/api/' + username + '/following', function (data) {
        if (data.length === 0) return;
        $("#following_dropdown").empty().html(following_render({
            users: data
        }));
    }, 'json').done(function () {
        $("#following_dropdown>a").href('/post/' + $(this).attr('username'));
    });
})

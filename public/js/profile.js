const post_card_str = `
    <% posts.reverse().forEach(function(post) { %>
        <div class="card mt-4 posts">
            <div class="card-body btn btn-outline-dark">
                <h5 class="card-title"><%= post.title %></h5>
                <p class="card-text"><%- post.content %></p>
                <p class="card-text"><%- new Date(post.post_time).toUTCString() %></p>
                <a href="/post/<%= post.post_id %>" class="stretched-link"></a>
            </div>
        </div>
    <% }); %>
`;

const follower_item_str = `
    <% users.forEach(function(user) { %>
        <a href="/<%= user.follower_name %>" class="dropdown-item"><%= user.follower_name %></a>
    <% }); %>
`;
const following_item_str = `
    <% users.forEach(function(user) { %>
        <a href="/<%= user.username %>" class="dropdown-item"><%= user.username %></a>
    <% }); %>
`;
const liked_item_str = `
    <% posts.forEach(function(post) { %>
        <a href="/post/<%= post.post_id %>" class="dropdown-item"><%= post.title %></a>
    <% }); %>
`;

let post_render = ejs.compile(post_card_str, {});
let follower_render = ejs.compile(follower_item_str, {});
let following_render = ejs.compile(following_item_str, {});
let liked_render = ejs.compile(liked_item_str, {});

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
            $follower_dropdown.append('<a class="dropdown-item">You don\'t have any followers</a>');
            return;
        }

        $follower_dropdown.empty().html(follower_render({
            users: data
        }));
    });

    $.get('/api/' + username + '/following', function (data) {
        let $following_dropdown = $("#following_dropdown");
        if (data.length === 0) {
            $following_dropdown.append('<a class="dropdown-item">You are not following anyone.</a>');
            return;
        }

        $following_dropdown.empty().html(following_render({
            users: data
        }));
    });

    // blog_btn refresh the post list
    $("#blog_btn").on('click', loadPosts);

    // liked_btn list all liked posts
    $.get('/api/' + username + '/liked', function (data) {
        let $liked_dropdown = $("#liked_dropdown");
        if (data.length === 0) {
            $liked_dropdown.append('<a class="dropdown-item">Nothing here.</a>');
            return;
        }

        $liked_dropdown.empty().html(liked_render({
            posts: data
        }));
    });

    $("#favorite_btn").on('click', function (e) {
        alert("Feature developing...")
    });
    $("#recent_btn").on('click', function (e) {
        alert("Feature developing...")
    });
})

function loadPosts() {
    let $posts = $("#posts");
    $posts.empty();

    $.get('/api/' + username + '/posts', function (data) {
        if (data.length === 0) return;
        $posts.html(post_render({
            posts: data
        }));
    });
}

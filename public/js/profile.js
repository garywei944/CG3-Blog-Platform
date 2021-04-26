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
        <a href="/<%= user.following_username %>" class="dropdown-item"><%= user.this_username %></a>
    <% }); %>
`;

const following_item_str = `
    <% users.forEach(function(user) { %>
        <a href="/<%= user.following_username %>" class="dropdown-item"><%= user.this_username %></a>
    <% }); %>
`;

const liked_item_str = `
    <% posts.forEach(function(post) { %>
        <a href="/post/<%= post.post_id %>" class="dropdown-item"><%= post.title %></a>
    <% }); %>
`;

const post_render = ejs.compile(post_card_str, {});
const follower_render = ejs.compile(follower_item_str, {});
const following_render = ejs.compile(following_item_str, {});
const liked_render = ejs.compile(liked_item_str, {});

let username = $(location).attr('pathname').match(/.*\/(.*)/)[1];

$(function (events, handler) {
    // Remove Edit button if the username doesn't match
    const $logout_btn = $("#logout_btn");
    const $edit_btn = $("#edit_btn");
    const $edit_modal = $("#edit_modal");

    if (username !== user_cookie) {
        $edit_btn.html("Follow");
        $edit_btn.removeClass('ml-lg-5').addClass('offset-lg-9');
        $logout_btn.remove();
        $edit_modal.remove();


        $edit_btn.on('click', function (e) {
            if (!user_cookie) {
                $(location).attr('href', '/login');
            }

            const data = {
                this_user_id: user_cookie,
                poster_user_id: username
            };

            $.post('/api/blogpage_backened_follow', data, function (data) {
                alert('You are now following ' + username + '.');
                loadFollower();
            }).fail(function (jqXHR) {
                console.error(jqXHR);
            });
        })
    } else {
        const $edit_username = $("#edit_username");
        const $edit_bio = $("#edit_bio");
        const $edit_save = $("#edit_save");

        const $bio = $("#bio > p")
        const bio = $bio.text();

        $edit_username.prop('placeholder', "Coming soon...");
        $edit_bio.prop('placeholder', bio);

        $edit_save.on('click', function (e) {
            let edited_bio = $edit_bio.val();

            // if (edited_username.length === 0 && edited_bio.length === 0) {
            if (edited_bio.length === 0) {
                alert('Nothing to change.');
                return;
            } else if (edited_bio.length > 99) {
                alert('Update failed: Bio takes more than 99 characters!');
                return;
            }

            $.post('/api/' + username + "/edit", {bio: edited_bio}, function (data) {
                $bio.text(edited_bio);
                $("#edit_modal").modal('hide');
            }).fail(function (jqXHR) {
                console.error(jqXHR);
            });
        });

        $logout_btn.on('click', function (e) {
            Cookies.remove('cg3');
            $(location).attr('href', '/');
        })
    }

    loadPosts();
    loadFollower();


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
        alert("Coming soon...")
    });
    $("#recent_btn").on('click', function (e) {
        alert("Coming soon...")
    });
});

// Load all posts from database
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

// Render Follower and Following dropdown list
function loadFollower() {
    let $follower_dropdown = $("#follower_dropdown");
    $follower_dropdown.empty();

    $.get('/api/' + username + '/follower', function (data) {
        if (data.length === 0) {
            $follower_dropdown.append('<a class="dropdown-item">You don\'t have any followers</a>');
            return;
        }

        $follower_dropdown.html(follower_render({
            users: data
        }));
    });
}
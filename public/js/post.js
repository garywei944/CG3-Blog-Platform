$(function () {
    let $editor = $("#editor");
    let user_cookie = Cookies.get("cg3");

    ClassicEditor
        .create($editor[0])
        .then(editor => {
            editor.setData("What's on your mind today?");

            $(".ck-editor").addClass('col-12');

            $('#submit').on('click', () => {
                const editorData = editor.getData();
                let title = $("#title").val();

                $.post('/api/post', {
                    username: user_cookie,
                    title: title,
                    content: editorData
                }, function (data) {
                    alert("You have posted successfully");
                    $(location).attr('href', '/post/' + data.post_id)
                }).fail(function (jqXHR) {
                    alert("Post failed. Please try again later.");
                    console.error(jqXHR);
                });
            });
        })
        .catch(err => {
            console.error(err);
        });

    $('#post_form').on('submit', function (e) {
        e.preventDefault();
    });
})

$(function () {
    let $editor = $("#editor");
    let user_cookie = Cookies.get("cg3");

    ClassicEditor
        .create($editor[0], {
            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
            heading: {
                options: [
                    {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
                    {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
                    {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
                    {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'}
                ]
            }
        })
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

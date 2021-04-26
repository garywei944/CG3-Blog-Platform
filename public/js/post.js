$(function () {
    let $editor = $("#editor");

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
                let c_username = checkCookie("cg3");
                let title = $("#title").val();
                $.ajax({
                    method: "POST",
                    url: "/api/post",
                    data: JSON.stringify({"username": c_username, "title": title, "content": editorData}),
                    contentType: "application/json"
                }).done(function (data) {
                    if (data) {
                        alert("You have posted successfully");
                        window.location.href = '/post/' + data;
                    } else {
                        alert("Post failed. Please try again later.");
                    }
                }).fail(function (jqXHR) {
                    alert("Post failed. Please try again later.");
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
})

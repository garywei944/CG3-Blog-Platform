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

                // TODO: send the POST package to /api/post
                console.log(editorData);
            });
        })
        .catch(error => {
            console.error(error);
        });
})
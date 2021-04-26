function getCookie(c_name){
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1){ 
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

function checkCookie(c_name){
    var cookie=getCookie(c_name);
    if (cookie!=null && cookie!=""){
        return cookie;
    }else{
        return false; 
    }
}

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
                console("post sent");
                let title = $("#title").val();
                console.log("username: "+c_username,"title: "+title,"content: "+editorData);
                $.ajax({
                    method: "POST",
                    url: "/api/post",
                    data:JSON.stringify({"username":c_username,"title":title,"content":editorData}),
                    contentType: "application/json"
                }).done(function(data) {
                    if(data){
                        alert("You have posted successfully");
                        window.location.href = '/post/'+data;
                    }else{
                        alert("Post failed. Please try again later.");
                    }
                }).fail(function(jqXHR) {
                    alert("Post failed. Please try again later.");
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
})
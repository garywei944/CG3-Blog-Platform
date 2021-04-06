$(document).ready(function () {

    $("#newpost").click(function () {
        window.location.href = 'postpage.html';
    });

    $("#circle").click(function () {
        window.location.href = 'profile.html';
    });

    // Check input validation
    $("#textBox").change(function(){
        let pattern = /^[\w\s]*$/
        if(!pattern.test($("#textBox").val())) {
            alert("not valid input")
        }
    });

});

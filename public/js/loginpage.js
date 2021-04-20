$(document).ready(function (){

    $("#newpost").click(function (){
        window.location.href = 'https://stark-tor-10041.herokuapp.com/postpage.html';
    });

    $("#home").click(function (){
        window.location.href = 'https://stark-tor-10041.herokuapp.com/index.html';
    });



    spchMesg = "A file name can't contain any of the special characters except: ./-";
    $username = $("#username");
    username = $username.val().trim();
    // username
    $username = $("#username");
    function checkusername(){
        let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!pattern.test($username.val())) {
            alert("invalid username");
        }
    }

    // password
    function checkpsw(){
        if ($("#psw").val().length < 6) {
            $("#loginMesg").text("invalid password");
        }
        else {
            $("#loginMesg").text("");
        }
    }

    $("#submit").click(checkusername);
    $("#submit").click(checkpsw);

});



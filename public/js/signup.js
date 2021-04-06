// form validation for signup page
// 
// 
// 

$(document).ready(function() {

    // email
    $("#email").change(function(){
        let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!pattern.test($("#email").val())) {
            alert("not valid email address")
        }
    });

    // password
    $("#psw").keyup(function() {
        if ($("#psw").val().length < 6) {
            $("#passwordWarning").text("Password must be at least 6 characters long");
        }
        else {
            $("#passwordWarning").text("");
        }
    });

    // repeat password == password 
    $("#psw-repeat").change(function() {
        if ($("#psw-repeat").val() !== $("#psw").val()) {
            alert("please re-type your password")
        }
    });

    // click on "remember me"
    $("#checkbox").change(function() {
    });
});
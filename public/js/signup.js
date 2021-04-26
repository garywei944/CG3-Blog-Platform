// form validation for signup page
// 
// 
// 
    //cookie manipulation
    function setCookie(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }


    $("#newpost").click(function (){
        window.location.href = 'https://stark-tor-10041.herokuapp.com/postpage.html';
    });

    $("#home").click(function (){
        window.location.href = 'https://stark-tor-10041.herokuapp.com/index.html';
    });


    function checkvalidate(){
        $username = $("#username");
        username = $username.val().trim();
        $email = $("#email");
        email = $email.val().trim();
        $psw = $("#psw");
        psw = $psw.val();
        $psw_repeat = $("#psw-repeat");
        psw_repeat = $psw_repeat.val();
        let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (psw.length < 6||!pattern.test($email.val())||psw!==psw_repeat||username.length < 1) {
            $("#loginMesg").text(`invalid Username, Email or Password`);
        }
        else {
            $("#loginMesg").css('color', 'green');
            $("#loginMesg").text("registering...");
            $.ajax({
                method: "POST",
                url: "/api/register",
                data:JSON.stringify({"username":username,"email":email,"psw":psw}),
                contentType: "application/json"
            }).done(function(data) {
                setCookie("cg3",username,1);
                $("#loginMesg").text("Done!");
                window.location.href = 'https://stark-tor-10041.herokuapp.com/';
            }).fail(function(jqXHR) {
                $("#loginMesg").css('color', 'rgb(255, 68, 68)');
                $("#loginMesg").html("unable to register, please try again later");
            });
        }
    }

    // click on "remember me"
    $("#checkbox").change(function() {
    });


    $("#submit").click(checkvalidate);

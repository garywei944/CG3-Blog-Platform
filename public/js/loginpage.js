$("#newpost").click(function (){
    window.location.href = 'https://stark-tor-10041.herokuapp.com/post';
});

$("#home").click(function (){
    window.location.href = 'https://stark-tor-10041.herokuapp.com/home';
});

$("#signup").click(function (){
    window.location.href = 'https://stark-tor-10041.herokuapp.com/register';
});

//cookie manipulation
function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

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

//check user


spchMesg = "A file name can't contain any of the special characters except: ./-";

// password
function checkvalidate(){
    let $username = $("#username");
    let username = $username.val().trim();
    let $psw = $("#psw");
    let psw = $psw.val();
    if ((psw.length < 6)||(username.length < 1)) {
        $("#loginMesg").text(`invalid Username or Password`);
    }
    else {
        $("#loginMesg").css('color', 'green');
        $("#loginMesg").text("logging...");
        $.ajax({
            method: "POST",
            url: "/api/login",
            data:JSON.stringify({"username":username,"psw":psw}),
            contentType: "application/json"
        }).done(function(data) {
            if(data){
                setCookie("cg3",username,1);
                $("#loginMesg").text('Done!');
                window.location.href = '/';
            }else{
                $("#loginMesg").css('color', 'rgb(255, 68, 68)');
                $("#loginMesg").text("incorrect password!");
            }
        }).fail(function(jqXHR) {
            $("#loginMesg").css('color', 'rgb(255, 68, 68)');
            $("#loginMesg").html("unable to login, please try again later");
        });
    }
}

$("#submit").click(checkvalidate);




var urls = [];

$(document).ready(function(){
    $(".hamburger").click(function(){
        if($(".mobile_links").hasClass("fade-in")){
            $(".mobile_links").removeClass("fade-in");
            $(".mobile_links").addClass("fade-out");
        }
        else{
            $(".mobile_links").addClass("fade-in");
            $(".mobile_links").removeClass("fade-out");
        }
    });
});


$(document).on("click", ".copy_btn", function () {
    var clicked = $(this);

    //Code to copy the link------------------------------------------------------------------
    
    var copyText = clicked.prev().text();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(copyText).select();
    document.execCommand("copy");
    $temp.remove();

    //---------------------------------------------------------------------------------------
    
    $(".copy_btn").each(function(){
        if($(this).is(clicked)){
            
            if(!$(this).hasClass("copied")){
                $(this).addClass("copied");
                $(this).text("Copied!");
            }
        }

        else{
            $(this).removeClass("copied");
            $(this).text("Copy");
        }
    });
});

$(document).on("click", ".shorten", function () {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if( $("#long_link").val() == ""){
        $("#long_link").addClass("error");
        $("small").addClass("error");
        $("small").text("Please add a link!")
    }

    else{
        
        var long_link = $("#long_link").val();
        
        if (long_link.match(regex)) {
            
            if(!urls.includes(long_link)){
                shorten(long_link);
                               
                $("#long_link").removeClass("error");
                $("small").removeClass("error");

                urls.push($("#long_link").val());
            }
        } 
        else {
            $("#long_link").addClass("error");
            $("small").addClass("error");
            $("small").text("Please enter a valid link!")
        }

        
    }

});

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function shorten(url){
    $.ajax({
        type: "POST",
        url: "https://api.shrtco.de/v2/shorten?url="+url,
        success: function (data, status, xhr) {// success callback function
            var newLink = $(".toclone").last().clone();
            
            newLink.children(".violet").text(url);
            newLink.children().children(".rel").text(data.result.short_link);

            $(".generated_links").append(newLink);
            newLink.addClass("fade-in");
        } 
      });
}
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
                var newLink = $(".toclone").last().clone();
            
                newLink.children(".violet").text(long_link);
                newLink.children().children(".rel").text("https://rel.ink/" + randomString(6));

                $(".generated_links").append(newLink);
                newLink.addClass("fade-in");
                
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
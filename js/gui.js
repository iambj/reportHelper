var data = {};
var resets = {};
var fetching = false;

$(document).ready(function(){
  $('#submit').click(function(e){
    //pull data from all of the text boxes on the form
    data = loadTextBoxes( $("div#forms"),  "reset");
    //ajax the data to the server.
    $.ajax({
      url: "/submitReset",
      method : "post",
      data : data
    }).done(function(res){
        // res is exactly what the server gives back.
        if(res === "error adding to database"){
            var html = "<div id=\"submitRes\">There was an error connecting to the database. Please try again.</div>";
        }else if(res === "success"){
            var html = "<div id=\"submitRes\">Your request has been recieved. You will get a reponse by email with a link to the password.</div>";
        }else{
            var html = "<div id=\"submitRes\">" + res + "</div>"
        };
        var elem = 0;
        $("form").children().find("*").each(function(){
            elem++;
        });
        $("#forms").height(h = $("#forms").height());
        $("form").children().find("*").each(function(i){
                $(this).fadeOut(750, function(){
                    (this).remove();
                    console.log(elem);
                    if(i+1 == elem){ //i+1 becuase we have an index vs count.
                       replaceHTML();
                    }
                });
        });
        //replaceHTML();
        function replaceHTML(){
            $("#forms").html(function(){
                $("#forms").animate({
                    height : (h*0.5)+"px"
                }, 500);
                $(this).html(html);
                //$(this).append(html);
                $("#submitRes").fadeIn(750);
            });
        };
        //console.log(res);
    })
    e.preventDefault();
    })
    $('#fetch').click(function(e){
        $(this).css('cursor' , 'not-allowed')
        if(fetching === true){
            return;
        }else{
            $(".refreshing").html("Fetching resets...")
            setTimeout(function(){
                $(this).css('cursor' , 'pointer')
                fetchResets();
            }, 750);

            e.preventDefault();
        }
  })
    $("#fetch").bind('mouseenter' , function(){
        console.log("hovering");
        if(fetching === true){
            $(this).css('cursor' , 'not-allowed')
        }else{
            $(this).css('cursor' , 'pointer')
        };
    });
});
function fetchResets(){
    if(fetching === true){
        console.log("already fecthing");
        return;
    }
    //pull data from all of the text boxes on the form
    //ajax the data to the server.
    fetching = true;
    $.ajax({
     url: "/fetchResets",
    }).done(function(res){
       // res is exactly what the server gives back.
       if(res !== "error"){
           resets = JSON.parse(res);
           //user notification can go here.
           $(".refreshing").fadeOut();
           loadResets();
       }else{
           $(".refreshing").html("There was an error connecting to the database.")
       }

    })
}

function loadResets(){
    $(".row").each(function(i){
        if(i > 0){
            $(this).delay(1000).remove();
        };
    });
    var numResets = resets.length;
    var count = numResets;
    console.log("length " + numResets);
    var html = "";
    var i = 0;
    //TODO: make this actually load the data one at a time? idk if thats efficient
    //one as a time as hit the db return, db return.
    //Acutllay load it this way, then enable a one time load.
    function loadHTML(){
        console.log("count = " + count);
        if(count !== null || count >= 0){
            html = "";
            $(".row:last-of-type").fadeIn(1);
            html += "<div class=\"row\" style=\"display:none;\">";
            html += ("<div class=\"cell\">" + (numResets-i) + "</div>");
            html += ("<div class=\"cell\">" + niceDate(resets[i].date) + "</div>");
            html += ("<div class=\"cell\">" + resets[i].firstName + "</div>");
            html += ("<div class=\"cell\">" + resets[i].lastName + "</div>");
            html += ("<div class=\"cell\">" + resets[i].userID + "</div>");
            html += ("<div class=\"cell\">" + resets[i].program + "</div>");
            html += ("<div class=\"cell\">" + resets[i].application + "</div>");
            html += ("<div class=\"cell\">" + "Password" + "</div>");
            html += ("<div class=\"cell\">" + resets[i].reqEmail + "</div>");
            html += "</div>";
            $('#resetList').append(html);
            console.log("i = " + i);
            i++;
            count--;
        }else{
            console.log("done");
            clearInterval(load);
            $("#fetch").css('cursor' , 'pointer')
            fetching = false;
            return;
        };
        //append all but hidden,
        //then for each and display them.
        //Done.
    }
    var load = setInterval(loadHTML, 25);
}

function niceDate(d){
    if(typeof d === "string"){
        var reg = /^[0-9]*/;
        var year = reg.exec(d);
        var month = /\-([0-9]{1,2})\-/.exec(d);
        var date = /\-([0-9]{1,2})\T/.exec(d);
        var hour = /\T([0-9]{1,2})\:/.exec(d);
        var minutes = /\:([0-9]{1,2})\./.exec(d);
        var ampm = " a.m.";
        if(hour[1] > 12){
            hour = hour[1] % 12;
            ampm = " p.m.";
        };
        return month[1] + "/" + date[1] + "/" + year + " " + hour + ":" + minutes[1] + ampm;
    }
}

function traverse(){
  /*$('#div').find.$('type=[input]').each(function(i){
    console.log($(this).value);
    trav
  })
*/
}


//load all inputs into an object and return it. Can filter by a group.
function loadTextBoxes(d , group){
  var data = {};
  if(d instanceof jQuery){
    //console.log("traversing...");
    //console.log(d);
    d.find($('input')).filter(function(i){
      var t = $(this);
      if(t.attr("role") == group){
        data[t.attr("name")] = t.val();
        //console.log(data[i]);
        return true;
      };
    });
    return data;

  }else{
    console.log("not a jquery dom element");
  };
}



///Load by default after 5.1 seconds
//setTimeout(fetchResets, 5100);

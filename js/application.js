var audio;

//first hide pause button

$("#pause").hide();

initAudio($('#playlist ul li:first-child'));

/*
    in initAudio function
    we'll mix song and title
    no cover no artist (for now) 
*/

function initAudio(element){
    var song = element.text();
   var title = element.attr('title');

    audio = new Audio('songs/'+ title);

    if(!audio.currentTime){
        $('#timer').html('0.00');
    }


    //artist later

    //cover later

    $('#audio_info #title').text(song);

    $("#playlist ul li").removeClass('active');
    element.addClass('active');
   // console.log(song);
}

//creating buttons

//play button

$('#play').click(function(){
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#timer').fadeIn(400);
    showDuration();

  
});

//pause button

$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

$('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
   // $('#timer').fadeOut(400);
   // $('h3').css('margin-top: 500px;')
});

//next button

$('#next').click(function(){
    audio.pause();
    var next = $('#playlist ul li.active').next();
    if (next.length == 0){
        next = $('#playlist ul li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
});

//prev button

$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist ul li.active').prev();
    if(prev.length == 0){
        prev = $('#playlist ul li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

$('#playlist ul li').click(function(){
    audio.pause();
    initAudio($(this));
    $('#play').hide();
    $('#pause').show();
    $('#timer').fadeIn(400);
    audio.play();
    showDuration();
});

function showDuration(){
    $(audio).bind('timeupdate', function(){
        var s = parseInt(audio.currentTime%60);
        var m = parseInt((audio.currentTime/60)%60);

        if(s<10){
            s = '0' + s;
        }
        $('#timer').html(m + '.' + s);
        var value = 0;
        if(audio.currentTime>0){
            value = Math.floor((100 / audio.duration)*audio.currentTime);
        }
        $('#tracker').css('width',value + '%');
    });
}


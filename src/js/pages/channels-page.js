$(document).ready(function(){
    $('.accordion-title').on('click', function(){
        $(this).toggleClass('accordion-open');
    })

    $('.play-video-icon').on('click', function(){
        var video = $(this).next();
        $(video).get(0).play();
        $(this).closest('.accordion-content').addClass('playing-video');
    })
});
$(document).ready(function () {
    var $body = $('body');
    var $showMenuButton = $('.hamburger-menu');
    var $hideMenuButton = $('.close-slider-menu');

    $showMenuButton
        .on('click', function () {
            $body.addClass('show-menu');
        });

    $hideMenuButton.on('click', function() {
        $body.removeClass('show-menu');
    });

    function smoothScroll () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    console.log(target.offset().top);
                    $('.main-menu-item').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    }

    smoothScroll();
});

window.onload = function() {
    $('body').addClass('loaded');
};
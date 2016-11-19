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
    })
});

window.onload = function() {
    $('body').addClass('loaded');
};
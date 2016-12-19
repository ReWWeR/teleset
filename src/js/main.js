$(document).ready(function () {
    var $body = $('body');
    var $showMenuButton = $('.hamburger-menu');
    var $hideMenuButton = $('.close-slider-menu');
    var coordinates = {};

    var $closeMenuInnerPage = $('.close-slider-menu', '.inner-page');
    var $showMenuButtonInnerPage = $('.hamburger-menu', '.homepage-inner');

    $showMenuButton
        .on('click', function () {
            $body.addClass('show-menu');
        });

    $hideMenuButton.on('click', function () {
        $body.removeClass('show-menu');
    });

    $closeMenuInnerPage.click(function(){
        $body.addClass('show-fullpage');
    })

    $showMenuButtonInnerPage.click(function(){
        $body.removeClass('show-fullpage');
    })


    function smoothScroll() {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('.main-menu-item').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    }

    smoothScroll();

    var $fourBlocksButton = $('.four-blocks-button');

    $fourBlocksButton.click(function(){
        $body.toggleClass('show-four-blocks-section');
    })

    var $menuContainer = $('.menu-container');
    var $cabinetMenuBtn = $('.back-to-main-menu');
    var $personalAreaMenuBtn = $('.personal-area', '.slider-menu-footer');

    $cabinetMenuBtn.click(function(){
        $menuContainer.removeClass('show-cabinet-menu');
    });

    $personalAreaMenuBtn.click(function(){
        $menuContainer.addClass('show-cabinet-menu');
    });

    $showLoginPopup = $('.personal-area', '.header');

    $showLoginPopup.click(function () {
        $body.toggleClass('show-login-popup');
    })

    var $showConnectFormBtn = $('#show-connect-form');
    var $submitStep1 = $('#submit-step-1');
    var $submitStepMapBtn = $('#submit-step-map');
    var $submitStep3 = $('#submit-step-3');


    $showConnectFormBtn.on('click', function () {
        $body.addClass('show-connect-form');
    });

    var $connectForm1 = $('#connect1');
    $connectForm1.validate({
        errorPlacement: function (error, element) {
            return true;
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.input-wrap').addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.input-wrap').addClass(validClass).removeClass(errorClass);
        }
    });

    $('input.access-check').on('keyup', function () {

        if($('#street').val().length >= 3) {
            $.ajax({
                url: 'http://www.mocky.io/v2/5838b4f211000097158fd3c7',
                method: "POST"
            })
                .done(function (res) {
                    if (res.status === "success") {
                          $connectForm1.closest('.connect-form-step').addClass('success-response');

                          coordinates = {lat: +res.coordinates.lat, lng: +res.coordinates.lng};
                    } else if (res.status === "error") {
                        $connectForm1.closest('.connect-form-step').addClass('error-response');
                    }
                })
        } else {
            $connectForm1.closest('.connect-form-step').removeClass('success-response').removeClass('error-response');
        }

        if ($connectForm1.valid()) {
            $submitStep1.attr('disabled', false)
        } else {
            $submitStep1.attr('disabled', true)
        }
    });

    $submitStep1.on('click', function (e) {
        e.preventDefault();
        var map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 18,
            disableDefaultUI: true,
            scrollwheel: false,
            scaleControl: false
        });

        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: './img/step-tick.svg'
        });
        $body.addClass('show-connect-step-map');
    });

    $submitStepMapBtn.on('click', function () {
        $body.addClass('show-connect-step-3')
    });

    var $submitInfoForm = $('#connect-submit-info');

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
    };

    $submitInfoForm.validate({
        errorPlacement: function (error, element) {
            return true;
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.input-wrap').addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.input-wrap').addClass(validClass).removeClass(errorClass);
        }
    });

    $('input.info-check').on('keyup', function(){
        if($submitInfoForm.valid()) {
            $submitStep3.attr('disabled', false)
        } else {
            $submitStep3.attr('disabled', true)
        }
    });

    $submitStep3.on('click', function (e) {
        e.preventDefault();
        $body.addClass('show-connect-step-success').removeClass('show-connect-step-map').removeClass('show-connect-form').removeClass('show-connect-step-3');
        $.ajax({
            url: 'http://www.mocky.io/v2/5838b4f211000097158fd3c7',
            method: "POST"
        })
    });

    $('#phone').mask('+7 000 000-00-00');

    $('.hamburger-menu-mobile').on('click', function () {
        $body.toggleClass('show-hamburger');
        //$('.mobile-header').toggleClass('decolorify-items');
    });

    $headerInnerPageHeight = $('.header-inner-page').height();

    $('.main-menu-item').on('scroll', function () {
        if($headerInnerPageHeight <= $(this).scrollTop()) {
            $body.addClass('hide-mobile-header');
        } else {
            $body.removeClass('hide-mobile-header');
        }
    })

    $mobileBP = 1023;

    function resizer () {
            if($mobileBP >= $(window).width() && $('.connect-fullpage').length > 0) {
                $('.connect-fullpage').removeClass('fullpage-content')
            } else {
                $('.connect-fullpage').addClass('fullpage-content')
            }
    }

    $(window).on('resize', resizer)
    resizer();

    $('.modal').click(function(e){
        console.log(e.target);
        e.stopPropagation();

        if ($(e.target).hasClass('modal')) {
            $('body').removeClass('show-login-popup');
        }
    });

});

window.onload = function () {
    $('body').addClass('loaded');
    setTimeout(function(){
        $('body').addClass('initial-animation');
    }, 2000)
};
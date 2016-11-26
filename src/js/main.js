$(document).ready(function () {
    var $body = $('body');
    var $showMenuButton = $('.hamburger-menu');
    var $hideMenuButton = $('.close-slider-menu');
    var coordinates = {};

    $showMenuButton
        .on('click', function () {
            $body.addClass('show-menu');
        });

    $hideMenuButton.on('click', function () {
        $body.removeClass('show-menu');
    });

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

    $submitInfoForm = $('#connect-submit-info');

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
});

window.onload = function () {
    $('body').addClass('loaded');
};
$(document).ready(function () {
    var $getNewsBtn = $('#get-news');
    var $newsList = $('.news-list');
    var endpoint = 'http://www.mocky.io/v2/58583781120000c717c8af08';

    $getNewsBtn.on('click', function(){
        $.ajax({
            url: endpoint,
            method: 'GET'
        })
        .done(function(msg){
            $newsList.append(msg);
        })
    });

    var $newsFilterBtn = $('.news-filter-btn');
    var $newsSubBtn = $('.news-sub-btn');
    var $modalCloseBtn = $('.news-filter-popup-filter .modal-close, .news-filter-popup-sub .modal-close, .unsubscribe');


    $newsFilterBtn.click(function() {
        $('body').toggleClass('show-filter-options').removeClass('show-sub-options');
        $(this).toggleClass('active');
        $newsSubBtn.removeClass('active');
    });

    $newsSubBtn.click(function() {
        $('body').toggleClass('show-sub-options').removeClass('show-filter-options');
        $(this).toggleClass('active');
        $newsFilterBtn.removeClass('active');
    });

    $modalCloseBtn.click(function(){
        $('body').removeClass('show-filter-options').removeClass('show-sub-options');
        $newsFilterBtn.removeClass('active');
        $newsSubBtn.removeClass('active');
    })

    $('.news-filter-popup-sub, .news-filter-popup-filter').click(function(e){
        e.stopPropagation();

        if (e.target.className === 'news-filter-popup-sub' || e.target.className === 'news-filter-popup-filter') {
            $('body').removeClass('show-filter-options').removeClass('show-sub-options');
            $newsFilterBtn.removeClass('active');
            $newsSubBtn.removeClass('active');
        }
    });

    var $newsInputSubscribe = $('#subscribe-news');
    var $newsForm = $('#news-subscribe-form');

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
    };

    $newsForm.validate({
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

});
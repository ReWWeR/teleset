$(document).ready(function () {
    var $getNewsBtn = $('#get-news');
    var $newsList = $('.news-list');
    var endpoint = 'http://www.mocky.io/v2/584739203f0000e316fe698e';

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
    var $modalCloseBtn = $('.news-filter-popup-filter .modal-close, .news-filter-popup-sub .modal-close');


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

});
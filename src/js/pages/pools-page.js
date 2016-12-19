$(document).ready(function(){
    $shareLink = $('.share-link');

    $shareLink.click(function () {
        $(this).closest('.share-clickable').toggleClass('show-share');
    })
});
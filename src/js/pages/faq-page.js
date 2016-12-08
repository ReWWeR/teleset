$(document).ready(function(){
    $faqTitleMain = $('.faq-accordion-title-main span');
    $faqSubTitle = $('.faq-accordion-content span');

    $faqTitleMain.click(function(){$(this).parent().toggleClass('open')})
    $faqSubTitle.click(function(){$(this).parent().toggleClass('open')})
});
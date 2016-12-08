$(document).ready(function(){

   $('#doc_number').on('keypress', function(e) {
       if (e.which === 13) {
           $('body').addClass('show-support-modal');
           $('#support-submit').on('submit', function(e){ e.preventDefault(); })
       }
   });

       $('.modal-close').on('click', function() {$('body').removeClass('show-support-modal')});
       $('#send-support-ticket').on('click', function() {
           $('body').removeClass('show-support-modal').addClass('success-screen')
       })
});
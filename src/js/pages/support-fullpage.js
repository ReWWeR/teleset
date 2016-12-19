$(document).ready(function(){

    var $supportSubmit = $('#support-submit');
    var supportMsgFirstClick = false;

    $supportSubmit.validate({
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



   $('#doc_number').on('keypress', function(e) {
       if (e.which === 13 && $supportSubmit.valid()) {
           $('body').addClass('show-support-modal');
           $('#support-submit').on('submit', function(e){ e.preventDefault(); })
       }
   });


    $('#supportMessage').click(function(){
        if (!supportMsgFirstClick) {
            $('#supportMessage').text('');
            supportMsgFirstClick = true;
        }
    });

       $('.modal-close').on('click', function() {$('body').removeClass('show-support-modal')});
       $('#send-support-ticket').on('click', function() {
           $('body').removeClass('show-support-modal').addClass('success-screen')
       })
});
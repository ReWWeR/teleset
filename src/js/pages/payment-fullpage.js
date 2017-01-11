$(document).ready(function() {
    var $paymentSubmit = $('#payment-submit');
    var $paymentButton = $('#payment-button');

    $paymentSubmit.validate({
        errorPlacement: function (error, element) {
            return true;
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.input-wrap').addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.input-wrap').addClass(validClass).removeClass(errorClass);
        },
        onkeyup: function() {
            if (this.checkForm()) {
                $paymentButton.attr('disabled', false)
            } else {
                $paymentButton.attr('disabled', true)
            }
        }
    });

    $('input', $paymentSubmit).on('keyup', function(){
        /*if($paymentSubmit.valid()) {
            $paymentButton.attr('disabled', false)
        } else {
            $paymentButton.attr('disabled', true)
        }*/
    });

    $paymentButton.on('click', function (e) {
        e.preventDefault();
        $('body').addClass('show-payment-success');
        $.ajax({
            url: 'http://www.mocky.io/v2/5838b4f211000097158fd3c7',
            method: "POST"
        })
    });
});
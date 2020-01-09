var Atomia = Atomia || {};
Atomia.ViewModels = Atomia.ViewModels || {};

(function (exports, _, ko, utils, checkoutApi) {
    'use strict';

    function Recaptcha($reCaptchaMessage, $checkoutFormSubmitBtn, reCaptchaPlaceholderId, siteKey) {
        var self = this;
        self.isValid = ko.observable(false);
        self.$reCaptchaMessage = $reCaptchaMessage;
        self.$checkoutFormSubmitBtn = $checkoutFormSubmitBtn;

        self.render = function () {
            grecaptcha.render(reCaptchaPlaceholderId, {
                'sitekey': siteKey,
                'callback': function (response) {
                    if (response !== '') {
                        self.isValid(true);
                        self.$reCaptchaMessage
                            .html('')
                            .css('color', 'none');
                    }
                },
                theme: 'light',
                type: 'image',
                size: 'normal'
            });
        };

        self.submitHandler = function () {
            if (!self.isValid()) {
                self.$reCaptchaMessage
                    .html(Atomia.RESX.recaptchaVerificationFaild)
                    .css('color', 'red');
            } else {
                self.$reCaptchaMessage
                    .html('')
                    .css('color', 'none');
                $('#Checkout_Form').submit();
            }
        };

        self.init = function () {
            setTimeout(self.render, 1000);
            $checkoutFormSubmitBtn.click(self.submitHandler);
        };

        self.init();
    }

    _.extend(exports, {
        Recaptcha: Recaptcha
    });
})(Atomia.ViewModels, _, ko, Atomia.Utils, Atomia.Api.Checkout);
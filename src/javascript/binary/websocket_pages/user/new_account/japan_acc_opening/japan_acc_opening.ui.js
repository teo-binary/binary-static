const Content             = require('../../../../common_functions/content').Content;
const ValidAccountOpening = require('../../../../common_functions/valid_account_opening').ValidAccountOpening;
const Validate            = require('../../../../common_functions/validation').Validate;
const JapanAccOpeningData = require('./japan_acc_opening.data').JapanAccOpeningData;
const localize = require('../../../../base/localize').localize;

const JapanAccOpeningUI = (function () {
    'use strict';

    let elementObj;

    const checkValidity = function() {
        window.accountErrorCounter = 0;
        const letters = Content.localize().textLetters,
            numbers = Content.localize().textNumbers,
            space   = Content.localize().textSpace,
            hyphen  = Content.localize().textHyphen,
            period  = Content.localize().textPeriod,
            apost   = Content.localize().textApost;

        elementObj = {
            gender     : document.getElementById('gender'),
            fname      : document.getElementById('fname'),
            lname      : document.getElementById('lname'),
            dobdd      : document.getElementById('dobdd'),
            dobmm      : document.getElementById('dobmm'),
            dobyy      : document.getElementById('dobyy'),
            occupation : document.getElementById('occupation'),
            address1   : document.getElementById('address1'),
            address2   : document.getElementById('address2'),
            town       : document.getElementById('address-town'),
            state      : document.getElementById('address-state'),
            postcode   : document.getElementById('address-postcode'),
            tel        : document.getElementById('tel'),
            question   : document.getElementById('secret-question'),
            answer     : document.getElementById('secret-answer'),
            fatca      : document.getElementById('fatca'),
            income     : document.getElementById('annual-income'),
            asset      : document.getElementById('financial-asset'),
            limit      : document.getElementById('daily-loss-limit'),
            equities   : document.getElementById('equities'),
            commodities: document.getElementById('commodities'),
            deposit    : document.getElementById('foreign-currency-deposit'),
            margin     : document.getElementById('margin-fx'),
            trust      : document.getElementById('investment-trust'),
            bond       : document.getElementById('public-and-corporation-bond'),
            otc        : document.getElementById('otc-derivative-trading'),
            purpose    : document.getElementById('trading-purpose'),
            hedge      : document.getElementById('hedge-asset'),
            amount     : document.getElementById('hedge-asset-amount'),
            electronic : document.getElementById('use-electronic-doc'),
            policies   : document.getElementById('warnings-and-policies'),
            judgement  : document.getElementById('own-judgment'),
            mechanism  : document.getElementById('trading-mechanism'),
            time       : document.getElementById('judgment-time'),
            total      : document.getElementById('total-loss'),
            sellback   : document.getElementById('sellback-loss'),
            shortsell  : document.getElementById('shortsell-loss'),
            profit     : document.getElementById('company-profit'),
            knowledge  : document.getElementById('expert-knowledge'),
            pep        : document.getElementById('not-pep'),
        };

        const errorObj = {
            gender     : document.getElementById('error-gender'),
            fname      : document.getElementById('error-fname'),
            lname      : document.getElementById('error-lname'),
            dobdd      : document.getElementById('error-birthdate'),
            dobmm      : document.getElementById('error-birthdate'),
            dobyy      : document.getElementById('error-birthdate'),
            occupation : document.getElementById('error-occupation'),
            address1   : document.getElementById('error-address1'),
            address2   : document.getElementById('error-address2'),
            town       : document.getElementById('error-town'),
            state      : document.getElementById('error-state'),
            postcode   : document.getElementById('error-postcode'),
            tel        : document.getElementById('error-tel'),
            question   : document.getElementById('error-question'),
            answer     : document.getElementById('error-answer'),
            fatca      : document.getElementById('error-fatca'),
            income     : document.getElementById('error-annual-income'),
            asset      : document.getElementById('error-financial-asset'),
            limit      : document.getElementById('error-daily-loss-limit'),
            equities   : document.getElementById('error-equities'),
            commodities: document.getElementById('error-commodities'),
            deposit    : document.getElementById('error-foreign-currency-deposit'),
            margin     : document.getElementById('error-margin-fx'),
            trust      : document.getElementById('error-investment-trust'),
            bond       : document.getElementById('error-public-and-corporation-bond'),
            otc        : document.getElementById('error-otc-derivative-trading'),
            purpose    : document.getElementById('error-trading-purpose'),
            hedge      : document.getElementById('error-hedge-asset'),
            amount     : document.getElementById('error-hedge-asset-amount'),
            electronic : document.getElementById('error-use-electronic-doc'),
            policies   : document.getElementById('error-warnings-and-policies'),
            judgement  : document.getElementById('error-own-judgment'),
            mechanism  : document.getElementById('error-trading-mechanism'),
            time       : document.getElementById('error-judgment-time'),
            total      : document.getElementById('error-total-loss'),
            sellback   : document.getElementById('error-sellback-loss'),
            shortsell  : document.getElementById('error-shortsell-loss'),
            profit     : document.getElementById('error-company-profit'),
            knowledge  : document.getElementById('error-expert-knowledge'),
            pep        : document.getElementById('error-not-pep'),
        };
        Object.keys(errorObj).forEach(function (key) {
            if (errorObj[key].offsetParent !== null) {
                errorObj[key].setAttribute('style', 'display:none');
            }
        });

        if (/[`~!@#$%^&*)(_=+\[}{\]\\\/";:?><,|\d]+/.test((elementObj.fname.value).trim())) {
            errorObj.fname.innerHTML = Content.errorMessage('reg', [letters, space, hyphen, period, apost]);
            Validate.displayErrorMessage(errorObj.fname);
            window.accountErrorCounter++;
        }

        if (/[`~!@#$%^&*)(_=+\[}{\]\\\/";:?><,|\d]+/.test((elementObj.lname.value).trim())) {
            errorObj.lname.innerHTML = Content.errorMessage('reg', [letters, space, hyphen, period, apost]);
            Validate.displayErrorMessage(errorObj.lname);
            window.accountErrorCounter++;
        }

        ValidAccountOpening.checkDate(elementObj.dobdd, elementObj.dobmm, elementObj.dobyy, errorObj.dobdd);

        if (!/^\d{3}-\d{4}$/.test(elementObj.postcode.value)) {
            errorObj.postcode.innerHTML = localize('Please follow the pattern 3 numbers, a dash, followed by 4 numbers.');
            Validate.displayErrorMessage(errorObj.postcode);
            window.accountErrorCounter++;
        }

        if (elementObj.tel.value.replace(/\+| /g, '').length < 6) {
            errorObj.tel.innerHTML = Content.errorMessage('min', 6);
            Validate.displayErrorMessage(errorObj.tel);
            window.accountErrorCounter++;
        } else if (!/^\+?[0-9\s-]{6,35}$/.test(elementObj.tel.value)) {
            errorObj.tel.innerHTML = Content.errorMessage('reg', [numbers, space, hyphen]);
            Validate.displayErrorMessage(errorObj.tel);
            window.accountErrorCounter++;
        }

        if (!/^\d+$/.test(elementObj.limit.value)) {
            errorObj.limit.innerHTML = Content.errorMessage('reg', [numbers]);
            Validate.displayErrorMessage(errorObj.limit);
            window.accountErrorCounter++;
        }

        if (elementObj.amount.offsetParent !== null && !/^\d+$/.test(elementObj.amount.value)) {
            errorObj.amount.innerHTML = Content.errorMessage('reg', [numbers]);
            Validate.displayErrorMessage(errorObj.amount);
            window.accountErrorCounter++;
        }

        Object.keys(elementObj).forEach(function (key) {
            if (elementObj[key].offsetParent !== null && key !== 'address2') {
                if (/^$/.test((elementObj[key].value).trim()) && elementObj[key].type !== 'checkbox') {
                    errorObj[key].innerHTML = Content.errorMessage('req');
                    Validate.displayErrorMessage(errorObj[key]);
                    window.accountErrorCounter++;
                }
                if (elementObj[key].type === 'checkbox' && !elementObj[key].checked) {
                    errorObj[key].innerHTML = Content.errorMessage('req');
                    Validate.displayErrorMessage(errorObj[key]);
                    window.accountErrorCounter++;
                }
            }
        });

        const $submit_msg = $('#submit-message');

        if (window.accountErrorCounter === 0) {
            Object.keys(errorObj).forEach(function (key) {
                if (errorObj[key].offsetParent !== null) {
                    errorObj[key].setAttribute('style', 'display:none');
                }
            });
            $submit_msg.removeClass('errorfield').text(localize('Processing your request...'));
            return 1;
        }
        // else
        $submit_msg.addClass('errorfield').text(localize('Please check the above form for pending errors.'));
        return 0;
    };

    const fireRequest = function() {
        JapanAccOpeningData.getJapanAcc(elementObj);
    };

    return {
        checkValidity: checkValidity,
        fireRequest  : fireRequest,
    };
})();

module.exports = {
    JapanAccOpeningUI: JapanAccOpeningUI,
};

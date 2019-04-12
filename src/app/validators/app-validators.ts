import { FormControl } from '@angular/forms';

export class AppValidators {
    static noSpecialChars(c: FormControl) {
        let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

        return REGEXP.test(c.value) ? {
            validateEmail: {
            valid: false
            }
        } : null;
    }

    static onlyDigits(c: FormControl) {
        let REGEXP = new RegExp(/^\d+$/);

        return REGEXP.test(c.value) ? null : {
            validatePhone: {
            valid: false
            }
        };
    }
}
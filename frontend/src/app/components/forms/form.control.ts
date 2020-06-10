import { FormControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn, Validators } from '@angular/forms';

export class CustomFormControl extends FormControl {

    private validatorOrList: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;

    constructor(formState?: any,
                validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(formState, validatorOrOpts, asyncValidator);
        this.validatorOrList = validatorOrOpts;
    }

    get validators(): any[] {
        const list = [];
        if (this.validatorOrList) {
            if (Array.isArray(this.validatorOrList)) {
                for (const key in this.validatorOrList) {
                    if (this.validatorOrList.hasOwnProperty(key)) {
                        const element = this.validatorOrList[key];
                        list.push(element.name);
                    }
                }
            } else {
                list.push(this.validatorOrList['name']);
            }
        }
        return list;
    }

    get required(): boolean {
        for (const key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                const element = this.validators[key];
                if (element === 'required' || element === Validators.required) {
                    return true;
                }
            }
        }
        return false;
    }

    public setRequired(required: boolean) {
        if (required) {
            this.setValidators([Validators.required]);
            this.validatorOrList = [Validators.required];
        } else {
            this.setValidators([]);
            this.setErrors(null);
            this.markAsUntouched();
            this.validatorOrList = [];
        }
    }

    public setFieldValidators(validators: Array<any>) {
        const validatorList: Array<any> = [];
        if (validators) {
            for (const key in validators) {
                if (validators.hasOwnProperty(key)) {
                    const element = validators[key];
                    if (element.toString() === 'true') {
                        validatorList.push(Validators.required);
                    } else {
                        validatorList.push(element);
                    }
                }
            }

            this.setValidators(validatorList);
            this.validatorOrList = validatorList;
        }
    }

    public removeFieldValidators() {
        this.setValidators([]);
        this.setErrors(null);
        this.markAsUntouched();
        this.validatorOrList = [];
    }
}

import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-multi-step-form',
    templateUrl: './multi-step-form.component.html',
    styleUrls: ['./multi-step-form.component.css'],
})
export class MultiStepFormComponent extends AppComponentBase implements OnInit {
    @Input() formContent: any;
    @Input() criterias;
    @Input() saving: boolean;
    @Input() assessmentId: number;

    @Input() items: any[];
    @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

    activeStepIndex: number;
    currentFormContent: Array<any>;
    formData: any;
    formFields: Array<Array<string>>;
    masterFormFields: Array<string>;
    stepItems: Array<any>;
    masterForm: Array<FormGroup>;

    constructor(private readonly _formBuilder: FormBuilder, private _cd: ChangeDetectorRef, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.activeStepIndex = 0;
        this.masterForm = [];
        this.currentFormContent = [];
        this.formFields = [];
        this.stepItems = this.formContent;

        this.stepItems.forEach((data, i) => {
            this.currentFormContent.push(this.stepItems[i]['data']); // holds name, validators, placeholder of all steps
            this.formFields.push(Object.keys(this.currentFormContent[i])); // holds string values for each field of all steps
            this.masterForm.push(this.buildForm(this.currentFormContent[i]));
            // holds all form groups
        });
    }

    // build separate FormGroups for each form
    buildForm(currentFormContent: any): FormGroup {
        const formDetails = Object.keys(currentFormContent).reduce((obj, key) => {
            obj[key] = ['', this.getValidators(currentFormContent[key])];

            return obj;
        }, {});
        return this._formBuilder.group(formDetails);
    }
    getFormTitle(key: string): string {
        let index = this.items.findIndex((m) => m.code == key);
        if (index != -1) {
            return this.items[index].name;
        }
        return key;
    }

    onFileChange(event: any): void {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.masterForm[this.activeStepIndex].patchValue({
                    file: reader.result,
                });

                // need to run CD since file load runs outside of zone
                this._cd.markForCheck();
            };
        }
    }

    // get validator(s) for each field, if any
    getValidators(formField: any): Validators {
        const fieldValidators = Object.keys(formField.validations).map((validator) => {
            if (validator === 'required') {
                return Validators[validator];
            } else {
                return Validators[validator](formField.validations[validator]);
            }
        });

        return fieldValidators;
    }

    // get validation error messages per error, per field
    getValidationMessage(formIndex: number, formFieldName: string): string {
        const formErrors = this.masterForm[formIndex].get(formFieldName).errors;
        const errorMessages = this.currentFormContent[formIndex][formFieldName].errors;
        const validationError = errorMessages[Object.keys(formErrors)[0]];

        return validationError;
    }

    goToStep(step: string): void {
        this.activeStepIndex = step === 'prev' ? this.activeStepIndex - 1 : this.activeStepIndex + 1;
        this.setFormPreview();
    }

    setFormPreview(): void {
        this.formData = this.masterForm.reduce(
            (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
            {}
        );

        this.masterFormFields = Object.keys(this.formData);
    }
    selectClass(form: FormGroup, field) {
        if ((form.get(field).dirty || form.get(field).touched) && form.get(field).invalid && form.get(field).errors) {
            return 'is-invalid';
        } else {
            return 'is-valid';
        }
    }
    onFormSubmit(): void {
        let form = [];
        console.log(this.criterias);

        Object.keys(this.formData).map((item, i) =>
            item.includes('comment') == false
                ? form.push({
                      AssessmentInfoId: this.assessmentId,
                      CriteriaId: this.criterias[item],
                      ResponseId: this.formData[item],
                      Comment:
                          this.formData[item + '-comment']?.length > 0 ? this.formData[item + '-comment'] : undefined,
                  })
                : null
        );
        this.formSubmit.emit(form);
    }

    trackByFn(index: number): number {
        return index;
    }
}

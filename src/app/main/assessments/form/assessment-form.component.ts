import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    AreasServiceProxy,
    AssessmentsInfoServiceProxy,
    CrtFindingsServiceProxy,
    RecommendationsServiceProxy,
    ResponsesServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { finalize, map } from 'rxjs/operators';

@Component({
    animations: [appModuleAnimation()],
    selector: 'app-assessment-form',
    templateUrl: './assessment-form.component.html',
    styleUrls: ['./assessment-form.component.css'],
})
export class AssessmentFormComponent extends AppComponentBase implements OnInit {
    areas = [];
    forms = new Array();
    id: number;
    submitted = false;
    disabled = false;
    assessment;
    responses;
    saving = false;
    currentArea = 0;
    formContent: any;
    formData: any;
    serverCriterias = {};
    findings: any;
    constructor(
        injector: Injector,
        private _areasServiceProxy: AreasServiceProxy,
        private _findingserviceProxy: CrtFindingsServiceProxy,
        private _responsesServiceProxy: ResponsesServiceProxy,
        private _assessmentssServiceProxy: AssessmentsInfoServiceProxy,
        private _recommendationsServiceProxy: RecommendationsServiceProxy,
        private route: ActivatedRoute
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.setTitle(this.l('FillAssessmentInformation'));
        this.route.params.subscribe((params) => {
            this.id = params['id']; //log the value of id
        });
        this.spinnerService.show();

        this.getResponses()
            .pipe(finalize(() => this.spinnerService.hide()))
            .subscribe((_) => {
                this.getAssessmentForm();
                this.spinnerService.hide();
            });
        this.formData = {};
    }
    getAssessmentFindings(id: number) {
        this._findingserviceProxy.getAssessmentCrtFindingForView(id).subscribe((res) => {
            this.findings = res;
        });
    }
    onFormSubmit(items) {
        this.saving = true;
        this._findingserviceProxy.createFindings(items).subscribe(
            (result) => {
                this.saving = false;
                this.submitted = true;
                this.getAssessmentFindings(this.assessment.assessmentInfo.id);
                this.notify.success(this.l('SuccessfullySaved'));
            },
            (error) => {
                this.saving = false;
                this.message.error(this.l('SomethingWentWrong'));
            }
        );
    }
    getResponses() {
        return this._responsesServiceProxy
            .getAll(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
            .pipe(
                map((res) => {
                    this.responses = res?.items?.map((item) => ({
                        name: item.response.name,
                        nameDari: item.response.nameDari,
                        namePashto: item.response.namePashto,
                        code: item.response.id,
                    }));
                })
            );
    }
    criteriaBadgeColor(name: string) {
        if (name.toLocaleLowerCase().includes('yes')) {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }

    getAssessmentForm() {
        this._assessmentssServiceProxy.getAssessmentInfoForView(this.id).subscribe((res) => {
            this.assessment = res;
            this._areasServiceProxy
                .getAreasWithDetails(this.assessment?.assessmentInfo?.facilityTypeId)
                .subscribe((result) => {
                    this.areas = result;
                    this.areas.forEach((areaItem) => {
                        areaItem.area?.sections.forEach((element) => {
                            element?.standards?.forEach((item) => {
                                const group: any = {};

                                if (item.criterias.length > 0) {
                                    item.criterias.forEach((el, i) => {
                                        this.serverCriterias[el.name] = el.id;
                                        group[el.name] = {
                                            type: 'radio',
                                            options: this.responses,
                                            validations: {
                                                required: true,
                                            },
                                            errors: {
                                                required: 'This field can not be left blank',
                                                minlength: 'Minimum length should be 4 characters',
                                            },
                                        };
                                        group[el.name + '-comment'] = {
                                            type: 'textarea',
                                            validations: {},
                                            errors: {},
                                            placeholder: 'Comment',
                                        };
                                    });
                                    this.forms.push({
                                        label: element.name,
                                        labelHelp: element.tip,
                                        area: areaItem.area?.name,
                                        standard: item.name,
                                        standardHelp: item.tip,
                                        data: group,
                                    });
                                }
                            });
                        });
                    });
                    this.forms.push({ label: 'Review & Submit', data: {} });
                    this.formContent = this.forms;
                });
        });
    }
}

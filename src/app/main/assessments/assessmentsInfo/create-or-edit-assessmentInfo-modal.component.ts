import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    AssessmentsInfoServiceProxy,
    CreateOrEditAssessmentInfoDto,
    AssessmentInfoFacilityTypeLookupTableDto,
    AssessmentInfoImplementerLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AssessmentInfoFacilityInfoLookupTableModalComponent } from './assessmentInfo-facilityInfo-lookup-table-modal.component';

@Component({
    selector: 'createOrEditAssessmentInfoModal',
    templateUrl: './create-or-edit-assessmentInfo-modal.component.html',
})
export class CreateOrEditAssessmentInfoModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('assessmentInfoFacilityInfoLookupTableModal', { static: true })
    assessmentInfoFacilityInfoLookupTableModal: AssessmentInfoFacilityInfoLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    assessmentInfo: CreateOrEditAssessmentInfoDto = new CreateOrEditAssessmentInfoDto();

    facilityInfoNameEnglish = '';
    facilityTypeNameEnglish = '';
    implementerFullName = '';

    allFacilityTypes: AssessmentInfoFacilityTypeLookupTableDto[];
    allImplementers: AssessmentInfoImplementerLookupTableDto[];

    constructor(
        injector: Injector,
        private _assessmentsInfoServiceProxy: AssessmentsInfoServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(assessmentInfoId?: number): void {
        if (!assessmentInfoId) {
            this.assessmentInfo = new CreateOrEditAssessmentInfoDto();
            this.assessmentInfo.id = assessmentInfoId;
            this.assessmentInfo.assessmentDate = this._dateTimeService.getStartOfDay();
            this.facilityInfoNameEnglish = '';
            this.facilityTypeNameEnglish = '';
            this.implementerFullName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._assessmentsInfoServiceProxy.getAssessmentInfoForEdit(assessmentInfoId).subscribe((result) => {
                this.assessmentInfo = result.assessmentInfo;

                this.facilityInfoNameEnglish = result.facilityInfoNameEnglish;
                this.facilityTypeNameEnglish = result.facilityTypeNameEnglish;
                this.implementerFullName = result.implementerFullName;

                this.active = true;
                this.modal.show();
            });
        }
        this._assessmentsInfoServiceProxy.getAllFacilityTypeForTableDropdown().subscribe((result) => {
            this.allFacilityTypes = result;
        });
        this._assessmentsInfoServiceProxy.getAllImplementerForTableDropdown().subscribe((result) => {
            this.allImplementers = result;
        });
    }

    save(): void {
        this.saving = true;

        this._assessmentsInfoServiceProxy
            .createOrEdit(this.assessmentInfo)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    openSelectFacilityInfoModal() {
        this.assessmentInfoFacilityInfoLookupTableModal.id = this.assessmentInfo.facilityInfoId;
        this.assessmentInfoFacilityInfoLookupTableModal.displayName = this.facilityInfoNameEnglish;
        this.assessmentInfoFacilityInfoLookupTableModal.show();
    }

    setFacilityInfoIdNull() {
        this.assessmentInfo.facilityInfoId = null;
        this.facilityInfoNameEnglish = '';
    }

    getNewFacilityInfoId() {
        this.assessmentInfo.facilityInfoId = this.assessmentInfoFacilityInfoLookupTableModal.id;
        this.facilityInfoNameEnglish = this.assessmentInfoFacilityInfoLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}

import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    CriteriasServiceProxy,
    CreateOrEditCriteriaDto,
    CriteriaStandardLookupTableDto,
    CriteriaFacilityTypeLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditCriteriaModal',
    templateUrl: './create-or-edit-criteria-modal.component.html',
})
export class CreateOrEditCriteriaModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    criteria: CreateOrEditCriteriaDto = new CreateOrEditCriteriaDto();

    standardNameEnglish = '';
    facilityTypeNameEnglish = '';

    allStandards: CriteriaStandardLookupTableDto[];
    allFacilityTypes: CriteriaFacilityTypeLookupTableDto[];

    constructor(
        injector: Injector,
        private _criteriasServiceProxy: CriteriasServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(criteriaId?: number): void {
        if (!criteriaId) {
            this.criteria = new CreateOrEditCriteriaDto();
            this.criteria.id = criteriaId;
            this.standardNameEnglish = '';
            this.facilityTypeNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._criteriasServiceProxy.getCriteriaForEdit(criteriaId).subscribe((result) => {
                this.criteria = result.criteria;

                this.standardNameEnglish = result.standardNameEnglish;
                this.facilityTypeNameEnglish = result.facilityTypeNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._criteriasServiceProxy.getAllStandardForTableDropdown().subscribe((result) => {
            this.allStandards = result;
        });
        this._criteriasServiceProxy.getAllFacilityTypeForTableDropdown().subscribe((result) => {
            this.allFacilityTypes = result;
        });
    }

    save(): void {
        this.saving = true;

        this._criteriasServiceProxy
            .createOrEdit(this.criteria)
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

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}

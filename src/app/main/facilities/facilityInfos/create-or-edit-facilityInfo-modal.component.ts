import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    FacilityInfosServiceProxy,
    CreateOrEditFacilityInfoDto,
    FacilityInfoDistrictLookupTableDto,
    FacilityInfoFacilityTypeLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditFacilityInfoModal',
    templateUrl: './create-or-edit-facilityInfo-modal.component.html',
})
export class CreateOrEditFacilityInfoModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    facilityInfo: CreateOrEditFacilityInfoDto = new CreateOrEditFacilityInfoDto();

    districtNameEnglish = '';
    facilityTypeNameEnglish = '';

    allDistricts: FacilityInfoDistrictLookupTableDto[];
    allFacilityTypes: FacilityInfoFacilityTypeLookupTableDto[];

    constructor(
        injector: Injector,
        private _facilityInfosServiceProxy: FacilityInfosServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(facilityInfoId?: number): void {
        if (!facilityInfoId) {
            this.facilityInfo = new CreateOrEditFacilityInfoDto();
            this.facilityInfo.id = facilityInfoId;
            this.districtNameEnglish = '';
            this.facilityTypeNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._facilityInfosServiceProxy.getFacilityInfoForEdit(facilityInfoId).subscribe((result) => {
                this.facilityInfo = result.facilityInfo;

                this.districtNameEnglish = result.districtNameEnglish;
                this.facilityTypeNameEnglish = result.facilityTypeNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._facilityInfosServiceProxy.getAllDistrictForTableDropdown().subscribe((result) => {
            this.allDistricts = result;
        });
        this._facilityInfosServiceProxy.getAllFacilityTypeForTableDropdown().subscribe((result) => {
            this.allFacilityTypes = result;
        });
    }

    save(): void {
        this.saving = true;

        this._facilityInfosServiceProxy
            .createOrEdit(this.facilityInfo)
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

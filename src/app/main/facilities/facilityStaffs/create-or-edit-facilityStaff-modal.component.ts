import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    FacilityStaffsServiceProxy,
    CreateOrEditFacilityStaffDto,
    FacilityStaffGenderLookupTableDto,
    FacilityStaffPositionLookupTableDto,
    FacilityStaffSpecialityLookupTableDto,
    FacilityStaffFacilityTypeLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { FacilityStaffFacilityInfoLookupTableModalComponent } from './facilityStaff-facilityInfo-lookup-table-modal.component';

@Component({
    selector: 'createOrEditFacilityStaffModal',
    templateUrl: './create-or-edit-facilityStaff-modal.component.html',
})
export class CreateOrEditFacilityStaffModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('facilityStaffFacilityInfoLookupTableModal', { static: true })
    facilityStaffFacilityInfoLookupTableModal: FacilityStaffFacilityInfoLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    facilityStaff: CreateOrEditFacilityStaffDto = new CreateOrEditFacilityStaffDto();

    genderNameEnglish = '';
    positionNameEnglish = '';
    specialityNameEnglish = '';
    facilityInfoNameEnglish = '';
    facilityTypeNameShort = '';

    allGenders: FacilityStaffGenderLookupTableDto[];
    allPositions: FacilityStaffPositionLookupTableDto[];
    allSpecialitys: FacilityStaffSpecialityLookupTableDto[];
    allFacilityTypes: FacilityStaffFacilityTypeLookupTableDto[];

    constructor(
        injector: Injector,
        private _facilityStaffsServiceProxy: FacilityStaffsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(facilityStaffId?: number): void {
        if (!facilityStaffId) {
            this.facilityStaff = new CreateOrEditFacilityStaffDto();
            this.facilityStaff.id = facilityStaffId;
            this.genderNameEnglish = '';
            this.positionNameEnglish = '';
            this.specialityNameEnglish = '';
            this.facilityInfoNameEnglish = '';
            this.facilityTypeNameShort = '';

            this.active = true;
            this.modal.show();
        } else {
            this._facilityStaffsServiceProxy.getFacilityStaffForEdit(facilityStaffId).subscribe((result) => {
                this.facilityStaff = result.facilityStaff;

                this.genderNameEnglish = result.genderNameEnglish;
                this.positionNameEnglish = result.positionNameEnglish;
                this.specialityNameEnglish = result.specialityNameEnglish;
                this.facilityInfoNameEnglish = result.facilityInfoNameEnglish;
                this.facilityTypeNameShort = result.facilityTypeNameShort;

                this.active = true;
                this.modal.show();
            });
        }
        this._facilityStaffsServiceProxy.getAllGenderForTableDropdown().subscribe((result) => {
            this.allGenders = result;
        });
        this._facilityStaffsServiceProxy.getAllPositionForTableDropdown().subscribe((result) => {
            this.allPositions = result;
        });
        this._facilityStaffsServiceProxy.getAllSpecialityForTableDropdown().subscribe((result) => {
            this.allSpecialitys = result;
        });
        this._facilityStaffsServiceProxy.getAllFacilityTypeForTableDropdown().subscribe((result) => {
            this.allFacilityTypes = result;
        });
    }

    save(): void {
        this.saving = true;

        this._facilityStaffsServiceProxy
            .createOrEdit(this.facilityStaff)
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
        this.facilityStaffFacilityInfoLookupTableModal.id = this.facilityStaff.facilityInfoId;
        this.facilityStaffFacilityInfoLookupTableModal.displayName = this.facilityInfoNameEnglish;
        this.facilityStaffFacilityInfoLookupTableModal.show();
    }

    setFacilityInfoIdNull() {
        this.facilityStaff.facilityInfoId = null;
        this.facilityInfoNameEnglish = '';
    }

    getNewFacilityInfoId() {
        this.facilityStaff.facilityInfoId = this.facilityStaffFacilityInfoLookupTableModal.id;
        this.facilityInfoNameEnglish = this.facilityStaffFacilityInfoLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}

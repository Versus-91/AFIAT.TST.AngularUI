import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    DistrictsServiceProxy,
    CreateOrEditDistrictDto,
    DistrictProvinceLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditDistrictModal',
    templateUrl: './create-or-edit-district-modal.component.html',
})
export class CreateOrEditDistrictModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    district: CreateOrEditDistrictDto = new CreateOrEditDistrictDto();

    provinceNameEnglish = '';

    allProvinces: DistrictProvinceLookupTableDto[];

    constructor(
        injector: Injector,
        private _districtsServiceProxy: DistrictsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(districtId?: number): void {
        if (!districtId) {
            this.district = new CreateOrEditDistrictDto();
            this.district.id = districtId;
            this.provinceNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._districtsServiceProxy.getDistrictForEdit(districtId).subscribe((result) => {
                this.district = result.district;

                this.provinceNameEnglish = result.provinceNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._districtsServiceProxy.getAllProvinceForTableDropdown().subscribe((result) => {
            this.allProvinces = result;
        });
    }

    save(): void {
        this.saving = true;

        this._districtsServiceProxy
            .createOrEdit(this.district)
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

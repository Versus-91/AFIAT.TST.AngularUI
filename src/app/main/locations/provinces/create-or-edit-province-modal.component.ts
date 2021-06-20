import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ProvincesServiceProxy, CreateOrEditProvinceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditProvinceModal',
    templateUrl: './create-or-edit-province-modal.component.html',
})
export class CreateOrEditProvinceModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    province: CreateOrEditProvinceDto = new CreateOrEditProvinceDto();

    constructor(
        injector: Injector,
        private _provincesServiceProxy: ProvincesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(provinceId?: number): void {
        if (!provinceId) {
            this.province = new CreateOrEditProvinceDto();
            this.province.id = provinceId;

            this.active = true;
            this.modal.show();
        } else {
            this._provincesServiceProxy.getProvinceForEdit(provinceId).subscribe((result) => {
                this.province = result.province;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._provincesServiceProxy
            .createOrEdit(this.province)
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

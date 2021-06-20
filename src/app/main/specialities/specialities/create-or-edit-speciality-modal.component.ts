import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { SpecialitiesServiceProxy, CreateOrEditSpecialityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditSpecialityModal',
    templateUrl: './create-or-edit-speciality-modal.component.html',
})
export class CreateOrEditSpecialityModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    speciality: CreateOrEditSpecialityDto = new CreateOrEditSpecialityDto();

    constructor(
        injector: Injector,
        private _specialitiesServiceProxy: SpecialitiesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(specialityId?: number): void {
        if (!specialityId) {
            this.speciality = new CreateOrEditSpecialityDto();
            this.speciality.id = specialityId;

            this.active = true;
            this.modal.show();
        } else {
            this._specialitiesServiceProxy.getSpecialityForEdit(specialityId).subscribe((result) => {
                this.speciality = result.speciality;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._specialitiesServiceProxy
            .createOrEdit(this.speciality)
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

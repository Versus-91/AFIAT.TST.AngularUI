import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AreasServiceProxy, CreateOrEditAreaDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditAreaModal',
    templateUrl: './create-or-edit-area-modal.component.html',
})
export class CreateOrEditAreaModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    area: CreateOrEditAreaDto = new CreateOrEditAreaDto();

    constructor(
        injector: Injector,
        private _areasServiceProxy: AreasServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(areaId?: number): void {
        if (!areaId) {
            this.area = new CreateOrEditAreaDto();
            this.area.id = areaId;

            this.active = true;
            this.modal.show();
        } else {
            this._areasServiceProxy.getAreaForEdit(areaId).subscribe((result) => {
                this.area = result.area;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._areasServiceProxy
            .createOrEdit(this.area)
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

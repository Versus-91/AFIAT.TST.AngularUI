import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { PositionsServiceProxy, CreateOrEditPositionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditPositionModal',
    templateUrl: './create-or-edit-position-modal.component.html',
})
export class CreateOrEditPositionModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    position: CreateOrEditPositionDto = new CreateOrEditPositionDto();

    constructor(
        injector: Injector,
        private _positionsServiceProxy: PositionsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(positionId?: number): void {
        if (!positionId) {
            this.position = new CreateOrEditPositionDto();
            this.position.id = positionId;

            this.active = true;
            this.modal.show();
        } else {
            this._positionsServiceProxy.getPositionForEdit(positionId).subscribe((result) => {
                this.position = result.position;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._positionsServiceProxy
            .createOrEdit(this.position)
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

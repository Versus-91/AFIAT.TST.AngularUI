import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ImplementersServiceProxy, CreateOrEditImplementerDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditImplementerModal',
    templateUrl: './create-or-edit-implementer-modal.component.html',
})
export class CreateOrEditImplementerModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    implementer: CreateOrEditImplementerDto = new CreateOrEditImplementerDto();

    constructor(
        injector: Injector,
        private _implementersServiceProxy: ImplementersServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(implementerId?: number): void {
        if (!implementerId) {
            this.implementer = new CreateOrEditImplementerDto();
            this.implementer.id = implementerId;

            this.active = true;
            this.modal.show();
        } else {
            this._implementersServiceProxy.getImplementerForEdit(implementerId).subscribe((result) => {
                this.implementer = result.implementer;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._implementersServiceProxy
            .createOrEdit(this.implementer)
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

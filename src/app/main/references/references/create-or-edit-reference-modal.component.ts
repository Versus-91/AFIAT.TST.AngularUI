import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ReferencesServiceProxy, CreateOrEditReferenceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditReferenceModal',
    templateUrl: './create-or-edit-reference-modal.component.html',
})
export class CreateOrEditReferenceModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    reference: CreateOrEditReferenceDto = new CreateOrEditReferenceDto();

    constructor(
        injector: Injector,
        private _referencesServiceProxy: ReferencesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(referenceId?: number): void {
        if (!referenceId) {
            this.reference = new CreateOrEditReferenceDto();
            this.reference.id = referenceId;

            this.active = true;
            this.modal.show();
        } else {
            this._referencesServiceProxy.getReferenceForEdit(referenceId).subscribe((result) => {
                this.reference = result.reference;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._referencesServiceProxy
            .createOrEdit(this.reference)
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

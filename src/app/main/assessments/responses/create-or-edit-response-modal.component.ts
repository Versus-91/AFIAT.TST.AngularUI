import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ResponsesServiceProxy, CreateOrEditResponseDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditResponseModal',
    templateUrl: './create-or-edit-response-modal.component.html',
})
export class CreateOrEditResponseModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    response: CreateOrEditResponseDto = new CreateOrEditResponseDto();

    constructor(
        injector: Injector,
        private _responsesServiceProxy: ResponsesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(responseId?: number): void {
        if (!responseId) {
            this.response = new CreateOrEditResponseDto();
            this.response.id = responseId;

            this.active = true;
            this.modal.show();
        } else {
            this._responsesServiceProxy.getResponseForEdit(responseId).subscribe((result) => {
                this.response = result.response;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._responsesServiceProxy
            .createOrEdit(this.response)
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

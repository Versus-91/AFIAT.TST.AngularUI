import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { FollowupRoundsServiceProxy, CreateOrEditFollowupRoundDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditFollowupRoundModal',
    templateUrl: './create-or-edit-followupRound-modal.component.html',
})
export class CreateOrEditFollowupRoundModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    followupRound: CreateOrEditFollowupRoundDto = new CreateOrEditFollowupRoundDto();

    constructor(
        injector: Injector,
        private _followupRoundsServiceProxy: FollowupRoundsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(followupRoundId?: number): void {
        if (!followupRoundId) {
            this.followupRound = new CreateOrEditFollowupRoundDto();
            this.followupRound.id = followupRoundId;

            this.active = true;
            this.modal.show();
        } else {
            this._followupRoundsServiceProxy.getFollowupRoundForEdit(followupRoundId).subscribe((result) => {
                this.followupRound = result.followupRound;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._followupRoundsServiceProxy
            .createOrEdit(this.followupRound)
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

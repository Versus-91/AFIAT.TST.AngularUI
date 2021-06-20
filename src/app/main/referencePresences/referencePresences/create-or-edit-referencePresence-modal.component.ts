import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CreateOrEditReferencePresenceDto,
    ReferencePresenceFollowupVisitLookupTableDto,
    ReferencePresenceReferenceLookupTableDto,
    ReferencePresencesServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'createOrEditReferencePresenceModal',
    templateUrl: './create-or-edit-referencePresence-modal.component.html',
})
export class CreateOrEditReferencePresenceModalComponent extends AppComponentBase implements OnInit {
    @Input() id;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    referencePresence: CreateOrEditReferencePresenceDto = new CreateOrEditReferencePresenceDto();

    followupVisitAssessorNames = '';
    referenceNameEnglish = '';

    allFollowupVisits: ReferencePresenceFollowupVisitLookupTableDto[];
    allReferences: ReferencePresenceReferenceLookupTableDto[];

    constructor(
        injector: Injector,
        private _referencePresencesServiceProxy: ReferencePresencesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(referencePresenceId?: number): void {
        if (!referencePresenceId) {
            this.referencePresence = new CreateOrEditReferencePresenceDto();
            this.referencePresence.id = referencePresenceId;
            this.referencePresence.checkDate = this._dateTimeService.getStartOfDay();
            this.followupVisitAssessorNames = '';
            this.referenceNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._referencePresencesServiceProxy
                .getReferencePresenceForEdit(referencePresenceId)
                .subscribe((result) => {
                    this.referencePresence = result.referencePresence;

                    this.followupVisitAssessorNames = result.followupVisitAssessorNames;
                    this.referenceNameEnglish = result.referenceNameEnglish;

                    this.active = true;
                    this.modal.show();
                });
        }
        this._referencePresencesServiceProxy.getAllFollowupVisitForTableDropdown().subscribe((result) => {
            this.allFollowupVisits = result;
        });
        this._referencePresencesServiceProxy.getAllReferenceForTableDropdown().subscribe((result) => {
            this.allReferences = result;
        });
    }

    save(): void {
        this.saving = true;
        this.referencePresence.followupVisitId = this.id;
        this._referencePresencesServiceProxy
            .createOrEdit(this.referencePresence)
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

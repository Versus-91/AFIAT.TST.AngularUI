import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CreateOrEditFollowupVisitDto,
    FollowupVisitAssessmentInfoLookupTableDto,
    FollowupVisitFollowupRoundLookupTableDto,
    FollowupVisitImplementerLookupTableDto,
    FollowupVisitsServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'createOrEditFollowupVisitModal',
    templateUrl: './create-or-edit-followupVisit-modal.component.html',
})
export class CreateOrEditFollowupVisitModalComponent extends AppComponentBase implements OnInit {
    @Input() assessmentId;
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    followupVisit: CreateOrEditFollowupVisitDto = new CreateOrEditFollowupVisitDto();

    followupRoundNameEnglish = '';
    implementerFullName = '';
    assessmentInfoNameShort = '';

    allFollowupRounds: FollowupVisitFollowupRoundLookupTableDto[];
    allImplementers: FollowupVisitImplementerLookupTableDto[];
    allAssessmentInfos: FollowupVisitAssessmentInfoLookupTableDto[];

    constructor(
        injector: Injector,
        private _followupVisitsServiceProxy: FollowupVisitsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(followupVisitId?: number): void {
        if (!followupVisitId) {
            this.followupVisit = new CreateOrEditFollowupVisitDto();
            this.followupVisit.id = followupVisitId;
            this.followupVisit.followDate = this._dateTimeService.getStartOfDay();
            this.followupRoundNameEnglish = '';
            this.implementerFullName = '';
            this.assessmentInfoNameShort = '';

            this.active = true;
            this.modal.show();
        } else {
            this._followupVisitsServiceProxy.getFollowupVisitForEdit(followupVisitId).subscribe((result) => {
                this.followupVisit = result.followupVisit;

                this.followupRoundNameEnglish = result.followupRoundNameEnglish;
                this.implementerFullName = result.implementerFullName;
                this.assessmentInfoNameShort = result.assessmentInfoNameShort;

                this.active = true;
                this.modal.show();
            });
        }
        this._followupVisitsServiceProxy.getAllFollowupRoundForTableDropdown().subscribe((result) => {
            this.allFollowupRounds = result;
        });
        this._followupVisitsServiceProxy.getAllImplementerForTableDropdown().subscribe((result) => {
            this.allImplementers = result;
        });
        this._followupVisitsServiceProxy.getAllAssessmentInfoForTableDropdown().subscribe((result) => {
            this.allAssessmentInfos = result;
        });
    }

    save(): void {
        this.saving = true;
        this.followupVisit.assessmentInfoId = this.assessmentId;
        this._followupVisitsServiceProxy
            .createOrEdit(this.followupVisit)
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

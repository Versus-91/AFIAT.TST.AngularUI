import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CreateOrEditWallChartPresenceDto,
    WallChartPresenceFollowupVisitLookupTableDto,
    WallChartPresencesServiceProxy,
    WallChartPresenceWellChartLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'createOrEditWallChartPresenceModal',
    templateUrl: './create-or-edit-wallChartPresence-modal.component.html',
})
export class CreateOrEditWallChartPresenceModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Input() id;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    wallChartPresence: CreateOrEditWallChartPresenceDto = new CreateOrEditWallChartPresenceDto();

    followupVisitAssessorNames = '';
    wellChartNameEnglish = '';

    allFollowupVisits: WallChartPresenceFollowupVisitLookupTableDto[];
    allWellCharts: WallChartPresenceWellChartLookupTableDto[];

    constructor(
        injector: Injector,
        private _wallChartPresencesServiceProxy: WallChartPresencesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(wallChartPresenceId?: number): void {
        if (!wallChartPresenceId) {
            this.wallChartPresence = new CreateOrEditWallChartPresenceDto();
            this.wallChartPresence.id = wallChartPresenceId;
            this.wallChartPresence.checkDate = this._dateTimeService.getStartOfDay();
            this.followupVisitAssessorNames = '';
            this.wellChartNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._wallChartPresencesServiceProxy
                .getWallChartPresenceForEdit(wallChartPresenceId)
                .subscribe((result) => {
                    this.wallChartPresence = result.wallChartPresence;

                    this.followupVisitAssessorNames = result.followupVisitAssessorNames;
                    this.wellChartNameEnglish = result.wellChartNameEnglish;

                    this.active = true;
                    this.modal.show();
                });
        }
        this._wallChartPresencesServiceProxy.getAllFollowupVisitForTableDropdown().subscribe((result) => {
            this.allFollowupVisits = result;
        });
        this._wallChartPresencesServiceProxy.getAllWellChartForTableDropdown().subscribe((result) => {
            this.allWellCharts = result;
        });
    }

    save(): void {
        this.saving = true;
        this.wallChartPresence.followupVisitId = this.id;
        this._wallChartPresencesServiceProxy
            .createOrEdit(this.wallChartPresence)
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

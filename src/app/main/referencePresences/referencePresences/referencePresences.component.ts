import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    ReferencePresenceDto,
    ReferencePresencesServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditReferencePresenceModalComponent } from './create-or-edit-referencePresence-modal.component';
import { ViewReferencePresenceModalComponent } from './view-referencePresence-modal.component';

@Component({
    selector: 'app-reference-presence',
    templateUrl: './referencePresences.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class ReferencePresencesComponent extends AppComponentBase {
    @Input() followUpId;
    @ViewChild('createOrEditReferencePresenceModal', { static: true })
    createOrEditReferencePresenceModal: CreateOrEditReferencePresenceModalComponent;
    @ViewChild('viewReferencePresenceModalComponent', { static: true })
    viewReferencePresenceModal: ViewReferencePresenceModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxCheckDateFilter: DateTime;
    minCheckDateFilter: DateTime;
    isPresentFilter = -1;
    suppliedFilter = -1;
    commentFilter = '';
    followupVisitAssessorNamesFilter = '';
    referenceNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _referencePresencesServiceProxy: ReferencePresencesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getReferencePresences(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._referencePresencesServiceProxy
            .getAll(
                this.filterText,
                this.maxCheckDateFilter === undefined
                    ? this.maxCheckDateFilter
                    : this._dateTimeService.getEndOfDayForDate(this.maxCheckDateFilter),
                this.minCheckDateFilter === undefined
                    ? this.minCheckDateFilter
                    : this._dateTimeService.getStartOfDayForDate(this.minCheckDateFilter),
                this.isPresentFilter,
                this.suppliedFilter,
                this.commentFilter,
                this.followupVisitAssessorNamesFilter,
                this.referenceNameEnglishFilter,
                this.followUpId,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createReferencePresence(): void {
        this.createOrEditReferencePresenceModal.show();
    }

    deleteReferencePresence(referencePresence: ReferencePresenceDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._referencePresencesServiceProxy.delete(referencePresence.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

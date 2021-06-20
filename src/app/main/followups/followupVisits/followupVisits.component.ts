import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    FollowupVisitDto,
    FollowupVisitsServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditFollowupVisitModalComponent } from './create-or-edit-followupVisit-modal.component';
import { ViewFollowupVisitModalComponent } from './view-followupVisit-modal.component';

@Component({
    selector: 'app-followup-visits',
    templateUrl: './followupVisits.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class FollowupVisitsComponent extends AppComponentBase {
    @Input() assessmentId;
    @ViewChild('createOrEditFollowupVisitModal', { static: true })
    createOrEditFollowupVisitModal: CreateOrEditFollowupVisitModalComponent;
    @ViewChild('viewFollowupVisitModalComponent', { static: true })
    viewFollowupVisitModal: ViewFollowupVisitModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxFollowDateFilter: DateTime;
    minFollowDateFilter: DateTime;
    assessorNamesFilter = '';
    followupRoundNameEnglishFilter = '';
    implementerFullNameFilter = '';
    assessmentInfoNameShortFilter = '';

    constructor(
        injector: Injector,
        private _followupVisitsServiceProxy: FollowupVisitsServiceProxy,
        private _notifyService: NotifyService,
        private _titleService: Title,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getFollowupVisits(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._followupVisitsServiceProxy
            .getAll(
                this.filterText,
                this.maxFollowDateFilter === undefined
                    ? this.maxFollowDateFilter
                    : this._dateTimeService.getEndOfDayForDate(this.maxFollowDateFilter),
                this.minFollowDateFilter === undefined
                    ? this.minFollowDateFilter
                    : this._dateTimeService.getStartOfDayForDate(this.minFollowDateFilter),
                this.assessorNamesFilter,
                this.followupRoundNameEnglishFilter,
                this.implementerFullNameFilter,
                this.assessmentInfoNameShortFilter,
                this.assessmentId,
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

    createFollowupVisit(): void {
        this.createOrEditFollowupVisitModal.show();
    }

    deleteFollowupVisit(followupVisit: FollowupVisitDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._followupVisitsServiceProxy.delete(followupVisit.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

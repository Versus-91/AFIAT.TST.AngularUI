import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    TokenAuthServiceProxy,
    WallChartPresenceDto,
    WallChartPresencesServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditWallChartPresenceModalComponent } from './create-or-edit-wallChartPresence-modal.component';
import { ViewWallChartPresenceModalComponent } from './view-wallChartPresence-modal.component';

@Component({
    selector: 'app-wallchart-presence',
    templateUrl: './wallChartPresences.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class WallChartPresencesComponent extends AppComponentBase {
    @ViewChild('createOrEditWallChartPresenceModal', { static: true })
    createOrEditWallChartPresenceModal: CreateOrEditWallChartPresenceModalComponent;
    @ViewChild('viewWallChartPresenceModalComponent', { static: true })
    viewWallChartPresenceModal: ViewWallChartPresenceModalComponent;
    @Input() followUpId;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxCheckDateFilter: DateTime;
    minCheckDateFilter: DateTime;
    isPresentFilter = -1;
    maxNumeratorFilter: number;
    maxNumeratorFilterEmpty: number;
    minNumeratorFilter: number;
    minNumeratorFilterEmpty: number;
    maxDenominatorFilter: number;
    maxDenominatorFilterEmpty: number;
    minDenominatorFilter: number;
    minDenominatorFilterEmpty: number;
    commentFilter = '';
    followupVisitAssessorNamesFilter = '';
    wellChartNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _wallChartPresencesServiceProxy: WallChartPresencesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getWallChartPresences(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._wallChartPresencesServiceProxy
            .getAll(
                this.filterText,
                this.maxCheckDateFilter === undefined
                    ? this.maxCheckDateFilter
                    : this._dateTimeService.getEndOfDayForDate(this.maxCheckDateFilter),
                this.minCheckDateFilter === undefined
                    ? this.minCheckDateFilter
                    : this._dateTimeService.getStartOfDayForDate(this.minCheckDateFilter),
                this.isPresentFilter,
                this.maxNumeratorFilter == null ? this.maxNumeratorFilterEmpty : this.maxNumeratorFilter,
                this.minNumeratorFilter == null ? this.minNumeratorFilterEmpty : this.minNumeratorFilter,
                this.maxDenominatorFilter == null ? this.maxDenominatorFilterEmpty : this.maxDenominatorFilter,
                this.minDenominatorFilter == null ? this.minDenominatorFilterEmpty : this.minDenominatorFilter,
                this.commentFilter,
                this.followupVisitAssessorNamesFilter,
                this.wellChartNameEnglishFilter,
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

    createWallChartPresence(): void {
        this.createOrEditWallChartPresenceModal.show();
    }

    deleteWallChartPresence(wallChartPresence: WallChartPresenceDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._wallChartPresencesServiceProxy.delete(wallChartPresence.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

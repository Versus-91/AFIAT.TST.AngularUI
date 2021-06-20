import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CapacityBuildingDto,
    CapacityBuildingsServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditCapacityBuildingModalComponent } from './create-or-edit-capacityBuilding-modal.component';
import { ViewCapacityBuildingModalComponent } from './view-capacityBuilding-modal.component';

@Component({
    selector: 'app-capacitybuilding',
    templateUrl: './capacityBuildings.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class CapacityBuildingsComponent extends AppComponentBase {
    @Input() followUpId;
    @ViewChild('createOrEditCapacityBuildingModal', { static: true })
    createOrEditCapacityBuildingModal: CreateOrEditCapacityBuildingModalComponent;
    @ViewChild('viewCapacityBuildingModalComponent', { static: true })
    viewCapacityBuildingModal: ViewCapacityBuildingModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    venueFilter = '';
    maxStartDateFilter: DateTime;
    minStartDateFilter: DateTime;
    maxEndDateFilter: DateTime;
    minEndDateFilter: DateTime;
    isRefresherFilter = -1;
    followupVisitAssessorNamesFilter = '';
    courseNameEnglishFilter = '';
    courseTypeNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _capacityBuildingsServiceProxy: CapacityBuildingsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getCapacityBuildings(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._capacityBuildingsServiceProxy
            .getAll(
                this.filterText,
                this.venueFilter,
                this.maxStartDateFilter === undefined
                    ? this.maxStartDateFilter
                    : this._dateTimeService.getEndOfDayForDate(this.maxStartDateFilter),
                this.minStartDateFilter === undefined
                    ? this.minStartDateFilter
                    : this._dateTimeService.getStartOfDayForDate(this.minStartDateFilter),
                this.maxEndDateFilter === undefined
                    ? this.maxEndDateFilter
                    : this._dateTimeService.getEndOfDayForDate(this.maxEndDateFilter),
                this.minEndDateFilter === undefined
                    ? this.minEndDateFilter
                    : this._dateTimeService.getStartOfDayForDate(this.minEndDateFilter),
                this.isRefresherFilter,
                this.followupVisitAssessorNamesFilter,
                this.courseNameEnglishFilter,
                this.courseTypeNameEnglishFilter,
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

    createCapacityBuilding(): void {
        this.createOrEditCapacityBuildingModal.show();
    }

    deleteCapacityBuilding(capacityBuilding: CapacityBuildingDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._capacityBuildingsServiceProxy.delete(capacityBuilding.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

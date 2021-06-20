import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    AssessmentInfoDto,
    AssessmentsInfoServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditAssessmentInfoModalComponent } from './create-or-edit-assessmentInfo-modal.component';
import { ViewAssessmentInfoModalComponent } from './view-assessmentInfo-modal.component';

@Component({
    templateUrl: './assessmentsInfo.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class AssessmentsInfoComponent extends AppComponentBase {
    @ViewChild('createOrEditAssessmentInfoModal', { static: true })
    createOrEditAssessmentInfoModal: CreateOrEditAssessmentInfoModalComponent;
    @ViewChild('viewAssessmentInfoModalComponent', { static: true })
    viewAssessmentInfoModal: ViewAssessmentInfoModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    products = [];
    advancedFiltersAreShown = false;
    filterText = '';
    assessorNamesFilter = '';
    nameShortFilter = '';
    maxAssessmentDateFilter: DateTime;
    minAssessmentDateFilter: DateTime;
    facilityInfoNameEnglishFilter = '';
    facilityTypeNameEnglishFilter = '';
    implementerFullNameFilter = '';

    constructor(
        injector: Injector,
        private _assessmentsInfoServiceProxy: AssessmentsInfoServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('AssessmentsInfo'));
    }

    getAssessmentsInfo(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._assessmentsInfoServiceProxy
            .getAll(
                this.filterText,
                this.assessorNamesFilter,
                this.nameShortFilter,
                this.maxAssessmentDateFilter === undefined
                    ? this.maxAssessmentDateFilter
                    : this._dateTimeService.getEndOfDayForDate(this.maxAssessmentDateFilter),
                this.minAssessmentDateFilter === undefined
                    ? this.minAssessmentDateFilter
                    : this._dateTimeService.getStartOfDayForDate(this.minAssessmentDateFilter),
                this.facilityInfoNameEnglishFilter,
                this.facilityTypeNameEnglishFilter,
                this.implementerFullNameFilter,
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

    createAssessmentInfo(): void {
        this.createOrEditAssessmentInfoModal.show();
    }

    deleteAssessmentInfo(assessmentInfo: AssessmentInfoDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._assessmentsInfoServiceProxy.delete(assessmentInfo.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

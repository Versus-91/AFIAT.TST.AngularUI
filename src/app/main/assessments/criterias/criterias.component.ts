import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CriteriaDto, CriteriasServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditCriteriaModalComponent } from './create-or-edit-criteria-modal.component';
import { ViewCriteriaModalComponent } from './view-criteria-modal.component';

@Component({
    templateUrl: './criterias.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class CriteriasComponent extends AppComponentBase {
    @ViewChild('createOrEditCriteriaModal', { static: true })
    createOrEditCriteriaModal: CreateOrEditCriteriaModalComponent;
    @ViewChild('viewCriteriaModalComponent', { static: true }) viewCriteriaModal: ViewCriteriaModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';
    standardNameEnglishFilter = '';
    facilityTypeNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _criteriasServiceProxy: CriteriasServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('Criterias'));
    }

    getCriterias(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._criteriasServiceProxy
            .getAll(
                this.filterText,
                this.nameEnglishFilter,
                this.standardNameEnglishFilter,
                this.facilityTypeNameEnglishFilter,
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

    createCriteria(): void {
        this.createOrEditCriteriaModal.show();
    }

    deleteCriteria(criteria: CriteriaDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._criteriasServiceProxy.delete(criteria.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

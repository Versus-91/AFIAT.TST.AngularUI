import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DistrictDto, DistrictsServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditDistrictModalComponent } from './create-or-edit-district-modal.component';
import { ViewDistrictModalComponent } from './view-district-modal.component';

@Component({
    templateUrl: './districts.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class DistrictsComponent extends AppComponentBase {
    @ViewChild('createOrEditDistrictModal', { static: true })
    createOrEditDistrictModal: CreateOrEditDistrictModalComponent;
    @ViewChild('viewDistrictModalComponent', { static: true }) viewDistrictModal: ViewDistrictModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    districtCodeFilter = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';
    provinceNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _districtsServiceProxy: DistrictsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('Districts'));
    }

    getDistricts(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._districtsServiceProxy
            .getAll(
                this.filterText,
                this.districtCodeFilter,
                this.nameEnglishFilter,
                this.nameDariFilter,
                this.namePashtoFilter,
                this.provinceNameEnglishFilter,
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

    createDistrict(): void {
        this.createOrEditDistrictModal.show();
    }

    deleteDistrict(district: DistrictDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._districtsServiceProxy.delete(district.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

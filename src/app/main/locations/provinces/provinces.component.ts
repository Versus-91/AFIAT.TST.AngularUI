import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProvinceDto, ProvincesServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditProvinceModalComponent } from './create-or-edit-province-modal.component';
import { ViewProvinceModalComponent } from './view-province-modal.component';

@Component({
    templateUrl: './provinces.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class ProvincesComponent extends AppComponentBase {
    @ViewChild('createOrEditProvinceModal', { static: true })
    createOrEditProvinceModal: CreateOrEditProvinceModalComponent;
    @ViewChild('viewProvinceModalComponent', { static: true }) viewProvinceModal: ViewProvinceModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    provinceCodeFilter = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';

    constructor(
        injector: Injector,
        private _provincesServiceProxy: ProvincesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('Provinces'));
    }

    getProvinces(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._provincesServiceProxy
            .getAll(
                this.filterText,
                this.provinceCodeFilter,
                this.nameEnglishFilter,
                this.nameDariFilter,
                this.namePashtoFilter,
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

    createProvince(): void {
        this.createOrEditProvinceModal.show();
    }

    deleteProvince(province: ProvinceDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._provincesServiceProxy.delete(province.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

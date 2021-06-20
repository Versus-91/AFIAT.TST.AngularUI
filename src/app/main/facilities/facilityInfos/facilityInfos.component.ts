import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    FacilityInfoDto,
    FacilityInfosServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditFacilityInfoModalComponent } from './create-or-edit-facilityInfo-modal.component';
import { ViewFacilityInfoModalComponent } from './view-facilityInfo-modal.component';

@Component({
    templateUrl: './facilityInfos.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class FacilityInfosComponent extends AppComponentBase {
    @ViewChild('createOrEditFacilityInfoModal', { static: true })
    createOrEditFacilityInfoModal: CreateOrEditFacilityInfoModalComponent;
    @ViewChild('viewFacilityInfoModalComponent', { static: true })
    viewFacilityInfoModal: ViewFacilityInfoModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';
    districtNameEnglishFilter = '';
    facilityTypeNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _facilityInfosServiceProxy: FacilityInfosServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('FacilitiesInformation'));
    }

    getFacilityInfos(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._facilityInfosServiceProxy
            .getAll(
                this.filterText,
                this.nameEnglishFilter,
                this.nameDariFilter,
                this.namePashtoFilter,
                this.districtNameEnglishFilter,
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

    createFacilityInfo(): void {
        this.createOrEditFacilityInfoModal.show();
    }

    deleteFacilityInfo(facilityInfo: FacilityInfoDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._facilityInfosServiceProxy.delete(facilityInfo.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

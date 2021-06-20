import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    FacilityStaffDto,
    FacilityStaffsServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditFacilityStaffModalComponent } from './create-or-edit-facilityStaff-modal.component';
import { ViewFacilityStaffModalComponent } from './view-facilityStaff-modal.component';

@Component({
    templateUrl: './facilityStaffs.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class FacilityStaffsComponent extends AppComponentBase {
    @ViewChild('createOrEditFacilityStaffModal', { static: true })
    createOrEditFacilityStaffModal: CreateOrEditFacilityStaffModalComponent;
    @ViewChild('viewFacilityStaffModalComponent', { static: true })
    viewFacilityStaffModal: ViewFacilityStaffModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    hridFilter = '';
    firstNameFilter = '';
    lastNameFilter = '';
    genderNameEnglishFilter = '';
    positionNameEnglishFilter = '';
    specialityNameEnglishFilter = '';
    facilityInfoNameEnglishFilter = '';
    facilityTypeNameShortFilter = '';

    constructor(
        injector: Injector,
        private _facilityStaffsServiceProxy: FacilityStaffsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('FacilityStaffs'));
    }

    getFacilityStaffs(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._facilityStaffsServiceProxy
            .getAll(
                this.filterText,
                this.hridFilter,
                this.firstNameFilter,
                this.lastNameFilter,
                this.genderNameEnglishFilter,
                this.positionNameEnglishFilter,
                this.specialityNameEnglishFilter,
                this.facilityInfoNameEnglishFilter,
                this.facilityTypeNameShortFilter,
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

    createFacilityStaff(): void {
        this.createOrEditFacilityStaffModal.show();
    }

    deleteFacilityStaff(facilityStaff: FacilityStaffDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._facilityStaffsServiceProxy.delete(facilityStaff.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

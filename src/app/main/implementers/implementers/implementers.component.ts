import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    ImplementerDto,
    ImplementersServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditImplementerModalComponent } from './create-or-edit-implementer-modal.component';
import { ViewImplementerModalComponent } from './view-implementer-modal.component';

@Component({
    templateUrl: './implementers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class ImplementersComponent extends AppComponentBase {
    @ViewChild('createOrEditImplementerModal', { static: true })
    createOrEditImplementerModal: CreateOrEditImplementerModalComponent;
    @ViewChild('viewImplementerModalComponent', { static: true }) viewImplementerModal: ViewImplementerModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    acronymFilter = '';
    fullNameFilter = '';
    addressFilter = '';
    websiteFilter = '';

    constructor(
        injector: Injector,
        private _implementersServiceProxy: ImplementersServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('Implementers'));
    }

    getImplementers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._implementersServiceProxy
            .getAll(
                this.filterText,
                this.acronymFilter,
                this.fullNameFilter,
                this.addressFilter,
                this.websiteFilter,
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

    createImplementer(): void {
        this.createOrEditImplementerModal.show();
    }

    deleteImplementer(implementer: ImplementerDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._implementersServiceProxy.delete(implementer.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

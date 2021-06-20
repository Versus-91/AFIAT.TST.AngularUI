import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectionDto, SectionsServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditSectionModalComponent } from './create-or-edit-section-modal.component';
import { ViewSectionModalComponent } from './view-section-modal.component';

@Component({
    templateUrl: './sections.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class SectionsComponent extends AppComponentBase {
    @ViewChild('createOrEditSectionModal', { static: true })
    createOrEditSectionModal: CreateOrEditSectionModalComponent;
    @ViewChild('viewSectionModalComponent', { static: true }) viewSectionModal: ViewSectionModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';
    tipEnglishFilter = '';
    tipDariFilter = '';
    tipPashtoFilter = '';
    areaNameEnglishFilter = '';

    constructor(
        injector: Injector,
        private _sectionsServiceProxy: SectionsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('Sections'));
    }

    getSections(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._sectionsServiceProxy
            .getAll(
                this.filterText,
                this.nameEnglishFilter,
                this.nameDariFilter,
                this.namePashtoFilter,
                this.tipEnglishFilter,
                this.tipDariFilter,
                this.tipPashtoFilter,
                this.areaNameEnglishFilter,
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

    createSection(): void {
        this.createOrEditSectionModal.show();
    }

    deleteSection(section: SectionDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._sectionsServiceProxy.delete(section.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

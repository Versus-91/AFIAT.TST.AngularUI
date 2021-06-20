import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    FollowupRoundDto,
    FollowupRoundsServiceProxy,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditFollowupRoundModalComponent } from './create-or-edit-followupRound-modal.component';
import { ViewFollowupRoundModalComponent } from './view-followupRound-modal.component';

@Component({
    templateUrl: './followupRounds.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class FollowupRoundsComponent extends AppComponentBase {
    @ViewChild('createOrEditFollowupRoundModal', { static: true })
    createOrEditFollowupRoundModal: CreateOrEditFollowupRoundModalComponent;
    @ViewChild('viewFollowupRoundModalComponent', { static: true })
    viewFollowupRoundModal: ViewFollowupRoundModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';

    constructor(
        injector: Injector,
        private _followupRoundsServiceProxy: FollowupRoundsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('FollowupRounds'));
    }

    getFollowupRounds(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._followupRoundsServiceProxy
            .getAll(
                this.filterText,
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

    createFollowupRound(): void {
        this.createOrEditFollowupRoundModal.show();
    }

    deleteFollowupRound(followupRound: FollowupRoundDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._followupRoundsServiceProxy.delete(followupRound.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

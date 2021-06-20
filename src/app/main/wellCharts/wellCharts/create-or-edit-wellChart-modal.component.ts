import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { WellChartsServiceProxy, CreateOrEditWellChartDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditWellChartModal',
    templateUrl: './create-or-edit-wellChart-modal.component.html',
})
export class CreateOrEditWellChartModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    wellChart: CreateOrEditWellChartDto = new CreateOrEditWellChartDto();

    constructor(
        injector: Injector,
        private _wellChartsServiceProxy: WellChartsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(wellChartId?: number): void {
        if (!wellChartId) {
            this.wellChart = new CreateOrEditWellChartDto();
            this.wellChart.id = wellChartId;

            this.active = true;
            this.modal.show();
        } else {
            this._wellChartsServiceProxy.getWellChartForEdit(wellChartId).subscribe((result) => {
                this.wellChart = result.wellChart;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._wellChartsServiceProxy
            .createOrEdit(this.wellChart)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}

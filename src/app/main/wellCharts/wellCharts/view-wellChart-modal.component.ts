import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetWellChartForViewDto, WellChartDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewWellChartModal',
    templateUrl: './view-wellChart-modal.component.html',
})
export class ViewWellChartModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetWellChartForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetWellChartForViewDto();
        this.item.wellChart = new WellChartDto();
    }

    show(item: GetWellChartForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

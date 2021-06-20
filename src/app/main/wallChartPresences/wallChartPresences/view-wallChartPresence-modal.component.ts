import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetWallChartPresenceForViewDto, WallChartPresenceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewWallChartPresenceModal',
    templateUrl: './view-wallChartPresence-modal.component.html',
})
export class ViewWallChartPresenceModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetWallChartPresenceForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetWallChartPresenceForViewDto();
        this.item.wallChartPresence = new WallChartPresenceDto();
    }

    show(item: GetWallChartPresenceForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCapacityBuildingForViewDto, CapacityBuildingDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCapacityBuildingModal',
    templateUrl: './view-capacityBuilding-modal.component.html',
})
export class ViewCapacityBuildingModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCapacityBuildingForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetCapacityBuildingForViewDto();
        this.item.capacityBuilding = new CapacityBuildingDto();
    }

    show(item: GetCapacityBuildingForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

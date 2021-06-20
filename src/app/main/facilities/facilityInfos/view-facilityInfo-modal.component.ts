import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetFacilityInfoForViewDto, FacilityInfoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewFacilityInfoModal',
    templateUrl: './view-facilityInfo-modal.component.html',
})
export class ViewFacilityInfoModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetFacilityInfoForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetFacilityInfoForViewDto();
        this.item.facilityInfo = new FacilityInfoDto();
    }

    show(item: GetFacilityInfoForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

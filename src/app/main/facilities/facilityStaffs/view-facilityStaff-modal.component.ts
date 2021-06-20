import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetFacilityStaffForViewDto, FacilityStaffDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewFacilityStaffModal',
    templateUrl: './view-facilityStaff-modal.component.html',
})
export class ViewFacilityStaffModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetFacilityStaffForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetFacilityStaffForViewDto();
        this.item.facilityStaff = new FacilityStaffDto();
    }

    show(item: GetFacilityStaffForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

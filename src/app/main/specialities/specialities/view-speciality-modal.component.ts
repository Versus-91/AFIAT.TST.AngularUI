import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetSpecialityForViewDto, SpecialityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSpecialityModal',
    templateUrl: './view-speciality-modal.component.html',
})
export class ViewSpecialityModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSpecialityForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetSpecialityForViewDto();
        this.item.speciality = new SpecialityDto();
    }

    show(item: GetSpecialityForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

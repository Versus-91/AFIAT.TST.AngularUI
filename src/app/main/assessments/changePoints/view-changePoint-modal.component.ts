import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetChangePointForViewDto, ChangePointDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewChangePointModal',
    templateUrl: './view-changePoint-modal.component.html',
})
export class ViewChangePointModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetChangePointForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetChangePointForViewDto();
        this.item.changePoint = new ChangePointDto();
    }

    show(item: GetChangePointForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

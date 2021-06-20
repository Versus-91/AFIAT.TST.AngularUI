import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetImplementerForViewDto, ImplementerDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewImplementerModal',
    templateUrl: './view-implementer-modal.component.html',
})
export class ViewImplementerModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetImplementerForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetImplementerForViewDto();
        this.item.implementer = new ImplementerDto();
    }

    show(item: GetImplementerForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

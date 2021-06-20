import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetReferencePresenceForViewDto, ReferencePresenceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewReferencePresenceModal',
    templateUrl: './view-referencePresence-modal.component.html',
})
export class ViewReferencePresenceModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetReferencePresenceForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetReferencePresenceForViewDto();
        this.item.referencePresence = new ReferencePresenceDto();
    }

    show(item: GetReferencePresenceForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

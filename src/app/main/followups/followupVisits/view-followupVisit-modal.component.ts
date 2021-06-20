import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetFollowupVisitForViewDto, FollowupVisitDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewFollowupVisitModal',
    templateUrl: './view-followupVisit-modal.component.html',
})
export class ViewFollowupVisitModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetFollowupVisitForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetFollowupVisitForViewDto();
        this.item.followupVisit = new FollowupVisitDto();
    }

    show(item: GetFollowupVisitForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

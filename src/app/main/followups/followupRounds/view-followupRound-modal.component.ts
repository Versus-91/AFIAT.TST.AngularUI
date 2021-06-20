import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetFollowupRoundForViewDto, FollowupRoundDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewFollowupRoundModal',
    templateUrl: './view-followupRound-modal.component.html',
})
export class ViewFollowupRoundModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetFollowupRoundForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetFollowupRoundForViewDto();
        this.item.followupRound = new FollowupRoundDto();
    }

    show(item: GetFollowupRoundForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

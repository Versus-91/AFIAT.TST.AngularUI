import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetAssessmentInfoForViewDto, AssessmentInfoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewAssessmentInfoModal',
    templateUrl: './view-assessmentInfo-modal.component.html',
})
export class ViewAssessmentInfoModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetAssessmentInfoForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetAssessmentInfoForViewDto();
        this.item.assessmentInfo = new AssessmentInfoDto();
    }

    show(item: GetAssessmentInfoForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCriteriaForViewDto, CriteriaDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCriteriaModal',
    templateUrl: './view-criteria-modal.component.html',
})
export class ViewCriteriaModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCriteriaForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetCriteriaForViewDto();
        this.item.criteria = new CriteriaDto();
    }

    show(item: GetCriteriaForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

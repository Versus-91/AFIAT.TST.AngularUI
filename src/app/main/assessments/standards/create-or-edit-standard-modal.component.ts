import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    StandardsServiceProxy,
    CreateOrEditStandardDto,
    StandardSectionLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditStandardModal',
    templateUrl: './create-or-edit-standard-modal.component.html',
})
export class CreateOrEditStandardModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    standard: CreateOrEditStandardDto = new CreateOrEditStandardDto();

    sectionNameEnglish = '';

    allSections: StandardSectionLookupTableDto[];

    constructor(
        injector: Injector,
        private _standardsServiceProxy: StandardsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(standardId?: number): void {
        if (!standardId) {
            this.standard = new CreateOrEditStandardDto();
            this.standard.id = standardId;
            this.sectionNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._standardsServiceProxy.getStandardForEdit(standardId).subscribe((result) => {
                this.standard = result.standard;

                this.sectionNameEnglish = result.sectionNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._standardsServiceProxy.getAllSectionForTableDropdown().subscribe((result) => {
            this.allSections = result;
        });
    }

    save(): void {
        this.saving = true;

        this._standardsServiceProxy
            .createOrEdit(this.standard)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}

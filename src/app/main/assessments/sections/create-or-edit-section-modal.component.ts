import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    SectionsServiceProxy,
    CreateOrEditSectionDto,
    SectionAreaLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditSectionModal',
    templateUrl: './create-or-edit-section-modal.component.html',
})
export class CreateOrEditSectionModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    section: CreateOrEditSectionDto = new CreateOrEditSectionDto();

    areaNameEnglish = '';

    allAreas: SectionAreaLookupTableDto[];

    constructor(
        injector: Injector,
        private _sectionsServiceProxy: SectionsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(sectionId?: number): void {
        if (!sectionId) {
            this.section = new CreateOrEditSectionDto();
            this.section.id = sectionId;
            this.areaNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._sectionsServiceProxy.getSectionForEdit(sectionId).subscribe((result) => {
                this.section = result.section;

                this.areaNameEnglish = result.areaNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._sectionsServiceProxy.getAllAreaForTableDropdown().subscribe((result) => {
            this.allAreas = result;
        });
    }

    save(): void {
        this.saving = true;

        this._sectionsServiceProxy
            .createOrEdit(this.section)
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

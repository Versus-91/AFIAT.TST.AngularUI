import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CourseTypesServiceProxy, CreateOrEditCourseTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditCourseTypeModal',
    templateUrl: './create-or-edit-courseType-modal.component.html',
})
export class CreateOrEditCourseTypeModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    courseType: CreateOrEditCourseTypeDto = new CreateOrEditCourseTypeDto();

    constructor(
        injector: Injector,
        private _courseTypesServiceProxy: CourseTypesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(courseTypeId?: number): void {
        if (!courseTypeId) {
            this.courseType = new CreateOrEditCourseTypeDto();
            this.courseType.id = courseTypeId;

            this.active = true;
            this.modal.show();
        } else {
            this._courseTypesServiceProxy.getCourseTypeForEdit(courseTypeId).subscribe((result) => {
                this.courseType = result.courseType;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._courseTypesServiceProxy
            .createOrEdit(this.courseType)
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

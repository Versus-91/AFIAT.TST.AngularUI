import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    ChangePointsServiceProxy,
    CreateOrEditChangePointDto,
    ChangePointCriteriaLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditChangePointModal',
    templateUrl: './create-or-edit-changePoint-modal.component.html',
})
export class CreateOrEditChangePointModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    changePoint: CreateOrEditChangePointDto = new CreateOrEditChangePointDto();

    criteriaNameEnglish = '';

    allCriterias: ChangePointCriteriaLookupTableDto[];

    constructor(
        injector: Injector,
        private _changePointsServiceProxy: ChangePointsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(changePointId?: number): void {
        if (!changePointId) {
            this.changePoint = new CreateOrEditChangePointDto();
            this.changePoint.id = changePointId;
            this.criteriaNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._changePointsServiceProxy.getChangePointForEdit(changePointId).subscribe((result) => {
                this.changePoint = result.changePoint;

                this.criteriaNameEnglish = result.criteriaNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._changePointsServiceProxy.getAllCriteriaForTableDropdown().subscribe((result) => {
            this.allCriterias = result;
        });
    }

    save(): void {
        this.saving = true;

        this._changePointsServiceProxy
            .createOrEdit(this.changePoint)
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

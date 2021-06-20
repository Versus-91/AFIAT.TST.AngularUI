import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CapacityBuildingCourseLookupTableDto,
    CapacityBuildingCourseTypeLookupTableDto,
    CapacityBuildingsServiceProxy,
    CreateOrEditCapacityBuildingDto,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CapacityBuildingFollowupVisitLookupTableModalComponent } from './capacityBuilding-followupVisit-lookup-table-modal.component';

@Component({
    selector: 'createOrEditCapacityBuildingModal',
    templateUrl: './create-or-edit-capacityBuilding-modal.component.html',
})
export class CreateOrEditCapacityBuildingModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('capacityBuildingFollowupVisitLookupTableModal', { static: true })
    capacityBuildingFollowupVisitLookupTableModal: CapacityBuildingFollowupVisitLookupTableModalComponent;
    @Input() id;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    capacityBuilding: CreateOrEditCapacityBuildingDto = new CreateOrEditCapacityBuildingDto();

    followupVisitAssessorNames = '';
    courseNameEnglish = '';
    courseTypeNameEnglish = '';

    allCourses: CapacityBuildingCourseLookupTableDto[];
    allCourseTypes: CapacityBuildingCourseTypeLookupTableDto[];

    constructor(
        injector: Injector,
        private _capacityBuildingsServiceProxy: CapacityBuildingsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(capacityBuildingId?: number): void {
        if (!capacityBuildingId) {
            this.capacityBuilding = new CreateOrEditCapacityBuildingDto();
            this.capacityBuilding.id = capacityBuildingId;
            this.capacityBuilding.startDate = this._dateTimeService.getStartOfDay();
            this.capacityBuilding.endDate = this._dateTimeService.getStartOfDay();
            this.followupVisitAssessorNames = '';
            this.courseNameEnglish = '';
            this.courseTypeNameEnglish = '';

            this.active = true;
            this.modal.show();
        } else {
            this._capacityBuildingsServiceProxy.getCapacityBuildingForEdit(capacityBuildingId).subscribe((result) => {
                this.capacityBuilding = result.capacityBuilding;

                this.followupVisitAssessorNames = result.followupVisitAssessorNames;
                this.courseNameEnglish = result.courseNameEnglish;
                this.courseTypeNameEnglish = result.courseTypeNameEnglish;

                this.active = true;
                this.modal.show();
            });
        }
        this._capacityBuildingsServiceProxy.getAllCourseForTableDropdown().subscribe((result) => {
            this.allCourses = result;
        });
        this._capacityBuildingsServiceProxy.getAllCourseTypeForTableDropdown().subscribe((result) => {
            this.allCourseTypes = result;
        });
    }

    save(): void {
        this.saving = true;
        this.capacityBuilding.followupVisitId = this.id;
        this._capacityBuildingsServiceProxy
            .createOrEdit(this.capacityBuilding)
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

    openSelectFollowupVisitModal() {
        this.capacityBuildingFollowupVisitLookupTableModal.id = this.capacityBuilding.followupVisitId;
        this.capacityBuildingFollowupVisitLookupTableModal.displayName = this.followupVisitAssessorNames;
        this.capacityBuildingFollowupVisitLookupTableModal.show();
    }

    setFollowupVisitIdNull() {
        this.capacityBuilding.followupVisitId = null;
        this.followupVisitAssessorNames = '';
    }

    getNewFollowupVisitId() {
        this.capacityBuilding.followupVisitId = this.capacityBuildingFollowupVisitLookupTableModal.id;
        this.followupVisitAssessorNames = this.capacityBuildingFollowupVisitLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}

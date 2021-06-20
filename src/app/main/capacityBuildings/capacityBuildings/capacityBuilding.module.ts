import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CapacityBuildingFollowupVisitLookupTableModalComponent } from './capacityBuilding-followupVisit-lookup-table-modal.component';
import { CapacityBuildingsComponent } from './capacityBuildings.component';
import { CreateOrEditCapacityBuildingModalComponent } from './create-or-edit-capacityBuilding-modal.component';
import { ViewCapacityBuildingModalComponent } from './view-capacityBuilding-modal.component';

@NgModule({
    declarations: [
        CapacityBuildingsComponent,
        CreateOrEditCapacityBuildingModalComponent,
        ViewCapacityBuildingModalComponent,

        CapacityBuildingFollowupVisitLookupTableModalComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule],
    exports: [CapacityBuildingsComponent],
})
export class CapacityBuildingModule {}

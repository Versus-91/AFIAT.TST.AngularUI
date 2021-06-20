import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { FacilityStaffRoutingModule } from './facilityStaff-routing.module';
import { FacilityStaffsComponent } from './facilityStaffs.component';
import { CreateOrEditFacilityStaffModalComponent } from './create-or-edit-facilityStaff-modal.component';
import { ViewFacilityStaffModalComponent } from './view-facilityStaff-modal.component';
import { FacilityStaffFacilityInfoLookupTableModalComponent } from './facilityStaff-facilityInfo-lookup-table-modal.component';

@NgModule({
    declarations: [
        FacilityStaffsComponent,
        CreateOrEditFacilityStaffModalComponent,
        ViewFacilityStaffModalComponent,

        FacilityStaffFacilityInfoLookupTableModalComponent,
    ],
    imports: [AppSharedModule, FacilityStaffRoutingModule, AdminSharedModule],
})
export class FacilityStaffModule {}

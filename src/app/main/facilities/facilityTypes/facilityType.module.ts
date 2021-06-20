import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { FacilityTypeRoutingModule } from './facilityType-routing.module';
import { FacilityTypesComponent } from './facilityTypes.component';
import { CreateOrEditFacilityTypeModalComponent } from './create-or-edit-facilityType-modal.component';
import { ViewFacilityTypeModalComponent } from './view-facilityType-modal.component';

@NgModule({
    declarations: [FacilityTypesComponent, CreateOrEditFacilityTypeModalComponent, ViewFacilityTypeModalComponent],
    imports: [AppSharedModule, FacilityTypeRoutingModule, AdminSharedModule],
})
export class FacilityTypeModule {}

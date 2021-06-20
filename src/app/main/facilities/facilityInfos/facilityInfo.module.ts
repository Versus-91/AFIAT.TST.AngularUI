import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { FacilityInfoRoutingModule } from './facilityInfo-routing.module';
import { FacilityInfosComponent } from './facilityInfos.component';
import { CreateOrEditFacilityInfoModalComponent } from './create-or-edit-facilityInfo-modal.component';
import { ViewFacilityInfoModalComponent } from './view-facilityInfo-modal.component';

@NgModule({
    declarations: [FacilityInfosComponent, CreateOrEditFacilityInfoModalComponent, ViewFacilityInfoModalComponent],
    imports: [AppSharedModule, FacilityInfoRoutingModule, AdminSharedModule],
})
export class FacilityInfoModule {}

import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { DistrictRoutingModule } from './district-routing.module';
import { DistrictsComponent } from './districts.component';
import { CreateOrEditDistrictModalComponent } from './create-or-edit-district-modal.component';
import { ViewDistrictModalComponent } from './view-district-modal.component';

@NgModule({
    declarations: [DistrictsComponent, CreateOrEditDistrictModalComponent, ViewDistrictModalComponent],
    imports: [AppSharedModule, DistrictRoutingModule, AdminSharedModule],
})
export class DistrictModule {}

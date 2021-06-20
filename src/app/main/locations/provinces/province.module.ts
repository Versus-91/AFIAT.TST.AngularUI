import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvincesComponent } from './provinces.component';
import { CreateOrEditProvinceModalComponent } from './create-or-edit-province-modal.component';
import { ViewProvinceModalComponent } from './view-province-modal.component';

@NgModule({
    declarations: [ProvincesComponent, CreateOrEditProvinceModalComponent, ViewProvinceModalComponent],
    imports: [AppSharedModule, ProvinceRoutingModule, AdminSharedModule],
})
export class ProvinceModule {}

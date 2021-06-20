import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AreaRoutingModule } from './area-routing.module';
import { AreasComponent } from './areas.component';
import { CreateOrEditAreaModalComponent } from './create-or-edit-area-modal.component';
import { ViewAreaModalComponent } from './view-area-modal.component';

@NgModule({
    declarations: [AreasComponent, CreateOrEditAreaModalComponent, ViewAreaModalComponent],
    imports: [AppSharedModule, AreaRoutingModule, AdminSharedModule],
})
export class AreaModule {}

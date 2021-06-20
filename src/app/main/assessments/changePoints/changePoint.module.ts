import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ChangePointRoutingModule } from './changePoint-routing.module';
import { ChangePointsComponent } from './changePoints.component';
import { CreateOrEditChangePointModalComponent } from './create-or-edit-changePoint-modal.component';
import { ViewChangePointModalComponent } from './view-changePoint-modal.component';

@NgModule({
    declarations: [ChangePointsComponent, CreateOrEditChangePointModalComponent, ViewChangePointModalComponent],
    imports: [AppSharedModule, ChangePointRoutingModule, AdminSharedModule],
})
export class ChangePointModule {}

import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { PositionRoutingModule } from './position-routing.module';
import { PositionsComponent } from './positions.component';
import { CreateOrEditPositionModalComponent } from './create-or-edit-position-modal.component';
import { ViewPositionModalComponent } from './view-position-modal.component';

@NgModule({
    declarations: [PositionsComponent, CreateOrEditPositionModalComponent, ViewPositionModalComponent],
    imports: [AppSharedModule, PositionRoutingModule, AdminSharedModule],
})
export class PositionModule {}

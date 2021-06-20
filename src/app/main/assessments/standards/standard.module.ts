import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { StandardRoutingModule } from './standard-routing.module';
import { StandardsComponent } from './standards.component';
import { CreateOrEditStandardModalComponent } from './create-or-edit-standard-modal.component';
import { ViewStandardModalComponent } from './view-standard-modal.component';

@NgModule({
    declarations: [StandardsComponent, CreateOrEditStandardModalComponent, ViewStandardModalComponent],
    imports: [AppSharedModule, StandardRoutingModule, AdminSharedModule],
})
export class StandardModule {}

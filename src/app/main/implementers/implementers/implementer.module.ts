import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ImplementerRoutingModule } from './implementer-routing.module';
import { ImplementersComponent } from './implementers.component';
import { CreateOrEditImplementerModalComponent } from './create-or-edit-implementer-modal.component';
import { ViewImplementerModalComponent } from './view-implementer-modal.component';

@NgModule({
    declarations: [ImplementersComponent, CreateOrEditImplementerModalComponent, ViewImplementerModalComponent],
    imports: [AppSharedModule, ImplementerRoutingModule, AdminSharedModule],
})
export class ImplementerModule {}

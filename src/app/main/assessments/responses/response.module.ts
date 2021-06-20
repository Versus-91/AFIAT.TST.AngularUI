import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ResponseRoutingModule } from './response-routing.module';
import { ResponsesComponent } from './responses.component';
import { CreateOrEditResponseModalComponent } from './create-or-edit-response-modal.component';
import { ViewResponseModalComponent } from './view-response-modal.component';

@NgModule({
    declarations: [ResponsesComponent, CreateOrEditResponseModalComponent, ViewResponseModalComponent],
    imports: [AppSharedModule, ResponseRoutingModule, AdminSharedModule],
})
export class ResponseModule {}

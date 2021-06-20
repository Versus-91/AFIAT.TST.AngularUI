import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ReferenceRoutingModule } from './reference-routing.module';
import { ReferencesComponent } from './references.component';
import { CreateOrEditReferenceModalComponent } from './create-or-edit-reference-modal.component';
import { ViewReferenceModalComponent } from './view-reference-modal.component';

@NgModule({
    declarations: [ReferencesComponent, CreateOrEditReferenceModalComponent, ViewReferenceModalComponent],
    imports: [AppSharedModule, ReferenceRoutingModule, AdminSharedModule],
})
export class ReferenceModule {}

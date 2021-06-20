import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CreateOrEditReferencePresenceModalComponent } from './create-or-edit-referencePresence-modal.component';
import { ReferencePresencesComponent } from './referencePresences.component';
import { ViewReferencePresenceModalComponent } from './view-referencePresence-modal.component';

@NgModule({
    declarations: [
        ReferencePresencesComponent,
        CreateOrEditReferencePresenceModalComponent,
        ViewReferencePresenceModalComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule],
    exports: [ReferencePresencesComponent],
})
export class ReferencePresenceModule {}

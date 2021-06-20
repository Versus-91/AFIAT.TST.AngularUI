import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CriteriaRoutingModule } from './criteria-routing.module';
import { CriteriasComponent } from './criterias.component';
import { CreateOrEditCriteriaModalComponent } from './create-or-edit-criteria-modal.component';
import { ViewCriteriaModalComponent } from './view-criteria-modal.component';

@NgModule({
    declarations: [CriteriasComponent, CreateOrEditCriteriaModalComponent, ViewCriteriaModalComponent],
    imports: [AppSharedModule, CriteriaRoutingModule, AdminSharedModule],
})
export class CriteriaModule {}

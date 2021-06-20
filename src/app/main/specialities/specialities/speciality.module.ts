import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialitiesComponent } from './specialities.component';
import { CreateOrEditSpecialityModalComponent } from './create-or-edit-speciality-modal.component';
import { ViewSpecialityModalComponent } from './view-speciality-modal.component';

@NgModule({
    declarations: [SpecialitiesComponent, CreateOrEditSpecialityModalComponent, ViewSpecialityModalComponent],
    imports: [AppSharedModule, SpecialityRoutingModule, AdminSharedModule],
})
export class SpecialityModule {}

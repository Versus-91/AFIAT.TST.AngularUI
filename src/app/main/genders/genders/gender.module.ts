import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { GenderRoutingModule } from './gender-routing.module';
import { GendersComponent } from './genders.component';
import { CreateOrEditGenderModalComponent } from './create-or-edit-gender-modal.component';
import { ViewGenderModalComponent } from './view-gender-modal.component';

@NgModule({
    declarations: [GendersComponent, CreateOrEditGenderModalComponent, ViewGenderModalComponent],
    imports: [AppSharedModule, GenderRoutingModule, AdminSharedModule],
})
export class GenderModule {}

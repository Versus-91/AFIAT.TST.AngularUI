import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { SectionRoutingModule } from './section-routing.module';
import { SectionsComponent } from './sections.component';
import { CreateOrEditSectionModalComponent } from './create-or-edit-section-modal.component';
import { ViewSectionModalComponent } from './view-section-modal.component';

@NgModule({
    declarations: [SectionsComponent, CreateOrEditSectionModalComponent, ViewSectionModalComponent],
    imports: [AppSharedModule, SectionRoutingModule, AdminSharedModule],
})
export class SectionModule {}

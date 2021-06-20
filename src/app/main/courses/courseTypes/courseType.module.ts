import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CourseTypeRoutingModule } from './courseType-routing.module';
import { CourseTypesComponent } from './courseTypes.component';
import { CreateOrEditCourseTypeModalComponent } from './create-or-edit-courseType-modal.component';
import { ViewCourseTypeModalComponent } from './view-courseType-modal.component';

@NgModule({
    declarations: [CourseTypesComponent, CreateOrEditCourseTypeModalComponent, ViewCourseTypeModalComponent],
    imports: [AppSharedModule, CourseTypeRoutingModule, AdminSharedModule],
})
export class CourseTypeModule {}

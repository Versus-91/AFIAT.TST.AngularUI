import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CourseRoutingModule } from './course-routing.module';
import { CoursesComponent } from './courses.component';
import { CreateOrEditCourseModalComponent } from './create-or-edit-course-modal.component';
import { ViewCourseModalComponent } from './view-course-modal.component';

@NgModule({
    declarations: [CoursesComponent, CreateOrEditCourseModalComponent, ViewCourseModalComponent],
    imports: [AppSharedModule, CourseRoutingModule, AdminSharedModule],
})
export class CourseModule {}

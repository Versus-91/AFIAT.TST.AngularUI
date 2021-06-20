import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseTypesComponent } from './courseTypes.component';

const routes: Routes = [
    {
        path: '',
        component: CourseTypesComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CourseTypeRoutingModule {}

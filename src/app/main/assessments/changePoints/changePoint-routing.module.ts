import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePointsComponent } from './changePoints.component';

const routes: Routes = [
    {
        path: '',
        component: ChangePointsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChangePointRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriasComponent } from './criterias.component';

const routes: Routes = [
    {
        path: '',
        component: CriteriasComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CriteriaRoutingModule {}

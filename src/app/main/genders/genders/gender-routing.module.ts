import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersComponent } from './genders.component';

const routes: Routes = [
    {
        path: '',
        component: GendersComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GenderRoutingModule {}

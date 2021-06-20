import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardsComponent } from './standards.component';

const routes: Routes = [
    {
        path: '',
        component: StandardsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StandardRoutingModule {}

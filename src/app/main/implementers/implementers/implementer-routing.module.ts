import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImplementersComponent } from './implementers.component';

const routes: Routes = [
    {
        path: '',
        component: ImplementersComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ImplementerRoutingModule {}

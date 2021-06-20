import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionsComponent } from './positions.component';

const routes: Routes = [
    {
        path: '',
        component: PositionsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PositionRoutingModule {}

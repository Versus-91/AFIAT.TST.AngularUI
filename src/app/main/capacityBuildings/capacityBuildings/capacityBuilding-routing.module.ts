import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacityBuildingsComponent } from './capacityBuildings.component';

const routes: Routes = [
    {
        path: '',
        component: CapacityBuildingsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CapacityBuildingRoutingModule {}

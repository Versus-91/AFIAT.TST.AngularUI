import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityTypesComponent } from './facilityTypes.component';

const routes: Routes = [
    {
        path: '',
        component: FacilityTypesComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FacilityTypeRoutingModule {}

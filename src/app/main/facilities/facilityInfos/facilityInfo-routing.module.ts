import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityInfosComponent } from './facilityInfos.component';

const routes: Routes = [
    {
        path: '',
        component: FacilityInfosComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FacilityInfoRoutingModule {}

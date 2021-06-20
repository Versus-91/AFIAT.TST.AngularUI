import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallChartPresencesComponent } from './wallChartPresences.component';

const routes: Routes = [
    {
        path: '',
        component: WallChartPresencesComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WallChartPresenceRoutingModule {}

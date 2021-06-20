import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellChartsComponent } from './wellCharts.component';

const routes: Routes = [
    {
        path: '',
        component: WellChartsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WellChartRoutingModule {}

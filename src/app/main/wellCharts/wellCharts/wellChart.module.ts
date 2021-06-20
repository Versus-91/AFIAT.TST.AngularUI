import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { WellChartRoutingModule } from './wellChart-routing.module';
import { WellChartsComponent } from './wellCharts.component';
import { CreateOrEditWellChartModalComponent } from './create-or-edit-wellChart-modal.component';
import { ViewWellChartModalComponent } from './view-wellChart-modal.component';

@NgModule({
    declarations: [WellChartsComponent, CreateOrEditWellChartModalComponent, ViewWellChartModalComponent],
    imports: [AppSharedModule, WellChartRoutingModule, AdminSharedModule],
})
export class WellChartModule {}

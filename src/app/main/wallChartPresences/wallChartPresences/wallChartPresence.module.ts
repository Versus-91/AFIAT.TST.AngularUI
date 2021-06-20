import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CreateOrEditWallChartPresenceModalComponent } from './create-or-edit-wallChartPresence-modal.component';
import { ViewWallChartPresenceModalComponent } from './view-wallChartPresence-modal.component';
import { WallChartPresencesComponent } from './wallChartPresences.component';

@NgModule({
    declarations: [
        WallChartPresencesComponent,
        CreateOrEditWallChartPresenceModalComponent,
        ViewWallChartPresenceModalComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule],
    exports: [WallChartPresencesComponent],
})
export class WallChartPresenceModule {}

import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CapacityBuildingModule } from '@app/main/capacityBuildings/capacityBuildings/capacityBuilding.module';
import { ReferencePresenceModule } from '@app/main/referencePresences/referencePresences/referencePresence.module';
import { WallChartPresenceModule } from '@app/main/wallChartPresences/wallChartPresences/wallChartPresence.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateOrEditFollowupVisitModalComponent } from './create-or-edit-followupVisit-modal.component';
import { FollowupFormComponent } from './followup-form/followup-form.component';
import { FollowupVisitsComponent } from './followupVisits.component';
import { ViewFollowupVisitModalComponent } from './view-followupVisit-modal.component';

@NgModule({
    declarations: [
        FollowupFormComponent,
        FollowupVisitsComponent,
        CreateOrEditFollowupVisitModalComponent,
        ViewFollowupVisitModalComponent,
    ],
    imports: [
        AppSharedModule,
        CapacityBuildingModule,
        WallChartPresenceModule,
        ReferencePresenceModule,
        AdminSharedModule,
        TabsModule.forRoot(),
    ],
    exports: [FollowupVisitsComponent, FollowupFormComponent],
})
export class FollowupVisitModule {}

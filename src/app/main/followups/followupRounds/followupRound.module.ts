import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { FollowupRoundRoutingModule } from './followupRound-routing.module';
import { FollowupRoundsComponent } from './followupRounds.component';
import { CreateOrEditFollowupRoundModalComponent } from './create-or-edit-followupRound-modal.component';
import { ViewFollowupRoundModalComponent } from './view-followupRound-modal.component';

@NgModule({
    declarations: [FollowupRoundsComponent, CreateOrEditFollowupRoundModalComponent, ViewFollowupRoundModalComponent],
    imports: [AppSharedModule, FollowupRoundRoutingModule, AdminSharedModule],
})
export class FollowupRoundModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowupFormComponent } from './followup-form/followup-form.component';
import { FollowupVisitsComponent } from './followupVisits.component';

const routes: Routes = [
    {
        path: ':id',
        component: FollowupFormComponent,
    },
    {
        path: '',
        component: FollowupVisitsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FollowupVisitRoutingModule {}

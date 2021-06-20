import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowupFormComponent } from '@app/main/followups/followupVisits/followup-form/followup-form.component';
import { AssessmentFormComponent } from '../form/assessment-form.component';
import { AssessmentsInfoComponent } from './assessmentsInfo.component';

const routes: Routes = [
    { path: ':id', component: AssessmentFormComponent },
    { path: 'visits/:id', component: FollowupFormComponent },
    {
        path: '',
        component: AssessmentsInfoComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssessmentInfoRoutingModule {}

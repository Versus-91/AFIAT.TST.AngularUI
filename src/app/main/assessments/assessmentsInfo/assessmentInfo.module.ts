import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { FollowupVisitModule } from '@app/main/followups/followupVisits/followupVisit.module';
import { MultiStepFormComponent } from '@app/main/multi-step-form/multi-step-form.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { AssessmentFormComponent } from '../form/assessment-form.component';
import { AssessmentInfoFacilityInfoLookupTableModalComponent } from './assessmentInfo-facilityInfo-lookup-table-modal.component';
import { AssessmentInfoRoutingModule } from './assessmentInfo-routing.module';
import { AssessmentsInfoComponent } from './assessmentsInfo.component';
import { CreateOrEditAssessmentInfoModalComponent } from './create-or-edit-assessmentInfo-modal.component';
import { ViewAssessmentInfoModalComponent } from './view-assessmentInfo-modal.component';

@NgModule({
    declarations: [
        AssessmentsInfoComponent,
        CreateOrEditAssessmentInfoModalComponent,
        ViewAssessmentInfoModalComponent,
        AssessmentInfoFacilityInfoLookupTableModalComponent,
        MultiStepFormComponent,
        AssessmentFormComponent,
    ],
    imports: [
        FollowupVisitModule,
        AppSharedModule,
        AssessmentInfoRoutingModule,
        AdminSharedModule,
        ProgressbarModule.forRoot(),
        AccordionModule,
        AlertModule.forRoot(),
    ],
})
export class AssessmentInfoModule {}

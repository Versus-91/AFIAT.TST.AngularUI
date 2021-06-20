import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'locations/districts',
                        loadChildren: () =>
                            import('./locations/districts/district.module').then((m) => m.DistrictModule),
                        data: { permission: 'Pages.Districts' },
                    },

                    {
                        path: 'assessments/responses',
                        loadChildren: () =>
                            import('./assessments/responses/response.module').then((m) => m.ResponseModule),
                        data: { permission: 'Pages.Responses' },
                    },

                    {
                        path: 'assessments/changePoints',
                        loadChildren: () =>
                            import('./assessments/changePoints/changePoint.module').then((m) => m.ChangePointModule),
                        data: { permission: 'Pages.ChangePoints' },
                    },

                    {
                        path: 'assessments/criterias',
                        loadChildren: () =>
                            import('./assessments/criterias/criteria.module').then((m) => m.CriteriaModule),
                        data: { permission: 'Pages.Criterias' },
                    },

                    {
                        path: 'assessments/standards',
                        loadChildren: () =>
                            import('./assessments/standards/standard.module').then((m) => m.StandardModule),
                        data: { permission: 'Pages.Standards' },
                    },

                    {
                        path: 'assessments/sections',
                        loadChildren: () =>
                            import('./assessments/sections/section.module').then((m) => m.SectionModule),
                        data: { permission: 'Pages.Sections' },
                    },

                    {
                        path: 'assessments/areas',
                        loadChildren: () => import('./assessments/areas/area.module').then((m) => m.AreaModule),
                        data: { permission: 'Pages.Areas' },
                    },

                    {
                        path: 'assessments/assessmentsInfo',
                        loadChildren: () =>
                            import('./assessments/assessmentsInfo/assessmentInfo.module').then(
                                (m) => m.AssessmentInfoModule
                            ),
                        data: { permission: 'Pages.AssessmentsInfo' },
                    },

                    {
                        path: 'courses/courseTypes',
                        loadChildren: () =>
                            import('./courses/courseTypes/courseType.module').then((m) => m.CourseTypeModule),
                        data: { permission: 'Pages.CourseTypes' },
                    },

                    {
                        path: 'courses/courses',
                        loadChildren: () => import('./courses/courses/course.module').then((m) => m.CourseModule),
                        data: { permission: 'Pages.Courses' },
                    },

                    {
                        path: 'references/references',
                        loadChildren: () =>
                            import('./references/references/reference.module').then((m) => m.ReferenceModule),
                        data: { permission: 'Pages.References' },
                    },

                    {
                        path: 'wellCharts/wellCharts',
                        loadChildren: () =>
                            import('./wellCharts/wellCharts/wellChart.module').then((m) => m.WellChartModule),
                        data: { permission: 'Pages.WellCharts' },
                    },

                    {
                        path: 'followups/followupRounds',
                        loadChildren: () =>
                            import('./followups/followupRounds/followupRound.module').then(
                                (m) => m.FollowupRoundModule
                            ),
                        data: { permission: 'Pages.FollowupRounds' },
                    },

                    {
                        path: 'implementers/implementers',
                        loadChildren: () =>
                            import('./implementers/implementers/implementer.module').then((m) => m.ImplementerModule),
                        data: { permission: 'Pages.Implementers' },
                    },

                    {
                        path: 'facilities/facilityStaffs',
                        loadChildren: () =>
                            import('./facilities/facilityStaffs/facilityStaff.module').then(
                                (m) => m.FacilityStaffModule
                            ),
                        data: { permission: 'Pages.FacilityStaffs' },
                    },

                    {
                        path: 'positions/positions',
                        loadChildren: () =>
                            import('./positions/positions/position.module').then((m) => m.PositionModule),
                        data: { permission: 'Pages.Positions' },
                    },

                    {
                        path: 'specialities/specialities',
                        loadChildren: () =>
                            import('./specialities/specialities/speciality.module').then((m) => m.SpecialityModule),
                        data: { permission: 'Pages.Specialities' },
                    },

                    {
                        path: 'genders/genders',
                        loadChildren: () => import('./genders/genders/gender.module').then((m) => m.GenderModule),
                        data: { permission: 'Pages.Genders' },
                    },

                    {
                        path: 'facilities/facilityInfos',
                        loadChildren: () =>
                            import('./facilities/facilityInfos/facilityInfo.module').then((m) => m.FacilityInfoModule),
                        data: { permission: 'Pages.FacilityInfos' },
                    },

                    {
                        path: 'facilities/facilityTypes',
                        loadChildren: () =>
                            import('./facilities/facilityTypes/facilityType.module').then((m) => m.FacilityTypeModule),
                        data: { permission: 'Pages.FacilityTypes' },
                    },

                    {
                        path: 'locations/districts',
                        loadChildren: () =>
                            import('./locations/districts/district.module').then((m) => m.DistrictModule),
                        data: { permission: 'Pages.Districts' },
                    },

                    {
                        path: 'locations/provinces',
                        loadChildren: () =>
                            import('./locations/provinces/province.module').then((m) => m.ProvinceModule),
                        data: { permission: 'Pages.Provinces' },
                    },

                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}

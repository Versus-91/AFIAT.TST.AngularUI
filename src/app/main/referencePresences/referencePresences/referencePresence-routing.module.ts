import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferencePresencesComponent } from './referencePresences.component';

const routes: Routes = [
    {
        path: '',
        component: ReferencePresencesComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReferencePresenceRoutingModule {}

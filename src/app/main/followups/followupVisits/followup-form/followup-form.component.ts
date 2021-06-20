import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FollowupVisitsServiceProxy } from '@shared/service-proxies/service-proxies';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-followup-form',
    templateUrl: './followup-form.component.html',
    styleUrls: ['./followup-form.component.css'],
})
export class FollowupFormComponent extends AppComponentBase implements OnInit, OnDestroy {
    constructor(
        private _router: ActivatedRoute,
        private _injector: Injector,
        private _visitProxyService: FollowupVisitsServiceProxy
    ) {
        super(_injector);
        this.setTitle(this.l('FillFollowupInformation'));
    }
    id;
    followUp;
    private route: Subscription;
    ngOnInit(): void {
        this.route = this._router.params.subscribe((res) => {
            this.id = res['id'];
            this._visitProxyService.getFollowupVisitForView(this.id).subscribe((res) => (this.followUp = res));
        });
    }
    ngOnDestroy() {
        this.route.unsubscribe();
    }
}

import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CourseDto, CoursesServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditCourseModalComponent } from './create-or-edit-course-modal.component';
import { ViewCourseModalComponent } from './view-course-modal.component';

@Component({
    templateUrl: './courses.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class CoursesComponent extends AppComponentBase {
    @ViewChild('createOrEditCourseModal', { static: true }) createOrEditCourseModal: CreateOrEditCourseModalComponent;
    @ViewChild('viewCourseModalComponent', { static: true }) viewCourseModal: ViewCourseModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    courseCodeFilter = '';
    nameEnglishFilter = '';
    nameDariFilter = '';
    namePashtoFilter = '';
    subCategoryCodeFilter = '';
    subCategoryEnglishFilter = '';
    subCategoryDariFilter = '';
    subCategoryPashtoFilter = '';
    categoryCodeFilter = '';
    categoryEnglishFilter = '';
    categoryDariFilter = '';
    categoryPashtoFilter = '';

    constructor(
        injector: Injector,
        private _coursesServiceProxy: CoursesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.setTitle(this.l('Courses'));
    }

    getCourses(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._coursesServiceProxy
            .getAll(
                this.filterText,
                this.courseCodeFilter,
                this.nameEnglishFilter,
                this.nameDariFilter,
                this.namePashtoFilter,
                this.subCategoryCodeFilter,
                this.subCategoryEnglishFilter,
                this.subCategoryDariFilter,
                this.subCategoryPashtoFilter,
                this.categoryCodeFilter,
                this.categoryEnglishFilter,
                this.categoryDariFilter,
                this.categoryPashtoFilter,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createCourse(): void {
        this.createOrEditCourseModal.show();
    }

    deleteCourse(course: CourseDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._coursesServiceProxy.delete(course.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
}

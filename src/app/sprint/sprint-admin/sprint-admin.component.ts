import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Sprint} from "../../model/sprint";
import {SprintService} from "../../service/sprint-service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SprintDialogComponent} from "../../dialog/sprint-dialog/sprint-dialog.component";
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-sprint-admin',
  templateUrl: './sprint-admin.component.html',
  styleUrls: ['./sprint-admin.component.css']
})
export class SprintAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'number', 'startDate', 'endDate', 'remove'];
  dataSource = new MatTableDataSource<Sprint>([]);
  sprintList: Sprint[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private sprintService: SprintService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.sprintService.getAllSprints().subscribe(
      (response: Sprint[]) => {
        if (response && response.length > 0) {
          this.sprintList = response;
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => console.log("Error fetching all sprints" + error)
    );
  }

  addNewSprint() {
    // show predefined data
    let sprintFormControlGroup: FormGroup = this.formBuilder.group({
      'startDate': new FormControl(""),
      'endDate': new FormControl(""),
    });

    const dialogRef = this.dialog.open(SprintDialogComponent, {
      data: {
        sprintFormControlGroup,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        let sprint: Sprint = Sprint.getBlankSprint();
        sprint.startDate = result.sprintFormControlGroup.controls['startDate'].value;
        sprint.endDate = result.sprintFormControlGroup.controls['endDate'].value;

        this.sprintService.create(sprint).subscribe(
          (response) => {
            this.dataSource.data.push(response);
            this.dataSource._updateChangeSubscription();
            this.toastr.success('Sprint ' + sprint.sprintNumber + ' was created', 'Sprint add')
          },
          (error) => {
            this.toastr.error('Sprint was not created', 'Sprint creation failed');
            console.log(error);
          });
      }
    });
  }

  editSprint(sprint: Sprint) {
    let sprintFormControlGroup: FormGroup = this.formBuilder.group({
      'startDate': new FormControl(sprint.startDate),
      'endDate': new FormControl(sprint.endDate),
    });

    const dialogRef = this.dialog.open(SprintDialogComponent, {
      data: {
        sprintFormControlGroup,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        let sprint: Sprint = Sprint.getBlankSprint();
        sprint.startDate = result.sprintFormControlGroup.controls['startDate'].value;
        sprint.endDate = result.sprintFormControlGroup.controls['endDate'].value;

        this.sprintService.create(sprint).subscribe(
          (response) => {
            this.dataSource._updateChangeSubscription();
            this.toastr.success('Sprint ' + sprint.sprintNumber + ' was created', 'Sprint add')
          },
          (error) => {
            this.toastr.error('Sprint was not created', 'Sprint creation failed');
            console.log(error);
          });
      }
    });
  }

  openRemoveDialog(data: Sprint) {
    const title = 'Sprint ' + data.sprintNumber;
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        this.sprintService.delete(data.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(sprint => sprint.id === data.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.toastr.success("Sprint was removed");
          },
          () => this.toastr.error("Sprint was not removed")
        );
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

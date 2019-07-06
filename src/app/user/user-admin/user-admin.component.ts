import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Sprint} from "../../model/sprint";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";
import {User} from "../../model/user";
import {UserService} from "../../service/user-service";
import {UserDialogComponent} from "../../dialog/user-dialog/user-dialog.component";
import {Util} from "../../util/util";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'secondName', 'email', 'remove'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        if (response && response.length > 0) {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => this.toastr.error("Error fetching all users")
    );
  }

  addNewUser() {
    // show predefined data
    let formControlGroup: FormGroup = this.formBuilder.group({
      'firstName': new FormControl(''),
      'secondName': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl(''),
    });

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        formControlGroup,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        let user: User = User.getBlankUser();
        user.firstName = result.formControlGroup.controls['firstName'].value;
        user.secondName = result.formControlGroup.controls['secondName'].value;
        user.email = result.formControlGroup.controls['email'].value;
        user.password = result.formControlGroup.controls['password'].value;

        this.userService.create(user).subscribe(
          (response) => {
            this.dataSource.data.push(response);
            this.dataSource._updateChangeSubscription();
            this.toastr.success('User ' + user.firstName + ' was created', 'User add')
          },
          (error) => {
            this.toastr.error('User was not created', 'User creation failed');
            console.log(error);
          });
      }
    });
  }

  edit(user: User) {
    let formControlGroup: FormGroup = this.formBuilder.group({
      'firstName': new FormControl(user.firstName),
      'secondName': new FormControl(user.secondName),
      'email': new FormControl(user.email),
      'password': new FormControl(''),
    });

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        formControlGroup,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        user.firstName = result.formControlGroup.controls['firstName'].value;
        user.secondName = result.formControlGroup.controls['secondName'].value;
        user.email = result.formControlGroup.controls['email'].value;
        const password = result.formControlGroup.controls['password'].value;

        if (!Util.isNullOrUndefined(password) && password !== '' && password !== user.password) {
          user.password = password;
        }

        this.userService.update(user).subscribe(
          (response) => {
            // this.dataSource.data.push(response);
            this.dataSource._updateChangeSubscription();
            this.toastr.success('User ' + user.firstName + ' was created', 'User add')
          },
          (error) => {
            this.toastr.error('User was not created', 'User creation failed');
            console.log(error);
          });
      }
    });
  }

  openRemoveDialog(data: User) {
    const title = 'Sprint ' + data.firstName;
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
        this.userService.delete(data.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(sprint => sprint.id === data.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.toastr.success("User was removed");
          },
          () => this.toastr.error("User was not removed")
        );
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

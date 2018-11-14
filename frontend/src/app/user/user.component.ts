import { Component, OnInit ,ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource,MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = [ 'id','name','email','phone','action'];
  dataSource: MatTableDataSource<any>;
  allusers:any;
  notExist =false;
  id:any;
  details:any;
  constructor(private userService: UserService,private routes: Router,public snackBar: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  refresh(){
        this.userService.getalluser().subscribe(data=>{
          this.loadToDataTable(data);
         
        });
  }
  loadToDataTable(data){
    this.notExist =false;
    if(data.length == 0){
      this.notExist = true;
    }
    this.dataSource = new MatTableDataSource(data);
    // console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  ngOnInit() {
    this.refresh();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getId(id){
    this.id = id
    // console.log(this.id)
  }

deleteUser(id){  
 
    this.userService.deleteUser(id).subscribe(data=>{
      this.details=data;
    // console.log(this.details.msg);
      if(this.details.success){
        
        let snackBarRef =  this.snackBar.open(this.details.msg, '', {
          duration: 2000
        });
        this.refresh();
           }
           else{
            
            let snackBarRef =  this.snackBar.open(this.details.msg, '', {
              duration: 2000
            });
          }
          
    });
  }

  getEditId(id) {
    this.routes.navigate([`/edituser/${id}`]);
  }
}

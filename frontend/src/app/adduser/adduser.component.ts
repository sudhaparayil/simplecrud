import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  createForm: FormGroup;
  details:any;
  constructor(private userService: UserService,private fb: FormBuilder, private router: Router,public snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: '',
      phone: ''
    });
  }

  addUser(name, email, phone) {
    // 
    this.userService.addUser(name, email, phone).subscribe(data=>{
      this.details=data;
      // console.log(this.details.success)
      if(this.details.success){
       
        let snackBarRef =  this.snackBar.open(this.details.msg, '', {
          duration: 2000
        });
        this.router.navigate(['/user']);
           }
           else{
           
            let snackBarRef =  this.snackBar.open(this.details.msg, '', {
              duration: 2000
            });
          }
      
    });
  }

  ngOnInit() {
    
  }

}
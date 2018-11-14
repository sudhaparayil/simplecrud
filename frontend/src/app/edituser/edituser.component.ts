import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id: String;
  user: any = {};
  updateForm: FormGroup;
  details:any;
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {

     this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: '',
      phone: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id)
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res => {
        this.user = res;
        console.log(this.user)
        this.updateForm.get('name').setValue(this.user.name);
        this.updateForm.get('email').setValue(this.user.email);
        this.updateForm.get('phone').setValue(this.user.phone);
          
      });
    });
  }

  updateUser(name, email, phone) {
   
    this.userService.updateUser(this.id, name, email, phone).subscribe(res => {
      this.details=res;
      console.log(this.details.success)
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

}

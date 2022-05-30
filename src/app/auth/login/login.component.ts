import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService} from '../../services/api-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private apiService: ApiServiceService, private _snackBar: MatSnackBar, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
   }

  ngOnInit(): void {
  }

  login(loginForm: FormGroup): void{
    if(loginForm.valid){
      this.apiService.invokeAPI(`/users/login`, "POST", loginForm.value).subscribe((res: any) =>{
        var userDetails = res.body.userDetails;
        this.apiService.updateUserInfo({userName: userDetails.firstName+" "+userDetails.lastName,
                                        email: userDetails.email,
                                        type: userDetails.type});
        userDetails.type == 'FACULTY' ? this.router.navigateByUrl("faculty/dashboard") : this.router.navigateByUrl("student/dashboard") ;
      },(err: any)=>{
        this._snackBar.open('Login Failed');
      })
    }
  }

}

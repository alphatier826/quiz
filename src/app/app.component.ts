import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userDetails:any;
  headerMenu: any;
  SHeaderMenu: any = [
    {routerLink:'/student/dashboard', title:'Dashboard'},
    {routerLink:'/student/quiz', title:'Quiz'},
    {routerLink:'/student/results', title:'Results'}, 
    {routerLink:'/student/profile', title:'Profile'} 
  ]
  FHeaderMenu: any = [
    {routerLink:'/faculty/dashboard', title:'Dashboard'},
    {routerLink:'/faculty/questions', title:'Question Setup'},
    {routerLink:'/faculty/users', title:'Users'}
  ]
  constructor(public apiService: ApiServiceService, private router: Router){}

  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe((userInfo) =>{
      this.userDetails = userInfo;
      if(this.userDetails.type === "FACULTY"){
        this.headerMenu = this.FHeaderMenu;
      }else{
        this.headerMenu = this.SHeaderMenu;
      }
    })
  }

  logout(): void{
    this.apiService.clearSessionStorage();
    this.userDetails = {};
    this.router.navigateByUrl("");
  }

}

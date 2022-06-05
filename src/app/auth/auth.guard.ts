import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import {ApiServiceService} from '../services/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiServiceService, private router: Router) { } 

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{
  //   return this.apiServiceService.getUserInfo().pipe(map((response: { isActive: any}) => {
  //     if (response.isActive) {
  //         return true;
  //     }
  //     this.router.navigate(['']);
  //     return false;
  // }), catchError((error) => {
  //     this.router.navigate(['']);
  //     return of(false);
  // }));
  return this.apiService.getUserInfo().pipe(map((response: { isActive: any}) => {
    if (response.isActive) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }), catchError((error) => {
    this.router.navigate(['']);
    return of(false);
  }));
  }
  
}

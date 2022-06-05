import { HttpHeaders,HttpClient, HttpParams, HttpResponse, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public currentUserDetails: any = {"fullName": sessionStorage.getItem("fullName"), "email": sessionStorage.getItem("email")};
  public isUserLoggedIn: boolean = false;
  public serviceEndpoint: string = (environment.apiEngineURL || location.origin) + "/serviceEngine";

  constructor(private http: HttpClient) {
    if(sessionStorage.hasOwnProperty('fullName'))  this.isUserLoggedIn = true;
  }

  saveUserInfo(userDetails: any):void{
    sessionStorage.setItem('userDetails',JSON.stringify(userDetails));
    sessionStorage.setItem('fullName',userDetails.userName);
    sessionStorage.setItem('email',userDetails.email);
    this.currentUserDetails = {"fullName": sessionStorage.getItem("fullName"), "email": sessionStorage.getItem("email")};
    this.isUserLoggedIn = true;
  }

  getUserInfo(): Observable<any>{
    return of(JSON.parse(sessionStorage.getItem('userDetails') || '{}'));
  }

  clearSessionStorage(){
    this.isUserLoggedIn = false;
    sessionStorage.clear();
  }


  public getDefaultHeaders(){
    let defaultHeader = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json;charset=UTF-8',
    };
    return defaultHeader;
  }
  
  public invokeAPI(path: string, method: string, request?: any, requestHeader?: any): Observable<HttpResponse<Object>> {
    const url = this.serviceEndpoint + path;
    return this.getHttpService(url, method, requestHeader, request);
  }
  
  private getHttpService(url: string, method: string, requestHeader: any, requestData: any){
    const httpOptions = (requestHeader instanceof HttpHeaders) ? requestHeader : new HttpHeaders(Object.assign(requestHeader || {}, this.getDefaultHeaders()));
    switch (method) {
        case 'GET': return this.http.get(url, { observe: 'response', params: new HttpParams({ encoder: new CustomHttpParamEncoder(), fromObject: requestData }), headers: httpOptions });
        case 'POST': return this.http.post(url, requestData, {observe: 'response', headers: httpOptions});
        case 'PUT': return this.http.put(url, requestData, {observe: 'response', headers: httpOptions});
        case 'PATCH': return this.http.patch(url, requestData, {observe: 'response', headers: httpOptions});
        case 'DELETE': return this.http.delete(url, { observe: 'response', params: new HttpParams({ encoder: new CustomHttpParamEncoder(), fromObject: requestData }), headers: httpOptions });
        default: throw {message: 'Invalid Method'}
    }
  }
}


class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
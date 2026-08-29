import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

     teacherId = new BehaviorSubject<string|null>(null);
     soltId = new BehaviorSubject<string|null>(null);
     courseName = new BehaviorSubject<string|null>(null);
     coursePrice = new BehaviorSubject<string|null>(null);
     emailId = new BehaviorSubject<string>(  sessionStorage.getItem('forgotPassEmail') ?? '');

    constructor(private http:HttpClient){}

    setTeacherId(data: string){
       this.teacherId.next(data);
    }

    isSelectionComplete(): boolean {
      return !!this.teacherId.getValue() && !!this.soltId.getValue();
    }
    
    getTeacherId():string|null{
      return this.teacherId.getValue();
    }

    setSlotId(data: string){
       this.soltId.next(data);
    }

    getSlotId():string|null{
      return this.soltId.getValue();
    }

    setCourseName(data: string){
       this.courseName.next(data);
    }

    getCourseName():string|null{
      return this.courseName.getValue();
    }

    setCoursePrice(data: string){
       this.coursePrice.next(data);
    }

    getCoursePrice():string|null{
      return this.coursePrice.getValue();
    }

    addStudentApi(data:any){
      return  this.http.post(`${environment.apiUrl}/booking/register-book`,data);
    }

    getEmailForgotPass(): string  {
      return this.emailId.getValue();
    }

    setEmailForgotPass(data : string){
      sessionStorage.setItem('forgotPassEmail',data);
      this.emailId.next(data)
    }

    // student forgot password service
    private baseUrl = `${environment.apiUrl}/auth`;

    forgotStudentPassword(body: { email: string }) {
        return this.http.post(`${this.baseUrl}/forgot-password`, body);
    }

    resetStudentPassword(
        token: string,
        body: {
            password: string;
            confirmPassword: string;
        }
    ) {
        return this.http.post(
            `${this.baseUrl}/reset-password/${token}`,
            body
        );
    }
}

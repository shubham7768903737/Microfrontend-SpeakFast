import { ToastrService } from 'ngx-toastr';
import { AlertService } from '@shared/alert.service';
import { isEmailExist } from './../../../core/validator/emailExist.validator';
import { Component, OnInit, signal, viewChild, ElementRef, ViewChild, AfterViewInit, inject, Inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { StudentService } from '@shared/student.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationValidator } from '../../../core/validator/regist_validators.validator';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

   restPasswordForm!:FormGroup;
  isLoaderOn = signal<boolean>(false);
  @ViewChild('emailField')
  emailFieldVar!: ElementRef<HTMLInputElement>;
  private toastr = inject(ToastrService);

  constructor(@Inject(StudentService) private frogotstudentserve: StudentService, private snackBar: MatSnackBar,
     private router: Router, private fb: FormBuilder,private emailExistService: isEmailExist,
    @Inject(AlertService) private alertServ: AlertService) { }

  // emailVal: string = '';

  // resetPassword(){
  //   const body = {
  //     email : this.emailVal
  //   }
  //   this.frogotstudentserve.forgotStudentPassword(body).subscribe((data : any)=>{
  //     console.log(data);
  //   })
  //   console.log(this.emailVal);
  // }

  ngOnInit(): void {

    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.emailFieldVar.nativeElement.focus();
  }


  initializeForm():void{
    this.restPasswordForm = this.fb.group({
      email:['',
            [Validators.required,RegistrationValidator.noSpaceValidator,
              RegistrationValidator.isEmailCorrect],
             [this.emailExistService.emailExistsForgotPass()]]
    })

  }


  resetPassword(): void {


    if(this.restPasswordForm.valid){
        this.isLoaderOn.set(true);
        this.frogotstudentserve
        .forgotStudentPassword(this.restPasswordForm.value)
        .subscribe({
        next: (response: any) => {
          this.isLoaderOn.set(false);
          // this.alertServ.success("Success"," your mail will receive change password link ");
          this.frogotstudentserve.setEmailForgotPass(this.restPasswordForm.get('email')?.value);
          localStorage.setItem('forgotEmailId',this.restPasswordForm.get('email')?.value)
          this.alertServ.tosterInfo('Please check you email');
          this.router.navigate(['/forgotPassword/sentLink']);
        },

        error: (_error: Error)=>{
                    this.isLoaderOn.set(false);
          // this.alertServ.error("","please try after some time...");
          this.alertServ.tosterUnsuccess('Try after sometime...!')
        }
      })

    }else{
      this.restPasswordForm.markAllAsTouched();
    }


  }
}

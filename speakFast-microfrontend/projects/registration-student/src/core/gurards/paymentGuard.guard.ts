import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StudentService } from '@shared/student.service';



export const paymentGuard :CanActivateFn=(Route,states)=>{
  const servFile = inject(StudentService);
  const route = inject(Router);

  if(servFile.getRegistrationStatus()){
    return true;
  }

  return route.navigate(['/']);
}

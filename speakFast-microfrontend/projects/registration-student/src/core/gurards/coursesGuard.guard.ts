import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { StudentService } from '@shared/student.service';



export const CouserGuard:CanActivateFn = (route,state)=>{
  const router = inject(Router);
  const teacherServ = inject(StudentService);
    if (teacherServ.isSelectionComplete()) {
      return true;
    }
  return router.navigate(['/']);;
}



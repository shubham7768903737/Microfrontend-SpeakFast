import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { StudentService } from '@shared/student.service';



export const StudentRegistrationGuard:CanActivateFn = (route,state)=>{
  const router = inject(Router);
  const CourseServ = inject(StudentService);
    if (CourseServ.isCoursesSelected()) {
      return true;
    }
  return router.navigate(['/']);
}



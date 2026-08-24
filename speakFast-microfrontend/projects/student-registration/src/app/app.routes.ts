import { Payment } from './components/payment/payment';
import { CourseSelection } from './components/course-selection/course-selection';
import { Routes } from '@angular/router';
import { StudentRegistrationComp } from './components/student-registration-comp/student-registration-comp';
import { TeacherSelection } from './components/teacher-selection/teacher-selection';

export const routes: Routes = [

  {  path: '',redirectTo:'teacherSelection',pathMatch:'full'   },
  {path:'teacherSelection', component:TeacherSelection},
  {  path: 'courseSelection', component:CourseSelection
  },
  {path:'studentRegistration', component:StudentRegistrationComp},
  {path:'payment',component:Payment}
];

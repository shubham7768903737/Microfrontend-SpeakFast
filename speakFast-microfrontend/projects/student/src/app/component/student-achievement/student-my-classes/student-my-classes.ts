// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-student-my-classes',
//   imports: [],
//   templateUrl: './student-my-classes.html',
//   styleUrl: './student-my-classes.css',
// })
// export class StudentMyClasses {

// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

interface ProgressItem {
  label: string;
  value: number;
}

@Component({
  selector: 'app-student-my-classes',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './student-my-classes.html',
  styleUrl: './student-my-classes.css',
})
export class StudentMyClasses {
   progressItems: ProgressItem[] = [
    { label: 'Basic', value: 32 },
    { label: 'Advance', value: 0 },
    { label: 'Practice', value: 0 },
  ];

}

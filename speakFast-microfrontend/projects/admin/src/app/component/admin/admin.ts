import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AdminAllstudents } from './admin-allstudents/admin-allstudents';
import { AdminRecentEnrollmentsAllStudent } from './admin-recent-enrollments-all-student/admin-recent-enrollments-all-student';
import { AdminTeachers } from './admin-teachers/admin-teachers';

interface TabItem {
  label: string;
  key: 'recent' | 'teachers' | 'students';
}

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    AdminAllstudents,
    AdminRecentEnrollmentsAllStudent,
    AdminTeachers

  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  studentCount = signal(0);
  teacherCoutn = signal(0)
  totalStudentCount(count: any) {
    console.log(count)
    this.studentCount.set(count)
  }

  teacherCount(count: any) {
    this.teacherCoutn.set(count)
  }

  stats = computed(() => [
    {
      icon: 'groups',
      iconGradient: 'linear-gradient(135deg, #6ea8fe 0%, #3b6fe0 100%)',
      label: 'Total Students',
      value: this.studentCount(),
      sublabel: '+12% this month'
    },
    {
      icon: 'assignment_ind',
      iconGradient: 'linear-gradient(135deg, #b48af0 0%, #7c4fd6 100%)',
      label: 'Active Teachers',
      value: this.teacherCoutn(),
      sublabel: `${this.teacherCoutn()} available`
    },
    {
      icon: 'currency_rupee',
      iconGradient: 'linear-gradient(135deg, #6cc6f8 0%, #2f9eea 100%)',
      label: 'Monthly Revenue',
      value: '$48,650',
      sublabel: '+8.2% vs last month'
    },
    {
      icon: 'calendar_month',
      iconGradient: 'linear-gradient(135deg, #ff8f9c 0%, #ef4d63 100%)',
      label: 'Classes This Week',
      value: '324',
      sublabel: '156 scheduled ahead'
    }
  ]);

  tabs: TabItem[] = [
    { label: 'Recent Enrollments', key: 'recent' },
    { label: 'Teachers', key: 'teachers' },
    { label: 'All Students', key: 'students' }
  ];

  activeTab = signal<'recent' | 'teachers' | 'students'>('recent');

  selectTab(selected: TabItem): void {
    this.activeTab.set(selected.key);
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AdminService } from '../../../core/services/admin.service';
import { AlertService } from '../../../core/services/alert.service';
import { Teacher } from '../admin-teachers';

interface SlotForm {
  date: string;
  time: string;
}

interface TeacherForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: string;
  aadharNo: string;
  googleMeetLink: string;
}

@Component({
  selector: 'app-add-teacher-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './add-teacher-dialog.html',
  styleUrl: './add-teacher-dialog.css',
})
export class AddTeacherDialog implements AfterViewInit {
  @Input() isOpen = false;

  @Input()
  set teacherData(teacher: Teacher | null) {
    this.editingTeacher = teacher;
    this.resetForm(teacher);
  }

  @Output() addTeacher = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<void>();

  @ViewChild('firstNameInput') firstNameInputRef?: ElementRef<HTMLInputElement>;

  editingTeacher: Teacher | null = null;
  panelOpen = false;
  saving = false;
  errorMessage = '';

  form: TeacherForm = this.emptyForm();
  slots: SlotForm[] = [{ date: '', time: '' }];
  photoFile: File | null = null;

  constructor(
    private adminService: AdminService,
    private alertService: AlertService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.panelOpen = true;
      this.firstNameInputRef?.nativeElement.focus();
    });
  }

  get isEditMode(): boolean {
    return !!this.editingTeacher;
  }

  private emptyForm(): TeacherForm {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNumber: '',
      aadharNo: '',
      googleMeetLink: '',
    };
  }

  private resetForm(teacher: Teacher | null): void {
    if (teacher) {
      this.form = {
        ...this.emptyForm(),
        firstName: teacher.userId.firstName || '',
        lastName: teacher.userId.lastName || '',
        email: teacher.userId.email || '',
        contactNumber: teacher.contactNumber || '',
        aadharNo: teacher.aadharNo || '',
        googleMeetLink: teacher.googleMeetLink || '',
      };
      this.slots = teacher.slots?.length
        ? teacher.slots.map(s => ({ date: s.date || '', time: s.time || s.startTime || '' }))
        : [{ date: '', time: '' }];
    } else {
      this.form = this.emptyForm();
      this.slots = [{ date: '', time: '' }];
    }
    this.photoFile = null;
    this.errorMessage = '';
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.photoFile = input.files?.[0] || null;
  }

  addSlot(): void {
    this.slots.push({ date: '', time: '' });
  }

  removeSlot(index: number): void {
    this.slots.splice(index, 1);
    if (!this.slots.length) {
      this.slots.push({ date: '', time: '' });
    }
  }

  close(): void {
    this.closeDrawer.emit();
  }

  submit(): void {
    if (!this.form.firstName || !this.form.lastName || !this.form.email) {
      this.errorMessage = 'First name, last name and email are required.';
      return;
    }

    if (!this.isEditMode && !this.form.password) {
      this.errorMessage = 'Password is required.';
      return;
    }

    this.errorMessage = '';
    this.saving = true;

    const validSlots = this.slots.filter(s => s.date && s.time);

    if (this.isEditMode && this.editingTeacher) {
      const { password, ...rest } = this.form;
      const payload = { ...rest, slots: validSlots };

      this.adminService.updateTeacher(this.editingTeacher._id, payload).subscribe({
        next: () => {
          this.saving = false;
          this.alertService.toasterSuccess('Teacher updated successfully.');
          this.addTeacher.emit();
        },
        error: (err: any) => {
          this.saving = false;
          this.errorMessage = err.error?.message || 'Something went wrong.';
        },
      });
    } else {
      this.adminService
        .addTeacher({ ...this.form, slots: validSlots, photo: this.photoFile })
        .subscribe({
          next: () => {
            this.saving = false;
            this.alertService.toasterSuccess('Teacher added successfully.');
            this.addTeacher.emit();
          },
          error: (err: any) => {
            this.saving = false;
            this.errorMessage = err.error?.message || 'Something went wrong.';
          },
        });
    }
  }
}

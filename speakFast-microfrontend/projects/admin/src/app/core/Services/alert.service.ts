import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirm(
    title: string,
    html: string,
    icon: SweetAlertIcon = 'warning',
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      html,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: '#e0453f',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
    });
  }

  success(title: string, message = ''): Promise<SweetAlertResult> {
    return Swal.fire({ title, text: message, icon: 'success' });
  }

  error(title: string, message = ''): Promise<SweetAlertResult> {
    return Swal.fire({ title, text: message, icon: 'error' });
  }

  toasterSuccess(message: string): void {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    }).fire({ icon: 'success', title: message });
  }

  toasterError(message: string): void {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    }).fire({ icon: 'error', title: message });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      course: ['', Validators.required],
      subject: ['', Validators.required],
      session: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      occupation: [''],
      guardianName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = {
        ...this.studentForm.value,
        name: `${this.studentForm.value.firstName} ${this.studentForm.value.lastName}`,
      };

      this.studentService.createStudent(studentData).subscribe({
        next: () => {
          alert('Student registered successfully!');
          this.router.navigate(['/students']);
        },
        error: (error) => {
          alert('Error registering student. Please try again.');
          console.error('Error:', error);
        }
      });
    } else {
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}

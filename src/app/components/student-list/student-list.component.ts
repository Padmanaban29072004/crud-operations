import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents()
      .subscribe({
        next: (data) => {
          this.students = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading students. Please try again later.';
          this.loading = false;
        }
      });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id)
        .subscribe({
          next: () => {
            this.students = this.students.filter(student => student.id !== id);
          },
          error: (error) => {
            this.error = 'Error deleting student. Please try again later.';
          }
        });
    }
  }

  editStudent(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}

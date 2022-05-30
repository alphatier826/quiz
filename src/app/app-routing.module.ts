import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'student',
    loadChildren: ()=> import('./students/students.module').then(m => m.StudentsModule)
  },{
    path: 'faculty',
    loadChildren: ()=> import('./faculty/faculty.module').then(m => m.FacultyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

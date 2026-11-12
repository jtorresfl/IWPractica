import { Routes } from '@angular/router';

import { CursosComponent } from './pages/cursos/cursos.component';
import { FormCursoComponent } from './pages/form-curso/form-curso.component';

export const routes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'nuevo', component: FormCursoComponent },
  { path: 'editar/:id', component: FormCursoComponent }
];

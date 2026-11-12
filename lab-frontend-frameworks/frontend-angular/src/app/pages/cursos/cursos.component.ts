import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Curso, CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="toolbar">
      <h1>Cursos</h1>
      <a routerLink="/nuevo" class="btn">+ Nuevo curso</a>
    </div>

    @if (error()) {
      <div class="alert alert-error">{{ error() }}</div>
    }

    <div class="card">
      @if (cargando()) {
        <p class="muted">Cargando...</p>
      } @else if (cursos().length === 0 && !error()) {
        <p class="muted">No hay cursos registrados.</p>
      } @else if (cursos().length > 0) {
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Créditos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (curso of cursos(); track curso.id) {
                <tr>
                  <td>{{ curso.id }}</td>
                  <td>{{ curso.nombre }}</td>
                  <td>{{ curso.creditos }}</td>
                  <td class="acciones">
                    <a [routerLink]="['/editar', curso.id]" class="btn btn-warning">Editar</a>
                    <button class="btn btn-danger" (click)="eliminar(curso)">Eliminar</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `
})
export class CursosComponent implements OnInit {
  private servicio = inject(CursoService);

  cursos = signal<Curso[]>([]);
  error = signal('');
  cargando = signal(true);

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.servicio.listar().subscribe({
      next: (data) => {
        this.cursos.set(data);
        this.error.set('');
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con la API. ¿Está el backend en http://localhost:3000?');
        this.cargando.set(false);
      }
    });
  }

  eliminar(curso: Curso) {
    if (!confirm(`¿Eliminar el curso "${curso.nombre}"?`)) return;
    this.servicio.eliminar(curso.id!).subscribe({
      next: () => this.listar(),
      error: () => this.error.set('No se pudo eliminar el curso.')
    });
  }
}

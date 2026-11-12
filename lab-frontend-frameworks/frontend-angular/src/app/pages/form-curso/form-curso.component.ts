import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <h1>{{ id ? 'Editar curso' : 'Nuevo curso' }}</h1>

    @if (errorApi()) {
      <div class="alert alert-error">{{ errorApi() }}</div>
    }
    @if (errores().length > 0) {
      <div class="alert alert-error">
        @for (e of errores(); track e) {
          <div>{{ e }}</div>
        }
      </div>
    }

    <form class="card" (ngSubmit)="guardar()" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input id="nombre" name="nombre" [(ngModel)]="nombre" />
      </div>

      <div class="form-group">
        <label for="creditos">Créditos</label>
        <input id="creditos" name="creditos" type="number" min="1" [(ngModel)]="creditos" />
      </div>

      <div class="acciones">
        <button type="submit" class="btn">{{ id ? 'Actualizar' : 'Registrar' }}</button>
        <a routerLink="/" class="btn btn-secondary">Cancelar</a>
      </div>
    </form>
  `
})
export class FormCursoComponent implements OnInit {
  private servicio = inject(CursoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  nombre = signal('');
  creditos = signal<number>(4);
  errores = signal<string[]>([]);
  errorApi = signal('');

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (!param) return;

    this.id = Number(param);
    this.servicio.obtener(this.id).subscribe({
      next: (c) => {
        this.nombre.set(c.nombre);
        this.creditos.set(c.creditos);
      },
      error: () => this.errorApi.set('No se pudo cargar el curso.')
    });
  }

  private validar(): boolean {
    const lista: string[] = [];
    const nombre = (this.nombre() ?? '').trim();
    if (!nombre) lista.push('El nombre es obligatorio.');
    else if (nombre.length < 3) lista.push('El nombre debe tener al menos 3 caracteres.');
    if (!(Number(this.creditos()) > 0)) lista.push('Los créditos deben ser mayores que cero.');
    this.errores.set(lista);
    return lista.length === 0;
  }

  guardar() {
    this.errorApi.set('');
    if (!this.validar()) return;

    const curso = { nombre: this.nombre().trim(), creditos: Number(this.creditos()) };
    const peticion = this.id
      ? this.servicio.actualizar(this.id, curso)
      : this.servicio.registrar(curso);

    peticion.subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) =>
        this.errorApi.set(e.error?.mensaje || 'No se pudo conectar con la API.')
    });
  }
}

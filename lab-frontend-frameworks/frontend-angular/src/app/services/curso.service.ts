import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Curso {
  id?: number;
  nombre: string;
  creditos: number;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private http = inject(HttpClient);
  private api = 'https://animated-space-meme-97w6pgr54pgxcxwj-3000.app.github.dev/api/cursos';

  listar() {
    return this.http.get<Curso[]>(this.api);
  }

  obtener(id: number) {
    return this.http.get<Curso>(`${this.api}/${id}`);
  }

  registrar(curso: Curso) {
    return this.http.post<Curso>(this.api, curso);
  }

  actualizar(id: number, curso: Curso) {
    return this.http.put<Curso>(`${this.api}/${id}`, curso);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}

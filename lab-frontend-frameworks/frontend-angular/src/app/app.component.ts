import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <span class="brand">Gestión de Cursos (Angular)</span>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Cursos</a>
      <a routerLink="/nuevo" routerLinkActive="active">Nuevo curso</a>
    </nav>
    <main class="container">
      <router-outlet />
    </main>
  `
})
export class AppComponent {}

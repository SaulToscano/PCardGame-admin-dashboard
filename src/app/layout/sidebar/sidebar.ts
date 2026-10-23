import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../core/services/auth.service';
import { SidebarToggleButtonComponent } from '../sidebar-toggle-button/sidebar-toggle-button';

interface CustomMenuItem extends MenuItem {
  permission_level?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    SidebarToggleButtonComponent,
  ],
})
export class SidebarComponent implements OnInit {
  @HostBinding('class.collapsed') collapsed = false;
  userPermissionLevel = 0; // Por defecto es 0

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('current_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userPermissionLevel = user.permission_level || 0;
    }
  }

  // Rutas accesibles para todos los usuarios logueados (incluso nivel 1)
  menuItems: CustomMenuItem[] = [
    { label: "Home", icon: "pi pi-objects-column", routerLink: "/" },
  ];

  // Rutas exclusivas para Administradores (nivel 10)
  adminMenuItem: CustomMenuItem[] = [
    { label: "Usuarios", icon: "pi pi-users", routerLink: "/users" },
    // Aquí puedes agregar: { label: "Cartas", icon: "pi pi-clone", routerLink: "/cards" }
  ];

  get filteredMenuItems(): CustomMenuItem[] {
    return this.menuItems;
  }

  get filteredAdminMenuItems(): CustomMenuItem[] {
    return this.adminMenuItem;
  }

  isAdmin() {
    // Solo muestra la sección de administración si el nivel es 10
    return this.userPermissionLevel === 10;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
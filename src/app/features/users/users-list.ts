import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TagModule, ToastModule],
  providers: [MessageService],
  templateUrl: './users-list.html'
})
export class UsersList implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  
  private usersService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'Lista de usuarios cargada' });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.loading = false;
        const errorMsg = err.error?.error || 'Error al obtener los usuarios';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        this.cdr.detectChanges();
      }
    });
  }
}
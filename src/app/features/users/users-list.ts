import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UsersService } from '@core/services/users.service';
import { CardsService } from '@core/services/cards.service';
import { User, UserCard } from '@core/models/user.model';
import { Card } from '@core/models/card.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule, CardModule, TableModule, TagModule, ToastModule, 
    ButtonModule, DialogModule, InputTextModule, InputNumberModule, 
    SelectModule, IconFieldModule, InputIconModule, FormsModule
  ],
  providers: [MessageService],
  templateUrl: './users-list.html'
})
export class UsersList implements OnInit {
  users: User[] = [];
  loading: boolean = true;

  displayEditDialog: boolean = false;
  selectedUser: User | null = null;
  saving: boolean = false;

  availableCards: Card[] = [];
  variantOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Foil', value: 'foil' }
  ];
  
  private usersService = inject(UsersService);
  private cardsService = inject(CardsService);
  private cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadUsers();
    this.loadCards();
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

  loadCards() {
    this.cardsService.getCards().subscribe({
      next: (data) => {
        this.availableCards = data;
      },
      error: (err) => {
        console.error('Error al cargar la base de datos de cartas', err);
      }
    });
  }

  openEdit(user: User) {
    this.selectedUser = JSON.parse(JSON.stringify(user)); 
    if (!this.selectedUser!.cards) {
      this.selectedUser!.cards = [];
    }
    this.displayEditDialog = true;
  }

  addCardRow() {
    if (this.selectedUser) {
      this.selectedUser.cards.push({ tid: '', variant: 'normal', quantity: 1, stars: 0 });
    }
  }

  removeCardRow(index: number) {
    if (this.selectedUser) {
      this.selectedUser.cards.splice(index, 1);
    }
  }

  saveUser() {
    if (!this.selectedUser) return;

    if (this.selectedUser.cards && !this.validateNoDuplicates(this.selectedUser.cards)) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Cartas Duplicadas', 
        detail: 'No puedes tener dos renglones con la misma carta, variante y nivel de estrellas.' 
      });
      return;
    }

    this.saving = true;

    this.usersService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: (updatedUser) => {
        this.saving = false;
        this.displayEditDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario guardado' });
        this.loadUsers();
      },
      error: (err) => {
        this.saving = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar' });
        this.cdr.detectChanges();
      }
    });
  }

  validateNoDuplicates(cards: UserCard[]): boolean {
    const seenCombinations = new Set<string>();
    
    for (const card of cards) {
      if (!card.tid) continue;
      
      const uniqueKey = `${card.tid}-${card.variant}-${card.stars}`;
      
      if (seenCombinations.has(uniqueKey)) {
        return false;
      }
      seenCombinations.add(uniqueKey);
    }
    return true;
  }

  isDuplicateCard(currentCard: UserCard, allCards: UserCard[]): boolean {
    if (!currentCard.tid || !allCards) return false;
    
    const coincidences = allCards.filter(c => 
      c.tid === currentCard.tid && 
      c.variant === currentCard.variant && 
      c.stars === currentCard.stars
    ).length;
    
    return coincidences > 1;
  }
}
import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from "primeng/card";
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { AuthService } from "@/app/core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
    RouterModule
  ],
})
export class Login implements OnDestroy {
  loading: boolean = false;
  loginForm: FormGroup;
  forgottenForm: FormGroup;
  forgottenPassword: boolean = false;
  private authSub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _messageService: MessageService,
    private authService: AuthService
  ){
    // Cambiamos email por username para que coincida con la API
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.forgottenForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas' });
      return;
    }

    this.loading = true;
    const { username, password } = this.loginForm.value;

    this.authSub = this.authService.login(username, password).subscribe({
      next: (res: any) => {
        this.loading = false;
        // Solo permitimos el acceso si el usuario es administrador (permission 10)
        if (res.permission_level >= 10) {
            this._messageService.add({ severity: 'success', summary: 'Bienvenido', detail: `Hola ${res.username}` });
            this.router.navigate(['/']);
        } else {
            this.authService.logout();
            this._messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'No tienes permisos de administrador.' });
        }
      },
      error: (err: any) => {
        this.loading = false;
        // La API Node.js suele enviar el error en err.error.error
        const errorMsg = err.error?.error || 'Error al conectar con el servidor';
        this._messageService.add({ severity: 'error', summary: 'Error de Autenticación', detail: errorMsg });
      }
    });
  }

  recoverPassword() {
    // Aquí implementaremos la llamada a la API de recuperación más adelante
    if (this.forgottenForm.invalid) return;
    this._messageService.add({ severity: 'info', summary: 'En desarrollo', detail: 'Función próximamente disponible' });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
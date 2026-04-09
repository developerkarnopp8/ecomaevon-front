import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { ToastService } from '../../../core/services/toast.service';
import { User, Address } from '../../../core/models/user.model';
import { Order } from '../../../core/models/order.model';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user?: User;
  orders: Order[] = [];
  activeTab: 'orders' | 'addresses' | 'payment' | 'settings' | 'security' = 'orders';
  isLoadingOrders = true;
  isEditingProfile = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private orderService: OrderService,
    private toast: ToastService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      cpf: [''],
      birthDate: [''],
      newsletterOptIn: [false]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser!;
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone || '',
      cpf: this.user.cpf || '',
      newsletterOptIn: this.user.newsletterOptIn
    });
    this.orderService.getMyOrders().subscribe(res => {
      this.orders = res.orders;
      this.isLoadingOrders = false;
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.authService.updateUser(this.profileForm.value);
    this.user = this.authService.currentUser!;
    this.isEditingProfile = false;
    this.toast.success('Perfil atualizado com sucesso!');
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendente', processing: 'Processando', shipped: 'Enviado',
      delivered: 'Entregue', cancelled: 'Cancelado', refunded: 'Reembolsado'
    };
    return map[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  setDefaultAddress(addressId: string): void {
    const updated = this.user!.addresses.map(a => ({ ...a, isDefault: a.id === addressId }));
    this.authService.updateUser({ addresses: updated });
    this.user = this.authService.currentUser!;
    this.toast.success('Endereço padrão atualizado');
  }
}

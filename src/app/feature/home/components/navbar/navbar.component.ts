import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/core/service/book.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public nameCustomer: string;

  public numberBook: number = 0;
  public subscriptionNumber: Subscription;

  constructor(
    private router: Router,
    public token: TokenService,
    public bookService: BookService) { 
    // this.token.getInfoToken().name;
    this.nameCustomer = this.token.getInfoToken().name;
  }

  ngOnInit(): void {
    // MOSTRAR EL NUMERO DE LA CANTIDAD DE RESERVAS HAY
    this.subscriptionNumber = this.bookService.getNumberBookReserves.subscribe({
      next: data => {
        this.numberBook = data;
      }
    });
  }

  public SignOff() {
    Swal.fire({
      title: '¿Deseas cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl("/autenticacion/inicio-sesion");
        this.token.deleteToken();
      }
    })
  }
}

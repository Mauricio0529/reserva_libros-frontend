import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookReservesRequest } from 'src/app/core/models/bookReservesRequest';
import { ReservesRequest } from 'src/app/core/models/reservesRequest';
import { ReservesService } from 'src/app/core/service/reserves.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  /**
   * Carrito de compra.
   * aqui se le envia el objecto del carrito al backend para guardarlo
   */

  // Lista de libros a reservar
  public listBooksReserves: Array<BookReservesRequest>;
  
  // CODIGO QR DE LA RESERVA
  public numberReserves: string;

  public reservesSaved: boolean = false;
  
  constructor(private token: TokenService, private reservesService: ReservesService) {
    //this.bookForm = fb.group({ })
    this.listBooksReserves = JSON.parse(localStorage.getItem('booksReserva'));
   }

  ngOnInit(): void {
  }


  public registerReserve(): void {

    let totalBookReserves = this.listBooksReserves.length;

    // ReservesRequestDto
    let newReserve: ReservesRequest = {

      customerCardId: this.token.getInfoToken().cardId,
      totalReserves: totalBookReserves,
      dateDelivery: new Date(Date.now()),
      dateReserves: new Date(Date.now()),
      bookReservesEntities: this.listBooksReserves
    }

    Swal.fire({
      title: 'Estas seguro de confirmar tu reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        /**
         * Guardar la reserva
        */
        this.reservesService.save(newReserve).subscribe( {
          next: value => {
            this.reservesSaved = true;
            this.numberReserves = value.id;

            localStorage.clear(); // limpiar el carrito de compras

            Swal.fire(
              'Su reserva fue exitosa',
              `La reserva de libros ha sido registrada`,
              'success'
            );
            // localStorage.setItem("booksReserva", "");
          },
        });
       
      }
    })
    

  }

}

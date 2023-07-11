import { Component, OnInit } from '@angular/core';
import { BookRegisterRequest } from 'src/app/core/models/bookRegisterRequest';
import { BookReservesRequest } from 'src/app/core/models/bookReservesRequest';
import { BookService } from 'src/app/core/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  public listBook; // BookRegisterRequest[]

  public bookAddedToReserves: boolean = false;

  public bookExisting: boolean = false;
  
  // carrito de compra
  public bookReserva: BookReservesRequest[];
  //public listaBook2: BookResponse[];
  
  constructor(public bookService: BookService) {
    let getInfoLocalStorage = JSON.parse(localStorage.getItem('booksReserva'));

    if(getInfoLocalStorage == null) {
      this.bookReserva = []; 
    } else {
      this.bookReserva = getInfoLocalStorage;
    }

   }

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: response => {
        this.listBook = response;
        console.log(this.bookService)
      }
    });

    // this.bookService.setNumberBookReserves();
  }

  /**
   * Agrega un libro al carrito de compras
   * 
   * Agrega un libro a la lista de reserva
   */

  /**
   * Los datos se pasa por medio del html
   * 
   * @param newBook Libro a guardar al carrito 
   */
  public addBookReservesCart(newBook: BookRegisterRequest): void {

    this.bookAddedToReserves = true;

    this.bookExisting = false;

    this.bookReserva.forEach(book => {
      if(book.title == newBook.title) {
        this.bookExisting = true;
        Swal.fire(
          'Producto ya registrado',
          `Este libro ya se encuentra agregado`,
          'error'
        );
      }
    });
    
    /* YvI3DqU6
     * Si no se encuentra repetido, se agrega al carrito
    */
    if(!this.bookExisting) {
      
      let bookReserves: BookReservesRequest = {
        bookId: newBook.bookId,
        title: newBook.title,
        quantity:  1
      };

      this.bookReserva.push(bookReserves);
      // bookAddedToReserves = false;

    }

    
    console.log("Libro reservado ", this.bookReserva);
    //this.bookAddedToReserves = true;

    localStorage.setItem("booksReserva", JSON.stringify(this.bookReserva));

    // AGREGAMOS LA CANTIDAD DE LIBROS QUE SE ESTAN RESERVANDO
    this.bookService.setNumberBookReserves();
  }

  public deletedBookReservesCart(newBook: BookRegisterRequest): void {

    let deleted: boolean = false;
    this.bookAddedToReserves = false;

    // let bookAcuallity: BookReservesRequest = this.bookReserva.find(book => book.title === newBook.title);

    for(let i = 0; i < this.bookReserva.length && !deleted; i++) {
      let book = this.bookReserva[i];

      if(book.title === newBook.title) {
        /*if(book.active != 1) {
          // 
          newBook.active = 1
        }*/
        this.bookReserva.splice(i, 1);
        deleted = false;
      }

    }
    console.log("Libro eliminado ", this.bookReserva);

    localStorage.setItem("booksReserva", JSON.stringify(this.bookReserva));
    
    // AGREGAMOS LA CANTIDAD DE LIBROS QUE SE ESTAN RESERVANDO
    this.bookService.setNumberBookReserves();
  }
}
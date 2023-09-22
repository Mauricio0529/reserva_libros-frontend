import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookRegisterRequest } from 'src/app/core/models/bookRegisterRequest';
import { BookReservesRequest } from 'src/app/core/models/bookReservesRequest';
import { BookResponse } from 'src/app/core/models/bookResponse';
import { BookService } from 'src/app/core/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

/** MOSTRAR LOS PRODUCTOS DE LOS CARDS */
  public showAllCardsBooks = false;

  public listBook; // BookRegisterRequest[] ESTE SE PASA PARA OBTENER EL LIBRO SELECCIONADO
  public listBookModalAlert;

  public bookAddedToReserves: boolean = false; // borrar

  public bookExisting: boolean = false;
  
  // carrito de compra (localStorage)
  public bookReserva: BookReservesRequest[];

  //public listaBook2: BookResponse[];
  
  constructor(
    public bookService: BookService,
    private toastr: ToastrService) 
    {
    let getInfoLocalStorage = JSON.parse(localStorage.getItem('booksReserva'));

    if(getInfoLocalStorage == null) {
      this.bookReserva = [];
    } else {
      this.bookReserva = getInfoLocalStorage;
    }
  }

  ngOnInit(): void {
    /** 
     * MOTRAR LA LISTA DE LIBROS  
     * */
    this.bookService.getAll().subscribe({
      next: response => {
        this.listBook = response;
        console.log(this.bookService)
      }
    });

    // this.bookService.setNumberBookReserves();
  }

  //MOSTRAR LOS PRODUCTOS DEL CATALOGO DE CARDS
  toggleCardDisplay() {
    this.showAllCardsBooks = !this.showAllCardsBooks;
  }

  /**
   * Agrega un libro al carrito de compras
   * 
   * Agrega un libro a la lista de reserva
   */

  /**
   * Los datos se pasa por medio del html
   * COLOCAR EL bookResponse
   * 
   * @param newBook Libro a guardar al carrito 
   */
  public addBookReservesCart(newBook: BookResponse): void {

    this.bookAddedToReserves = true; // borrar

    this.bookExisting = false;

    this.bookReserva.forEach(book => {
      if(book.title == newBook.title) {
        this.bookExisting = true;
        Swal.fire(
          'Producto ya registrado',
          `Este libro ya se encuentra agregado`,
          'info'
        );
      }
    });
    
    /*
     * Si no se encuentra repetido, se agrega al carrito (localStorage)
    */
    if(!this.bookExisting) {

      this.toastr.success('Has agregado un producto a reservar', '', {
        timeOut: 1800,
        positionClass: "toast-bottom-right"
        //positionClass: "toast-bottom-full-width"
        //positionClass: "toast-bottom-center"
      });
      
      let bookReserves: BookReservesRequest = {
        bookId: newBook.bookId,
        title: newBook.title,
        author: newBook.authorName, // nuevo
        quantity:  1
      };

      /* 
      * agregamos el dto con la info a la lista bookReserva.
      * esta se almacena en el localStorage.
      */
      this.bookReserva.push(bookReserves);
      // bookAddedToReserves = false;

    }
    
    console.log("Libro reservado ", this.bookReserva);
    //this.bookAddedToReserves = true;

    localStorage.setItem("booksReserva", JSON.stringify(this.bookReserva));

    // AGREGAMOS LA CANTIDAD DE LIBROS QUE SE ESTAN RESERVANDO
    /*
    AL MOMENTO DE INSTANCIAR EL SERVICIO ESTE SE EJECUTA Y AUMENTA EL CONTADOR
    */
    this.bookService.setNumberBookReserves();
  }

  // * SE QUITO BookRegisterRequest
  public deletedBookReservesCart(newBook: BookResponse): void {

    let deleted: boolean = false;
    //this.bookAddedToReserves = false; // borrar
    // let bookAcuallity: BookReservesRequest = this.bookReserva.find(book => book.title === newBook.title);

    this.toastr.info('Has eliminado un producto de la reserva', '', {
      timeOut: 2000,
      positionClass: "toast-bottom-right"
    });

    for(let i = 0; i < this.bookReserva.length && !deleted; i++) {
      let book = this.bookReserva[i];

      if(book.title === newBook.title) {
        /*if(book.active != 1) {
          // 
          newBook.active = 1
        }*/
        
        /**
         * ELIMINAMOS EL PRODUCTO SELECCIONADO
         * i -> es la posicion de la que esta en la lista del localStorage.
         * 1 -> es la cantidad a eliminar
         */
        this.bookReserva.splice(i, 1);
        deleted = false;
      }

    }
    console.log("Libro eliminado ", this.bookReserva);

    /**
     * SE VUELVE A ESTABLECER EN EL LOCALSTORAGE
     */
    localStorage.setItem("booksReserva", JSON.stringify(this.bookReserva));
    
    // AGREGAMOS LA CANTIDAD DE LIBROS QUE SE ESTAN RESERVANDO
    /**
     * SE LLAMA NUEVAMETE EL METODO DEL SERVICIO, 
     * YA QUE SE ESTABLECIO O REEMPLAZO NUEVAMENTE LOS VALORES DE EL LOCALSTORAGE
     */
    this.bookService.setNumberBookReserves();
  }

  public showAlertModal(newBook: BookRegisterRequest): void {
    this.listBookModalAlert = newBook;
//    alert(this.listBookModalAlert.title);

    let reservedBook: string = "Agregar";

    if(newBook.active == 0) {
      reservedBook = "Libro reservado";
    }

    /*
    ESTE ES EL ORIGINAL

    Swal.fire({
      imageUrl: newBook.imagePath,
      imageWidth: 200, // Ajusta el tamaño de la imagen si es necesario
      imageHeight: 200,
      title: newBook.title,
      text: newBook.description,
      confirmButtonText: reservedBook,
      customClass: {
        popup: 'sweet-alert-custom', // Clase personalizada para el estilo
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if(newBook.active != 0) {
          this.addBookReservesCart(newBook);
        }
      }
    });
    */

     // Crea el SweetAlert personalizado
     Swal.fire({
      imageUrl: newBook.imagePath,
      imageWidth: 200, // Ajusta el tamaño de la imagen si es necesario
      imageHeight: 250,
      title: newBook.title,
      text: newBook.description,
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'sweet-alert-custom', // Clase personalizada para el estilo
        image: 'sweet-alert-image', // Clase personalizada para posicionar la imagen
      },
      showCancelButton: false, // Ocultamos el botón de cancelar
      showCloseButton: true, // Mostramos el botón de cerrar
      focusConfirm: false, // No enfocar al botón de confirmar al abrir el SweetAlert
      confirmButtonColor: '#3085d6',
      confirmButtonAriaLabel: 'Aceptar',
    });
    
  }

  mostrarSweetAlert(newBook: BookResponse) {
    // Obtén la imagen y el texto que deseas mostrar en el SweetAlert

    // Crea el SweetAlert personalizado
    /* BORRAR
    Swal.fire({
      imageUrl: newBook.imagePath,
      imageWidth: 200, // Ajusta el tamaño de la imagen si es necesario
      imageHeight: 200,
      title: newBook.title,
      text: newBook.description,
      confirmButtonText: 'Aceptar',
      customClass: {
        title: 'sweet-alert-title', // Clase personalizada para posicionar la imagen
        content: 'sweet-alert-content', // Clase personalizada para posicionar el texto
      },
      showCancelButton: false, // Ocultamos el botón de cancelar
      showCloseButton: true, // Mostramos el botón de cerrar
      focusConfirm: false, // No enfocar al botón de confirmar al abrir el SweetAlert
      confirmButtonColor: '#3085d6',
      confirmButtonAriaLabel: 'Aceptar',
    });*/

     // Obtén la imagen y el texto que deseas mostrar en el SweetAlert
     const imagen = newBook.imagePath;
     const texto = 'Este es un mensaje personalizado dentro del SweetAlert.';

     let reservedBook: string = "Agregar a reservas";
     let colorButton: string = "#3377FF";

     if(newBook.active == 0) {
       reservedBook = "Libro reservado";
       colorButton = "#0C0404"; //D64E4E
     }
 
     // Crea el SweetAlert personalizado div con float left width: 50%; height: 100%; 
     /*
     https://www.freecodecamp.org/espanol/news/centrar-en-html-div-con-css/
     como colocar dos columnas en una modal con css
     https://www.eniun.com/sistema-columnas-contenedores-rejillas-bootstrap/
     https://es.stackoverflow.com/questions/512320/como-poner-dos-columnas-en-html-y-bootstrap-5
     */
     Swal.fire({
      width: '900px',
      heightAuto: false,
      html: `
      <div class="container">
      <div class="row">
        <div class="col-md-6">
          <!-- Columna con la imagen -->
          <img src="${imagen}" style="width: 250px;" alt="Imagen" class="img-fluid">
        </div>
        <div class="col-md-6" style="height: 150px;">
          <!-- Columna con el texto -->
          <p class="parrafo"><b>${newBook.title}</b></p>
          <hr>
          <p style="font-size: 15px;"><b>SKU:</b> ${newBook.bookId}</p>
          <p style="font-size: 15px;"><b>Autor:</b> ${newBook.authorName}</p>
          <p style="font-size: 15px;"><b>Año publicado:</b> ${newBook.yearOfPublication}</p>
          <p style="font-size: 15px;"><b>Descripción:</b> ${newBook.description}</p>
        </div>
      </div>
    </div>
      `,
      confirmButtonText: reservedBook,
      showCancelButton: false,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonColor: colorButton,
      confirmButtonAriaLabel: reservedBook,
      customClass: {
        title:'sweet-titulo'
        //popup: 'sweet-alert-custom', // Clase personalizada para el estilo del cuadro de diálogo
        //confirmButton: 'sweet-alert-btn',
        //<button type="button" class="btn btn-primary" (click)="addBookReservesCart(${newBook})">Agregar a reservas</button>
        
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if(newBook.active != 0) {
          this.addBookReservesCart(newBook);

/** BORRAR
 *   <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

            <div class="alert alert-success d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    An example success alert with an icon
  </div>
</div>
 */
      
        }
      }
    });
  }

/* BORRAR
<div class="row d-flex justify-content-center align-items-center">
        <div class="col-xl-6">
        <img src=${imagen} style="width: 300px; height: 500px;">
        </div>
        
        <div class="col-xl-6">
          <p class="parrafo"><b>${newBook.title}</b></p>
          <hr>
          <p style="font-size: 15px;"><b>SKU:</b> ${newBook.bookId}</p>
          <p style="font-size: 15px;"><b>Autor:</b> ${newBook.authorId}</p>
          <p style="font-size: 15px;"><b>Año publicado:</b> ${newBook.yearOfPublication}</p>
          <p style="font-size: 15px;"><b>Descripción:</b> ${newBook.description}</p>
        </div>
      </div>
*/

  //// BORRAR
  /*
    <div style="float: left; padding-right: 50px;">
        <img src=${imagen} style="width: 300px; height: 500px; margin-top:0px; margin-left:0px; padding-left:0px;" class="sweet-alert-image">  
      </div>

      <div class="sweet-alert-container">
     
          <p class="parrafo"><b>${newBook.title}</b></p>
          <hr>
          <p style="font-size: 15px;"><b>SKU:</b> ${newBook.bookId}</p>
          <p style="font-size: 15px;"><b>Autor:</b> ${newBook.authorId}</p>
          <p style="font-size: 15px;"><b>Año publicado:</b> ${newBook.yearOfPublication}</p>
          <p style="font-size: 15px;"><b>Descripción:</b></p>
          <p style="font-size: 15px;">${newBook.description}</p>
     
      </div>

      https://www.youtube.com/watch?v=KsIEMLUSiUc

      https://getbootstrap.esdocu.com/docs/5.1/components/alerts/
      https://getbootstrap.com/docs/5.0/components/alerts/
  */

  // BORRAR
  mostrarSweetAlert2() {
    // Crea el SweetAlert personalizado con la opción customClass
    Swal.fire({
      title: 'SweetAlert con CustomClass',
      text: 'Este es un cuadro de diálogo con estilo personalizado.',
      icon: 'info',
      customClass: {
        popup: 'sweet-alert-popup', // Clase personalizada para el estilo del cuadro de diálogo
        title: 'sweet-alert-title', // Clase personalizada para el estilo del título
        confirmButton: 'sweet-alert-confirm-btn', // Clase personalizada para el estilo del botón de confirmar
      },
    });
  }

  // BORRAR
  ventanaEmergente(type: string, message: string) {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    //var alertTrigger = document.getElementById('liveAlertBtn');

    var wrapper = document.createElement('div');

    wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">'+
    '<strong>Holy guacamole!</strong> You should check in on some of those fields below.'+
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
    +'</div>'
    
    alertPlaceholder.append(wrapper);
  }

  alertMesagge() {
    this.ventanaEmergente('Genial, activaste este mensaje de alerta.', 'success');
  }
}
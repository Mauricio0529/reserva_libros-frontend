import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookRegisterRequest } from 'src/app/core/models/bookRegisterRequest';
import { BookReservesRequest } from 'src/app/core/models/bookReservesRequest';
import { ProfessionalCareers } from 'src/app/core/models/professionalCareers';
import { ProfessionalCycle } from 'src/app/core/models/professionalCycle';
import { ReservesRequest } from 'src/app/core/models/reservesRequest';
import { Semester } from 'src/app/core/models/semester';
import { BookService } from 'src/app/core/service/book.service';
import { ProfessionalCareersService } from 'src/app/core/service/professional-careers.service';
import { ProfessionalCycleService } from 'src/app/core/service/professional-cycle.service';
import { ReservesService } from 'src/app/core/service/reserves.service';
import { SemesterService } from 'src/app/core/service/semester.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {

  // Lista a mostrar de libros a reservar del carrito de reservas
  public listBooksReserves: Array<BookReservesRequest>;

  // listar carreras profesionales
  public listProfessionalCareers: Array<ProfessionalCareers>;
  
  // listar ciclos profesionales
  public listProfessionalCycle: Array<ProfessionalCycle>;

  // listar ciclos profesionales
  public listSemester: Array<Semester>;

  // CODIGO QR DE LA RESERVA
  public numberReserves: string;

  public reservesSaved: boolean = false;
 
  public registerReservesForm: FormGroup;
  
  public showModalReserves: boolean = true;

    // ------------- Params to customer ----------------- //
  public cardIdCustomer: number;
  public nameCustomer: string;
  public emailCustomer: string;

  // ------------- Params to Select for get value ----------------- //
  public selectedCareersId: number;
  public selectedCycleId: number;
  public selectedSemesterId: number;

  public professionalCareersName: string;
  public professionalCycleName: string;
  public numberSemester: number;
  public booksArray: Array<BookReservesRequest>;
  
  constructor(
    private token: TokenService,
    private reservesService: ReservesService,
    private professionalCareersService: ProfessionalCareersService,
    private professionalCycleService: ProfessionalCycleService,
    private semesterService: SemesterService,
    public bookService: BookService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {

      //this.bookForm = fb.group({ }) CustomerJwt
      this.listBooksReserves = JSON.parse(localStorage.getItem('booksReserva'));

      this.getDataCustomerToToken();

      this.registerReservesForm = this.fb.group({
        name: [{ value: '', disabled: true }],
        cardId: [{value: '', disabled: true}],
        professionalCareersId: ['', [Validators.required]],
        cycleId: ['', [Validators.required]],
        semesterId: ['', [Validators.required]],
        dayId: ['', [Validators.required]]
      });
   }

  ngOnInit(): void {}

  /**
   * Obtener datos del usuario del token
   */
  public getDataCustomerToToken(): void {
    this.nameCustomer = this.token.getInfoToken().name;
      this.nameCustomer = this.nameCustomer + " " + this.token.getInfoToken().lestName;
      this.cardIdCustomer = this.token.getInfoToken().cardId;
      this.emailCustomer = this.token.getInfoToken().email;
  }

  /**
   * Cargar informacion del modal del formulario de la reserva (Select)
   */
  public uploadInformationModal(): void {
    this.listBooksReserves = JSON.parse(localStorage.getItem('booksReserva'));
    if(this.listBooksReserves != null) {
      this.showProfessionalCareers();
      this.showProfessionalCycle();
    } else {
      Swal.fire(
        `Upps..`,
        'No tienes libros a reservar',
        'warning'
      );
    }
  }

  /**
   * Guardar reserva
   * AL MOMENTO DE GUARDAR LA RESERVA,
   * PRIMERO SE DEBE VALIDAR SI EL PRODUCTO SIGUE DISPONIBLE,
   * HACIENDO PERSISTENCIA EN EL PRODUCTO Y OBTENER EL ESTADO DE ESTE
   */
  public registerReserve(): void {
    if(this.listBooksReserves != null) {
      let totalBookReserves = this.listBooksReserves.length;

      // ReservesRequestDto
      /**
       * los Date se hace del back
       */
      let newReserve: ReservesRequest = {
        customerCardId: this.token.getInfoToken().cardId,
        totalReserves: totalBookReserves,
        professionalCareers: this.selectedCareersId,
        professionalCycle: this.selectedCycleId,
        semester: this.selectedSemesterId,
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
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          /**
           * Guardar la reserva
          */
          this.reservesService.save(newReserve).subscribe( {
            next: value => {
              this.reservesSaved = true;
              this.numberReserves = value.id;
              this.professionalCareersName = value.professionalCareers;
              this.professionalCycleName = value.professionalCycle;
              this.numberSemester = value.semester;
              this.booksArray = value.bookReservesEntities;
  
              /**
              * ELIMINADOS EL LIBRO DE LA LISTA
              */
              localStorage.clear(); // limpiar el carrito de compras
              this.bookService.setNumberBookReserves();
  
              Swal.fire(
                'Su reserva fue exitosa',
                `La reserva de libros ha sido registrada`,
                'success'
              );
              // localStorage.setItem("booksReserva", "");
            },
          });

          Swal.fire(
            'Su reserva fue exitosa',
            `La reserva de libros ha sido registrada`,
            'success'
          );
         
        }  /*else if (result.dismiss === Swal.DismissReason.cancel) {
          this.testsBtn = true;
        }*/
      })
    } else {
      Swal.fire(
        `Upps..`,
        'No tienes libros a reservar',
        'warning'
      );
    }
  }

  /**
   * Listar carreras profesionales
   */
  public showProfessionalCareers(): void {
      this.professionalCareersService.getAll().subscribe({
        next: careers => {
          this.listProfessionalCareers = careers;          
        }
      });
  }

  /**
   * Listar ciclos profesionales
   */
  public showProfessionalCycle(): void {
      this.professionalCycleService.getAll().subscribe({
        next: cycle => {
          this.listProfessionalCycle = cycle;
        }
      });
  }

  /**
   * Listar semestre por ciclo seleccionado
   * @param cylceId Id del ciclo seleccionado
   */
  public showSemesterByCycleId(cylceId: number): void {
    this.semesterService.getAllByCycleId(cylceId).subscribe({ 
      next: semester => {
        this.listSemester = semester;
      }
    });
  }
  
  /**
   * Obtener valor seleccionado del Select
   * @param event Evento de obtener el valor del select
   * @returns Id de la carrera profesional seleccionado
   */
  public valueSelectedCareers(event: any): void {
    const selectedCarrera = event.target.value;
    console.log('Carrera seleccionada:', selectedCarrera);
    this.selectedCareersId = selectedCarrera;
  }
 
   /**
   * Obtener valor seleccionado del Select
   * @param event Evento de obtener el valor del select
   * @returns Id del Ciclo profesional seleccionado
   */
  public valueSelectedCycle(event: any): void {
    const selectedCycle = event.target.value;
    console.log('Ciclo seleccionada:', selectedCycle);
    this.selectedCycleId = selectedCycle;
    /**
     * Listar semestre por ciclo seleccionado
     */
    this.showSemesterByCycleId(this.selectedCycleId);    
  }

   /**
   * Obtener valor seleccionado del Select
   * @param event Evento de obtener el valor del select
   * @returns Id del semestre seleccionado
   */
  public valueSelectedSemester(event: any): void {
    const selectedSemester = event.target.value;
    console.log('Semestre seleccionada:', selectedSemester);
    this.selectedSemesterId = selectedSemester;
  }

  valueSelectedDay(event: any) {
    const selectedDayId = event.target.value;
  }

  /**
   * Eliminar producto del localStorage en el carrito de reserva
   */
  public deleteBookReserves(deleteBook: BookReservesRequest) {

    Swal.fire({
      title: 'Estas seguro?',
      text: "¿Deseas eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    })
    .then((result) => {
      if (result.isConfirmed) {

        this.toastr.info('Has eliminado un producto de la reserva', '', {
          timeOut: 2000,
          positionClass: "toast-bottom-right"
  
        });
        
        for(let i = 0; i < this.listBooksReserves.length; i++) {
          let listBook = this.listBooksReserves[i];
    
          if(listBook.title == deleteBook.title) {
            /**
             * ELIMINADOS EL LIBRO SELECCIONADO DE LA LISTA
             */
            this.listBooksReserves.splice(i, 1);
          }
        }
    
        /**
         * SE VUELVE A ESTABLECER EN EL LOCALSTORAGE
         */
        localStorage.setItem("booksReserva", JSON.stringify(this.listBooksReserves));
    
        /**
         * ACTUALIZAMOS EL CONTADOR DEL NAVBAR
         */
        this.bookService.setNumberBookReserves();
    
        if(this.listBooksReserves.length == 0) {
          this.showModalReserves = false;
          localStorage.clear(); // limpiar localStorage
        }  
      }
    })
  }

    /**
   * Mensaje de error en los input
   * @param field Es el nombre del input
   * @returns Mensaje con el error
   */
    public getErrorsFrom(field: string): string {
      /*let message;
  
      const required: Array<string> = ["cardId", "name", "lestName", "username", "email", "numberCellPhone"];
      const formatEmail: Array<string> = ["email"];
      const onlyNumber: Array<string> = ["cardId", "numberCellPhone"];
      
      if(this.isTochedField(this.registerForm, field)) {
  
        if(required.includes(field) && this.registerForm.get(field).hasError('required')) {
          message = ErrorForms.REQUIRED;
        
        } else if(onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')) {
          message = ErrorForms.ONLY_NUMBER;
  
        } else if(formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')){
          message = ErrorForms.FORMAT_EMAIL;
        }
      }
      return message;*/
      return "";
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BookResponse } from '../models/bookResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookRegisterRequest } from '../models/bookRegisterRequest';
import { BookReservesRequest } from '../models/bookReservesRequest';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})

export class BookService {

  // El numero valor inicial GLOBAL del contador
  private numberBookToReserves = new BehaviorSubject(0);
  /**
   * el BehaviorSubject se comportara como un observable .asObservable()
   * para que se suscriba y obtener el valor de la suscripcion
   */
  public readonly getNumberBookReserves: Observable<any> = this.numberBookToReserves.asObservable();

  constructor(private http: HttpClient) {
    this.setNumberBookReserves();
  }

  // BookRegisterRequest[]
  // BookRegisterRequest  
  // BookResponse
  public getAll(): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${apiUrl}libro`);
  }

  /**
   * QUITAR EL BookResponse para reemplazarlo con BookRegisterRequest
   */
  public save(newBook: BookResponse): Observable<BookResponse> {
    return this.http.post<BookResponse>(`${apiUrl}libro`, newBook);
  }

  /**
   * Agregar numero de reserva que se va generando en el carrito de reservas
   * @param numberBook Numero total de la lista de reservas
   *
   * EN ESTE METODO NO SE DISMINUYE EL CONTADOR, YA QUE AL MOMENTO DE ELIMINAR UN PRODUCTOR SELECCIONADO.
   * CON BASE A ESTO, SE VUELVE A ESTABLECER LA LISTA EN EL LOCALSTORAGE SIN EL PRODUCTO SELECCIONADO,
   * YA QUE EN EL COMPONENTE SE ELIMINA EL OBJETO(PRODUCTO) DE LA LISTA DEL LOCALSTORAGE.
   */
  public setNumberBookReserves(): void {
    
    let countBookReserves: number = 0;
    let bookReserves: Array<BookReservesRequest> = JSON.parse(localStorage.getItem("booksReserva"));
    

    // SI ESTO ES VACIO ES 0
    if(!bookReserves) {
      this.numberBookToReserves.next(0);
      return;
    }

    console.log("AQUIII ", bookReserves);

    bookReserves.forEach(book =>{
      countBookReserves += 1;
    });

    /**
     * cambiar o actualizar el valor del BehaviorSubject
     */
    this.numberBookToReserves.next(countBookReserves);
  }
}
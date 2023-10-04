import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { ReservesRequest } from '../models/reservesRequest';
import { Observable } from 'rxjs';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ReservesService {
  
  constructor(private http: HttpClient) { }

  /**
    * Registra una reserva
    * @param newReserves Reserva a guardar
    * @returns Numero de reserva (QR)
    */
  public save(newReserves: ReservesRequest): Observable<any> {
    return this.http.post<any>(`${apiUrl}reserva`, newReserves);
  }

  /**
   * Obtener reservas por la cedula  del cliente
   * @param cardId Cedula del cliente
   * @returns lista de reservas
   */
  public getAllReserveByIdCustomer(cardId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}reserva/customer/${cardId}`);
  }

  /**
   * Obtener reservas dado su estado
   * @param statusReserve Estado de la reserva
   * @returns Lista de reservas
   */
  public getAllReserveByStatus(statusReserve: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}reserva/status-reserve/${statusReserve}`);
  }

  /**
   * Obtener una reserva dado su id (referencia reserva)
   * @param reserveId Id de la reserva
   * @returns Lista reserva
   */
  public getReserveById(reserveId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}reserva/${reserveId}`);
  }

}

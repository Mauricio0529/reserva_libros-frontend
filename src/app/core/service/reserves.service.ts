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


  public getAllReserveByIdCustomer(cardId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}reserva/customer/${cardId}`);
  }

}

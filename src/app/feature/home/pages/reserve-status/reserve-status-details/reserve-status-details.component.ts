import { Component, OnInit } from '@angular/core';
import { StatusReserve } from 'src/app/core/enums/StatusReserve';
import { BookReservesRequest } from 'src/app/core/models/bookReservesRequest';
import { ReservesService } from 'src/app/core/service/reserves.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-reserve-status-details',
  templateUrl: './reserve-status-details.component.html',
  styleUrls: ['./reserve-status-details.component.css']
})
export class ReserveStatusDetailsComponent implements OnInit {

  public showPageDetailsReserves: boolean = false;

  // CODIGO QR DE LA RESERVA
  public numberReserves: string;

   // --------------------- Params Status Reserves ------------------------------- //
   public IN_PROGRESS: string = StatusReserve.IN_PROGRESS;
   public ACCEPTED: string = StatusReserve.ACCEPTED;
   public FINALIZED: string = StatusReserve.FINALIZED;

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
  public statusReserve: string;
  public booksArray: Array<BookReservesRequest>;

  constructor(
    private token: TokenService,
    private reservesService: ReservesService) {
    this.getDataCustomerToToken();
    this.getReserveStatus();
   }

  ngOnInit(): void {
  }
   /**
   * Obtener datos del usuario del token
   */
   public getDataCustomerToToken(): void {
    this.nameCustomer = this.token.getInfoToken().name;
      this.nameCustomer = this.nameCustomer + " " + this.token.getInfoToken().lestName;
      this.cardIdCustomer = this.token.getInfoToken().cardId;
      this.emailCustomer = this.token.getInfoToken().email;
  }

  public getReserveStatus() {
    let reserveId: any = JSON.parse(localStorage.getItem('reserveId'));
    this.reservesService.getReserveById(reserveId).subscribe({ 
      next: value => {
        this.numberReserves = value.id;
              this.professionalCareersName = value.professionalCareers;
              this.professionalCycleName = value.professionalCycle;
              this.numberSemester = value.semester;
              this.booksArray = value.bookReservesEntities;
              this.statusReserve = value.status;
      }
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { BookReservesRequest } from 'src/app/core/models/bookReservesRequest';
import { ReservesService } from 'src/app/core/service/reserves.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hitory-reserves',
  templateUrl: './hitory-reserves.component.html',
  styleUrls: ['./hitory-reserves.component.css']
})
export class HitoryReservesComponent implements OnInit {

  public historyReserves: Array<any>;

  public bookReserves: Array<BookReservesRequest>;

  public nameCustomer: string;
  
  constructor(
    private reservesService: ReservesService,
    private token: TokenService) {
    
      this.reservesService.getAllReserveByIdCustomer(this.token.getInfoToken().cardId).subscribe({
        next: value => {
          this.historyReserves = value;
        }
      });
      
      this.nameCustomer = this.token.getInfoToken().name;
    
  }

  ngOnInit(): void {
  }

  public showBooksReserved(bookReserved: Array<BookReservesRequest>): void {    
    this.bookReserves = bookReserved;
  }



}

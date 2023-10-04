import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusReserve } from 'src/app/core/enums/StatusReserve';
import { ReservesService } from 'src/app/core/service/reserves.service';

@Component({
  selector: 'app-reserve-status',
  templateUrl: './reserve-status.component.html',
  styleUrls: ['./reserve-status.component.css']
})
export class ReserveStatusComponent implements OnInit {

  public listStatusReserve: Array<any>;
  
  // --------------------- Params Status Reserves ------------------------------- //
  public IN_PROGRESS: string = StatusReserve.IN_PROGRESS;
  public ACCEPTED: string = StatusReserve.ACCEPTED;
  public FINALIZED: string = StatusReserve.FINALIZED;


  public emptyReserveStatus: boolean = false;

  constructor(private router: Router, private reservesService: ReservesService) {
    this.getReserveStatus(this.IN_PROGRESS);
  }

  ngOnInit(): void {
  }

  public async showPageDetails(reserveId: number): Promise<void> {
    localStorage.setItem("reserveId", JSON.stringify(reserveId));
    await this.router.navigateByUrl("/catalogo/reserve-status/details");
  }

  public getReserveStatus(newStatus: string) {
    this.listStatusReserve = null;
    this.reservesService.getAllReserveByStatus(newStatus).subscribe({ 
      next: reserves => {
        if(reserves == null) {
          this.emptyReserveStatus = true;
        }

        this.listStatusReserve = reserves;
      }
    });
  }

}

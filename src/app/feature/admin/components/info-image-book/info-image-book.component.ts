import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-image-book',
  templateUrl: './info-image-book.component.html',
  styleUrls: ['./info-image-book.component.css']
})
export class InfoImageBookComponent implements OnInit {

  public infoImageBookForm: any;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.infoImageBookForm = this.controlContainer.control;
    this.infoImageBookForm = this.infoImageBookForm.controls["infoImageBookForm"];
  }

}

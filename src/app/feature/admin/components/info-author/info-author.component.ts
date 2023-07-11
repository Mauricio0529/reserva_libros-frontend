import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-author',
  templateUrl: './info-author.component.html',
  styleUrls: ['./info-author.component.css']
})
export class InfoAuthorComponent implements OnInit {
  
  public infoAuthorForm: any;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.infoAuthorForm = this.controlContainer.control;
    this.infoAuthorForm = this.infoAuthorForm.controls["infoAuthorForm"];
  }

}

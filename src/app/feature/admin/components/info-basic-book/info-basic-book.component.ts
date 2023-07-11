import {Component, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";
import { Categories } from 'src/app/core/models/categories';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-info-basic-book',
  templateUrl: './info-basic-book.component.html',
  styleUrls: ['./info-basic-book.component.css']
})

/**
 * FORMULARIO HIJO DE REGISTER-BOOK
*/
export class InfoBasicBookComponent implements OnInit {

  public infoBasicBookForm: any;
  
  public listCategories: Categories[];

  constructor(
    private controlContainer: ControlContainer,
    public categoriesService: CategoryService) {

    this.categoriesService.getAll().subscribe({
      next: value => { this.listCategories = value }
    })
   
  }

  ngOnInit(): void {
    this.infoBasicBookForm = this.controlContainer.control;
    /** cominicamos el formulario padre */
    this.infoBasicBookForm = this.infoBasicBookForm.controls["infoBasicBookForm"];

  
  }

}
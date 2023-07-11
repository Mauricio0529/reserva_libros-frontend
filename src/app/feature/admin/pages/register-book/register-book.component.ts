import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthorService } from 'src/app/core/service/author.service';
import { BookService } from 'src/app/core/service/book.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/CustomValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})

export class RegisterBookComponent extends AppBaseComponent{

  public createdBookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public bookService: BookService,
    public authorService: AuthorService
    ) {
    super();

    this.createdBookForm = this.fb.group({

      infoBasicBookForm: this.fb.group({
        categoryId: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        yearOfPublication: ['', [Validators.required, CustomValidators.numberDateFuture]]
      }),

      infoImageBookForm: this.fb.group({
        imagePath: ['', Validators.required]
      }),

      infoAuthorForm: this.fb.group({
        /**
         * Aqui si toca crear un nuevo autor, ya que hace parte del libro 
          consumir el servicio de guardar del autor 
        */
          name: ['', Validators.required]
      }),
 
    });
  }
  
  public async registerBook (): Promise<void> {

    if(!this.createdBookForm.valid) {
      Swal.fire(
        'Opss...',
        `Campos invalidos`,
        'error'
      )
      console.log(this.getAllErrorsForm(this.createdBookForm))
      this.createdBookForm.markAllAsTouched();
      
      return;
    }

    let bookFormData = this.createdBookForm.value;

    let bookForm = bookFormData["infoBasicBookForm"];
    let imageForm = bookFormData["infoImageBookForm"];
    
    let authorId = bookFormData["infoAuthorForm"];

    //authorId = 26;
    console.log("Autor ingresado del Libro ", authorId);
    

    /**
     * QUIERO QUE ESTE SE EJECUTE DE PRIMERA
     * TOCA CON PROMESAS
     * NOTA:
     * SI EL AUTOR YA EXISTE, NO SE GUARDA
     * SI NO, SE RETORNA EL AUTOR EXISTENTE EN EL METODO DE SAVE EN EL BACKEND
     */

    /*    this.authorService.save(authorId).subscribe({
      next: value => {
        authorId = value.id;
        console.log("Succes Autor ", authorId);
        
        /*
         * registro book
        /
      },
      error: error => {
        Swal.fire(
          'Algo ha ocurrido',
          `Hubo un problema al registrar el autor`,
          'error'
        )
        console.log("Error Autor ", error);
      }
    })

*/

    await lastValueFrom( this.authorService.save(authorId) ).then(response => {
      authorId = response.id;
      console.log("Succes Autor ", authorId);
    });

    console.log("Autor ", authorId);

      /**
         * Registro libro
         */
      let registerBookDto = {
        ...bookForm,
        ...imageForm,
        authorId
      }
  
      console.log("Datos Libro ", registerBookDto);
  
      this.bookService.save(registerBookDto).subscribe({
  
        next: value => {
          Swal.fire(
            'Registro completado',
            `Se registró el libro correctamente`,
            'success'
          )
  
          console.log("Libro guardado ", value);
        
        }, 
        error: error => {
  
          Swal.fire(
            'Algo ha ocurrido',
            `Hubo un problema al registrar el libro`,
            'error'
          )
          console.log("Error Libro ", error);
  
        }
      })

  }
}
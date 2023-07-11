import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Clase para manejar Validadores personalizados
 */
export class CustomValidators {
    

  /**
   * Valida si el numero ingresado pertenece a una fecha futura
   * @param control
   * @return Null si la fecha es valida, invalidDate: true de lo contrario
   */
  public static numberDateFuture (control: FormControl): { [p: string]: boolean } | null {
    if (control.value) {
      const today = new Date(Date.now()).getFullYear();
      if (control.value > (today)) {
        return {'invalidDate': true }
      }
    }
    return null;
  }


  static EmailValidator(email: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const emailCtrl: string = control.get(email).value;

      if (emailCtrl.match("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")) {
        return {emailValidate: false};
      }
      return null;
    }
  }
}
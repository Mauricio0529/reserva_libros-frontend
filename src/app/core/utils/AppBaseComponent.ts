import { FormArray, FormGroup } from "@angular/forms"

/**
 * Componente padre con validaciones generales
 */


export class AppBaseComponent {
    /**
     * valida si tocaron o presionaron un input
     * @param form 
     * @param field 
     * @returns 
     */
    public isTochedField = (form: FormGroup, field: string): boolean => { 
        return form?.get(field).touched === true && form?.get(field).invalid;
    }

  /**
   * Retorna todos los errores o validaciones presentes en el FormGroup
   * @param form Form a evaluar
   */
  public getAllErrorsForm(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrorsForm(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }
}
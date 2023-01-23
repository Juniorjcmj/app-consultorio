import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[customAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
true}]
})
 export class CustomAsyncValidatorDirective implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors|null> {
   const tipo = control.get('tipoDespesa')?.value;
   console.log(tipo)
    if( tipo ===  "FIXA"){
      return of({'custom': true});
    }
    return of({'custom': false});
  }
}

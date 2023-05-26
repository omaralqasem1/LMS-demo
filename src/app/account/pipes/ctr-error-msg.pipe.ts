import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ctrErrorMsg'
})
export class CtrErrorMsgPipe implements PipeTransform {

  transform(errors: Object): string {
    let errorMsg: string = '';
    if (!errors) return errorMsg;
    const errorKey = Object.keys(errors)[0];
    switch (errorKey) {
      case 'required':
        errorMsg = 'this field is required';
        break;
      case 'pattern':
        errorMsg = 'password minimum length should be 8 characters with at least 1 small letter, 1 capital letter, 1 number and 1 special character';
        break;
      case 'passwordDoesNotMatch':
        errorMsg = 'password does not match';
        break;
      case 'email':
        errorMsg = 'please enter a valid email';
        break;
    }
    return errorMsg;
  }

}

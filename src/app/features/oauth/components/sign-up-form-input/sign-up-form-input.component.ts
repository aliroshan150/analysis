import {Component, input, Input} from '@angular/core';
import {SignUpFormField} from '@oauth-models/sign-up-form-field';
import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';

@Component({
  selector: 'app-sign-up-form-input',
  imports: [],
  templateUrl: './sign-up-form-input.component.html',
  styleUrl: './sign-up-form-input.component.scss'
})
export class SignUpFormInputComponent<
  FormFieldType extends InputTypeEnum = InputTypeEnum
> {
  formField = input.required<SignUpFormField<FormFieldType>>();
}

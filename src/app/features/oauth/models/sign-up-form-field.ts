import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';
import {SignUpFormFieldDTO} from '@oauth-dto/sign-up-form-field-d-t-o';
import {SignUpFormFieldInterface} from '@oauth/types';

export class SignUpFormField<InputType extends InputTypeEnum = InputTypeEnum>
  extends SignUpFormFieldDTO<InputType>
  implements SignUpFormFieldInterface<InputType> {

  constructor(partial?: Partial<SignUpFormFieldInterface<InputType>>, isDummy: boolean = false) {
    super(partial, isDummy);
  }
}

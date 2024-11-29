import {SignUpFormDTO} from '@oauth-dto/sign-up-form-d-t-o';
import {SignUpFormInterface} from '@oauth/types';

export class SignUpForm
  extends SignUpFormDTO
  implements Partial<SignUpFormInterface> {

  constructor(partial?: Partial<SignUpFormInterface>, isDummy: boolean = false) {
    super(partial, isDummy);
  }

}

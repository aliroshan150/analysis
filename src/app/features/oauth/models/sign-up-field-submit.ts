import {SignUpFieldSubmitDTO} from '@oauth-dto/sign-up-field-submit-d-t-o';
import {SignUpFieldSubmitInterface} from '@oauth/types';

export class SignUpFieldSubmit
  extends SignUpFieldSubmitDTO
  implements Partial<SignUpFieldSubmitInterface> {

  constructor(partial?: Partial<SignUpFieldSubmitInterface>, isDummy: boolean = false) {
    super(partial, isDummy);
  }
}

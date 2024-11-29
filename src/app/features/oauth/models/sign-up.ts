import {SignUpDTO} from '@oauth-dto/sign-up-d-t-o';
import {SignUpInterface} from '@oauth/types';

export class SignUp
  extends SignUpDTO
  implements Partial<SignUpInterface> {

  constructor(partial?: Partial<SignUpInterface>, isDummy: boolean = false) {
    super(partial, isDummy);
  }

}

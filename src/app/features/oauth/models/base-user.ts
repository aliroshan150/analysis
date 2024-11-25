import {BaseUserDTO} from '@oauth-dto/base-user-d-t-o';
import {AdminType} from '@oauth/types';

export class BaseUser
  extends BaseUserDTO
  implements Partial<AdminType> {

  constructor(partial?: Partial<AdminType>, isDummy: boolean = false) {
    super(partial, isDummy);
  }

  static dummy(partial?: Partial<AdminType>): BaseUser {
    return new BaseUser(partial, true);
  }

  static mapFromApi(partial?: Partial<AdminType>): BaseUser {
    return new BaseUser(partial);
  }
}

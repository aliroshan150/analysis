import {ApiDTO} from '@core/dto/core';
import {AdminType} from '@oauth/types';


export abstract class BaseUserDTO
  extends ApiDTO<AdminType>
  implements Partial<AdminType> {

  id: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  superUser?: boolean;

  protected constructor(partial?: Partial<AdminType>, isDummy: boolean = false) {
    super(isDummy);
    this.resetByPartial(partial);
  }

  override getInterfaceObject(): Partial<AdminType> {
    return {
      email: this.email ?? undefined,
      first_name: this.first_name ?? undefined,
      id: this.id ?? undefined,
      last_name: this.last_name ?? undefined,
      username: this.username ?? undefined,
      superUser: this.superUser ?? undefined,
    };
  }

  get fullName(): string {
    return `${this.first_name ?? ''}${this.last_name ? ` ${this.last_name}` : ''}`
  }

}

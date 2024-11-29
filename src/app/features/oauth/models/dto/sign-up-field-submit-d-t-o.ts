import {ApiDTO} from '@core/dto/core';
import {SignUpFieldSubmitInterface} from '@oauth/types';

export abstract class SignUpFieldSubmitDTO
  extends ApiDTO<SignUpFieldSubmitInterface>
  implements Partial<SignUpFieldSubmitInterface> {

  name: string = '';
  value: string = '';

  protected constructor(partial?: Partial<SignUpFieldSubmitInterface>, isDummy: boolean = false) {
    super(isDummy);
    this.resetByPartial(partial);
  }

  override getInterfaceObject(): Partial<SignUpFieldSubmitInterface> {
    return {
      name: this.name ?? undefined,
      value: this.value ?? undefined,
    };
  }

}

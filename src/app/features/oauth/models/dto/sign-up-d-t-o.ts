import {ApiDTO} from '@core/dto/core';
import {SignUpInterface} from '@oauth/types';
import {SignUpForm} from '@oauth-models/sign-up-form';
import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';

export abstract class SignUpDTO
  extends ApiDTO<SignUpInterface>
  implements Partial<SignUpInterface> {

  form: SignUpForm = new SignUpForm();
  steps?: number;
  current?: number;
  fieldErrors: any = {};
  errors: Array<any> = []

  protected constructor(partial?: Partial<SignUpInterface>, isDummy: boolean = false) {
    super(isDummy);
    this.resetByPartial(partial);
  }

  override resetByPartial(partial?: Partial<SignUpInterface>) {
    super.resetByPartial({
      ...partial,
      form: new SignUpForm(partial?.form),
      fieldErrors: partial?.fieldErrors ?? {},
    });
  }

  override getInterfaceObject(): Partial<SignUpInterface> {
    return {
      form: this.form?.getInterfaceObject() ?? undefined,
      steps: this.steps ?? undefined,
      current: this.current ?? undefined,
      fieldErrors: this.fieldErrors ?? undefined,
      errors: this.errors ?? undefined,
    };
  }

  override getApiDTO(force?: boolean): any {
    const DTO: any = {}
    Object.entries(this.form.fields).forEach(([key, value]) => {
      switch (value.type) {
        case InputTypeEnum.TEXT:
          DTO[value.formValue.name] = value.formValue.value;
          break;
        case InputTypeEnum.NEW_PASSWORD:
          DTO[value.formValue.name] = btoa(value.formValue.value);
          break;
      }
    });
    return DTO;
  }

}

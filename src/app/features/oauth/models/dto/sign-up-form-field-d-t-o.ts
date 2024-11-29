import {ApiDTO} from '@core/dto/core';
import {SignUpFormFieldInterface} from '@oauth/types';
import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';

export abstract class SignUpFormFieldDTO<InputType extends InputTypeEnum = InputTypeEnum>
  extends ApiDTO<SignUpFormFieldInterface<InputType>>
  implements Partial<SignUpFormFieldInterface<InputType>> {

  '@type': '.input.TextField' | '.input.NewPasswordField';
  name: string = '';
  title: string = '';
  description: string = '';
  errorMessage: string = '';
  required?: boolean;
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
  type?: InputType;

  protected constructor(partial?: Partial<SignUpFormFieldInterface<InputType>>, isDummy: boolean = false) {
    super(isDummy);
    this.resetByPartial(partial);
  }

  override resetByPartial(partial?: Partial<SignUpFormFieldInterface<InputType>>): void {
    super.resetByPartial(partial);
  }

  override getInterfaceObject(): Partial<SignUpFormFieldInterface<InputType>> {
    let classType: '.input.TextField' | '.input.NewPasswordField';
    switch (this.type) {
      case InputTypeEnum.TEXT:
        classType = '.input.TextField';
        break;
      case InputTypeEnum.NEW_PASSWORD:
        classType = '.input.NewPasswordField';
        break;
      default:
        classType = '.input.TextField';
        break;
    }
    return {
      '@type': classType,
      name: this.name ?? undefined,
      title: this.title ?? undefined,
      description: this.description ?? undefined,
      errorMessage: this.errorMessage ?? undefined,
      required: this.required ?? undefined,
      regex: this.regex ?? undefined,
      minLength: this.minLength ?? undefined,
      maxLength: this.maxLength ?? undefined,
      type: this.type ?? undefined,
    };
  }

  get isTextInput(): boolean {
    return this.type === InputTypeEnum.TEXT;
  }

  get isPasswordInput(): boolean {
    return this.type === InputTypeEnum.NEW_PASSWORD;
  }

  // override getApiDTO(force?: boolean): any {
  //   const DTO = super.getApiDTO(force);
  //   if (this.isPasswordInput) {
  //     console.log(this.name + ' is password');
  //   }
  //   if (this.isTextInput) {
  //     console.log(this.name + ' is text');
  //   }
  //   return DTO;
  // }

}

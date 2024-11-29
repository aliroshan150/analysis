import {ApiDTO} from '@core/dto/core';
import {SignUpFormFieldInterface} from '@oauth/types';
import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';
import {SignUpFieldSubmit} from '@oauth-models/sign-up-field-submit';
import {DescriptionShowTypeEnum} from '@oauth-models/enums/description-show-type.enum';

export abstract class SignUpFormFieldDTO<InputType extends InputTypeEnum = InputTypeEnum>
  extends ApiDTO<SignUpFormFieldInterface<InputType>>
  implements Partial<SignUpFormFieldInterface<InputType>> {

  '@type': '.input.TextField' | '.input.NewPasswordField';
  name: string = '';
  title: string = '';
  description: string = '';
  errorMessage: string = '';
  required?: boolean;
  regex?: RegExp | string;
  minLength?: number;
  maxLength?: number;
  type?: InputType;
  descriptionShowType?: DescriptionShowTypeEnum;
  info: string = '';
  showConfirmPassword?: boolean;
  formValue: SignUpFieldSubmit = new SignUpFieldSubmit();

  protected constructor(partial?: Partial<SignUpFormFieldInterface<InputType>>, isDummy: boolean = false) {
    super(isDummy);
    this.resetByPartial(partial);
  }

  override resetByPartial(partial?: Partial<SignUpFormFieldInterface<InputType>>): void {
    super.resetByPartial(partial);
    if ((<any>partial)?.name) {
      this.formValue.resetByPartial({
        name: (<any>partial)?.name ?? '',
        value: ''
      });
    }
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
      descriptionShowType: this.descriptionShowType ?? undefined,
      info: this.info ?? undefined,
      showConfirmPassword: this.showConfirmPassword ?? undefined,
    };
  }

  get isTextInput(): boolean {
    return this.type === InputTypeEnum.TEXT;
  }

  get isPasswordInput(): boolean {
    return this.type === InputTypeEnum.NEW_PASSWORD;
  }

  override getApiDTO(force?: boolean): any {
    const DTO: any = {};
    DTO[this.formValue.name] = this.formValue.value;
    return DTO;
  }

}

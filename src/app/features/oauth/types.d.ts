import {BindExtraInterfaceIntoModelType} from '@core/types';
import {DescriptionShowTypeEnum} from '@oauth-models/enums/description-show-type.enum';
import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';
import {NestedFormShowTypeEnum} from '@oauth-models/enums/nested-form-show-type.enum';

export interface BaseAdminProfileInterface {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  superUser: boolean;
}

export type AdminType<CustomAdminType = {}> = BindExtraInterfaceIntoModelType<BaseAdminProfileInterface, CustomAdminType>;

export type SharedInputType<InputType extends InputTypeEnum = InputTypeEnum.TEXT> = {
  '@type': '.input.TextField' | '.input.NewPasswordField';
  name: string;
  title: string;
  description: string;
  errorMessage: string;
  required?: boolean;
  regex: RegExp | string;
  minLength?: number;
  maxLength?: number;
  type: InputType;
}

export type TextInputType = SharedInputType<InputTypeEnum.TEXT> & {
  '@type': '.input.TextField';
  descriptionShowType?: DescriptionShowTypeEnum;
}

export type PasswordInputType = SharedInputType<InputTypeEnum.NEW_PASSWORD> & {
  '@type': '.input.NewPasswordField';
  descriptionShowType?: DescriptionShowTypeEnum;
  info: string;
  showConfirmPassword: boolean;
}

export type SignUpFormFieldType<InputType = InputTypeEnum> =
  InputType extends infer Type ?
    Type extends InputTypeEnum.TEXT ? TextInputType :
      Type extends InputTypeEnum.NEW_PASSWORD ? PasswordInputType : never : never;

export interface FieldMap {
  [InputTypeEnum.TEXT]: TextInputType;
  [InputTypeEnum.NEW_PASSWORD]: PasswordInputType;
}

export type SignUpFormFieldMap<InputType extends InputTypeEnum> = FieldMap[InputType];

export interface SignUpFormFieldInterface<InputType extends InputTypeEnum = InputTypeEnum>
  extends SignUpFormFieldMap<InputType> {
}

export interface SignUpFormInterface {
  name: string;
  title: string;
  submitLabel: string;
  nestedFormShowType: NestedFormShowTypeEnum;
  fieldDescriptionShowType: DescriptionShowTypeEnum;
  fields: Array<Partial<SignUpFormFieldInterface>>;
  forms: Array<any>;
}

export interface SignUpInterface {
  form: Partial<SignUpFormInterface>;
  steps: number;
  current: number;
  fieldErrors: typeof this['form']['fields'] extends infer FieldType ? (
    FieldType extends SignUpFormFieldType<InputTypeEnum.NEW_PASSWORD> ? FieldType['name'] :
      FieldType extends SignUpFormFieldType<InputTypeEnum.TEXT> ? FieldType['name'] : never
  ) : never;
  errors: Array<any>;
}

export interface SignUpFieldSubmitInterface {
  name: string;
  value: string;
}

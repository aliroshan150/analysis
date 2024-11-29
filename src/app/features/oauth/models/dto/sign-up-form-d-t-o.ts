import {ApiDTO} from '@core/dto/core';
import {SignUpFormInterface} from '@oauth/types';
import {NestedFormShowTypeEnum} from '@oauth-models/enums/nested-form-show-type.enum';
import {DescriptionShowTypeEnum} from '@oauth-models/enums/description-show-type.enum';
import {SignUpFormField} from '@oauth-models/sign-up-form-field';

export abstract class SignUpFormDTO
  extends ApiDTO<SignUpFormInterface>
  implements Partial<SignUpFormInterface> {

  name: string = '';
  title: string = '';
  submitLabel: string = '';
  nestedFormShowType: NestedFormShowTypeEnum = NestedFormShowTypeEnum.MAIN_FORM;
  fieldDescriptionShowType: DescriptionShowTypeEnum = DescriptionShowTypeEnum.TOOLTIP;
  fields: Array<SignUpFormField> = [];
  forms: Array<any> = [];

  protected constructor(partial?: Partial<SignUpFormInterface>, isDummy: boolean = false) {
    super(isDummy);
    this.resetByPartial(partial);
  }

  override resetByPartial(partial?: Partial<SignUpFormInterface>): void {
    super.resetByPartial({
      ...partial,
      fields: partial?.fields?.length ? partial?.fields.map(fieldDTO => new SignUpFormField(fieldDTO)) : [],
    });
  }

  override getInterfaceObject(): Partial<SignUpFormInterface> {
    return {
      name: this.name ?? undefined,
      title: this.title ?? undefined,
      submitLabel: this.submitLabel ?? undefined,
      nestedFormShowType: this.nestedFormShowType ?? undefined,
      fieldDescriptionShowType: this.fieldDescriptionShowType ?? undefined,
      fields: this.fields?.length ? this.fields?.map(field => field?.getInterfaceObject()) : undefined,
      forms: this.forms ?? undefined,
    };
  }

}

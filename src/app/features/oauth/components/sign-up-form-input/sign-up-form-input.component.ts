import {Component, effect, forwardRef, inject, input, signal, WritableSignal} from '@angular/core';
import {SignUpFormField} from '@oauth-models/sign-up-form-field';
import {InputTypeEnum} from '@oauth-models/enums/input-type.enum';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  FormsModule,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgForm,
  NgModel,
  ValidationErrors
} from '@angular/forms';
import {SignUpFormFieldInterface} from '@oauth/types';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix
} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {slideDown} from '@shared-models/animations';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sign-up-form-input',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatTooltip,
    MatIconButton,
    MatIcon,
    MatSuffix,
  ],
  templateUrl: './sign-up-form-input.component.html',
  styleUrl: './sign-up-form-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignUpFormInputComponent),
      multi: true,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => SignUpFormInputComponent),
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'outline'
      }
    }
  ],
  animations: [slideDown]
})
export class SignUpFormInputComponent<
  FormFieldType extends InputTypeEnum = InputTypeEnum
> implements ControlValueAccessor, AsyncValidator {

  id = input.required<string>();
  disabled = input<boolean | string>(false);
  formField = input.required<SignUpFormField<FormFieldType>>();
  fieldsError = input<{ [key: string]: string }>();
  readonly #validationErrors: WritableSignal<ValidationErrors | null> = signal(null);
  ngForm: NgForm = inject(NgForm);
  isDisabled: boolean = false;
  hide: WritableSignal<boolean> = signal(true);
  hideRepeat: WritableSignal<boolean> = signal(true);
  formValue: string = '';
  repeatPassword: string = '';

  constructor() {
    effect(() => {
      if (this.fieldsError() != null) {
        Object.entries(this.fieldsError()!)
          .forEach(([key, value]) => {
            if (this.formField()?.name === key) {
              // this.extraErrors = value;
              this.ngForm.form?.setErrors({
                [key]: value,
              });
              this.validate(this.ngForm.controls[key]);
            }
          });
      }
    });
  }

  get InputTypes(): typeof InputTypeEnum {
    return InputTypeEnum;
  }

  onChange = (_: Partial<SignUpFormFieldInterface<FormFieldType>>): void => {
  }

  onTouch = (): void => {
  }

  toggleHide(event?: any): void {
    event?.stopPropagation();
    this.hide.update(hide => !hide);
  }

  toggleHideRepeat(event?: any): void {
    event?.stopPropagation();
    this.hideRepeat.update(hide => !hide);
  }

  writeValue(obj: SignUpFormField<FormFieldType>): void {
    this.formField().resetByPartial(obj);
    this.formField().formValue.value = this.formValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled ?? this.disabled();
  }

  handleChange(inputRef: NgModel) {
    this.formValue = inputRef.value;
    this.writeValue(this.formField());
    this.onChange(this.formField());
    this.onTouch();
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const newValue: SignUpFormField<FormFieldType> = control?.value;
    return new Promise((resolve, reject) => {
      this.#validationErrors.set(this.ngForm.errors?.[this.id()] ? {
        [newValue.name]: this.ngForm.errors?.[this.id()]
      } : null);
      if (this.#validationErrors() != null) {
        control.setErrors(this.#validationErrors())
      }
      if (newValue.type === InputTypeEnum.NEW_PASSWORD) {
      }
      if (newValue?.regex && !(newValue.regex instanceof RegExp ? newValue.regex : new RegExp(newValue.regex))?.test(newValue.formValue.value)) {
        this.#validationErrors.update(validationErrors => ({
          ...validationErrors,
          pattern: {
            requiredPattern: newValue.regex,
            actualValue: newValue.formValue.value,
          }
        }));
      }
      resolve(this.#validationErrors());
    })
  }

  checkRepeatPassword(passwordRef: NgModel, repeatPasswordRef?: NgModel) {
    if (this.formField().formValue.value !== this.repeatPassword) {
      repeatPasswordRef?.control.setErrors({
        notSameWithPassword: $localize`:@@notSameWithPassword:تکرار رمز عبور یکسان نمی باشد`,
      });
    } else {
      passwordRef.control.setErrors(null);
      repeatPasswordRef?.control.setErrors(null);
    }
  }
}

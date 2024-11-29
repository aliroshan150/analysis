import {Component, forwardRef, inject, OnInit} from '@angular/core';
import {BaseComponentClass} from '@core/base-class/base-component-class';
import {rxResource, takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SignUpInterface} from '@oauth/types';
import {CrudBaseService} from '@core/base-class/crud-base.service';
import {SignUp} from '@oauth-models/sign-up';
import {map, tap} from 'rxjs';
import {FormsModule, NgForm} from '@angular/forms';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {SignUpFormInputComponent} from '@oauth/components';
import {LocalStorageService} from '@shared/services';
import {StorageKeyEnum} from '@shared-enums/storage-key.enum';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatButton,
    forwardRef(() => SignUpFormInputComponent)
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent
  extends BaseComponentClass
  implements OnInit {

  readonly #service: CrudBaseService = inject(CrudBaseService);
  readonly #storageService: LocalStorageService = inject(LocalStorageService);
  signUpForm: SignUp = new SignUp();

  signUpResource = rxResource<Partial<SignUpInterface>, null>({
    request: () => null,
    loader: () => this.#service.getByResponse<Partial<SignUpInterface>>('sign-up')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(response => {
          this.#storageService.setItem(StorageKeyEnum.API_CALL_TOKEN, response.headers.get('x-flow-token'));
          return (response?.body ?? {}) as Partial<SignUpInterface>;
        }),
        tap({
          next: response => {
            this.signUpForm.resetByPartial(response);
          },
          error: error => {
            console.log('catch errors, ', error);
          }
        })
      ),
  })

  ngOnInit(): void {
  }

  submitForm(formRef: NgForm): void {
    this.#service
      .post('sign-up', this.signUpForm.getApiDTO())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log('catch errors, ', error);
          if (error?.error?.fieldErrors) {
            this.signUpForm.fieldErrors = error?.error?.fieldErrors;
          }
        }
      })
  }

  updateInput(newField: any, index: number) {
    this.signUpForm.form.fields[index] = newField;
  }
}

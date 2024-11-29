import {Component, inject, OnInit} from '@angular/core';
import {BaseComponentClass} from '@core/base-class/base-component-class';
import {rxResource, takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SignUpInterface} from '@oauth/types';
import {CrudBaseService} from '@core/base-class/crud-base.service';
import {SignUp} from '@oauth-models/sign-up';
import {tap} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatButton
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent
  extends BaseComponentClass
  implements OnInit {

  readonly #service: CrudBaseService = inject(CrudBaseService);
  signUpForm: SignUp = new SignUp();

  signUpResource = rxResource<SignUpInterface, null>({
    request: () => null,
    loader: () => this.#service.get<SignUpInterface>('sign-up')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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

  submitForm(): void {
    console.log(this.signUpForm.getApiDTO());
  }

}

import {DestroyRef, Directive, inject} from '@angular/core';

@Directive()
export abstract class BaseComponentClass {

  protected destroyRef: DestroyRef = inject(DestroyRef);

}

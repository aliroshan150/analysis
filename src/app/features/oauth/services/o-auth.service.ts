import {Injectable, signal, WritableSignal} from '@angular/core';
import {BaseUser} from '@oauth-models/base-user';
import {CrudBaseService} from '@core/base-class/crud-base.service';

@Injectable({
  providedIn: 'root'
})
export class OAuthService
  extends CrudBaseService {

  override entityName: string = '';

  readonly #isLoggedIn: WritableSignal<boolean> = signal(false);
  readonly #operations: WritableSignal<Array<string>> = signal([]);
  #currentUser: WritableSignal<BaseUser | null> = signal<BaseUser | null>(null);

  get isLoggedIn(): boolean {
    return this.#isLoggedIn.asReadonly()();
  };

  set isLoggedIn(isLoggedIn: boolean) {
    this.#isLoggedIn.set(isLoggedIn);
  };

  getUserOperations() {
    return this.#operations();
  }

  appInit(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  canDoByOperations(requiredOperations: Array<string>): boolean {
    if (!requiredOperations || (!!requiredOperations && !requiredOperations.length)) {
      return true;
    }
    if (this.#currentUser()?.superUser) {
      return true;
    }

    const userOperations: Array<string> = this.getUserOperations();

    if (!userOperations || userOperations.length === 0) {
      return false;
    } else {
      for (let i = 0; i < requiredOperations.length; i++) {
        if (userOperations.includes(requiredOperations[i])) {
          return true;
        }
      }
    }

    return false;
  }

}

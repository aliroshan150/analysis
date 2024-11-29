import {inject, Inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  @Inject(PLATFORM_ID) platformId: Object = inject(PLATFORM_ID);

  isBrowserSignal: WritableSignal<boolean> = signal(isPlatformBrowser(this.platformId));

  get isBrowser(): boolean {
    return this.isBrowserSignal();
  };

  isServerSignal: WritableSignal<boolean> = signal(isPlatformServer(this.platformId));

  get isServer() {
    return this.isServerSignal();
  }

}

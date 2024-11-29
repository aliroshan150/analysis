import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {LanguageInterface} from '@shared/types';
import {LocalStorageService} from '@shared/services/local-storage.service';
import {StorageKeyEnum} from '@shared-enums/storage-key.enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly #storageService: LocalStorageService = inject(LocalStorageService);

  languages: Array<LanguageInterface> = [
    {
      title: $localize `:@@persian:پارسی`,
      value: 'fa-IR',
      direction: 'rtl'
    },
    {
      title: $localize `:@@english:انگلیسی`,
      value: 'en-US',
      direction: 'ltr'
    }
  ];
  #currentLanguageIndexSignal: WritableSignal<number> = signal(0);

  constructor() {
    if (this.#storageService.has(StorageKeyEnum.LANGUAGE)) {
      this.currentLanguage = this.#storageService.getItem(StorageKeyEnum.LANGUAGE)!;
    }
  }

  get currentLanguageIndexSignal(): Signal<number> {
    return this.#currentLanguageIndexSignal.asReadonly();
  }

  get currentLanguageIndex(): number {
    return this.#currentLanguageIndexSignal();
  }

  get currentLanguage(): LanguageInterface {
    return this.languages[this.#currentLanguageIndexSignal()];
  }

  set currentLanguage(newLanguage: LanguageInterface) {
    this.#currentLanguageIndexSignal.set(this.languages.findIndex(language => language.value === newLanguage.value))
  }

  setCurrentLanguageByIndex(index: number): void {
    this.#currentLanguageIndexSignal.set(index);
    this.#storageService.setItem(StorageKeyEnum.LANGUAGE, this.currentLanguage);
  }
}

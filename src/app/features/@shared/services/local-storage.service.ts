import {inject, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {StorageKeyEnum} from '@shared-enums/storage-key.enum';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  @Inject(PLATFORM_ID) private _platformId: Object = inject(PLATFORM_ID);

  has(key: StorageKeyEnum): boolean {
    if (!isPlatformBrowser(this._platformId)) {
      console.warn('Server Has no Storage');
      return false;
    }
    return this.getItem(key) != null;
  }

  getItem<StorageDataType = any>(key: StorageKeyEnum): StorageDataType | null {
    if (!isPlatformBrowser(this._platformId)) {
      console.warn('Server Has no Storage');
      return null;
    }
    return localStorage.getItem(key) != null ? JSON.parse(localStorage.getItem(key)!) : null;
  }

  setItem<StorageDataType>(key: StorageKeyEnum, data: StorageDataType): void {
    if (!isPlatformBrowser(this._platformId)) {
      console.warn('Server Has no Storage');
      return;
    }
    return localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: StorageKeyEnum): void {
    if (!isPlatformBrowser(this._platformId)) {
      console.warn('Server Has no Storage');
      return;
    }
    localStorage.setItem(key, JSON.stringify(null));

  }

  clear(): void {
    if (!isPlatformBrowser(this._platformId)) {
      console.warn('Server Has no Storage');
      return;
    }
    localStorage.clear();
  }


}

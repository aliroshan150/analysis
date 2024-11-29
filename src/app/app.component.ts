import {Component, effect, inject, Renderer2} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '@app/components';
import {LanguageService, LayoutService, LocalStorageService} from '@shared/services';
import {DOCUMENT} from '@angular/common';
import {StorageKeyEnum} from '@shared-enums/storage-key.enum';
import {LanguageInterface} from '@shared/types';

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'analysis';
  private languageService: LanguageService = inject(LanguageService);
  private renderer2: Renderer2 = inject(Renderer2);
  private layoutService: LayoutService = inject(LayoutService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private document: Document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      if (this.layoutService.isBrowserSignal()) {
        const currentLanguage: LanguageInterface = this.localStorageService.has(StorageKeyEnum.LANGUAGE) ? this.localStorageService.getItem<LanguageInterface>(StorageKeyEnum.LANGUAGE)! : this.languageService.languages[this.languageService.currentLanguageIndexSignal()];
        this.renderer2.setAttribute(this.document.documentElement, 'data-direction', currentLanguage.direction);
        this.renderer2.setAttribute(this.document.documentElement, 'lang', currentLanguage.value);
        this.renderer2.setAttribute(this.document.documentElement, 'dir', currentLanguage.direction);
      }
    });
  }
}

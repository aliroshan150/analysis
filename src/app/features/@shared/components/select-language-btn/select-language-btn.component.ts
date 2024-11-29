import {Component, inject, signal, Signal} from '@angular/core';
import {LanguageInterface} from '@shared/types';
import {FormsModule} from '@angular/forms';
import {LanguageService} from '@shared/services';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-select-language-btn',
  standalone: true,
  imports: [
    FormsModule,
    MatMenu,
    MatButton,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon
  ],
  templateUrl: './select-language-btn.component.html',
  styleUrl: './select-language-btn.component.scss',
})
export class SelectLanguageBtnComponent {

  private languageService: LanguageService = inject(LanguageService);

  languages: Signal<Array<LanguageInterface>> = signal(this.languageService.languages);
  selectedIndex: number = this.languageService.currentLanguageIndex;

  selectLanguage(index: number): void {
    this.languageService.setCurrentLanguageByIndex(index);
    window.location.reload();
  }

}

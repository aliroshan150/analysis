import { Component } from '@angular/core';
import {SelectLanguageBtnComponent} from '@shared/components';

@Component({
  selector: 'app-footer',
  imports: [
    SelectLanguageBtnComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}

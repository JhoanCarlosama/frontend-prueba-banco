import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      &copy; Todos los derechos reservados. 2022
    </span>
  `,
})
export class FooterComponent {
}

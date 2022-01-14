import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <!--<div class="row">
      <div class="col-xs-12 col-lg-12" style="border: 1px solid black; width: 100%"></div>
      <div class="col-xs-12 col-lg-12" style="border: 1px solid black; width: 100%">-->
        <span class="created-by">
          &copy; Todos los derechos reservados. 2022
        </span>
      <!--</div>
    </div>-->
  `,
})
export class FooterComponent {
}

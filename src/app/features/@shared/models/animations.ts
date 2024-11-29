import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const slideDown = trigger('slideDown', [
  transition(':enter',
    group([
      query(':self', [
        style({height: 0, marginTop: 0, paddingTop: 0, fontSize: 0, opacity: 0}),
        animate(
          '.25s ease-out',
          style({height: '*', marginTop: '*', paddingTop: '*', fontSize: '*', opacity: '*'})
        )
      ]),
    ])
  ),
  transition(':leave',
    group([
      query(':self', [
        style({height: '*', marginTop: '*', paddingTop: '*', fontSize: '*', opacity: '*'}),
        animate(
          '.25s ease-in',
          style({height: 0, marginTop: 0, paddingTop: 0, fontSize: 0, opacity: 0})
        )
      ]),
    ])
  )
]);

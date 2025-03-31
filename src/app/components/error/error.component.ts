import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ErrorComponent  implements OnInit {

  @Input() message: string = '';
  @Input() clase: string = '';
  @Input() validation: string = '';
  @Input() control: any;

  constructor() { }

  ngOnInit() {}

}

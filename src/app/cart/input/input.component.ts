import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() controlName = new FormControl();
  @Input() type = '';
  @Input() label = '';
  @Input() requiredName = '';
  geterror(val: string) {
    return this.controlName.errors?.[val];
  }

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

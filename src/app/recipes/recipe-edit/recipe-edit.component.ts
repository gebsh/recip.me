import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

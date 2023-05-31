import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-preload',
  templateUrl: './list-preload.component.html',
  styleUrls: ['./list-preload.component.scss']
})
export class ListPreloadComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() hasError: boolean;
  @Input() hasData: boolean;

  constructor() {
    this.isLoading = false;
    this.hasError = false;
    this.hasData = false;
  }

  ngOnInit(): void {
  }

}

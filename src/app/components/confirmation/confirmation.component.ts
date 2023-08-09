import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit{
  name: string = '';
  total: number = 0;
  faTruck = faTruck;

  constructor (private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.total = parseInt(params['total']);
    })
  }
}

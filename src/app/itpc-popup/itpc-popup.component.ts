import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItpcDataArrivalFlightService } from '../itpc-data-arrival-flight.service';

import { ItpcFlight2 } from '../models/itpc-flight2';

@Component({
  selector: 'app-itpc-popup',
  templateUrl: './itpc-popup.component.html',
  styleUrls: ['./itpc-popup.component.css'],
})
export class ItpcPopupComponent implements OnInit {
  // creating a table with the ItpcFlight2 as type
  arrivalVolDetail2: ItpcFlight2[] = [];

  //importing the data fromparent components itpc-container
  @Input() public itpcDetail2!: ItpcFlight2;

  search: string = '';

  private indexes: number[] = [];
  itpcUsFlights: ItpcFlight2[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private itpcArrivalFlight: ItpcDataArrivalFlightService
  ) {}

  /*
    Set up the component after Angular sets the input properties using the itpcDetail2 input
  */
  ngOnInit(): void {
    console.log(this.itpcDetail2);

    if (this.itpcDetail2 && this.itpcDetail2.arrFlight) {
      this.loadVolDetailList(this.itpcDetail2.arrFlight);
    }
  }

  // loading the list of vol with the id = arrFlight from the api
  loadVolDetailList(id: string): void {
    this.itpcArrivalFlight.loadUsVolDetailListHttp(id).subscribe(
      (arrivalVolDetail2) => {
        this.arrivalVolDetail2 = arrivalVolDetail2;
        console.log(typeof this.arrivalVolDetail2);
        this.getVolDetailFromFlight();
      },
      (error) => {
        console.log('Error loading vol detail list:', error);
      }
    );
  }

  getVolDetailFromFlight(): void {
    if (this.arrivalVolDetail2) {
      this.search = this.itpcDetail2.arrFlight;
      for (let i = 0; i < this.arrivalVolDetail2.length; i++) {
        if (this.arrivalVolDetail2[i].arrFlight === this.search) {
          this.indexes.push(i);
          this.itpcUsFlights.push(this.arrivalVolDetail2[i]);
          console.log('Error getting the vol detail list');
        }
      }
      console.log(this.itpcUsFlights);
    }
  }

  //function to close the modal
  closeModal() {
    this.activeModal.close();
  }
}

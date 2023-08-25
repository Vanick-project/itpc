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
  arrivalVolDetail: ItpcFlight2[] = [];

  //importing the data from parent components itpc-container
  @Input() public itpcDetail!: ItpcFlight2;

  search: string = '';

  private indexes: number[] = [];
  itpcUsFlights: ItpcFlight2[] = []; // innitialisation list of us flight

  constructor(
    public activeModal: NgbActiveModal,
    private itpcArrivalFlight: ItpcDataArrivalFlightService
  ) {}

  /*
    Set up the component after Angular sets the input properties using the itpcDetail input
  */
  ngOnInit(): void {
    console.log(this.itpcDetail);

    if (this.itpcDetail && this.itpcDetail.arrivalFlight) {
      this.loadVolDetailList(this.itpcDetail.arrivalFlight);
    }
  }

  // loading the list of vol with the id = arrivalFlight from the api
  loadVolDetailList(id: string): void {
    this.itpcArrivalFlight.loadUsVolDetailListHttp(id).subscribe(
      (arrivalVolDetail) => {
        this.arrivalVolDetail = arrivalVolDetail;
        console.log(typeof this.arrivalVolDetail);
        this.getVolDetailFromFlight();
      },
      (error) => {
        console.log('Error loading vol detail list:', error);
      }
    );
  }

  getVolDetailFromFlight(): void {
    if (this.arrivalVolDetail) {
      this.search = this.itpcDetail.arrivalFlight;
      for (let i = 0; i < this.arrivalVolDetail.length; i++) {
        if (this.arrivalVolDetail[i].arrivalFlight === this.search) {
          this.indexes.push(i);
          this.itpcUsFlights.push(this.arrivalVolDetail[i]);
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

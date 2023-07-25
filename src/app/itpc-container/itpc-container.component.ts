import { Component, OnInit } from '@angular/core';
import { ItpcDataArrivalFlightService } from '../itpc-data-arrival-flight.service';
import { Observable, interval, of, timer, tap, delay } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItpcPopupComponent } from '../itpc-popup/itpc-popup.component';
import { ItpcFlight2 } from '../models/itpc-flight2';

@Component({
  selector: 'app-itpc-container',
  templateUrl: './itpc-container.component.html',
  styleUrls: ['./itpc-container.component.css'],
})
export class ItpcContainerComponent implements OnInit {
  arrivalFlightData: any = [];

  sourceInterval: any = [];
  subscribeInterval: any = [];
  id!: string;
  public itpcDetail!: ItpcFlight2;

  //ItpcDataArrivalFlightService and modalService are injected in the constructor
  //This ensures the instanciation of the services

  constructor(
    private itpcArrivalFlight: ItpcDataArrivalFlightService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //An observable is being used to keep updating data from service
    /*
     * @refresh data, every 2s
     * @the reactive js INTERVAL needs to be imported as shown above
     * @data is being retrieved from the function getDataArrival within the service itpcArrivalFlight
     */
    this.sourceInterval = interval(2000);
    this.subscribeInterval = this.sourceInterval.subscribe(() => {
      //invoke the function getDataArrival

      console.log('data Arrival from component container!');

      this.arrivalFlightData = this.itpcArrivalFlight?.loadVolDetailListHttp();
    });
  }

  /*this create a modal with the popupComponent
    the modal is created by using the modalService 
    */
  openModal(index: number) {
    const modalRef = (this.modalService.open(ItpcPopupComponent, {
      scrollable: true,
      size: 'md',
      keyboard: true,
      backdrop: 'static',
      windowClass: 'myCustomModalClass',
    }).componentInstance.itpcDetail2 = this.arrivalFlightData[index]);
  }
}

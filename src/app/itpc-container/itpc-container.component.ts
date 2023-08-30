import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItpcDataArrivalFlightService } from '../itpc-data-arrival-flight.service';
import { Observable, interval, of, timer, tap, delay } from 'rxjs';
import { parse } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItpcPopupComponent } from '../itpc-popup/itpc-popup.component';
import { ItpcFlight2 } from '../models/itpc-flight2';

@Component({
  selector: 'app-itpc-container',
  templateUrl: './itpc-container.component.html',
  styleUrls: ['./itpc-container.component.css'],
})
export class ItpcContainerComponent implements OnInit, OnDestroy {
  currenTime: any;

  arrivalFlightData: any = []; //initialisation of the list arriving Vol

  sourceInterval: any = [];
  subscribeInterval: any = [];
  // id!: string;
  public itpcDetail!: ItpcFlight2; // public because it is exporting the data to the child component pop-up

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
    timer(0, 100).subscribe(() => {
      this.currenTime = new Date();
    });
    this.sourceInterval = interval(2000);
    this.subscribeInterval = this.sourceInterval.subscribe(() => {
      //invoke the function loadVolDetailListHttps
      console.log('data Arrival from component container!');
      this.arrivalFlightData = this.itpcArrivalFlight?.loadVolDetailListHttp();
    });
  }

  //function to signal when the bag are arriving
  timingBagArr(time: string) {
    if (time !== '' && time !== '-') {
      const dataTime = parse(time, 'yyyy-MM-dd_HH:mm:ss', new Date());
      const differenceTime =
        (this.currenTime.getTime() - dataTime.getTime()) / (1000 * 60);
      if (0 <= differenceTime && differenceTime <= 2) {
        return 1;
      } else if (differenceTime > 20) {
        return 2;
      } else return 0;
    }
  }

  //function the signal when the Flights are coming
  timingVol(time: string) {
    const dataTime = new Date(time);
    const differenceTime =
      (this.currenTime.getTime() - dataTime.getTime()) / (1000 * 60);
    if (0 <= differenceTime) {
      return 1;
    } else if (-10 < differenceTime && differenceTime < 0) {
      return 2;
    } else {
      return 0; // Default value if none of the conditions are met
    }
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
    }).componentInstance.itpcDetail = this.arrivalFlightData[index]);
  }

  ngOnDestroy(): void {
    this.sourceInterval.unsubscribe();
    this.subscribeInterval.unsubscribe();
  }
}

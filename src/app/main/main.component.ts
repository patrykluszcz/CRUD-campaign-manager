import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { campaignModel } from '../models/campaignModel';
import { ModalCampaignComponent } from './modal-campaign/modal-campaign.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  campaignModelObj: campaignModel = new campaignModel();

  constructor(public modalService: NgbModal) {}

  @Input() campaigns = [
    {
      id: 1,
      campaignName: 'Strategy & Future',
      keyword: 'S&F',
      bidAmount: 20000,
      campaignFund: 1000000,
      status: 'OFF',
      town: 'Kraków',
      radius: 25,
      productName: 'Armia Nowego Wzoru',
    },
  ];

  openModal() {
    const modalRef = this.modalService.open(ModalCampaignComponent, {
      centered: true,
    });
    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {}
}

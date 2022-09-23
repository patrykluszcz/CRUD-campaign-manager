import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_FORM_FIELD } from '@angular/material/form-field';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { campaignModel } from '../models/campaignModel';
import { ApiService } from '../shared/api.service';
import { ModalCampaignComponent } from './modal-campaign/modal-campaign.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(ModalCampaignComponent)
  modal!: ModalCampaignComponent;

  campaignId!: number;

  constructor(public modalService: NgbModal, private apiService: ApiService) {}

  campaigns!: campaignModel[];

  ngOnInit(): void {
    this.loadCampaign();
  }

  loadCampaign() {
    this.apiService.getCampaign().subscribe((res) => {
      console.log(res);
      this.campaigns = res;
    });
  }

  editCampaign(id: any) {
    this.openModal();
  }

  deleteCampaign(campaignData: any) {
    this.apiService.deleteCampaign(campaignData.id).subscribe((res) => {
      console.log(res);
      console.log(campaignData);
      this.loadCampaign();
    });
  }

  // updateCampaign(campaignData: any) {
  //   this.apiService
  //     .updateCampaign(campaignData, campaignData.id)
  //     .subscribe((res) => {
  //       this.loadCampaign();
  //     });
  // }

  openModal() {
    const _modal = this.modalService.open(ModalCampaignComponent, {
      centered: true,
    });

    _modal.closed.subscribe(() => {
      this.loadCampaign();
    });
  }
}

import { Component, OnInit } from '@angular/core';
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
  constructor(public modalService: NgbModal, private apiService: ApiService) {}

  campaigns: campaignModel[] = [];

  openModal() {
    this.modalService.open(ModalCampaignComponent, {
      centered: true,
    });
  }

  ngOnInit(): void {
    this.apiService.getCampaign().subscribe((res) => {
      this.campaigns = res;
    });
  }
  deleteAllCampaigns() {
    this.apiService.deleteCampaigns().subscribe((res) => {
      console.log(res);

      window.location.reload();
      alert('deleted campaign');
    });
  }

  deleteCampaign(campaignData: any) {
    this.apiService.deleteCampaign(campaignData.id).subscribe((res) => {
      console.log(res);
      console.log(campaignData);
      window.location.reload();
    });
  }
}

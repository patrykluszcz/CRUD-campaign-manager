import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { campaignModel } from '../../models/campaignModel';
import { ApiService } from '../../shared/api.service';
import { ModalCampaignComponent } from '../modal-campaign/modal-campaign.component';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss'],
})
export class ListCampaignComponent implements OnInit {
  campaignId!: number;

  campaigns!: campaignModel[];

  constructor(public modalService: NgbModal, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCampaign();
  }

  loadCampaign() {
    this.apiService.getCampaign().subscribe((res) => {
      console.log(res);
      this.campaigns = res;
    });
  }

  deleteCampaign(campaignData: any) {
    this.apiService.deleteCampaign(campaignData.id).subscribe((res) => {
      console.log(res);
      console.log(campaignData);
      this.loadCampaign();
    });
  }

  updateCampaign(campaignData: any) {
    this.apiService
      .updateCampaign(campaignData, campaignData.id)
      .subscribe(() => {
        this.loadCampaign();
      });
  }

  openModalCampaign() {
    const _modal = this.modalService.open(ModalCampaignComponent, {
      centered: true,
    });

    _modal.closed.subscribe(() => {
      this.loadCampaign();
    });
  }
}

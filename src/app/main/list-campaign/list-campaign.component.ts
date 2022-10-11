import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(ModalCampaignComponent) modal!: ModalCampaignComponent;

  campaignId!: number;

  campaigns!: campaignModel[];

  constructor(public modalService: NgbModal, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCampaignData();
  }

  loadCampaignData(): void {
    this.apiService.getCampaigns().subscribe((res) => {
      this.campaigns = res;
    });
  }

  deleteCampaign(campaignData: number): void {
    this.apiService.deleteCampaign(campaignData).subscribe(() => {
      this.loadCampaignData();
    });
  }

  openEditModalCampaignData(projectId: number): void {
    this.modal.openEditModal(projectId);
  }

  openAddModalCampaign(): void {
    this.modal.openModal();
  }
}

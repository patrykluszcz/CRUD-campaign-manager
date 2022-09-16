import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Town } from '../../models/enums/townSelect.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { campaignModel } from 'src/app/models/campaignModel';

@Component({
  selector: 'app-modal-campaign',
  templateUrl: './modal-campaign.component.html',
})
export class ModalCampaignComponent implements OnInit {
  @ViewChild('content')
  content!: string;
  towns: Array<string> = Object.keys(Town);
  modalTitle = 'Add Campaign';
  formValue!: FormGroup;
  campaignModelObj!: campaignModel;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      campaignName: [''],
      keyword: [''],
      bidAmount: [''],
      campaignFund: [''],
      status: [''],
      town: [''],
      radius: [''],
      productName: [''],
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  campaigns = [
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

  getAllCampaignData() {
    this.apiService.getCampaign().subscribe((res) => {
      this.campaigns = res;
    });
  }

  postCampaign() {
    this.campaignModelObj.id = this.formValue.value.id;
    this.campaignModelObj.campaignName = this.formValue.value.campaignName;
    this.campaignModelObj.keyword = this.formValue.value.keyword;
    this.campaignModelObj.bidAmount = this.formValue.value.bidAmount;
    this.campaignModelObj.campaignFund = this.formValue.value.campaignFund;
    // this.campaignModelObj.status = this.isChecked ? 'ON' : 'OFF';
    this.campaignModelObj.town = this.formValue.value.town;
    // this.campaignModelObj.radius = this.valueFromSlider;
    this.campaignModelObj.productName = this.formValue.value.productName;

    this.apiService.postCampaign(this.campaignModelObj).subscribe((res) => {
      console.log(res);
      alert('successfully');
      this.formValue.reset();
      this.getAllCampaignData();
    });
  }
}

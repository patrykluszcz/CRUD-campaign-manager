import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Town } from '../../models/enums/townSelect.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { campaignModel } from 'src/app/models/campaignModel';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { validateAllFormFields } from 'src/app/shared/utils';

@Component({
  selector: 'app-modal-campaign',
  templateUrl: './modal-campaign.component.html',
})
export class ModalCampaignComponent implements OnInit {
  @ViewChild('content') content!: string;

  modalTitle!: string;

  towns: Array<string> = Object.keys(Town);

  formValues!: FormGroup;

  valueFromSlider!: number;

  isSliderChecked = false;

  sliderValue = 0;

  campaignModelObj: campaignModel = {
    id: 0,
    campaignName: '',
    keyword: '',
    bidAmount: 0,
    campaignFund: 0,
    status: '',
    productName: '',
    town: '',
    radius: 0,
  };

  campaigns = [
    {
      id: 0,
      campaignName: '',
      keyword: '',
      bidAmount: 0,
      campaignFund: 0,
      status: '',
      productName: '',
      town: '',
      radius: 0,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllCampaignData();
  }

  initForm(): void {
    this.formValues = this.formBuilder.group({
      campaignName: [null, [Validators.required]],
      keyword: [null, [Validators.required, Validators.maxLength(3)]],
      bidAmount: [null, [Validators.required]],
      campaignFund: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      town: [[null, Validators.required]],
      status: [''],
      radius: [''],
    });
  }

  get form() {
    return this.formValues.controls;
  }

  statusSliderChanged(event: MatSlideToggleChange): void {
    this.isSliderChecked = event.checked;
  }

  sliderRadiusChanged(event: any): void {
    this.sliderValue = event.value;
  }

  formatLabel(value: number) {
    if (value >= 1000) return Math.round(value / 1000) + 'k';

    return value;
  }

  getAllCampaignData(): void {
    this.apiService.getCampaigns().subscribe((res) => {
      this.campaigns = res;
    });
  }

  createCampaign(): void {
    if (this.campaignModelObj) {
      this.campaignModelObj.id = this.formValues.value.id;
      this.campaignModelObj.campaignName = this.formValues.value.campaignName;
      this.campaignModelObj.keyword = this.formValues.value.keyword;
      this.campaignModelObj.bidAmount = this.formValues.value.bidAmount;
      this.campaignModelObj.campaignFund = this.formValues.value.campaignFund;
      this.campaignModelObj.productName = this.formValues.value.productName;
      this.campaignModelObj.status = this.isSliderChecked ? 'ON' : 'OFF';
      this.campaignModelObj.town = this.formValues.value.town;
      this.campaignModelObj.radius = this.sliderValue;
    }
    this.apiService.postCampaign(this.campaignModelObj).subscribe(() => {
      this.formValues.reset();
    });
  }

  getCampaignData(): void {
    this.apiService.getCampaignById(this.campaignModelObj.id).subscribe({
      next: (campaign) => {
        console.log(campaign);

        this.campaigns = campaign;
      },
    });
  }
  editCampaign(campaignData: any) {
    this.campaignModelObj.id = campaignData.id;
    this.formValues.controls['campaignName'].setValue(
      campaignData.campaignName
    );
    this.formValues.controls['keyword'].setValue(campaignData.keyword);
    this.formValues.controls['bidAmount'].setValue(campaignData.bidAmount);
    this.formValues.controls['campaignFund'].setValue(
      campaignData.campaignFund
    );
    this.formValues.controls['status'].setValue(campaignData.status);
    this.formValues.controls['radius'].setValue(campaignData.radius);
    this.formValues.controls['productName'].setValue(campaignData.productName);
  }

  onSubmit(): void {
    validateAllFormFields(this.formValues);

    if (this.formValues.invalid) return;

    this.createCampaign();
    this.getAllCampaignData();
    this.closeModal();
    this.formValues.reset();
  }

  openEditModal(projectId: number): void {
    this.initForm();
    this.getCampaignData();
    this.campaignModelObj.id = projectId;

    this.modalTitle = 'Edit Campaign';
    this.modalService.open(this.content, {
      centered: true,
    });
  }

  openModal(): void {
    this.modalTitle = 'Add Campaign';
    this.modalService.open(this.content, {
      centered: true,
    });
    this.formValues.reset();
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}

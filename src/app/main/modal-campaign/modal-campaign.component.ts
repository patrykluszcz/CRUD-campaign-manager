import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  modalTitle = 'Add Campaign';

  towns: Array<string> = Object.keys(Town);

  formValues!: FormGroup;

  valueFromSlider!: number;

  isChecked = false;

  sliderValue = 0;

  sliderChanged(event: any) {
    this.sliderValue = event.value;
    console.log(this.sliderValue);
  }

  formatLabel(value: number) {
    if (value >= 1000) return Math.round(value / 1000) + 'k';

    return value;
  }

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
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllCampaignData();
    console.log(this.campaignModelObj);
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

  closeModal() {
    this.activeModal.close('Modal Closed');
    this.formValues.reset();
  }

  statusChanged(event: MatSlideToggleChange) {
    this.isChecked = event.checked;
  }

  getAllCampaignData() {
    this.apiService.getCampaign().subscribe((res) => {
      console.log(res);

      this.campaigns = res;
    });
  }

  postCampaign() {
    if (this.campaignModelObj) {
      this.campaignModelObj.id = this.formValues.value.id;
      this.campaignModelObj.campaignName = this.formValues.value.campaignName;
      this.campaignModelObj.keyword = this.formValues.value.keyword;
      this.campaignModelObj.bidAmount = this.formValues.value.bidAmount;
      this.campaignModelObj.campaignFund = this.formValues.value.campaignFund;
      this.campaignModelObj.productName = this.formValues.value.productName;
      this.campaignModelObj.status = this.isChecked ? 'ON' : 'OFF';
      this.campaignModelObj.town = this.formValues.value.town;
      this.campaignModelObj.radius = this.sliderValue;
    }
    this.apiService.postCampaign(this.campaignModelObj).subscribe((res) => {
      console.log(res);
      this.formValues.reset();
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
    this.formValues.controls['productName'].setValue(campaignData.productName);
    this.formValues.controls['status'].setValue(campaignData.status);
    this.formValues.controls['radius'].setValue(campaignData.radius);
  }

  updateCampaign() {
    this.campaignModelObj.campaignName = this.formValues.value.campaignName;
    this.campaignModelObj.keyword = this.formValues.value.keyword;
    this.campaignModelObj.bidAmount = this.formValues.value.bidAmount;
    this.campaignModelObj.campaignFund = this.formValues.value.campaignFund;
    this.campaignModelObj.town = this.formValues.value.town;
    this.campaignModelObj.productName = this.formValues.value.productName;

    this.apiService
      .updateCampaign(this.campaignModelObj, this.campaignModelObj.id)
      .subscribe(() => {
        // this.formValues.reset();
        this.closeModal();
        this.getAllCampaignData();
      });
  }

  deleteCampaign(campaignData: any) {
    this.apiService.deleteCampaign(campaignData.id).subscribe((res) => {
      this.getAllCampaignData();
    });
  }

  onSubmit() {
    validateAllFormFields(this.formValues);

    if (this.formValues.invalid) return;

    this.postCampaign();
    this.getAllCampaignData();
    this.closeModal();
    this.formValues.reset();
  }
}

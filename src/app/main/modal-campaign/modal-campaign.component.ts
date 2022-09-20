import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Town } from '../../models/enums/townSelect.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { campaignModel } from 'src/app/models/campaignModel';

@Component({
  selector: 'app-modal-campaign',
  templateUrl: './modal-campaign.component.html',
})
export class ModalCampaignComponent implements OnInit {
  towns: Array<string> = Object.keys(Town);

  formValues!: FormGroup;

  modalTitle = 'Add Campaign';

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
      keyword: [null, [Validators.required]],
      bidAmount: [''],
      campaignFund: [''],
      status: [''],
      productName: [null, [Validators.required]],
      town: [''],
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
      productName: 'Armia Nowego Wzoru',
      town: 'Kraków',
      radius: 25,
    },
  ];

  getAllCampaignData() {
    this.apiService.getCampaign().subscribe((res) => {
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
      // this.campaignModelObj.status = this.isChecked ? 'ON' : 'OFF';
      this.campaignModelObj.productName = this.formValues.value.productName;
      this.campaignModelObj.town = this.formValues.value.town;
      // this.campaignModelObj.radius = this.valueFromSlider;
    }
    this.apiService.postCampaign(this.campaignModelObj).subscribe((res) => {
      console.log(res);
      alert('successfully');
      this.formValues.reset();
      this.getAllCampaignData();
    });
  }

  onSubmit() {
    this.postCampaign();
    this.closeModal();
    window.location.reload();
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

  updateCampaign() {
    this.campaignModelObj.campaignName = this.formValues.value.campaignName;
    this.campaignModelObj.keyword = this.formValues.value.keyword;
    this.campaignModelObj.bidAmount = this.formValues.value.bidAmount;
    this.campaignModelObj.campaignFund = this.formValues.value.campaignFund;
    this.campaignModelObj.town = this.formValues.value.town;
    this.campaignModelObj.productName = this.formValues.value.productName;

    this.apiService
      .updateCampaign(this.campaignModelObj, this.campaignModelObj.id)
      .subscribe((res) => {
        alert('update successufully');
        this.formValues.reset();
        this.closeModal();
        this.getAllCampaignData();
      });
  }

  deleteCampaign(campaignData: any) {
    this.apiService.deleteCampaign(campaignData.id).subscribe((res) => {
      alert('deleted campaign');
      this.getAllCampaignData();
    });
  }
}

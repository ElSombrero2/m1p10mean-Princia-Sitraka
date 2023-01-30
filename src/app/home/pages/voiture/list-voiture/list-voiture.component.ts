import {Component, OnInit} from '@angular/core';
import {MODEL_PROPERTIES_MAP, Voiture} from "../../../../@core/models/voiture.model";
import {Router} from "@angular/router";
import {VoitureService} from "../../../../@core/services/voiture.service";
import {ReparationService} from "../../../../@core/services/reparation.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.scss']
})
export class ListVoitureComponent implements OnInit {
  titlesColumn = MODEL_PROPERTIES_MAP;
  voitures: Voiture[] | undefined;
  reparations: Reparation[] | undefined;

  constructor(
    private router: Router,
    private serviceVoiture: VoitureService,
    private serviceReparation: ReparationService,
    private spinner : NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

   getData() {
     this.serviceReparation.getReparations().subscribe(response => {
      this.reparations = response;
       setTimeout(() => {
         this.spinner.hide();
       }, 500)
    })
  }
  getDetail(rep: Reparation) {
    this.router.navigate(['/home/vehicule', rep._id]);
  }

}


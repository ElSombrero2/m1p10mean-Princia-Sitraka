import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {ActivatedRoute} from "@angular/router";
import {VoitureService} from "../../../../@core/services/voiture.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {SousreparationService} from "../../../../@core/services/sousreparation.service";
import {SousReparation} from "../../../../@core/models/sousReparation.model";
import {ReparationService} from "../../../../@core/services/reparation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.scss']
})
export class DetailVoitureComponent implements OnInit {
  voitures: Voiture[] | undefined;
  voiture: Voiture | undefined;
  reparation: Reparation | undefined;
  sousreparations: SousReparation [] | undefined;
  date: Date = new Date();
  dateNow = this.date.getDay() + "/" + this.date.getMonth() + 1 + "/" + this.date.getFullYear();

  // modelForm = this.formBuilder.group({
  //   motif: ['', Validators.compose([Validators.required])],
  //   montant: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  // });
  constructor(
    private route: ActivatedRoute,
    private service: VoitureService,
    private serviceSousReparation: SousreparationService,
    private serviceReparation: ReparationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  form = new FormGroup({
    motif: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
    reparation: new FormControl('')
  })

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const reparationId: string | null = this.route.snapshot.paramMap.get('id');
    if (reparationId) {
      this.serviceSousReparation.getSousReparations(reparationId).subscribe(response => {
        this.sousreparations = response;
      });
      this.serviceReparation.getReparation(reparationId).subscribe(response => {
        this.reparation = response;
      })
    }
  }

  addSousReparation(reparation: any) {
    const idRep = reparation._id;
    this.form.get('reparation')?.setValue(reparation._id);
    console.log(this.form.value);
    if (idRep) {
      this.serviceSousReparation.create(this.form.value).subscribe(response => {
        this.form.reset();
        this.getData();
      })
    }
  }

  setStatus() {
  }

  deleteSousReparation(sp: SousReparation) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Voulez vous annuler la réparation ? ",
        confirmText: " Oui , Annuler ",
        cancelText: "Non, Garder",
      },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.serviceSousReparation.delete(sp._id).subscribe(response => {
          this.getData();
        });
      } else {
        console.log("okzao ka")
      }
    })

  }


}

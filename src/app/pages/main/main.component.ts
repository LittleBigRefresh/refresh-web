import {Component, OnInit} from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { Statistics } from 'src/app/api/types/statistics';
import {Instance} from "../../api/types/instance";
import {Level} from "../../api/types/level";
import {faCertificate, faFireAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  statistics: Statistics | undefined;
  instance: Instance | undefined;

  totalPickedLevels: number = 0;
  pickedLevels: Level[] | undefined;
  totalBusyLevels: number = 0;
  busyLevels: Level[] | undefined;

  constructor(public apiClient: ApiClient) {}

  ngOnInit(): void {
    this.apiClient.GetServerStatistics()
    .subscribe(data => {
      this.statistics = data;
    });

    this.apiClient.GetInstanceInformation()
      .subscribe(data => {
        this.instance = data;
      });

    this.apiClient.GetLevelListing("teamPicks", 10, 0)
      .subscribe(data => {
        this.totalPickedLevels = data.listInfo.totalItems;
        this.pickedLevels = data.items;
     });

    this.apiClient.GetLevelListing("newest", 10, 0)
      .subscribe(data => {
        this.totalBusyLevels = data.listInfo.totalItems;
        this.busyLevels = data.items;
      });
  }

  protected readonly faFireAlt = faFireAlt;
  protected readonly faCertificate = faCertificate;
}

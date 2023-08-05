import {Component, OnInit} from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { Statistics } from 'src/app/api/types/statistics';
import {Instance} from "../../api/types/instance";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  statistics: Statistics | undefined;
  instance: Instance | undefined;

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
  }
}

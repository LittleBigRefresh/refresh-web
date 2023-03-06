import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';

@Component({
  selector: 'app-level-listing',
  templateUrl: './level-listing.component.html',
  styleUrls: ['./level-listing.component.scss']
})
export class LevelListingComponent {
  levels!: Level[]
  routeName!: string
  constructor(private apiClient: ApiClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const apiRoute = params.get('route');
      if(apiRoute == null) return;

      this.routeName = apiRoute;

      this.apiClient.GetLevelListing(apiRoute)
        .subscribe(data => this.levels = data);
    })
  }
}

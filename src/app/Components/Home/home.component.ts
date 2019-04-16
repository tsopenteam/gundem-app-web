import { Component, OnInit } from '@angular/core';

import { ViewTypeModel } from './Models/view.type.model';
import { PodcastModel } from './Models/podcast.model';
import { YearModel } from './Models/year.model';

import { ViewTypeEnum } from './Enums/view.type.enum';

import { HomeService } from './Services/home.service';
import { HomeDataService } from './Services/home.data.service';

@Component({
    selector: 'home',
    templateUrl: 'home.template.html'
})
export class HomeComponent implements OnInit {

    public viewTypeOptions: ViewTypeModel = new ViewTypeModel();
    public viewMainListOptions = {
        yearList: new Array<YearModel>()
    };
    public viewPodcastListOptions = {
        podcastList: new Array<PodcastModel>()
    };
    public viewPodcastDetailsOptions = {
        podcast: new PodcastModel()
    };
    public viewMediaPlayerOptions = {
        mediaPlayerTitle: "",
        podcast: new PodcastModel()
    };

    constructor(
        private _homeService: HomeService,
        private _homeDataService: HomeDataService
    ) { }

    ngOnInit() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewMainList);
        this.UpdateYearList();
    }

    private SetViewTypeOptions(viewType: ViewTypeEnum) {
        // For Make False All Property.
        this.viewTypeOptions = new ViewTypeModel();

        switch (viewType) {
            case ViewTypeEnum.ViewMainList: {
                this.viewTypeOptions.ViewMainList = true;
                break;
            }
            case ViewTypeEnum.ViewPodcastList: {
                this.viewTypeOptions.ViewPodcastList = true;
                break;
            }
            case ViewTypeEnum.ViewDetails: {
                this.viewTypeOptions.ViewDetails = true;
                break;
            }
            default: {
                break;
            }
        }
    }

    private ChangeSearchInput(event: any) {
        let tempText: string = event.target.value;
        if (tempText.length < 3) {
            return;
        }

        this.SetViewTypeOptions(ViewTypeEnum.ViewPodcastList);
        this.viewPodcastListOptions.podcastList = new Array<PodcastModel>();
        this._homeService.GetAllData().subscribe(member => {
            this.viewPodcastListOptions.podcastList = this._homeDataService.SearchPodcastList(member.list, tempText);
        });
    }

    private UpdateYearList() {
        this.viewMainListOptions.yearList = new Array<YearModel>();

        this._homeService.GetAllData().subscribe(member => {
            this.viewMainListOptions.yearList = this._homeDataService.GetYearList(member.list);
        });
    }

    private GoToViewPodcastList(year: string) {
        this.SetViewTypeOptions(ViewTypeEnum.ViewPodcastList);

        this.viewPodcastListOptions.podcastList = new Array<PodcastModel>();
        this._homeService.GetAllData().subscribe(member => {
            this.viewPodcastListOptions.podcastList = this._homeDataService.GetPodcastList(member.list, year);
        });
    }

    private GoToViewMainList() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewMainList);
        this.UpdateYearList();
    }

    private GoToViewPodcastDetails(totalCount: number) {
        this.SetViewTypeOptions(ViewTypeEnum.ViewDetails);

        this.viewPodcastDetailsOptions.podcast = new PodcastModel();
        this._homeService.GetAllData().subscribe(member => {
            this.viewPodcastDetailsOptions.podcast = this._homeDataService.GetPodcast(member.list, totalCount);
        });
    }

    private BackToViewPodcastList() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewPodcastList);
    }

    private PlayPodcast(tempPodcastModel: PodcastModel) {
        this.viewMediaPlayerOptions.podcast = tempPodcastModel;
        this.viewMediaPlayerOptions.mediaPlayerTitle = this.viewMediaPlayerOptions.podcast.titlePodcast;
    }

    private StopPodcast() {
        this.viewMediaPlayerOptions.mediaPlayerTitle = "";
        this.viewMediaPlayerOptions.podcast = new PodcastModel();
    }

}
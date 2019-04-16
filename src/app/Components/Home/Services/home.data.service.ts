import { Injectable } from '@angular/core';

import { HomeService } from './home.service';

import { PodcastModel } from '../Models/podcast.model';
import { YearModel } from '../Models/year.model';
import { SearchListModel } from '../Models/search.list.model';

@Injectable()
export class HomeDataService {

    constructor(
        private _homeService: HomeService
    ) { }

    public GetYearList(tempModelList: Array<PodcastModel>): Array<YearModel> {
        let tempYearList: Array<YearModel> = new Array<YearModel>();

        let tempFlag: boolean = true;
        tempModelList.forEach(memberPodcast => {
            tempFlag = true;

            tempYearList.forEach(memberYear => {

                if (memberPodcast.year == memberYear.yearText) {
                    tempFlag = false;
                    memberYear.yearCount = memberYear.yearCount + 1;
                }

            });

            if (tempFlag) {
                let tempModel: YearModel = new YearModel();
                tempModel.yearText = memberPodcast.year;
                tempModel.yearCount = 1;
                tempYearList.push(tempModel);
            }
        });

        return tempYearList;
    }

    public GetPodcastList(tempModelList: Array<PodcastModel>, tempYear: string): Array<PodcastModel> {
        let tempPodcastList: Array<PodcastModel> = new Array<PodcastModel>();

        tempPodcastList = tempModelList.filter(member => member.year == tempYear);
        return tempPodcastList;
    }

    public GetPodcast(tempModelList: Array<PodcastModel>, tempTotalCount: number): PodcastModel {
        let tempModel = new PodcastModel();

        if (tempModelList.filter(member => member.totalCount == tempTotalCount).length > 0) {
            tempModel = tempModelList.filter(member => member.totalCount == tempTotalCount)[0];
        }
        return tempModel;
    }

    public SearchPodcastList(tempModelList: Array<PodcastModel>, tempText: string): Array<PodcastModel> {
        let tempPodcastList: Array<PodcastModel> = new Array<PodcastModel>();

        // TODO: This Is Spaghetti. Will Change After..
        let tempSearhList: Array<SearchListModel> = new Array<SearchListModel>();
        tempModelList.forEach(memberPodcast => {
            memberPodcast.content.forEach(memberContent => {
                let tempModel = new SearchListModel();
                tempModel.text = memberContent.contentText;

                tempModel.podcast = new PodcastModel();
                tempModel.podcast.year = memberPodcast.year;
                tempModel.podcast.count = memberPodcast.count;
                tempModel.podcast.totalCount = memberPodcast.totalCount;
                tempModel.podcast.uploadDate = memberPodcast.uploadDate;
                tempModel.podcast.content = memberPodcast.content;
                tempModel.podcast.titlePodcast = memberContent.contentText;

                tempSearhList.push(tempModel);
            });
        });

        tempPodcastList = tempSearhList.filter(x => x.text.toLowerCase().match(tempText.toLowerCase())).map(v => { return v.podcast; });

        return tempPodcastList;
    }

}
import { ContentModel } from './content.model';

export class PodcastModel {
    year: string;
    count: number;
    totalCount: number;
    uploadDate: string;
    podcastLink: string;
    videoLink: string;
    siteLink: string;
    rangeFirstDate: string;
    rangeLastDate: string;
    titlePodcast: string;
    explanationPodcast: string;
    content: Array<ContentModel>;

    constructor() {
        this.content = new Array<ContentModel>();
    }
}
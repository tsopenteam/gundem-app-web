export class ViewTypeModel {
    ViewSearch: boolean;
    ViewMainList: boolean;
    ViewPodcastList: boolean;
    ViewDetails: boolean;
    ViewMediaPlayer: boolean;

    constructor() {
        this.ViewSearch = true;
        this.ViewMainList = false;
        this.ViewPodcastList = false;
        this.ViewDetails = false;
        this.ViewMediaPlayer = true;
    }
}
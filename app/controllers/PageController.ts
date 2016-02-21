class PageController {

    public service: PageService;

    constructor(private PageService: PageService) {

        console.log("PageController")

        this.service = this.PageService;

    }

}
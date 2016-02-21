class HomeController {


    constructor(private PageService: PageService) {

        console.log("HomeController");

        this.PageService.title = "Home";
    }

}
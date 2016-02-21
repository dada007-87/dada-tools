class DateController {

    public defaultFormat: string = "DD/MM/YYYY";

    public unitOptions: Array<any> = [
        {"label": "millisecondi", "value": "milliseconds"},
        {"label": "secondi", "value": "seconds"},
        {"label": "minuti", "value": "minutes"},
        {"label": "ore", "value": "hours"},
        {"label": "giorni", "value": "days"},
        {"label": "settimane", "value": "weeks"},
        {"label": "mesi", "value": "months"},
        {"label": "anni", "value": "years"}
    ];

    public defaultUnit: any = {"label": "giorni", "value": "days"};


    public from: Date = new Date();
    public to: Date = new Date();
    public unitDifference: any = this.defaultUnit;
    public differenceBetweenDates: number;

    public initialDate: Date = new Date();
    public addend: number = 0;
    public unitAddend: any = this.defaultUnit;
    public finalDate: Date;

    constructor(private $scope: ng.IScope, private moment: moment.MomentStatic, private PageService: PageService) {

        console.log("DateController");

        this.PageService.setTitle("Date");

        this.init();
    }

    public init = () =>  {
        var date = this;
        date.$scope.$watch("date.from", function(value){
            date.calculateDifferenceBetweenDates();
        });
        date.$scope.$watch("date.to", function(value){
            date.calculateDifferenceBetweenDates();
        });
        date.$scope.$watch("date.unitDifference", function(value){
            date.calculateDifferenceBetweenDates();
        });

        date.$scope.$watch("date.initialDate", function(value){
            date.calculateAddToDate();
        });
        date.$scope.$watch("date.addend", function(value){
            date.calculateAddToDate();
        });
        date.$scope.$watch("date.unitAddend", function(value){
            date.calculateAddToDate();
        });
    }

    public calculateDifferenceBetweenDates = () => {
        this.from = typeof this.from != "undefined"  && this.from != null ? this.from : new Date();
        this.to = typeof this.to != "undefined"  && this.to != null ? this.to : new Date();
        this.unitDifference = typeof this.unitDifference != "undefined"  && this.unitDifference != null ? this.unitDifference : this.defaultUnit;

        var from = this.moment(this.from);
        var to = this.moment(this.to);

        this.differenceBetweenDates = this.moment(to).diff(from, this.unitDifference.value);
    }

    public calculateAddToDate = () => {
        this.initialDate = typeof this.initialDate != "undefined"  && this.initialDate != null ? this.initialDate : new Date();
        this.addend = typeof this.addend != "undefined"  && this.addend != null ? this.addend : 0;
        this.unitAddend = typeof this.unitAddend != "undefined"  && this.unitAddend != null ? this.unitAddend : this.defaultUnit;

        var initialDate = this.moment(this.initialDate).hours(0).minutes(0).seconds(0).milliseconds(0);
        var addend = this.addend;
        var finalDate = initialDate.add(addend, this.unitAddend.value);

        this.finalDate = finalDate.toDate();
    }

}
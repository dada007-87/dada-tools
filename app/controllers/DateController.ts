class DateController {

    public from: Date;
    public to: Date;
    public result: Date;
    constructor(private moment) {
        console.log("DateController");
        console.log(this);
    }

    public daysBetweenDates = () => {
        this.result = this.moment(this.from).format();
    }

}
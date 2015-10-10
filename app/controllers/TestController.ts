class TestController {

    public list: Array<ITest>;

    constructor() {
        console.log("TestController");
        this.list = [
            {name: "Mario", surname: "Rossi", age : 57},
            {name: "Luigi", surname: "Bianchi", age : 60},
            {name: "Duilio", surname: "Verdi", age : 88}
        ]
        console.log(this.list);
    }

}
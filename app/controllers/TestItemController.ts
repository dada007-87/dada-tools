class TestItemController {
    
    public item: ITest;

    public testMethod = (): string => {
        return "I'm " + this.item.name + " " + this.item.surname + " and i have " + this.item.age + " years";
    }

    constructor() {
        console.log("TestItemController");
    }

}
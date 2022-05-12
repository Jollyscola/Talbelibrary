import { CreateTable } from './CreateTable.js';
let table = document.querySelector(".table");
export class Test {
    constructor() {
        this.tablejson = [{
                heading: "first",
                data: ["Hans", "Gustav", "pluto"]
            }, {
                heading: "last",
                data: ["Brain", "Davs"]
            }, {
                heading: "address",
                data: ["Vestebro", "Nørreport", "københavnsvej"]
            }];
    }
    createtable() {
        return new CreateTable({
            headline: this.headline,
            sizeofTable: [10, 10],
            headingVeorHor: 0,
            headingisrow: 3,
            rowofstarting: 3,
            contenttable: this.tablejson,
            sorttable: false,
        }).create();
    }
}
table.outerHTML = new Test().createtable();

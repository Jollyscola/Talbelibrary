import { CreateTable } from './CreateTable.js';
let table = document.querySelector(".table");
export class Test {
    constructor() {
        this.tablejson = [{
                heading: "first",
                data: ["Hans", "Gustav", "Pluto"]
            }, {
                heading: "last",
                data: ["Brain", "Davs"]
            }, {
                heading: "address",
                data: ["Vestebro", "Nørreport", "Københavnsvej"]
            }];
    }
    createtable() {
        return new CreateTable({
            captionoftable: "Table",
            headline: this.headline,
            sizeofTable: [10, 10],
            headingVeorHor: 0,
            headingisrow: 0,
            rowofstarting: 0,
            contenttable: this.tablejson,
            sorttable: true,
        }).create();
    }
}
table.outerHTML = new Test().createtable();

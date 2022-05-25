import { CreateForms } from './CreateForms.js';
import { CreateTable } from './CreateTable.js';
let table = document.querySelector(".table");
let contestform = document.querySelector(".contestform");
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
        this.formsjson = [{
                text: "Bredde/længde",
                label: "sizeofTable"
            }, {
                text: "overskrift",
                label: "captionoftable"
            },
            {
                text: "horisontalt eller vertikal",
                label: "headingVeorHor"
            }
        ];
    }
    createtable() {
        return new CreateTable({
            captionoftable: "table",
            sizeofTable: [10, 10],
            headingVeorHor: 0,
            headingisrow: 2,
            // rowofstarting: 4,
            contenttable: this.tablejson,
            sorttable: true,
            searchtable: true,
        }).create();
    }
    createforms() {
        return new CreateForms({
            contentforms: this.formsjson,
            heading: "hello"
        }).create();
    }
}
table.outerHTML = new Test().createtable();
// contestform.outerHTML = new Test().createforms();

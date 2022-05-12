// import {TableOptions} from "./interface/TableOptions";
const DEAFULT_OPTIONS = {
    Heading: ["hans"],
    numberOfRows: 3,
};
export class CreateTable {
    constructor(table) {
        //     if(options != undefined) this.options = options;
        //     if (options == null) this.options = {}
        // headingAmount: number;   
        this.lengthofrows = 0;
        this.lengtharray = 0;
        //    if (this.options.classes == null) this.options.classes = {};
        //    if (this.options.classes == null) this.options.classes.heading = "heading";
        this.tableElem = document.createElement("table");
        this.update(Object.assign({}, table));
    }
    set numberOfRows(value) {
        this.lengthofrows = value;
    }
    create() {
        return this.tableElem.outerHTML;
    }
    set horizontal(value) {
        this.positions = value;
    }
    set contenttable(value) {
        let tableheading = createHeading(value, this.positions);
        if (tableheading != null)
            this.tableElem.appendChild(tableheading);
        for (let i = 0; i < this.lengthofrows; i++) {
            let tableRow = document.createElement("tr");
            for (let j = 0; j < value.length; j++) {
                let tableDate = document.createElement("td");
                if (value[j].data[i] !== undefined) {
                    tableDate.textContent = value[j].data[i];
                }
                else {
                    tableDate.textContent = "_";
                }
                console.log(tableDate);
                tableRow.appendChild(tableDate);
            }
            this.tableElem.appendChild(tableRow);
        }
    }
    update(options) {
        Object.entries(Object.assign({}, options)).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}
function createHeading(value, postions) {
    let tableRow = null;
    if (postions == 0)
        tableRow = document.createElement("tr");
    for (let i = 0; i < value.length; i++) {
        if (postions == 1)
            tableRow = document.createElement("tr");
        let onetableHead = document.createElement("th");
        // if(options != undefined) onetableHead.classList = options.tablehead.classList
        onetableHead.textContent = value[i].heading;
        if (tableRow != null)
            tableRow.appendChild(onetableHead);
    }
    return tableRow;
}

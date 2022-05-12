const DEAFULT_OPTIONS = {
    Heading: ["hans"],
    numberOfRows: 3,
};
export class CreateTable {
    constructor(options) {
        //skal det være vertikal eller  horisontal
        this.veorhor = 0;
        //horizontal og  vertical
        this.horizontal = 0;
        this.vertical = 0;
        //hvilket række skal heading start
        this.rowofheading = 0;
        //hvilket row skal den på
        this.startingofrow = 0;
        this.sorting = false;
        this.dataclass = "";
        this.headingclass = "";
        this.options = options;
        if (options == null)
            this.options;
        if (this.options.classes == null)
            this.options.classes = {};
        if (this.options.classes.heading == null)
            this.options.classes.heading = "heading";
        if (this.options.classes.data == null)
            this.options.classes.data = "data";
        this.headingclass = (this.options.classes.heading).trim();
        this.dataclass = (this.options.classes.data).trim();
        if (this.tableElem == null)
            this.tableElem = document.createElement("table");
        this.update(Object.assign({}, options));
    }
    set sizeofTable(value) {
        this.horizontal = value[0];
        this.vertical = value[1];
    }
    set headingVeorHor(value) {
        this.veorhor = value;
    }
    set headingisrow(value) {
        this.rowofheading = value;
    }
    set sorttable(value) {
        this.sorting = value;
    }
    set rowofstarting(value) {
        this.startingofrow = value;
    }
    set contenttable(value) {
        if (this.veorhor == 0)
            this.vertikaltable(value);
        else if (this.veorhor == 1)
            this.horisontalttable(value);
        else
            console.log("something went wrong");
    }
    vertikaltable(value) {
        let k = 0;
        for (let i = 0; i < this.vertical; i++) {
            let tableRow = document.createElement("tr");
            for (let j = 0; j < this.horizontal; j++) {
                if (i === this.rowofheading) {
                    let onetableHead = document.createElement("th");
                    if (value[j] != undefined && this.startingofrow <= i)
                        onetableHead.textContent = value[j].heading;
                    else
                        onetableHead.textContent = "_";
                    if (this.dataclass !== null)
                        onetableHead.classList.add(this.headingclass);
                    if (tableRow != null)
                        tableRow.appendChild(onetableHead);
                }
                else if (i !== this.rowofheading) {
                    let onetableDate = document.createElement("td");
                    if (value[j] !== undefined && value[j].data[k] !== undefined && this.startingofrow <= i)
                        onetableDate.textContent = value[j].data[k];
                    else
                        onetableDate.textContent = "_";
                    if (this.dataclass !== null)
                        onetableDate.classList.add(this.dataclass);
                    if (tableRow != null)
                        tableRow.appendChild(onetableDate);
                }
                else {
                    console.log("something went wrong");
                }
                this.tableElem.appendChild(tableRow);
            }
            if (this.startingofrow <= i)
                k++;
            if (i == this.rowofheading) {
                k = k - 1;
                this.vertical++;
            }
        }
    }
    horisontalttable(value) {
        for (let i = 0; i < this.horizontal; i++) {
            let tableRow = document.createElement("tr");
            let m = 0;
            for (let j = 0; j < this.vertical; j++) {
                console.log(this.startingofrow);
                if (j == this.rowofheading) {
                    let onetableHead = document.createElement("th");
                    if (value[i] != undefined && this.startingofrow <= j)
                        onetableHead.textContent = value[i].heading;
                    else
                        onetableHead.textContent = "_";
                    if (tableRow != null)
                        tableRow.appendChild(onetableHead);
                }
                else {
                    let tableDate = document.createElement("td");
                    if (value[i] !== undefined && value[i].data[m] !== undefined && this.startingofrow <= j)
                        tableDate.textContent = value[i].data[m];
                    else
                        tableDate.textContent = "_";
                    tableRow.appendChild(tableDate);
                }
                if (this.startingofrow <= j)
                    m++;
            }
            this.tableElem.appendChild(tableRow);
        }
    }
    create() {
        return this.tableElem.outerHTML;
    }
    update(options) {
        Object.entries(Object.assign({}, options)).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}
function datasetup() {
}

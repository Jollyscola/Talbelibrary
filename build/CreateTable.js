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
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.update(Object.assign({}, options));
    }
    set captionoftable(value) {
        let captions = document.createElement("caption");
        captions.textContent = value;
        this.tableElem.appendChild(captions);
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
        if (value) {
            console.log("hello");
            setTimeout(() => {
                console.log("sort");
                sorttable();
            }, 1);
        }
    }
    set rowofstarting(value) {
        this.startingofrow = value;
    }
    set contenttable(value) {
        if (this.veorhor == 0)
            this.horisontalttable(value);
        else if (this.veorhor == 1)
            this.vertikaltable(value);
        else
            console.log("something went wrong");
    }
    vertikaltable(value) {
        for (let i = 0; i < this.horizontal; i++) {
            let tableRow = document.createElement("tr");
            let m = 0;
            for (let j = 0; j < this.vertical; j++) {
                if (j == this.rowofheading) {
                    let onetableHead = document.createElement("th");
                    if (value[i] != undefined && this.startingofrow <= j)
                        onetableHead.textContent = value[i].heading;
                    if (this.dataclass !== null)
                        onetableHead.classList.add(this.headingclass);
                    else
                        onetableHead.textContent = "_";
                    if (tableRow != null)
                        tableRow.appendChild(onetableHead);
                }
                else if (j !== this.rowofheading) {
                    let onetableDate = this.datacontent(value, i, j, m, true);
                    tableRow.appendChild(onetableDate);
                }
                else {
                    console.log("something went wrong");
                }
                if (this.startingofrow <= j)
                    m++;
            }
            this.tableElem.appendChild(tableRow);
        }
    }
    horisontalttable(value) {
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
                    let onetableDate = this.datacontent(value, i, j, k, false);
                    if (tableRow != null)
                        tableRow.appendChild(onetableDate);
                }
                else {
                    console.log("something went wrong");
                }
            }
            if (this.startingofrow <= i)
                k++;
            if (i == this.rowofheading) {
                this.thead.appendChild(tableRow);
                this.tableElem.appendChild(this.thead);
                k = k - 1;
                this.vertical++;
            }
            else {
                this.tbody.appendChild(tableRow);
            }
        }
        this.tableElem.appendChild(this.tbody);
    }
    headercontent(value, i, j, onetableHead) {
        if (value[j] != undefined && this.startingofrow <= i)
            onetableHead.textContent = value[j].heading;
        else
            onetableHead.textContent = "_";
        if (this.dataclass !== null)
            onetableHead.classList.add(this.headingclass);
    }
    datacontent(value, i, j, k, horv) {
        let onetableDate = document.createElement("td");
        if (horv) {
            if (value[i] !== undefined && value[i].data[k] !== undefined && this.startingofrow <= j)
                onetableDate.textContent = value[i].data[k];
            else
                onetableDate.textContent = "_";
        }
        else {
            if (value[j] !== undefined && value[j].data[k] !== undefined && this.startingofrow <= i)
                onetableDate.textContent = value[j].data[k];
            else
                onetableDate.textContent = "_";
        }
        if (this.dataclass !== null)
            onetableDate.classList.add(this.dataclass);
        return onetableDate;
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
function sorttable() {
    const table = document.querySelector('table');
    // Query the headers
    const headers = table.querySelectorAll('th');
    headers.forEach(function (header, index) {
        header.addEventListener('click', function () {
            // This function will sort the column
            sortTableByColumn(table, index);
        });
    });
}
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));
    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        if (!charIsLetter(aColText) || !charIsLetter(bColText)) {
            if (!charIsLetter(aColText) && !charIsLetter(bColText))
                return 0;
            else if (!charIsLetter(aColText))
                return 1;
            else if (!charIsLetter(bColText))
                return -1;
        }
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    tBody.append(...sortedRows);
    table.querySelectorAll("th").forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}
function charIsLetter(char) {
    if (typeof char !== 'string') {
        return false;
    }
    return char.toLowerCase() !== char.toUpperCase();
}

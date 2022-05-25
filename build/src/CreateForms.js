export class CreateForms {
    constructor(options) {
        this.options = options;
        if (options == null)
            this.options;
        if (this.tableElem == null)
            this.tableElem = document.createElement("table");
        this.update(Object.assign({}, options));
    }
    set contentforms(value) {
        this.formstable(value);
    }
    set heading(value) {
        console.log(value);
    }
    create() {
        console.log("hello");
        return "hello";
    }
    formstable(value) {
        console.log(value);
        // for (let index = 0; index < heading.length; index++) {
        // }
    }
    update(options) {
        Object.entries(Object.assign({}, options)).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}

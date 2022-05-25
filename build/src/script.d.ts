export declare class Test {
    constructor();
    headline: "Table";
    tablejson: {
        heading: string;
        data: string[];
    }[];
    formsjson: {
        text: string;
        label: string;
    }[];
    createtable(): string;
    createforms(): string;
}

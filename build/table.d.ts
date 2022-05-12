import { Table } from "./interface/Table";
export declare class CreateTable {
    lengthofrows: number;
    lengtharray: number;
    protected positions: any;
    private tableElem;
    constructor(table: Table);
    set numberOfRows(value: number);
    create(): string;
    set horizontal(value: any);
    set contenttable(value: {
        heading: string;
        data: string;
    }[]);
    update(options: Table): void;
}

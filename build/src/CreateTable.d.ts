import { TableOptions } from "./interface/TableOptions";
export declare class CreateTable {
    protected veorhor: number;
    protected horizontal: number;
    protected vertical: number;
    protected rowofheading: number;
    private tableElem;
    private captions;
    protected sorting: boolean;
    private dataclass;
    private headingclass;
    protected search: boolean;
    private options;
    protected thead: HTMLTableSectionElement;
    protected tbody: HTMLTableSectionElement;
    constructor(options: TableOptions);
    set captionoftable(value: any);
    set sizeofTable(value: [number, number]);
    set headingVeorHor(value: any);
    set headingisrow(value: number);
    set sorttable(value: any);
    set contenttable(value: {
        heading: string;
        data: string;
    }[]);
    set searchtable(value: any);
    searchintable(): void;
    horvtable(value: {
        heading: string;
        data: string;
    }[], firstnumber: number, secondnumber: number): void;
    headercontent(value: {
        heading: string;
        data: string;
    }[], i: number, j: number, onetableHead: HTMLTableCellElement): void;
    datacontent(value: {
        heading: string;
        data: string;
    }[], i: number, j: number, k: number): HTMLTableCellElement;
    create(): string;
    update(options: TableOptions): void;
}

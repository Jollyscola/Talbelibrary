import { TableOptions } from "./interface/TableOptions";
export declare class CreateTable {
    protected veorhor: number;
    protected horizontal: number;
    protected vertical: number;
    protected rowofheading: number;
    protected startingofrow: number;
    private options;
    private tableElem;
    protected sorting: boolean;
    private dataclass;
    private headingclass;
    constructor(options: TableOptions);
    set sizeofTable(value: [number, number]);
    set headingVeorHor(value: any);
    set headingisrow(value: number);
    set sorttable(value: any);
    set rowofstarting(value: number);
    set contenttable(value: {
        heading: string;
        data: string;
    }[]);
    vertikaltable(value: {
        heading: string;
        data: string;
    }[]): void;
    horisontalttable(value: {
        heading: string;
        data: string;
    }[]): void;
    create(): string;
    update(options: TableOptions): void;
}

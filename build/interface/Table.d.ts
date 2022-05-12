declare enum horizontal {
    vertikal = 0,
    horisontalt = 1
}
export interface Table {
    contenttable?: {}[];
    sizeofTable: [number, number];
    headingVeorHor?: horizontal;
    headingisrow?: number;
    sorttable?: boolean;
    rowofstarting?: number;
}
export {};



enum horizontal{
    vertikal = 0,
    horisontalt = 1
}



export interface TableOptions
{
    contenttable?:  {}[];
    sizeofTable: [number,number];
    headingVeorHor?: horizontal;
    headingisrow?: number;
    sorttable?: boolean;
    rowofstarting?: number;
    headline:string;
    classes?: 
    {
        heading?: string;
        data?: string;
    }
}
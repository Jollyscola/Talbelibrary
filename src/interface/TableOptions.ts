

enum horizontalOrvertikal{
   
    horisontalt = 0,
    vertikal = 1
}



export interface TableOptions
{
    captionoftable: string,
    contenttable?:  {}[];
    sizeofTable: [number,number];
    headingVeorHor?: horizontalOrvertikal;
    headingisrow?: number;
    sorttable?: boolean;
    rowofstarting?: number;
    headline:string;
    classes?: 
    {
        heading?: string;
        data?: string;
        vertical?: string;
        horizontal?: string;

    }
}
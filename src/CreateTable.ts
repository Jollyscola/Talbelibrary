
 import {TableOptions} from "./interface/TableOptions";


const DEAFULT_OPTIONS = {
    Heading: ["hans"],
    numberOfRows: 3,
}




export  class CreateTable
{
    //skal det være vertikal eller  horisontal
    protected veorhor: number = 0;
    //horizontal og  vertical
    protected horizontal: number= 0;
    protected vertical: number = 0;
    
    //hvilket række skal heading start
    protected rowofheading: number = 0;

    //hvilket row skal den på
    protected startingofrow: number = 0;
    
    //TableOptions er interface
    private options:TableOptions;
    //start bygge table
    private tableElem : HTMLTableElement;

    protected sorting: boolean = false;
    private dataclass:string = "";
	private headingclass:string = "";
    constructor(options: TableOptions)
    {

         this.options = options;
        if (options == null) this.options
        if (this.options.classes == null) this.options.classes = {};
        if (this.options.classes.heading == null) this.options.classes.heading = "heading";
        if (this.options.classes.data == null) this.options.classes.data = "data";
        this.headingclass = (this.options.classes.heading).trim();
		this.dataclass = (this.options.classes.data).trim();
        if(this.tableElem == null) this.tableElem = document.createElement("table");
        this.update({...options})

    }
    
    set sizeofTable(value: [number,number])
    {
        this.horizontal = value[0]
        this.vertical = value[1];
    }
    
    set headingVeorHor(value:any) 
    {
           this.veorhor = value;
    }

    set headingisrow(value:number)
    {
        this.rowofheading = value;
    }


    set sorttable(value: any){
        this.sorting = value;
    }

    set rowofstarting(value: number){
        this.startingofrow = value
    }

    set contenttable(value: {heading:string, data:string}[])
    {
        if(this.veorhor == 0)  this.vertikaltable(value);
        else if(this.veorhor == 1)  this.horisontalttable(value);
        else console.log("something went wrong")           
          
    }

    vertikaltable(value:{heading:string, data:string}[]): void
    {
        for (let i = 0; i < this.horizontal; i++) 
        {
            let tableRow = <HTMLTableRowElement> document.createElement("tr")!; 
            let m = 0;
            for (let j = 0; j < this.vertical; j++)
            {
                console.log(this.startingofrow)
         
               if(j == this.rowofheading)
               {
               
                   let onetableHead = <HTMLTableCellElement> document.createElement("th")!; 
                 
                   if(value[i] != undefined && this.startingofrow <= j)onetableHead.textContent = value[i].heading;
                   else onetableHead.textContent = "_";
                   if(tableRow != null) tableRow.appendChild(onetableHead)
               } else {
    
                let onetableDate = <HTMLTableCellElement> document.createElement("td")!; 
    
                if( value[i] !== undefined && value[i].data[m] !== undefined && this.startingofrow <= j) onetableDate.textContent = value[i].data[m]; 
                else onetableDate.textContent = "_";
                
                if(this.dataclass !== null) onetableDate.classList.add(this.dataclass);


                tableRow.appendChild(onetableDate)  
            }        
             if(this.startingofrow <= j) m++  
            }
            this.tableElem.appendChild(tableRow)
        } 
    }

    horisontalttable(value:{heading:string, data:string}[]): void
    {
        let k: number = 0;
        for (let i = 0; i < this.vertical; i++)
        {
    
            let tableRow = <HTMLTableRowElement> document.createElement("tr")!;
            
            for (let j = 0; j < this.horizontal; j++)
            {
              
               
             
                if(i === this.rowofheading)
                {   
                        let onetableHead = <HTMLTableCellElement> document.createElement("th")!; 
                        if( value[j] != undefined && this.startingofrow <= i) onetableHead.textContent = value[j].heading;
                        else onetableHead.textContent = "_";

                        if(this.dataclass !== null) onetableHead.classList.add(this.headingclass);

                        if(tableRow != null) tableRow.appendChild(onetableHead)
                }
                else if(i !== this.rowofheading)
                {
                        let onetableDate = <HTMLTableCellElement> document.createElement("td")!;  
                        if(value[j] !== undefined && value[j].data[k] !== undefined && this.startingofrow <= i) onetableDate.textContent = value[j].data[k]; 
                        else onetableDate.textContent = "_";

                        if(this.dataclass !== null) onetableDate.classList.add(this.dataclass);

                        if(tableRow != null)  tableRow.appendChild(onetableDate)                     
                } else {
                    console.log("something went wrong")
                }
                this.tableElem.appendChild(tableRow)
              
            }
            if(this.startingofrow <= i) k++
                 
            
          
           
            if(i == this.rowofheading)
            {
                k = k -1; 
                this.vertical++
            }
        }
        
    }

    create(): string{
        return this.tableElem.outerHTML
    }

    update(options: TableOptions)
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key as keyof CreateTable] = value;
        })
    }
}


function datasetup(){

}



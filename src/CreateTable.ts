
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
   
    //start bygge table
    private tableElem : HTMLTableElement;

    protected sorting: boolean = false;
    private dataclass:string = "";
	private headingclass:string = "";
    private options:TableOptions;
   protected thead: HTMLTableSectionElement
   protected tbody: HTMLTableSectionElement
    constructor(options: TableOptions)
    {

         this.options = options;
        if (options == null) this.options
        if (this.options.classes == null) this.options.classes = {};
        if (this.options.classes.heading == null) this.options.classes.heading = "heading";
        if (this.options.classes.data == null) this.options.classes.data = "data";
        if (this.options.classes.horizontal == null) this.options.classes.horizontal = "horizontal";
        if (this.options.classes.vertical == null) this.options.classes.vertical = "vertical";
        this.headingclass = (this.options.classes.heading).trim();
		this.dataclass = (this.options.classes.data).trim();
        if(this.tableElem == null) this.tableElem = document.createElement("table");
        this.thead = document.createElement("thead")!; 
        this.tbody = document.createElement("tbody")!;
       
        this.update({...options})

    }
    

    set captionoftable(value:any){
        let captions = document.createElement("caption");
        captions.textContent = value;
        this.tableElem.appendChild(captions);
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
        if(value){
            console.log("hello")
        setTimeout(() => {
            console.log("sort")
            sorttable()
        }, 1);
        }
    }


    set rowofstarting(value: number){
        this.startingofrow = value
    }

    set contenttable(value: {heading:string, data:string}[])
    {
        let options = this.options.classes
        this.tableElem.classList.remove("horisont", "vertical")
        if(this.veorhor == 0 && options?.horizontal) 
        {   
            console.log("horisont")
            this.tableElem.classList.add(options?.horizontal)
            this.horvtable(value,this.horizontal,this.vertical);
        }
        else if(this.veorhor == 1 && options?.vertical) 
        {
            console.log("vertikal")
        this.tableElem.classList.add(options?.vertical)
        this.horvtable(value,this.vertical,this.horizontal);
        }
        else console.log("something went wrong")
    }
  

  

    horvtable(value:{heading:string, data:string}[],firstnumber: number , secondnumber:number): void
    {
        let k: number = 0;
        
       
        for (let i = 0; i < firstnumber; i++)
        {
            let tableRow = <HTMLTableRowElement> document.createElement("tr")!;
            
            for (let j = 0; j < secondnumber; j++)
            {
                if(i === this.rowofheading)
                {   

                       
                        let onetableHead = <HTMLTableCellElement> document.createElement("th")!; 
                        if( value[j] != undefined && this.startingofrow <= i) 
                        {
                        onetableHead.classList.add(this.headingclass);
                        onetableHead.textContent = value[j].heading;
                        }
                        else
                        {
                         onetableHead.textContent = "_";
                        }
                        if(tableRow != null) tableRow.appendChild(onetableHead)
                    
                }
                else if(i !== this.rowofheading)
                {
                   let  onetableDate= this.datacontent(value,i,j,k)
                  
                    if(tableRow != null)  tableRow.appendChild(onetableDate)  
                                    
                } 
                else 
                {
                    console.log("something went wrong")
                }
               
               
              
            }
            if(this.startingofrow <= i) k++
                 
            if(i == this.rowofheading)
            {
                this.thead.appendChild(tableRow)
                this.tableElem.appendChild(this.thead)
                k = k -1; 
                this.vertical++
            }
            else
            { 
              
                this.tbody.appendChild(tableRow) 
            }

        }
        this.tableElem.appendChild(this.tbody)
    }

    // vertikaltable(value:{heading:string, data:string}[]): void
    // {
    //     console.log("vertikal")
    //     for (let i = 0; i < this.horizontal; i++) 
    //     {
    //         let tableRow = <HTMLTableRowElement> document.createElement("tr")!; 
    //         let m = 0;
           
    //         for (let j = 0; j < this.vertical; j++)
    //         {
               
    //            if(i == this.rowofheading)
    //            {
               
    //                let onetableHead = <HTMLTableCellElement> document.createElement("th")!; 
    //                if(value[j] != undefined && this.startingofrow <= j)onetableHead.textContent = value[j].heading;
    //                if(this.dataclass !== null) onetableHead.classList.add(this.headingclass);
    //                else onetableHead.textContent = "_";

    //                if(tableRow != null) tableRow.appendChild(onetableHead)
    //                if(this.thead != null) this.thead.appendChild(tableRow)
    //            } else if(i !== this.rowofheading){
    //                console.log(value[i])
    //              let onetableDate = this.datacontent(value,i,j,m,true)
    //              if(tableRow != null) tableRow.appendChild(onetableDate)
    //              if(this.tbody != null) this.tbody.appendChild(tableRow)  
    //         }   else {
    //             console.log("something went wrong")
    //         }      
    //          if(this.startingofrow <= i) m++  
    //         }
    //         this.tableElem.appendChild(this.thead)
    //         this.tableElem.appendChild(this.tbody)
    //     } 
      
    // }

    headercontent(value:{heading:string, data:string}[],i: number,j: number,onetableHead : HTMLTableCellElement){

        
        
        if( value[j] != undefined && this.startingofrow <= i) onetableHead.textContent = value[j].heading;
        else onetableHead.textContent = "_";

        if(this.dataclass !== null) onetableHead.classList.add(this.headingclass);
        
    }

    datacontent(value:{heading:string, data:string}[],i: number , j: number,k : number){

        let onetableDate = <HTMLTableCellElement> document.createElement("td")!;  
       
            if(value[j] !== undefined && value[j].data[k] !== undefined && this.startingofrow <= i) onetableDate.textContent = value[j].data[k]; 
            else onetableDate.textContent = "_";
     
            if(this.dataclass !== null) onetableDate.classList.add(this.dataclass);
            return onetableDate
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

function sorttable(){

    const table = document.querySelector('table')!;

// Query the headers
    const headers = table.querySelectorAll('th')!;

    headers.forEach(function (header, index) {
                header.addEventListener('click', function () {
                    // This function will sort the column
                
                    sortTableByColumn(table,index);
                });
            });
}



function sortTableByColumn(table: any, column: number, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a: any, b: any) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        if(!charIsLetter(aColText) || !charIsLetter(bColText)) 
            {
               if(!charIsLetter(aColText) && !charIsLetter(bColText)) return 0
               else if(!charIsLetter(aColText))  return 1;
               else if (!charIsLetter(bColText)) return -1
        }
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }


    tBody.append(...sortedRows);

    
        table.querySelectorAll("th").forEach((th: any) => th.classList.remove("th-sort-asc", "th-sort-desc")) as HTMLCollection; 

         table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc) as HTMLCollection;
         table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc) as HTMLCollection;
       
}





function charIsLetter(char : any) {
    if (typeof char !== 'string') {
      return false;
    }
    return char.toLowerCase() !== char.toUpperCase();
}

 import {TableOptions} from "./interface/TableOptions";
 import { TableEntry } from "./interface/TableEntry";

const DEAFULT_OPTIONS = {
    sizeofTable:[7,7],
    headingVeorHor: 0,

}




export class CreateTable implements EventListenerObject
{
    //skal det være vertikal eller  horisontal
    protected veorhor: number = 0;
    //horizontal og  vertical
    protected horizontal: number= 0;
    protected vertical: number = 0;
    
    protected rowofheading: number = 0;
    //start bygge table
    private tableElem : HTMLTableElement;
    private captions : HTMLTableCaptionElement;
    protected sorting: boolean = false;

    private dataclass:string = "";
	private headingclass:string = "";

    private options:TableOptions;
    protected search = false;
   protected thead: HTMLTableSectionElement
   protected tbody: HTMLTableSectionElement
    private input: HTMLInputElement;
    protected data: TableEntry[]

    
    constructor(tableElem: HTMLTableElement, options: TableOptions)
    {
         this.options = options;
         this.tableElem = tableElem
        if (options == null) this.options
        if (this.options.classes == null) this.options.classes = {};
        if (this.options.classes.heading == null) this.options.classes.heading = "heading";
        if (this.options.classes.data == null) this.options.classes.data = "data";
        if (this.options.classes.horizontal == null) this.options.classes.horizontal = "horizontal";
        if (this.options.classes.vertical == null) this.options.classes.vertical = "vertical";
        this.headingclass = (this.options.classes.heading).trim();
		this.dataclass = (this.options.classes.data).trim();
        
        this.thead = document.createElement("thead")!; 
        this.tbody = document.createElement("tbody")!;
        if(this.captions == null) this.captions = document.createElement("caption");
        if(this.tableElem == null) this.tableElem = document.createElement("table");
       


        this.update({...DEAFULT_OPTIONS,...options})
    }


    public handleEvent(event: Event): void {
        if(event.type == "keyup"){
        let fitler = this.input.value.toUpperCase() 
        let tr = this.tableElem.getElementsByTagName("tr");
        let td: HTMLElement;
        let txtValue: any;
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if(td){
                txtValue = td.textContent;
               
                if(txtValue.toUpperCase().indexOf(fitler) > -1){
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }        
            }
        }
    }
    

    set captionoftable(value:any){
        this.captions.textContent = value.trim();
       
        this.tableElem.appendChild(this.captions);
    }

    set sizeofTable(value: [number,number])
    {
        this.horizontal = value[0];
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
            this.sort()
        }
    }

    set contenttable(value: TableEntry[])
    {
        this.data = value;
    }
  
    set searchtable(value : any){
        if(!this.input) this.input = document.createElement("input") as HTMLInputElement;
        this.search = value;
        if(this.search){
            this.input.setAttribute("type","text")
            this.input.setAttribute("placeholder","search") 
            this.input.addEventListener("keyup",this) 
             this.captions.append(this.input);  
        }
               
        
    }


    sort(){
        const headers = this.tableElem.querySelectorAll('th');
        headers.forEach((header,index) => {
             if(charIsLetter(header.textContent)) header.classList.add("sort");
                
                     header.addEventListener('click',() => {
                        this.sortTableByColumn(this.tableElem,index)
                 }
                );
            });
    
    }

    sortTableByColumn(table: any, column: number, asc = true): void {
        if(table == null) return
        const dirModifier = asc ? 1 : -1;


       
        const rows = Array.from(this.tbody.querySelectorAll("tr"));
    
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
    
        while (this.tbody.firstChild) {
            this.tbody.removeChild(this.tbody.firstChild);
        }
    
        this.tbody.append(...sortedRows);
        

        table.querySelectorAll("th").forEach((th: any) => th.classList.remove("th-sort-asc", "th-sort-desc")) as HTMLCollection; 
    
        table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc) as HTMLCollection;
        table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc) as HTMLCollection;
           
    }

    horvtable(value:TableEntry[],firstnumber: number , secondnumber:number): void
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
                        if(value){
                            if(value[j] && value[j] !== undefined && value[j].heading != undefined ) 
                            {
                            onetableHead.classList.add(this.headingclass);
                            console.log(value[j].heading)
                            onetableHead.textContent = value[j].heading;
                            }
                            else
                            {
                            onetableHead.textContent = "_";
                            }
                            if(tableRow != null) tableRow.appendChild(onetableHead)
                        } else {
                            onetableHead.textContent = "_";
                        }
                    
                }
                else if(i !== this.rowofheading)
                {
                   let  onetableDate = this.datacontent(value,j,k)
                  
                    if(tableRow != null)  tableRow.appendChild(onetableDate)
                    else console.log("there is no table")  
                                    
                } 
                else 
                {
                    console.log("something went wrong")
                }
               
               
              
            }
                 
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
            k++

        }
        this.tableElem.appendChild(this.tbody)
    }

  

    headercontent(value:TableEntry[],j: number,onetableHead : HTMLTableCellElement) : string | undefined
    {

        
        
        if( value[j] && typeof value[j].heading !== "undefined") return value[j].heading;
        else onetableHead.textContent = "_";

        if(this.dataclass !== null) onetableHead.classList.add(this.headingclass);
        
      
    }

    datacontent(value:TableEntry[], j: number,k : number)
    {

        let onetableDate = <HTMLTableCellElement> document.createElement("td")!;  
        if(value)
        {
           
            if(value[j] && value[j].data[k]) 
            {
               let data = value[j].data[k]

                onetableDate.textContent = data; 
            }
            else 
            {
                onetableDate.textContent = "_";
            }
     
            if(this.dataclass !== null) onetableDate.classList.add(this.dataclass);
            
        } else {
            onetableDate.textContent = "_";
        }
        return onetableDate
    }


    create(): string{

        let options =this.options.classes
        console.log(this.vertical,this.horizontal)
        this.tableElem.classList.remove("horisont", "vertical")
        if(this.veorhor == 0 && options?.horizontal) 
        {   
            console.log("horisont")
            this.tableElem.classList.add(options?.horizontal)
            this.horvtable(this.data,this.horizontal,this.vertical);
        }
        else if(this.veorhor == 1 && options?.vertical) 
        {
            console.log("vertikal")
        this.tableElem.classList.add(options.vertical)
        this.horvtable(this.data,this.vertical,this.horizontal);
        }
        else {
            console.log("horisont")
            if(options?.horizontal) this.tableElem.classList.add(options.horizontal)
            this.horvtable(this.data,this.horizontal,this.vertical);
        }

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

function charIsLetter(char : any) {
    if (typeof char !== 'string') {
      return false;
    }
    return char.toLowerCase() !== char.toUpperCase();
}


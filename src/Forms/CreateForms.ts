


 import { TableOptions } from "../Table/interface/TableOptions";
import { FormEntry } from "./interface/FormEntry";
import {FormOptions} from "./interface/FormOptions";
import { CreateTable } from "../Table/CreateTable.js";
import { TableEntry } from "../Table/interface/TableEntry";







export class CreateForms implements EventListenerObject
{


    private options:FormOptions;

    protected tableJson: TableEntry[];

    private tableForm: HTMLTableElement;

    
    private form: HTMLFormElement;
    protected contentheading: HTMLElement;
    private formtable: HTMLTableElement;
    protected data: FormEntry[];
    protected td: HTMLElement;
    protected tr: HTMLElement;
    // protected span: HTMLElement
    // protected label: HTMLElement
    // protected input: HTMLInputElement;
    protected search: boolean = false;
    protected sort: boolean = false;
    protected length: number = 0;
    protected width: number = 0;
    protected horv: number = 0
    protected caption = "";
    constructor(tableForm: HTMLTableElement,formtable: HTMLTableElement, options: FormOptions){

        this.options = options;
        if (this.options.names == null) this.options.names = {};
        if (this.options.classes == null) this.options.classes = {};
        
        if(this.tableForm == null) this.tableForm = document.createElement("table");
     
        tableForm.appendChild(this.tableForm)
        if(this.form == null) this.form = document.createElement("form");
        if(this.options.names.search == null) this.options.names.search = "search";
        if(this.options.names.sort == null) this.options.names.sort = "sort";
        if(this.options.names.horv == null) this.options.names.horv = "horv";
        if (this.options.classes.length == null) this.options.classes.length = "length";
        if (this.options.classes.width == null) this.options.classes.width = "width";
        if (this.options.classes.form == null) this.options.classes.form = "forms";
        if (this.options.classes.caption == null) this.options.classes.caption = "caption";
        if (this.options.classes.horizontal == null) this.options.classes.horizontal = "horizontal";
        if (this.options.classes.vertical == null) this.options.classes.vertical = "vertical";


        this.tableForm.classList.add(this.options.classes.form)
       
        this.formtable = formtable;
        this.update({...options})
    }
    handleEvent(e: Event): void {
        let data = e.target as HTMLTextAreaElement;
        if(e.type == "click"){
          

            if(data.value == "create"){
            if(this.formtable.firstChild){
                console.log(this.formtable.firstChild)
                this.formtable.removeChild(this.formtable.firstChild)
            }
             new CreateTable(this.formtable,{
                 sizeofTable: [this.width,this.length],
                 captionoftable: this.caption,
                 headingVeorHor:this.horv,
                 contenttable:this.tableJson,
                 searchtable:this.search,
                 sorttable:this.sort
             }).create() as string
            }
            if(data.value == "add"){
             
                this.createcontent(this.width,this.length)
            }
        }
        if(e.type == "change"){
            
            if(e.target){
                if(data.id == this.options.classes?.horizontal && data.name == this.options.names?.horv) this.horv = 0; 
                else if(data.id == this.options.classes?.vertical && data.name == this.options.names?.horv) this.horv = 1;
                
                if(data.id== "on" && data.name == this.options.names?.search)this.search = true;
                else if(data.id== "off" && data.name == this.options.names?.search) this.search = false;
                
                if(data.id== "on" && data.name == this.options.names?.sort)this.sort = true;
                else if(data.id== "off" && data.name == this.options.names?.sort) this.sort = false;
            }
        }

       if(e.type == "keyup")
       {
           if(e.target)
           {
          
                let data =  e.target as HTMLTextAreaElement;
                if(data.name === this.options.classes?.length){ 
                    this.length = Number(data.value) 
                }
                else if(data.name === this.options.classes?.width) {
                   
                    this.width = Number(data.value)
                } else if(data.name == this.options.classes?.caption){
                   this.caption =  data.value
                }
            
                if(data.id && data.id !== "bredde" && data.id !== "længde"){
                    let c = data.id.split(",")
                    let x = Number(c[0]);
                    let y = Number(c[1]);

                if(data.name == "heading") this.tableJson[y].heading = data.value
                else if(data.name == "data") this.tableJson[y].data[x-1] = data.value
                else console.log("something went wrong")
                }
            }
       }
    }

    createcontent(length: number,width:number): void
    {
        const form_data_table = document.createElement("table")
        if(this.tableForm.lastChild?.nodeName.toLocaleLowerCase() == "table")
        {
         this.tableForm.removeChild(this.tableForm.lastChild)  
        }
         
         for (let i = 0; i < length; i++)
        {
 
             this.tr = document.createElement("tr");
             this.td = document.createElement("th");
             let classname = "";
             if(i == 0)
             {
                 this.td.textContent = "heading: "; 
                 classname = "heading"} 
             else
             {    this.td.textContent = "data: "; 
                  classname = "data"
             }
         
             this.tr.appendChild(this.td)
          
             for(let j = 0; j < width; j++)
             {
                 this.td = document.createElement("td");
 
                    let input = createNode("input",
                    {
                        type:"text",
                        size: 3,
                        id: i + "," + j,
                        name: classname,
                    }) as HTMLInputElement

                 input.addEventListener("keyup", this)
                 this.td.appendChild(input)
                 this.tr.appendChild(this.td)
             }
            
             form_data_table.appendChild(this.tr)
         }

        
        this.tableJson = new Array(length)
         for (let i = 0; i < width; i++) {

            this.tableJson[i] = {heading: "", data: []};
         }

         
         this.tableForm.append(form_data_table)
 
       
 
     }

    set contentforms(value: FormEntry[]){
        this.data = value;
    }

    set heading(value: any){
       this.contentheading = value;
    }



    headingcontent(value: any): void{
        this.tr = document.createElement("tr");
        this.td = document.createElement("th");
        this.td.textContent = value;
        this.tr.appendChild(this.td)
        this.tableForm.appendChild(this.tr)
    }


    create(): string
    {
    
        if(this.contentheading){
            this.headingcontent(this.contentheading)
        }
       this.entryTable(this.data);
      

       let submit = createNode("input",{
        type: "submit",
        value:"create",
        class:"btn btn-white button"
    }) as HTMLInputElement

       submit.addEventListener("click",this)

       this.td = document.createElement("td")
       this.td.appendChild(submit)
       this.tr = document.createElement("tr")
       this.tr.appendChild(this.td)
       this.tableForm.appendChild(this.tr)
      
       return this.tableForm.outerHTML;
    }

    entryTable(value: FormEntry[]) : HTMLElement{
        for (let index = 0; index < value.length; index++) {

            this.tr = document.createElement("tr")
            
            let contest = this.content(value[index],this.td);


            this.tr.appendChild(contest)
      
            this.tableForm.appendChild(this.tr)
        }
       
        return this.tableForm
    }

    

    content(value:FormEntry,td:HTMLElement): Node{
        td = document.createElement("td");

        let span = createNode("span",{
            class:"label"
        })
        span.textContent = value.text + ": ";

        td.appendChild(span)

        if(value.choice)
        {
            for (let index = 0; index < value.choice.length; index++) 
            {
                        
                const label = createNode("label", {
                    for: value.choice[index].label
                   
                }) as HTMLLabelElement;

                const input = createNode("input", {
                    type: value.choice[index].type,
                    size: 2,
                    name: value.choice[index].name,
                    id: value.choice[index].label
                }) as HTMLInputElement;
          
               if(label.htmlFor == this.options.classes?.horizontal) input.checked = true;
               
                value.choice[index].type !== "radio" 
                ?  label.textContent = value.choice[index].label.substring(0,1).toUpperCase() + ": " 
                : label.textContent = " " + value.choice[index].label + ": "
              
                input.addEventListener("keyup",this)
                input.addEventListener("change",this)
               
                td.appendChild(label)
                td.appendChild(input)

                if(value.choice[index].name == this.options.classes?.length && value.button){

                    const add = createNode("input",{
                        type: "submit",
                        value:"add",
                        class:"btn btn-white"
                    })

                    td.appendChild(add)
                    add.addEventListener("click", this)
                }
            }
        }
         else 
        {   

            const input = createNode("input", 
            {
                type: value.type,
                name: value.name

            });
            input.addEventListener("keyup",this)
            td.appendChild(input)

        }
        return td
    }

    update(options: FormOptions) : void
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key as keyof CreateForms] = value;
        })
    }
}


function createNode(node: string, attributes: any){
    const el = document.createElement(node);
    for(let key in attributes){
        el.setAttribute(key, attributes[key]);
    }
    return el;
}
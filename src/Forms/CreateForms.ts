


 import { TableOptions } from "../Table/interface/TableOptions";
import { FormEntry } from "./interface/FormEntry";
import {FormOptions} from "./interface/FormOptions";
import { CreateTable } from "../Table/CreateTable.js";
import { TableEntry } from "../Table/interface/TableEntry"







export class CreateForms implements EventListenerObject
{


    private options:FormOptions = {};

    protected tableArray: Array<Array<String>>;
    protected tableJson: TableEntry[];

    private tableForm: HTMLTableElement;

    
    private form: HTMLFormElement;
    protected contentheading: HTMLElement;
    private formtable: HTMLTableElement
    protected data: FormEntry[]
    protected td: HTMLElement
    protected tr: HTMLElement
    protected span: HTMLElement
    protected label: HTMLElement
    protected input: HTMLInputElement;

    protected length: number = 0;
    protected width: number = 0;
    protected horv: number = 0
    protected caption = "";
    constructor(tableForm: HTMLTableElement,formtable: HTMLTableElement, options: FormOptions){

        this.options = options;
        if (this.options.classes == null) this.options.classes = {};
        if(this.tableForm == null) this.tableForm = document.createElement("table");
     
        tableForm.appendChild(this.tableForm)
        if(this.form == null) this.form = document.createElement("form");

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
                this.formtable.removeChild(this.formtable.firstChild)
            }

            for (let i = 0; i < this.tableArray.length; i++) {
              for (let j= 0; j< this.tableArray[i].length; j++) {
                  
                  this.tableJson =
              }
                
            }
             new CreateTable(this.formtable,{
                 sizeofTable: [this.width,this.length],
                 captionoftable: this.caption,
                 headingVeorHor:this.horv,
                 contenttable:this.tableJson
                 
             }).create()
            }
            if(data.value == "add"){
             
                this.createcontent(this.width,this.length)
            }
        }
        if(e.type == "change"){
            if(e.target){
             
                if(data.id == this.options.classes?.horizontal) this.horv = 0;
                else if(data.id == this.options.classes?.vertical) this.horv = 1;
            
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

                    console.log(x)
                    console.log(y)

                    this.tableArray[x][y] = data.value
                    console.log(this.tableArray)
                    // this.tableJson = this.tableArray
                }
              
            }
       }
    }

    createcontent(length,width){
        const form_data_table = document.createElement("table")
        if(this.tableForm.lastChild?.nodeName == "TABLE"){
 
         this.tableForm.removeChild(this.tableForm.lastChild)
           
        }
         
         for (let i = 0; i < length; i++) {
 
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
 
                    let input = createNode("input",{
                        type:"text",
                        size: 3,
                        id: i + "," + j,
                    }
                  
                 )
                 input.addEventListener("keyup", this)
                 this.td.appendChild(input)
                 this.tr.appendChild(this.td)
             }
            
             form_data_table.appendChild(this.tr)
         }

         this.tableArray = new Array(length)

         for (let index = 0; index < length; index++) {
            
             this.tableArray[index] = new Array(width)
         }
         this.tableForm.append(form_data_table)
 
       
 
     }

    set contentforms(value: FormEntry[] ){
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
       this.createformstable(this.data);
      

       let submit = createNode("input",{
        type: "submit",
        value:"create",
        class:"btn btn-white button"
    })

       submit.addEventListener("click",this)

       this.td = document.createElement("td")
       this.td.appendChild(submit)
       this.tr = document.createElement("tr")
       this.tr.appendChild(this.td)
       this.tableForm.appendChild(this.tr)
      
       return this.tableForm.outerHTML;
    }

    createformstable(value: FormEntry[]) : HTMLElement{
     
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
                   
                });

                const input = createNode("input", {
                    type: value.choice[index].type,
                    size: 2,
                    name: value.choice[index].name,
                    id: value.choice[index].label
                });
          
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
            type: "text",
            name: value.name
            });
            input.addEventListener("keyup",this)
            td.appendChild(input)

        }
        return td
    }

    update(options: FormOptions)
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key as keyof CreateForms] = value;
        })
    }
}


function createNode(node: any, attributes: any){
    const el = document.createElement(node);
    for(let key in attributes){
        el.setAttribute(key, attributes[key]);
    }
    return el;
}
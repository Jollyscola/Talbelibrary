
 import { CreateForms } from './Forms/CreateForms.js';
 import { FormEntry  } from './Forms/interface/FormEntry';
import { CreateTable } from './Table/CreateTable.js';
// import {test} from './Table/test.js'
import { TableEntry} from './Table/interface/TableEntry'

let table  = document.querySelector(".table")! as HTMLTableElement;



let contestform  = document.querySelector(".contestform")! as HTMLTableElement;
let form  = document.querySelector("form")! as HTMLFormElement;
let formtable  = document.querySelector(".formtable")! as HTMLTableElement;




export class Test{
    constructor(){
    }

    tablejson: TableEntry[] =  
    [{
        heading: "first",
       data: ["Hans", "Gustav", "Pluto"]
   },{
        heading: "last",
       data:["Brain", "Davs"]
   },{
           heading: "address",
           data:["Vestebro","Nørreport","Københavnsvej"]
   }];


   formsjson: FormEntry[] = [{
       text:"Bredde/længde",
       choice: 
       [
        {label: "bredde",type:"text",name:"width"},
        {label: "længde",type:"text", name:"length"}
       ],
       button: true
       
   },{
    text:"overskrift",
    name:"caption"
   },
    {
        text: "horisontalt eller vertikal",
        choice: 
        [
            {label: "horizontal",type:"radio",name:"horv"},
            {label: "vertical",type:"radio",name:"horv"}
        ],
        button: false
    }
    ]

   table(){  
    return new CreateTable(table,{
        captionoftable: "Table", 
        sizeofTable: [5,8],
        headingVeorHor: 0,
        contenttable: this.tablejson,
        sorttable: true,       
        searchtable: true, 
   }).create()
   }


   createforms(){

    return new CreateForms(contestform,formtable,{
        contentforms: this.formsjson,
        heading: "Create Forms"
       }).create()  
    }
}






new Test().table();
new Test().createforms();
















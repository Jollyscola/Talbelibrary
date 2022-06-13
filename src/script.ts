
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
        heading: "Firsname",
       data: ["Jens", "Alexander ", "Laika"]
   },{
        heading: "Lastname",
       data:["Hansen", "Skarsgård"]
   },{
           heading: "Address",
           data:["Vestebro","Nørrebro","Østerbro"]
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
    name:"caption",
    type:"text"
   },
    {
        text: "horisontalt eller vertikal",
        choice: 
        [
            {label: "horizontal",type:"radio",name:"horv"},
            {label: "vertical",type:"radio",name:"horv"}
        ],
        button: false
    },{
        text:"search on or off",
        choice: 
        [
            {label: "on",type:"radio",name:"search"},
            {label: "off",type:"radio",name:"search"}
        ],
        name:"search",
        button: false
    }
    ,{
        text:"sort on or off",
        choice: 
        [
            {label: "on",type:"radio",name:"sort"},
            {label: "off",type:"radio",name:"sort"}
        ],
        name:"sort",
        button: false
    }
    ]

   table(){  
    return new CreateTable(table,{
        captionoftable: "Table Setup", 
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
















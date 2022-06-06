
 import { CreateForms } from './Forms/CreateForms.js';
import { CreateTable } from './Table/CreateTable.js';
// import {test} from './Table/test.js'


let table  = document.querySelector(".table")! as HTMLTableElement;



let contestform  = document.querySelector(".contestform")! as HTMLTableElement;
let form  = document.querySelector("form")! as HTMLFormElement;
let formtable  = document.querySelector(".formtable")! as HTMLTableElement;




export class Test{
    constructor(){
    }
    headline: "Table";

    tablejson =  
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


   formsjson = [{
       text:"Bredde/længde",
       choice: [{label: "bredde",type:"text",name:"width"},{label: "længde",type:"text", name:"length"}],
       button: true
       
   },{
    text:"overskrift",
    name:"caption"
   },
    {
        text: "horisontalt eller vertikal",
        choice: [{label: "horizontal",type:"radio",name:"horv"},{label: "vertical",type:"radio",name:"horv"}],
        // label: "headingVeorHor"
        button: false
    }
    ]

   table(){  
       console.log("hello")
    return new CreateTable(table,{
        captionoftable: "Table", 
        sizeofTable: [5,8],
        headingVeorHor: 0,
        contenttable: this.tablejson,
        sorttable: true,       
        searchtable: false, 
   }).create()
   }

//    createtable(){



//        form.addEventListener("submit",event => {
   
//            event.preventDefault()
//            if(contestform.firstChild){
//             contestform.removeChild(contestform.firstChild)
//             }
//            return new CreateTable(contestform,
//             {
//             sizeofTable: [form["bredde"].value,form["længde"].value],
//             captionoftable: form["overskrift"].value}
//             ).create()
//      })
//     }

   createforms(){

    return new CreateForms(contestform,formtable,{
        contentforms: this.formsjson,
        heading: "Create Forms"
       }).create()
    
     
       
    }
}






new Test().table();
new Test().createforms();
//  new Test().createtable();

















 import { CreateForms } from './Forms/CreateForms.js';
import { CreateTable } from './Table/CreateTable.js';
// import {test} from './Table/test.js'


let table  = document.querySelector(".table")! as HTMLTableElement;
let contestform  = document.querySelector(".contestform")! as HTMLTableElement;
let form  = document.querySelector("form")! as HTMLFormElement;



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
       label: "sizeofTable"
   },{
    text:"overskrift",
    label: "captionoftable"
   },
    {
        text: "horisontalt eller vertikal",
        label: "headingVeorHor"
    }
    ]

   table(){  
    return new CreateTable(table,{
        captionoftable: "table", 
        sizeofTable: [5,5],
        headingVeorHor: 0,
        headingisrow: 0,
        contenttable: this.tablejson,
        sorttable: true,       
        searchtable: true,
     
   }).create()
   }

   createtable(){
        console.log(form)
       console.log(form["bredde"].value)
      
       
       form.addEventListener("submit",event => {
   
           event.preventDefault()
           console.log(contestform)
           if(contestform.firstChild){
            contestform.removeChild(contestform.firstChild)
            }
           return new CreateTable(contestform,{
            sizeofTable: [form["bredde"].value,form["længde"].value],
            captionoftable: form["overskrift"].value

       }).create()
     })
     
    }

    
    submit_form(e){
        e.preventdeafult
        console.log("hello")
    }
   

   createforms(){
       return new CreateForms({
        contentforms: this.formsjson,
        heading: "hello"
       }).create()
   }




}

new Test().table();

new Test().createtable()
















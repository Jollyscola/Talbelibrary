


 import {FormOptions} from "./interface/FormOptions";








export class CreateForms
{


    private tableElem : HTMLTableElement;
    private options:FormOptions;
    constructor(options: FormOptions){
        this.options = options;
        if (options == null) this.options
        if(this.tableElem == null) this.tableElem = document.createElement("table");
        this.update({...options})
    }


    set contentforms(value: {label:string, text:string}[]  ){
        this.formstable(value);
    }

    set heading(value: any){
        console.log(value);
    }
    create(): string{
        console.log("hello")
        return "hello"
    }

    formstable(value: {label:string, text:string}[]) :void{
        console.log(value);
    }

    update(options: FormOptions)
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key as keyof CreateForms] = value;
        })
    }
}
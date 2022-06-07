




export interface FormEntry{
    label?:string;
    choice?:[{
        label:string;
        type:string;
        name:string;
    },{
        label:string;
        type:string;
        name:string;
    }];
    button?:boolean;
    text:string;
    name?:string;
}
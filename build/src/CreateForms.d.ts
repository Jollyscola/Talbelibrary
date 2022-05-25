import { FormOptions } from "./interface/FormOptions";
export declare class CreateForms {
    private tableElem;
    private options;
    constructor(options: FormOptions);
    set contentforms(value: {
        label: string;
        text: string;
    }[]);
    set heading(value: any);
    create(): string;
    formstable(value: {
        label: string;
        text: string;
    }[]): void;
    update(options: FormOptions): void;
}

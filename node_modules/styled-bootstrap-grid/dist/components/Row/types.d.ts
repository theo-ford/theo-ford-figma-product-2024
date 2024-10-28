import { Align } from '../Col';
export declare type Justify = 'start' | 'end' | 'center' | 'between' | 'around';
export declare type RowProps = {
    alignItems?: Align;
    smAlignItems?: Align;
    mdAlignItems?: Align;
    lgAlignItems?: Align;
    xlAlignItems?: Align;
    justifyContent?: Justify;
    smJustifyContent?: Justify;
    mdJustifyContent?: Justify;
    lgJustifyContent?: Justify;
    xlJustifyContent?: Justify;
};
export declare type RowCss = {
    alignItems: {
        [K in Align]: string;
    };
    justifyContent: {
        [K in Justify]: string;
    };
};

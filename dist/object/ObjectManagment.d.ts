import { frame } from '../entities/form/frame';
import { fragmentField } from './ObjectAliases';
export declare let managmentObject: {
    frame: {
        initObjects: (frames: frame[]) => void;
        configFieldBlock: (frame: frame) => void;
        addLine: (frame: frame) => void;
    };
    field: {
        type: (identityField: string) => string;
    };
    object: {
        field: {
            convertAliasToIdenty: (config: string) => string;
            setValueContextAlias: (config: string, value: any) => void;
            setValueContextIdentity: (identity: string, type: string | string[2], value: any) => void;
        };
        object: {
            objectFull: () => any;
            objectSeparate: () => any;
            objectUnique: (alias: string) => any;
            objectUniqueLine: (alias: string, line: number) => any;
            count: (identity: string) => number;
            removeLine: (identity: string, line: number) => void;
            getPropert: (config: string) => any;
        };
    };
    fragment: {
        getFragmentForIdentity: (identity: string) => fragmentField;
        removeFragmentsLine: (objectIDentity: string, line: number) => void;
        removeFragment: (identity: string) => void;
    };
};

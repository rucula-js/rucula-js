import { frame } from '../entities/form/frame';
import { window } from '../entities/form/window';
export declare let configWindow: {
    set: (window: window) => void;
    get: () => window;
    frame: {
        get: (identity: string) => frame;
    };
};

import { enviroment } from './entities/Enviroments';
import { globalConfiguration } from './entities/GlobalConfiguration';
import { localization } from './entities/Localization';
export declare let ruculaGlobal: {
    initGlobalConfiguration: (config: globalConfiguration) => void;
    setLocalization: (locales?: string | number) => void;
    setEnviroment: (enviroment?: string | number) => void;
    getEnvironment: () => enviroment;
    getLocalization: () => localization;
    getConfigurationGlobal: () => globalConfiguration;
};

import { enviroment } from "./Enviroments";
import { localization } from "./Localization";

export interface globalConfiguration{
    localizations:localization[];
    environments:enviroment[];
    chosenLocalization:localization;
    chosenEnvironment:enviroment;
}
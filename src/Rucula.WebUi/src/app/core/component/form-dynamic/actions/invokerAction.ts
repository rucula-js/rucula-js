import { commandAction } from "./commandAction";

export class invokerAction {
    
    private command!:commandAction;

    
    public SetCommmand(command:commandAction){
        this.command = command;
    }

    public ExecuteCommmand(){
        this.command.executecommand();
    }
}
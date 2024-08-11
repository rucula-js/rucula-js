import { managmentObject } from "./object/ObjectManagment";
import { paginationEvents } from "./pagination/pagination"
import { TableDependency } from "./table-dependency/TableDependency"

 
export let exportTableDependency = new TableDependency();
export let exportManagmentObject = managmentObject()
export let exportPaginationEvents = paginationEvents()



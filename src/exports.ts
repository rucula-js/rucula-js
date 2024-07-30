import { managmentObject } from "./object/ObjectManagment";
import { paginationEvents } from "./pagination/pagination"
import { tableDependency } from "./table-dependency/TableDependency"

 
export let exportTableDependency = tableDependency()
export let exportManagmentObject = managmentObject()
export let exportPaginationEvents = paginationEvents()



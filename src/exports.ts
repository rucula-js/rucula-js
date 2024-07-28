import { paginationEvents } from "./pagination/pagination"
import { tableDependency } from "./table-dependency/TableDependency"
import { urlManagment } from './URL/urlManagment';

 
export let exportTableDependency = tableDependency()
export let exportPaginationEvents = paginationEvents()
export let exportUrlManagment = urlManagment()



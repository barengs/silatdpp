type columnType<T> = {
    name: string,
    selector: (row: T) => unknown,
    sortable?: boolean
}


export function cleanColumnName(columnName: string): string {
    return columnName.split("_").map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(" ")
}


export function extractDataColumnName(data:  Record<string, string>[]): { columns: columnType<typeof data>[], value: typeof data} {
    if (data.length == 0) return {columns: [], value: []}

    return {columns: Object.keys(data[0]).map(colName => {return {name: cleanColumnName(colName), selector: (row: any) => row[colName], sortable: true}}), value: data}
}


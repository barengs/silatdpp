
export function cleanColumnName(columnName: string[]): string[] {
    return columnName.map(column => column.split("_").map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(" "))
}



export function extractDataColumnName(data:  Record<string, string>[]): { columns: string[], value: typeof data} {
    if (data.length == 0) return {columns: [], value: []}

    return {columns: Object.keys(data[0]), value: data}
}


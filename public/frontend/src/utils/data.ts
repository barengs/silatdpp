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


export function getDateTime(date_stamp: string) {
    const date = new Date(date_stamp)

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}


export function trimText(text: string, end=15) {
    return [text.substring(0, end), "..."].join("")
}
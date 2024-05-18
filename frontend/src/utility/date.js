import { parse, format, isValid } from 'date-fns';

export function parseAndFormatDate(dateStr) {
    const dateFormats = ['M/d/yy', 'M/d/yyyy', 'dd/MM/yy', 'dd/MM/yyyy', 'yyyy-MM-dd'];
    for (let f of dateFormats) {
        const date = parse(dateStr, f, new Date());
        if (isValid(date)) {
            return format(date, 'yyyy-MM-dd');
        }
    }
    return dateStr;  // Return original string if no formats matched
}

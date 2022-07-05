/**
 * converts date objects to date strings like '2011-10-05'
 */
export function extractDateStringFromDate(date: Date): string {
    console.log(`message date ${date} `);
    //const isoString = date.toISOString();
    var date=new Date();
    var today=new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(`message date today ${today} `);
    return today;
    //return isoString.slice(0, isoString.indexOf('T'));
}

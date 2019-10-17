export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let min = newDate.getMinutes();
    let seg = newDate.getSeconds();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date} ${hour}:${min}:${seg}`
    }
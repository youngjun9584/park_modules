export function setdateFormat(Time, format) 
{
    var dateTime = new Date(Time);
    if (format == 'HH:MM:SS') 
    {
        return pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2)
    } 
    else if (format == 'HH:MM') 
    {
        return pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2)
    } 
    else if (format == 'YYYY.MM.DD') 
    {
        return dateTime.getFullYear() + '.' + pad((dateTime.getMonth() + 1), 2) + '.' + pad(dateTime.getDate(), 2)
    } 
    else if (format == 'YYYY-MM-DD') 
    {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2)
    } 
    else if (format == 'YYYY-MM-DD HH:MM:SS') 
    {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2) + ' ' + pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2)
    }
    else if (format == 'YYYY-MM-DDTHH:MM:SS') 
    {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2) + 'T' + pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2)
    }
    else if (format == 'MM:SS') {
        return pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2)
    }
    else if (format == 'HH') 
    {
        return pad(dateTime.getHours(), 2)
    }
    else if (format == 'mm') 
    {
        return pad(dateTime.getMinutes(), 2)
    }  
    else if (format == 'MM') 
    {
        return pad((dateTime.getMonth() + 1), 2);
    }
    else if (format == 'DD') 
    {
        return pad(dateTime.getDate(), 2)
    }
    else if (format == 'SS') 
    {
        return pad(dateTime.getSeconds(), 2)
    }
    else if (format == 'lastDay') 
    {
        let lastDay = ( new Date( dateTime.getFullYear(), pad((dateTime.getMonth() + 1), 2), 0) ).getDate();
        return pad(lastDay, 2)
    }
}
//2020-11-16T23:24:06.993
export function setdateStartAndEnd(Time, format) 
{
    var dateTime = new Date(Time);
    if (format == 'startRecent') {
        dateTime.setMilliseconds(dateTime.getMilliseconds() - 60 * 60 * 1000)
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2)+'T' + pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2);
    } else if(format == 'endRecent') {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2)+'T' + pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2);
    }
    else if (format == 'startTime') 
    {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2)+'T00:00:00'
    } 
    else if (format == 'endTime') 
    {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(dateTime.getDate(), 2)+'T23:59:59'
    } 
    else if (format == 'startDay') 
    {
        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + '01'+'T00:00:00'
    } 
    else if (format == 'endDay') 
    {
        let lastDay = ( new Date( dateTime.getFullYear(), pad((dateTime.getMonth() + 1), 2), 0) ).getDate();

        return dateTime.getFullYear() + '-' + pad((dateTime.getMonth() + 1), 2) + '-' + pad(lastDay, 2)+'T23:59:59'
    } 
    else if (format == 'startMonth') 
    {
        return dateTime.getFullYear() + '-' + '01' + '-' + '01'+'T00:00:00'
    } 
    else if (format == 'endMonth') 
    {
        return dateTime.getFullYear() + '-' + '12' + '-' + '31'+'T23:59:59'
    } 

}


function pad(n, width) 
{
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
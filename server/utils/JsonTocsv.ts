export const JsonTocsv = (arr:any) =>{
    if(!arr[0])
        return ''
    let headers = Object.keys(arr[0]).map(header=>{
        return header
    })
    let csv = headers.join(',')
    csv += '\n'

    arr.forEach((obj:any)=>{
        let line = ''
        Object.keys(obj).forEach((key:string,index)=>{
            let value = String(obj[key]).replace(/(\r\n|\n|\r)/gm, "");
            value = value.replace(/(")/gm, "");
            line += `"${value}",`
        })
        line = line.substring(0,line.length - 1)
        csv += line + '\n'
    })

    return csv
}
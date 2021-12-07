export function csvToJson(csv:string) {
    var lines=csv.split("\n");

    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
    headers = headers.map((header:string) =>{return header.trim()})
  
    for(var i=1;i<lines.length;i++){
  
        var obj:any= {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            if(j === headers.length - 1){
                let text:any = currentline.splice(j)
                text = text.join(',')
                obj[headers[j]] = text
            }
            else
                obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return result; //JSON
}
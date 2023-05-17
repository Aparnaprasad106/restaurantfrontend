import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(resultArray:any[],searchTerm:string,propertyName:string): any[] {
    const result:any=[]
    if(!resultArray ||searchTerm=="" ||propertyName==""){
      return resultArray
    }
    resultArray.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}

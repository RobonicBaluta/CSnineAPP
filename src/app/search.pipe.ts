import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {

      if(it.displayName!='' && it.displayName!=null){

        return it.displayName.toLowerCase().includes(terms)
      }else if(it.name!='' && it.name!=null){
        return it.name.toLowerCase().includes(terms); 
      }else if(it.title!='' && it.title!=null){
        return it.title.toLowerCase().includes(terms);
      }else if(it.firstName!='' && it.firstName!=null){
        return it.firstName.toLowerCase().includes(terms);
      }else{
  
   
        return 'not found';
      }
      
    });
  }

}

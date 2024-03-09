
export function objectIsEqual(obj1:any, obj2:any) {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2);
    
    if (props1.length != props2.length) {
        return false;
    }
    
    for (var i = 0; i < props1.length; i++) {
        
      let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2);
        
        if (isObjects && !objectIsEqual(val1, val2) || !isObjects && val1 !== val2) {
            return false;
        }
    }
    function isObject(object:any) {
      return object != null && typeof object === 'object';
    }
    
    return true;
}
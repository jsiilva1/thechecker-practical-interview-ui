/**
 * Helper to get unique passed key of objects and avoid redundancies
 * 
 * @param arr (arr of object)
 * @param comp (key to avoid redundancy)
 * 
 * @return {*}
*/  
export const getObjectUnique = (arr, comp) => {
  const unique = 
    arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
};
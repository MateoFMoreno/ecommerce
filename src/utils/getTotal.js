export function getTotal(arr) {
    const array = [];
    arr.map((e) => array.push(e.price * e.cantidad));
    return array.reduce((a, c) => a + c);
}
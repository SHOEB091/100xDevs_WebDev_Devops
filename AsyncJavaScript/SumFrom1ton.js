function sum (n){
    let sum =0;
    for(let i=1;i<n;i++){
        sum = sum +i;
    }
    return sum;
}

let ans = sum(100);
console.log(ans);

let ctr =0;
//Updating the element 
function callback(){
    const el = document.querySelectorAll('h3')[1]
    el.innerHTML = ctr;
    ctr=ctr+1;
}


setInterval(callback, 2000);
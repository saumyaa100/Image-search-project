const accessKey='-FRpVpEhGhDKqG3JJRe_fbwjv61m_1T47gUmpUuK7y4'
const searchForm=document.querySelector('form');
const searchInput=document.querySelector('.search-input');
const imagesContainer=document.querySelector('.images-container');
const loadmorebtn=document.querySelector('.loadmorebtn');

let page =1;
const fetchImages= async (query,pageno)=>{
    // console.log(query);
    try{
    if(pageno===1)
    imagesContainer.innerHTML='';
    // taaki no images to show remove ho jaye jab enter press kare
    const url=`https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageno}&client_id=${accessKey}`;

const response=await fetch(url);
const data=await response.json();
// console.log(data);
//async--side by side ye chta rahe aur rest codes bhi chalte rahe

if(data.results.length>0){
data.results.forEach(photo=>{

    //creating image div
    const imageElement=document.createElement('div');
    imageElement.classList.add('imageDiv');
    imageElement.innerHTML=`<img src="${photo.urls.regular}"/>`;

    //creating overlay
    const overlayElement=document.createElement('div');
    overlayElement.classList.add('overlay');

    //creating overlay text 
    const overlaytext=document.createElement('h3');
    overlaytext.innerText=`${photo.alt_description}`;

    overlayElement.appendChild(overlaytext);
    imageElement.appendChild(overlayElement);

    imagesContainer.appendChild(imageElement);

})

if(data.total_pages===pageno){
    loadmorebtn.style.display="none";
}
else{
    loadmorebtn.style.display="block";

}
}
else{
    imagesContainer.innerHTML=`<h2>No image found</h2>`

}
}
catch(error){
    imagesContainer.innerHTML=`<h2>Failed to fetch images.Try again</h2>`
  if(loadmorebtn.style.display==="block"){
    loadmorebtn.style.display==="none";
  }
}
}




//on submitting the form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();  //to prevent from auto submitting and get what we write on input on console
//   console.log(searchInput.value);
const inputText=searchInput.value.trim();
if(inputText!=''){
    page=1;
    fetchImages(inputText,page);
}
else
   imagesContainer.innerHTML=`<h2>Please enter a search query</h2>`
})


//for load more function
loadmorebtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(),++page)
})
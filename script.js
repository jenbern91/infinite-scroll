const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
//const count = 30;
//const apiKey = '7TXaRwgXaNkTRo8c6w2A2zCF5SusAnj6qRJViCf8JQ4';
//const apiKey = 'ThZUG-uRruPZAng9c-EE20A1tz4yk2X-VX3wSDayHII';
const apiKey = 'FaEWxd5y66PaQeZAdT6fF6J8GyLMNkPgFHD_WLqP2fc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    //console.log('image loaded');
    imagesLoaded++;
    //console.log(imagesLoaded);

    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        //console.log('ready', ready);
    }
}

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //console.log('total images', totalImages);

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    //  Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item,{
    href: photo.links.html,
    target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    // Put <img> inside <a>, then put both inside imageContainer element
    setAttributes(img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
        });

    //Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
   
    item.appendChild(img);
    imageContainer.appendChild(item);


    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error){
        //Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    //console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    //    console.log('window.innerHeight:', window.innerHeight);
    //    console.log('window.scrollY:', window.scrollY);
    //    console.log('window.innerHeight + scrollY:', window.scrollY + window.innerHeight);
    //    console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);
       //console.log ('load more');
    }

});

// On Load
getPhotos();


// old code
// async function getPhotos(){
//     try{

//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log(data);

//     } catch (error){
       
//     }
// }
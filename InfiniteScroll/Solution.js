const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
const testimonialContainer = document.getElementById('testimonial-container'); 

const limit = 5; 
let after = null; 
let canLoadMore = true; 

//get url
const getUrl = () => 
  {
    const url = new URL(API_BASE_URL); 
    url.searchParams.append('limit', limit); 
    if (after != null) url.searchParams.append('after', after); 
    return url; 
  }

//append testimonial to the dom
const appendTestimonialToDOM = (message) => 
  {
    const div = document.createElement('div'); 
    div.innerText = message; 
    div.classList.add('testimonial'); 
    testimonialContainer.appendChild(div); 
    
  }; 

//append multiple testimonials to the dom
const appendManyTestimonialsToDOM = (testimonials) => 
  {
    const length = testimonials.length; 
    for (let i = 0; i < length; i++)
      {
        const {message, id} = testimonials[i]; 
        appendTestimonialToDOM(message); 
        if (i == length - 1) after = id; 
      } 
  }; 

//handle input scroll event
async function handleScroll()
  {
    if (!canLoadMore) return; 

    const scrollValue = this.scrollHeight - this.scrollTop - this.clientHeight; 
    if (scrollValue > 0) return; 

    canLoadMore = false; 

    const url = getUrl();
    const res = await fetch(url); 
    const {testimonials, hasNext} = await res.json(); 

    appendManyTestimonialsToDOM(testimonials); 

    canLoadMore = hasNext;      
  }; 

handleScroll(); 
testimonialContainer.addEventListener('scroll', handleScroll); 
// Write your code here.

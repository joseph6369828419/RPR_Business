const headerE1 = document.querySelector('.header');

window.addEventListener('scroll', ()=>{
  if (window.scrollY > 50) {
    headerE1.classList.add('header-scrolled')
  }
  else if(window.scrollY <= 50) {
    headerE1.classList.remove('header-scrolled')
  }

});


 //CAREER FILD

 var imagevisable = false;
function Visable2(){
    var img = document.getElementById("imgcer3");
    imagevisable = !imagevisable;

    if (imagevisable) {
        img.src="cer4.jpeg";
        img.style.display = "block";
    }
    else{
        img.style.display = "none";
    }
} 


function toggleMenu() {
  let navigation = document.querySelector('.navigation');
  let toggle = document.querySelector('.toggle');
  navigation.classList.toggle('active');
  toggle.classList.toggle('active');
}


function init(){
    const slides=document.querySelectorAll(".slide");
    const pages=document.querySelectorAll(".page");
    const backgrounds =[`radial-gradient(#C1CCF2,#060B20)`,`radial-gradient(#959596,#303132)`,`radial-gradient(#960811,#0D1531)`];

    //Tracker
    let current=0;
    let scrollSlide=0;

    slides.forEach((slide,index)=>{
        slide.addEventListener('click',function(){
            changeDots(this);
            nextSlide(index);
            scrollSlide=index;
        });
    });



    function changeDots(dot){
        slides.forEach(slide=>{
            slide.classList.remove("active");
        });
        dot.classList.add("active");
        };

    function nextSlide(pageNumber){
        const nextPage=pages[pageNumber];
        const currentPage=pages[current];
        const nextLeft=nextPage.querySelector('.hero .izquierda');
        const nextRight =nextPage.querySelector('.hero .derecha');
        const currentLeft= currentPage.querySelector('.hero .izquierda');
        const currentRight =currentPage.querySelector('.hero .derecha');
        const contenedor =document.querySelector(".contenedor");

        const tl= new TimelineMax();
        tl.fromTo(currentLeft,0.3,{y:'-10%'},{y:"-100%"}).fromTo(currentRight,0.3,{y:'10%'},{y:"-100%"},"-=0.2")
        .to(contenedor,0.3,{backgroundImage:backgrounds[pageNumber]})
        .fromTo(
            currentPage,
            0.3,
            {opacity:1,pointerEvents:"all"},
            {opacity:0, pointerEvents:"none"})
        .fromTo(nextPage,0.3,{opacity:0 ,pointerEvents:"none"},{opacity:1,pointerEvents:"all"})
        .fromTo(nextLeft,0.3,{y:"-100%"},{y:"-10%"},"-= 0.6")
        .fromTo(nextRight,0.3,{y:"-100%"},{y:'10%'},"-=0.8")
        .set(nextLeft,{clearProps:'all'})
        .set(nextRight,{clearProps:"all"});
        current=pageNumber;
    };
    
document.addEventListener('wheel',throttle(scrollChange,1500));
document.addEventListener('touchmove',throttle(scrollChange,1500));

function switchDots(dotNumber){
    const activeDot=slides[dotNumber];
    slides.forEach(slide=>{
        slide.classList.remove("active");
    })
    activeDot.classList.add("active");
};


function scrollChange(e){
    if(e.deltaY>0){
        scrollSlide+=1;
    }
    else{
        scrollSlide-=1;
    }
    if(scrollSlide>2){
        scrollSlide=0;
    }
    if(scrollSlide<0){
        scrollSlide=2;
    }
    nextSlide(scrollSlide);
    switchDots(scrollSlide);
}
    const menu= document.querySelector(".menu");
    const lineas= document.querySelectorAll(".menu line");
    const navOpen=document.querySelector(".nav-open");
    const contact=document.querySelector(".contact");
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const tl =new TimelineMax({paused:true,reversed:true});
    tl.to(navOpen,0.5,{y:0})
    .fromTo(contact,0.5,{opacity:0,y:10},{opacity:1,y:0},'-=0.1')
    .fromTo(social,0.5,{opacity:0,y:10},{opacity:1,y:0},'-=0.5')
    .fromTo(logo,0.2,{color:'white'},{color:'black'},'-=1')
    .fromTo(lineas,0.2,{stroke:"white"},{stroke:"black"},'-=1');
    
    menu.addEventListener("click",()=>{
        tl.reversed()? tl.play():tl.reverse();
    });

};


function throttle (fun, limit){
    let inThrottle;
    return function(){
        const args= arguments;   
        const context =this;
        if(!inThrottle){
            fun.apply(context,args);
            inThrottle=true;
            setTimeout(()=>(inThrottle=false),limit);
        }  
    }
};


init()
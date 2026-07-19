let menuVisible = false;

function mostrarOcultarMenu(){ 
    const nav = document.getElementById("nav");
    const icono = document.querySelector("#botonMenu i");
    if(menuVisible){
        nav.classList = "";
        icono.classList = "fa-solid fa-bars";
        menuVisible = false;
    }else{
        nav.classList = "responsive";
        icono.classList = "fa-solid fa-xmark";
        menuVisible = true;
    }
}

function seleccionar(){
    const nav = document.getElementById("nav");
    const icono = document.querySelector("#botonMenu i");
    nav.classList = "";
    if(icono){ icono.classList = "fa-solid fa-bars"; }
    menuVisible = false;
}

document.getElementById("botonMenu")?.addEventListener("keydown", function(e){
    if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        mostrarOcultarMenu();
    }
});


const headerPrincipal = document.getElementById("headerPrincipal");
function actualizarHeader(){
    if(!headerPrincipal) return;
    if(window.scrollY > 40){
        headerPrincipal.classList.add("con-sombra");
    }else{
        headerPrincipal.classList.remove("con-sombra");
    }
}

const seccionesNav = document.querySelectorAll("section[id], div.curriculum[id]");
const enlacesNav = document.querySelectorAll("#nav a[data-nav]");

const observerNav = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            const id = entrada.target.getAttribute("id");
            enlacesNav.forEach((enlace) => {
                enlace.classList.toggle("activo", enlace.getAttribute("data-nav") === id);
            });
        }
    });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

seccionesNav.forEach((seccion) => observerNav.observe(seccion));

const elementosReveal = document.querySelectorAll(".reveal");
const observerReveal = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            entrada.target.classList.add("visible");
            observerReveal.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

elementosReveal.forEach((el) => observerReveal.observe(el));

document.querySelectorAll(".interes").forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
        tarjeta.classList.toggle("girado");
    });
});

const frasesTerminal = [
    "Ingeniero en Sistemas de Información",
    "Administrador de Bases de Datos",
    "Entusiasta de Linux & Oracle"
];

function efectoEscritura(elemento, frases){
    if(!elemento) return;
    let indiceFrase = 0;
    let indiceLetra = 0;
    let borrando = false;

    function tick(){
        const fraseActual = frases[indiceFrase];

        if(!borrando){
            indiceLetra++;
            elemento.textContent = fraseActual.slice(0, indiceLetra);
            if(indiceLetra === fraseActual.length){
                borrando = true;
                setTimeout(tick, 1600);
                return;
            }
        }else{
            indiceLetra--;
            elemento.textContent = fraseActual.slice(0, indiceLetra);
            if(indiceLetra === 0){
                borrando = false;
                indiceFrase = (indiceFrase + 1) % frases.length;
            }
        }
        setTimeout(tick, borrando ? 35 : 65);
    }
    tick();
}

efectoEscritura(document.getElementById("terminalTexto"), frasesTerminal);

const anioActual = document.getElementById("anioActual");
if(anioActual){ anioActual.textContent = new Date().getFullYear(); }


window.onscroll = function(){
    actualizarHeader();
};

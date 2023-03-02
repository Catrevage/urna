let SeuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector(".d-1-2 span");
let numeros = document.querySelector(".d-1-3");
let descricao = document.querySelector(".d-1-4");
let avisos = document.querySelector(".d-2");
let esquerdo = document.querySelector(".d-1--esquerdo");
let direito = document.querySelector(".d-1--direito");
let fim = document.querySelector(".fim")

let etapaAtual = 0;
let numero = '' 
let votoBranco = true;
let votos = [];

function beginEtapa(){
    
    let etapa = etapas[etapaAtual]; 
    let numerohtml = '';
    votoBranco = true;

    for (let i=0; i < etapa.numeros; i++){
        if (i === 0) {
            numerohtml += '<div class="numeros pisca"></div>';    
        } else{
            numerohtml += '<div class="numeros "></div>';
        }
    }

    SeuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.cargo;
    descricao.innerHTML = '';
    avisos.style.display = 'none';
    direito.style.display = 'none';
    numeros.style.display = 'flex';
    numeros.innerHTML = numerohtml;


}

function refreshTela() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidates.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        match = candidato[0]
        SeuVotoPara.style.display = 'block';
        SeuVotoPara.innerHTML = 'SEU VOTO PARA';
        if (etapaAtual === 1) {
            descricao.innerHTML = `Nome: ${match.nome} <br> Vice-Preceito: ${match.vice}<br>Partido: ${match.partido}`;

        } else {
            descricao.innerHTML = `Nome: ${match.nome} <br>Partido: ${match.partido}`;
        }
        avisos.style.display = 'block';
        direito.style.display = 'block';
        let fotohtml = '';
        for (let i in match.foto){
            fotohtml += `<div class="d-1-image"><img src="${match.foto[i].url}" alt="">${match.foto[i].legenda} </div>`

        }
        direito.innerHTML = fotohtml;
        


    }else {
        SeuVotoPara.style.display = 'block';
        descricao.innerHTML = "<span class='nulo'>VOTO NULO</span>";
        descricao.style.display = 'flex';
        avisos.style.display = 'block'

    }

}



function clicou(n){
    let elnumero = document.querySelector('.numeros.pisca');
    votoBranco =false;
    if (elnumero != null) {
        elnumero.innerHTML = n;
        numero += n;

        elnumero.classList.remove("pisca");

        if (elnumero.nextElementSibling != null){
            elnumero.nextElementSibling.classList.add('pisca');
        }else{
            refreshTela();
        }
        

    }
}

function branco() {    
    if (fim.style.display != 'block' && votoBranco) {
        numero = 'BRANCO';
        votoBranco = false;
        SeuVotoPara.style.display = 'block';
        numeros.style.display = 'none';
        descricao.style.display = 'flex';
        descricao.innerHTML =  "<span class='nulo'>VOTO BRANCO</span>";
        avisos.style.display = 'block'

    }
}

function corrige() {
    numero = '';
    votoBranco = true;
    beginEtapa();


}

function confirma() {
    let etapa = etapas[etapaAtual];
    if (!votoBranco && (etapa.numeros === numero.length) || (!votoBranco && numero === 'BRANCO')) {
        votos.push({cargo: etapa.cargo, voto: numero})
        if (etapaAtual === 0) {
            etapaAtual++;
            numero = '';
            beginEtapa();
        } else {
            SeuVotoPara.style.display = 'none';
            cargo.style.display = 'none';
            numeros.style.display = 'none';
            avisos.style.display = 'none';
            direito.style.display = 'none';
            descricao.innerHTML = '';
            fim.style.display = 'block';
            console.log(votos)        
            
    
        }
    } else {
        votoBranco = true;
        alert('VOCÊ PRECISA ESCOLHER UM CANDIDATO\nOU PREENCHER TODOS OS ALGARISMOS!');

    }
    
}

beginEtapa();
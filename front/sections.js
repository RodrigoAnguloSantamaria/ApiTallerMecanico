//const { JsonWebTokenError } = require("jsonwebtoken");

const allcoches$$ = document.querySelector(".allcoches");
const allservicios$$ = document.querySelector(".allservicios");
const addcoche$$ = document.querySelector(".addcoche");
// const moviebytittle$$ = document.querySelector(".moviebytitle");
const container$$ = document.createElement("div")
let numpagina=1;
let tipo="";
document.body.appendChild(container$$);



const getallcoches = async (page)=>{
    if (tipo != "coches"){numpagina=1}
    
    container$$.innerHTML="";
    let token = localStorage.getItem ("token");
    const call = await fetch(`http://localhost:5000/coches?page=${page}&limit=5`, {
        method: 'GET', // or 'PUT'
        body: JSON.stringify(), // data can be `string` or {object}!
        
        headers: { 'Authorization': 'Bearer '+ token}
      });
    const allcochesJson = await call.json();
    
    tipo="coches"
    printresults(allcochesJson,tipo)
  

}

const getallservicios = async (page)=>{
    if (tipo != "servicios"){numpagina=1}
    
    container$$.innerHTML="";
    let token = localStorage.getItem ("token");
    const call = await fetch(`http://localhost:5000/servicios?page=${page}&limit=5`, {
        method: 'GET', // or 'PUT'
       
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token,
        } 
        })
    const allserviciosJson = await call.json();
    tipo="servicios"
    
    printresults(allserviciosJson,tipo);

}
const printresults = (allJson,tipo)=>{
    console.log(tipo)
    if (tipo === "coches"){
        console.log(allJson)
        allJson.results.forEach(coche => {
            
            const item$$=document.createElement("section");
            item$$.className="item"
            //console.log(item$$)
            item$$.innerHTML=`<span style="width:20%;border:1px solid black">Id: ${coche._id}</span>
            <span style="width:20%;border:1px solid black"> Matricula: ${coche.matricula}</span>
            <span style="width:20%;border:1px solid black"> Marca: ${coche.marca}</span>
            <span style="width:20%;border:1px solid black">Modelo: ${coche.modelo} </span>
            <span style="width:20%;border:1px solid black"> Year: ${coche.year}</span>`
            //console.log(screen$$)
            container$$.appendChild(item$$)
            
            });
            const previo$$= document.createElement("button")
            const siguiente$$= document.createElement("button")
            const actualpagina$$=document.createElement("p")
            previo$$.textContent="PREVIO"
            siguiente$$.textContent="SIGUIENTE"
            actualpagina$$.textContent=`Pagina: ${numpagina}`
            container$$.appendChild(previo$$)
            container$$.appendChild(actualpagina$$)
            container$$.appendChild(siguiente$$)
            
            const resumendatos$$=document.createElement("p")
            let ultimoamostrar=numpagina*allJson.info.limit;
            if (ultimoamostrar > allJson.info.numCoches){
                ultimoamostrar=allJson.info.numCoches;
            }
            let primeroamostrar = (numpagina-1)*(allJson.info.limit)+1
            resumendatos$$.innerHTML=`Viendo resultados del ${primeroamostrar} al ${ultimoamostrar}<br>
            Resultados totales: ${allJson.info.numCoches}`
            container$$.appendChild(resumendatos$$)
            document.body.appendChild(container$$);
            if (numpagina === 1){
            }
            else{
                previo$$.addEventListener("click",function(){getallcoches(numpagina=numpagina-1)})
            }
            if (numpagina === allJson.info.maxpages){

            }
            else{
                siguiente$$.addEventListener("click",function(){getallcoches(numpagina=numpagina+1)})
            }

           
    }
    if (tipo === "servicios"){
        console.log(allJson)
        allJson.results.forEach(servicio => {
            const item$$=document.createElement("section");
            item$$.className="item"
            item$$.innerHTML=`<span style="width:20%;border:1px solid black">Id: ${servicio._id}</span>
            <span style="width:40%;border:1px solid black">Tipo: ${servicio.tipo}</span>
            <span style="width:10%;border:1px solid black">Kms.: ${servicio.kms}</span>
            <span style="width:10%;border:1px solid black">Fecha.: ${servicio.fecha} </span>
            <span style="width:60%;border:1px solid black">Notas.: ${servicio.notas} </span>`
            container$$.appendChild(item$$)
            
            });
            const previo$$= document.createElement("button")
            const siguiente$$= document.createElement("button")
            const actualpagina$$=document.createElement("p")
            previo$$.textContent="PREVIO"
            siguiente$$.textContent="SIGUIENTE"
            actualpagina$$.textContent=`Pagina: ${numpagina}`
            container$$.appendChild(previo$$)
            container$$.appendChild(actualpagina$$)
            container$$.appendChild(siguiente$$)
            
            const resumendatos$$=document.createElement("p")
            let ultimoamostrar=numpagina*allJson.info.limit;
            if (ultimoamostrar > allJson.info.numServicios){
                ultimoamostrar=allJson.info.numServicios;
            }
            let primeroamostrar = (numpagina-1)*(allJson.info.limit)+1
            resumendatos$$.innerHTML=`Viendo resultados del ${primeroamostrar} al ${ultimoamostrar}<br>
            Resultados totales: ${allJson.info.numServicios}`
            container$$.appendChild(resumendatos$$)
            document.body.appendChild(container$$);
            if (numpagina === 1){
            }
            else{
                previo$$.addEventListener("click",function(){getallservicios(numpagina=numpagina-1)})
            }
            if (numpagina === allJson.info.maxpages){

            }
            else{
                siguiente$$.addEventListener("click",function(){getallservicios(numpagina=numpagina+1)})
            }

    }
}

const addcoche = ()=>{
    container$$.innerHTML="";
    const form$$=document.createElement("form");
    form$$.id="addform";
    
    form$$.innerHTML=`Matricula: <input type="text" class="matricula" placeholder="Inserta matricula"><br>
    Marca:  <input type="text" class="marca" placeholder="Inserta marca"><br>
    Modelo: <input type="text" class="modelo" placeholder="Inserta modelo"><br>
    Año: <input type="number" class="year" placeholder="Inserta año"><br>
    Foto:<input type="file" class="imagen" placeholder="Seleciona imagen"><br>
    <input type="submit" class="submitcoche">`
    container$$.appendChild(form$$);
    const sendcocheButton$$=document.querySelector(".submitcoche");
    sendcocheButton$$.addEventListener("click",sendNewcoche)
}
const sendNewcoche = async ()=>{
    const matricula$$=document.querySelector(".matricula")
    const marca$$=document.querySelector(".marca")
    const modelo$$=document.querySelector(".modelo")
    const year$$=document.querySelector(".year")
    const foto$$=document.querySelector(".imagen")
    
    //let newcoche = new FormData(document.getElementById('addform'));
    let newcoche = new FormData();
    newcoche.append("matricula",matricula$$.value)
    newcoche.append("marca",marca$$.value)
    newcoche.append("modelo",modelo$$.value)
    newcoche.append("year",year$$.value)
    newcoche.append("imagen",foto$$.files[0])


    // console.log(newcoche)
    // let newcoche ={
    //     matricula: (matricula$$.value),
    //     marca: (marca$$.value),
    //     modelo: (modelo$$.value),
    //     year: (year$$.value),
    //     imagen: (foto$$.target.file[0])
    // }
     
    console.log(newcoche)
    
    let token = localStorage.getItem ("token");
    await fetch("http://localhost:5000/coches", {
        method: 'POST',
        Authorization: 'Bearer '+ token,
        // headers: { 
        //     Authorization: 'Bearer '+ token,
        //     'Content-Type': 'application/json',
               
        // },
        //body: JSON.stringify(newcoche)
        body: newcoche
      })
      .then(res => console.log(res.json()))
      .catch(error => alert('Error:'+error))
      .then(response => {
        alert('Success:'+response)
        
      });
      container$$.innerHTML=`coche creado: ${newcoche.matricula}`;
      printresults();
}



allcoches$$.addEventListener("click",function(){getallcoches(numpagina)});
allservicios$$.addEventListener("click",function(){getallservicios(numpagina)});
addcoche$$.addEventListener("click",addcoche);
// moviebytittle$$.addEventListener("change",function(){getmoviesbyid(moviebytittle$$.value)});






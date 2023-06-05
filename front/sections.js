//const { JsonWebTokenError } = require("jsonwebtoken");

const allcoches$$ = document.querySelector(".allcoches");
const allservicios$$ = document.querySelector(".allservicios");
const addcoche$$ = document.querySelector(".addcoche");
const deletecoche$$=document.querySelector(".deletecoche")
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
            item$$.innerHTML=`<span style="width:45%;border:1px solid black">Id: ${coche._id}</span>
            <span style="width:15%;border:1px solid black"> Matricula: ${coche.matricula}</span>
            <span style="width:15%;border:1px solid black"> Marca: ${coche.marca}</span>
            <span style="width:15%;border:1px solid black">Modelo: ${coche.modelo} </span>
            <span style="width:10%;border:1px solid black"> Year: ${coche.year}</span>`
            //console.log(screen$$)
            container$$.appendChild(item$$)
            
            });
            const nav$$=document.createElement("nav")
            nav$$.className="b-nav"
            const previo$$= document.createElement("button")
            const siguiente$$= document.createElement("button")
            const actualpagina$$=document.createElement("p")

            previo$$.textContent="PREVIO"
            siguiente$$.textContent="SIGUIENTE"
            actualpagina$$.textContent=`Pagina: ${numpagina}`
            nav$$.appendChild(previo$$)
            nav$$.appendChild(actualpagina$$)
            nav$$.appendChild(siguiente$$)
            container$$.appendChild(nav$$)
            
            const resumendatos$$=document.createElement("p")
            resumendatos$$.className="b-nav__p"
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
            item$$.innerHTML=`<span style="width:25%;border:1px solid black">Id: ${servicio._id}</span>
            <span style="width:30%;border:1px solid black">Tipo: ${servicio.tipo}</span>
            <span style="width:10%;border:1px solid black">Kms.: ${servicio.kms}</span>
            <span style="width:10%;border:1px solid black">Fecha.: ${servicio.fecha} </span>
            <span style="width:60%;border:1px solid black">Notas.: ${servicio.notas} </span>`
            container$$.appendChild(item$$)
            
            
            });
            const nav$$=document.createElement("nav")
            nav$$.className="b-nav"
            const previo$$= document.createElement("button")
            const siguiente$$= document.createElement("button")
            const actualpagina$$=document.createElement("p")
            previo$$.textContent="PREVIO"
            siguiente$$.textContent="SIGUIENTE"
            actualpagina$$.textContent=`Pagina: ${numpagina}`
            nav$$.appendChild(previo$$)
            nav$$.appendChild(actualpagina$$)
            nav$$.appendChild(siguiente$$)
            container$$.appendChild(nav$$)
            
            const resumendatos$$=document.createElement("p")
            resumendatos$$.className="b-nav__p"
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
    
    form$$.innerHTML=`<span>Matricula: </span><input type="text" class="matricula" placeholder="Inserta matricula"><br>
    <span>Marca:  </span><input type="text" class="marca" placeholder="Inserta marca"><br>
    <span>Modelo: </span> <input type="text" class="modelo" placeholder="Inserta modelo"><br>
    <span>Año: </span><input type="number" class="year" placeholder="Inserta año"><br> 
    <input type="submit" class="submitcoche">`

    //Imagen:<input type="file" class="imagen"><br></br>
    container$$.appendChild(form$$);
    const sendcocheButton$$=document.querySelector(".submitcoche");
    sendcocheButton$$.addEventListener("click",sendNewcoche)
}

const sendNewcoche = async (event)=>{
    event.preventDefault();
    const matricula$$=document.querySelector(".matricula")
    const marca$$=document.querySelector(".marca")
    const modelo$$=document.querySelector(".modelo")
    const year$$=document.querySelector(".year")
    //const foto$$=document.querySelector(".imagen")
    
    
    
    //let newcoche = new FormData();
    //let newcoche = new FormData(document.querySelector("#addform"));
    // newcoche.append("matricula",matricula$$.value)
    // newcoche.append("marca",marca$$.value)
    // newcoche.append("modelo",modelo$$.value)
    // newcoche.append("year",year$$.value)
    //newcoche.append("imagen",foto$$.files[0])


    let newcoche ={
        matricula: (matricula$$.value),
        marca: (marca$$.value),
        modelo: (modelo$$.value),
        year: (year$$.value)
    }
     
    console.log(newcoche)
    
    let token = localStorage.getItem ("token");
    const call = await fetch("http://localhost:5000/coches", {
        method: 'POST',
        
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
            //'Accept': '*/*'
            //'Content-Type': 'multipart/form-data'
           // boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
        },
        body: JSON.stringify(newcoche)
        //body: newcoche
      })
      const resultado = await call.json();
      console.log(resultado)
    //   .then(res => res.json())
    //   .catch(error => console.log('Error:' ,error))
    //   .then(response => {
    //     console.log('Success:' , response)
        
    //   });
      container$$.innerHTML=`<h3 class="cochecreado">Coche creado: ${newcoche.matricula}</h3>`;
      printresults();
}
const deletecoche = async ()=>{
    const call= await fetch("http://localhost:5000/coches/all")
    const allcochesJson = await call.json();
    console.log(allcochesJson)
    container$$.innerHTML=``;
    const select$$=document.createElement("select")
    allcochesJson.forEach(coche => {
        const option$$=document.createElement("option")
        option$$.value=coche._id;
        option$$.textContent=`Marca: ${coche.marca}  Modelo: ${coche.modelo}  Matricula: ${coche.matricula}`
        select$$.appendChild(option$$)
        
    });
    container$$.appendChild(select$$)
    select$$.addEventListener("change",function(){cocheaborrar(event)})
}
const cocheaborrar = async ()=>{
    container$$.innerHTML=``;
    console.log(event.target.value)
    const call = await fetch(`http://localhost:5000/coches/id/${event.target.value}`)
    const cocheJson= await call.json();
    const coche$$=document.createElement("h4");
    coche$$.innerHTML=`Coche a borrar: ${cocheJson.marca} - ${cocheJson.modelo} - con matricula: ${cocheJson.matricula}<br>
    <input type="button" class="borrarcoche" value="CONFIRMAR">`;
    container$$.appendChild(coche$$);
    const confirmar$$=document.querySelector(".borrarcoche");
    confirmar$$.addEventListener("click",function(){borrarCoche(cocheJson._id)});
    
}
const borrarCoche = async (id)=>{
    container$$.innerHTML=``;
    const call=await fetch(`http://localhost:5000/coches/${id}`,{
        method: 'DELETE'
    })
    const borrarJson= await call.json();
    if (borrarJson){
        const coche$$=document.createElement("h3");
        coche$$.innerHTML=`Coche borrado`;
        container$$.appendChild(coche$$);
    }
    tipo="borrar"

}


allcoches$$.addEventListener("click",function(){getallcoches(numpagina)});
allservicios$$.addEventListener("click",function(){getallservicios(numpagina)});
addcoche$$.addEventListener("click",addcoche);
deletecoche$$.addEventListener("click",deletecoche)
// moviebytittle$$.addEventListener("change",function(){getmoviesbyid(moviebytittle$$.value)});






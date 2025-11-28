const dias=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
const hoy=dias[new Date().getDay()];

const rutinas={
lunes:{
  manana:["5 min salto de cuerda","20 flexiones (4x10)","20 sentadillas explosivas (4x10)","30 seg plancha (3x)","5 min estiramientos dinámicos"],
  tarde:["Press banca mancuerna – 4x10-12","Press inclinado – 4x10","Fondos entre bancos – 3x15","Aperturas – 3x15","Curl bíceps – 4x12","Curl martillo – 3x12","Extensiones tríceps – 4x15"],
  desayuno:"1 taza avena + 1 plátano + 30 g proteína en polvo + 10 g mantequilla maní",
  post:"150 g pechuga pollo + 1 taza arroz integral + 1 taza verduras + 1 fruta"
},
martes:{
  manana:["5 min jumping jacks","15 burpees (3x5)","20 zancadas (2x10 c/pierna)","30 seg plank (3x)","5 mobilidad cadera"],
  tarde:["Remo mancuerna – 4x10","Remo inclinado – 4x10","Remo una mano – 3x12","Curl bíceps – 4x12","Curl predicador – 3x12","Face pulls – 3x15","Farmer’s walk – 3x40 m"],
  desayuno:"3 huevos revueltos + 2 rebanadas pan integral + 1 vaso jugo natural",
  post:"150 g salmón a la plancha + 200 g patata asada + ensalada verde + 1 fruta"
},
miercoles:{
  manana:["5 min jumping jacks","30 sentadillas (3x10)","20 elevaciones gemelos (2x10)","30 seg plank (3x)","5 estiramientos cuádriceps"],
  tarde:["Sentadilla búlgara – 4x12 c/pierna","Deadlift mancuerna – 4x10","Step-ups con mancuerna – 3x12","Hip thrust – 4x15","Curl femoral mancuerna – 3x12","Elevaciones gemelos – 4x20"],
  desayuno:"Smoothie: 1 plátano + 1 taza espinaca + 30 g proteína + 1 cda mantequilla maní + leche",
  post:"150 g carne magra + 1 taza quinoa + 1 taza verduras + 1 yogur griego"
},
jueves:{
  manana:["5 min salto de cuerda","15 flexiones diamante (3x5)","15 pike push-ups (3x5)","30 seg plank (3x)","5 mobilidad hombros"],
  tarde:["Press Arnold – 4x12","Elevaciones laterales – 4x15","Elevaciones frontales – 3x12","Face pulls – 3x15","Curl bíceps – 4x12","Curl martillo – 3x12","Farmer’s walk – 3x40 m"],
  desayuno:"1 taza avena + 1 manzana + 30 g proteína + 10 g nueces",
  post:"150 g pechuga pavo + 1 taza arroz basmati + ensalada + 1 fruta"
},
viernes:{
  manana:["5 min jumping jacks","20 burpees (4x5)","20 mountain climbers (4x20)","30 seg plank (3x)","5 estiramientos full body"],
  tarde:["Thruster – 4x15","Renegade row + push-up – 4x10","Zancadas con salto – 3x12 c/pierna","Curl bíceps – 4x12","Extensiones tríceps – 4x15","Russian twist – 4x25","Farmer’s walk – 3x40 m"],
  desayuno:"3 huevos + 2 tostadas integrales + 1 vaso jugo",
  post:"150 g atún a la plancha + 200 g patata + ensalada + 1 yogur"
}
};

// Fecha
document.getElementById("fecha").textContent=new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"});

// Si es fin de semana → descanso
if(!rutinas[hoy]){
  document.getElementById("manana").innerHTML="<h2>Fin de semana – descanso activo</h2><p>Paseo ligero + estiramientos 20 min</p>";
  document.getElementById("tarde").style.display="none";
}else{
  const dia=rutinas[hoy];
  // Mañana
  const listMan=document.getElementById("lista-manana");
  dia.manana.forEach(e=>{const li=document.createElement("li");li.textContent=e;listMan.appendChild(li);});
  document.getElementById("desayuno").textContent=dia.desayuno;
  // Tarde
  const listTar=document.getElementById("lista-tarde");
  dia.tarde.forEach(e=>{const li=document.createElement("li");li.textContent=e;listTar.appendChild(li);});
  document.getElementById("post-tarde").textContent=dia.post;
}

// Autorefresh a las 00:00
const ahora=new Date();
const mañana=new Date(ahora);
mañana.setDate(mañana.getDate()+1);
mañana.setHours(0,0,0,0);
setTimeout(()=>location.reload(),mañana-ahora);
/* LOGIN */

function login(){

let u =
document.getElementById(
"username"
)?.value;

let p =
document.getElementById(
"password"
)?.value;

if(u && p){

localStorage.setItem(
"login",
true
);

localStorage.setItem(
"user",
u
);

window.location.href =
"dashboard.html";

}

}

/* CEK LOGIN */

if(
window.location.pathname
.includes(
"dashboard"
)
){

if(
!localStorage
.getItem(
"login"
)
){

window.location.href =
"index.html";

}

}

let day = 1;

let data =

JSON.parse(

localStorage.getItem(
"planner"
)

)

|| {};


/* SIMPAN */

function save(){

localStorage.setItem(

"planner",

JSON.stringify(
data
)

);

}


/* KALENDER */

function kalender(){

const cal =
document.getElementById(
"calendar"
);

if(!cal)
return;

cal.innerHTML="";

for(
let i=1;
i<=31;
i++
){

cal.innerHTML+=

`

<div
class="
day
${i===day?"active":""}
"

onclick=
"pilih(${i})"

>

${i}

</div>

`;

}

}


/* PILIH TANGGAL */

function pilih(i){

day=i;

kalender();

render();

}


/* TAMBAH */

function tambah(){

const input =
document.getElementById(
"task"
);

if(
!input ||
!input.value.trim()
)
return;

if(
!data[day]
)
data[day]=[];

data[day].push({

text:
input.value,

done:
false

});

input.value="";

save();

render();

}


/* CEKLIS */

function cek(i){

data[day][i].done =
!data[day][i].done;

save();

render();

}


/* BATALKAN */

function batal(i){

data[day][i].done=
false;

save();

render();

}


/* HAPUS */

function hapus(i){

if(
confirm(
"Hapus kegiatan?"
)
){

data[day]
.splice(
i,
1
);

save();

render();

}

}


/* RENDER */

function render(){

const todo =
document.getElementById(
"todo"
);

const selesai =
document.getElementById(
"done"
);

const tgl =
document.getElementById(
"tanggal"
);

const bar =
document.getElementById(
"fill"
);

const persen =
document.getElementById(
"persen"
);

if(
!todo
)
return;

tgl.innerHTML =
"Tanggal " +
day;

todo.innerHTML="";

selesai.innerHTML="";

let list =
data[day]
||[];

let totalDone=0;

list.forEach(

(v,i)=>{

if(v.done){

totalDone++;

selesai.innerHTML+=

`

<div class="item">

<div>

✔
${v.text}

</div>

<div>

<button
onclick=
"batal(${i})"
>

↩

</button>

<button
onclick=
"hapus(${i})"
>

🗑

</button>

</div>

</div>

`;

}

else{

todo.innerHTML+=

`

<div class="item">

<div>

<label>

<input

type=
"checkbox"

onclick=
"cek(${i})"

>

${v.text}

</label>

</div>

<div>

<button
onclick=
"hapus(${i})"
>

🗑

</button>

</div>

</div>

`;

}

}

);

let hasil =
list.length
?
(totalDone/
list.length)
*100
:
0;

if(bar)
bar.style.width=
hasil+"%";

if(persen)

persen.innerHTML=

Math.round(
hasil
)

+

"% selesai";

}


/* LOGOUT */

function logout(){

localStorage.removeItem(
"login"
);

window.location.href=
"index.html";

}


kalender();

render();
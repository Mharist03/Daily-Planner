/* LOGIN */

function login(){

let u =
document
.getElementById(
"username"
)?.value;

let p =
document
.getElementById(
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

window.location.href=
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

window.location.href=
"index.html";

}

}


/* TANGGAL */

const now =
new Date();

let year =
now.getFullYear();

let month =
now.getMonth();

let day =
now.getDate();


/* DATA */

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


/* KEY */

function getKey(){

return `${year}-${month}-${day}`;

}


/* BULAN */

const namaBulan=[

"Januari",
"Februari",
"Maret",
"April",
"Mei",
"Juni",
"Juli",
"Agustus",
"September",
"Oktober",
"November",
"Desember"

];


/* KALENDER */

function kalender(){

const cal =
document.getElementById(
"calendar"
);

if(!cal)
return;

document
.getElementById(
"judulBulan"
)
.innerHTML=

`📅
${namaBulan[month]}
${year}`;

cal.innerHTML="";

const jumlahHari =

new Date(
year,
month+1,
0
).getDate();

for(
let i=1;
i<=jumlahHari;
i++
){

cal.innerHTML+=

`

<div

class=

"day
${i===day?
"active":
""}

"

onclick=
"pilih(${i})"

>

${i}

</div>

`;

}

}


/* PINDAH BULAN */

function nextMonth(){

month++;

if(
month>11
){

month=0;

year++;

}

day=1;

kalender();

render();

}


function prevMonth(){

month--;

if(
month<0
){

month=11;

year--;

}

day=1;

kalender();

render();

}


/* PILIH */

function pilih(i){

day=i;

kalender();

render();

}


/* TAMBAH */

function tambah(){

const input=

document.getElementById(
"task"
);

if(
!input.value.trim()
)
return;

const key=
getKey();

if(
!data[key]
)

data[key]=[];

data[key].push({

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

const key=
getKey();

data[key][i]
.done=
!data[key][i]
.done;

save();

render();

}


/* BATAL */

function batal(i){

const key=
getKey();

data[key][i]
.done=
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

const key=
getKey();

data[key]
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

const todo=
document.getElementById(
"todo"
);

if(
!todo
)
return;

const selesai=
document.getElementById(
"done"
);

const tgl=
document.getElementById(
"tanggal"
);

const bar=
document.getElementById(
"fill"
);

const persen=
document.getElementById(
"persen"
);

tgl.innerHTML=

`${day}
${namaBulan[month]}
${year}`;

todo.innerHTML="";

selesai.innerHTML="";

const key=
getKey();

const list=
data[key]
||[];

let done=0;

list.forEach(

(v,i)=>{

if(v.done){

done++;

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

let hasil=

list.length

?

done/
list.length
*100

:

0;

bar.style.width=
hasil+"%";

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


/* AUTO UPDATE */

setInterval(()=>{

const now=
new Date();

if(

now.getMonth()
!==month ||

now.getDate()
!==day

){

month=
now.getMonth();

year=
now.getFullYear();

day=
now.getDate();

kalender();

render();

}

},
60000);


kalender();

render();
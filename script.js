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


/* FORMAT MENIT */

function formatMinutes(min){

let jam =
Math.floor(min/60);

let menit =
min%60;

if(jam>0){

return `${jam} jam ${menit} menit`;

}

return `${menit} menit`;

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


/* PILIH TANGGAL */

function pilih(i){

day=i;

kalender();

render();

}


/* TAMBAH */

function tambah(){

const task=
document.getElementById(
"task"
);

const duration=
document.getElementById(
"duration"
);

if(
!task.value.trim()
||
!duration.value
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
task.value,

duration:
parseInt(
duration.value
),

done:false

});

task.value="";
duration.value="";

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


/* STATISTIK */

function updateStats(){

let today=0;
let week=0;
let monthTotal=0;

const key=
getKey();

if(data[key]){

data[key].forEach(item=>{

today +=
item.duration || 0;

});

}

for(let k in data){

data[k].forEach(item=>{

monthTotal +=
item.duration || 0;

week +=
item.duration || 0;

});

}

const todayEl=
document.getElementById(
"todayTime"
);

const weekEl=
document.getElementById(
"weekTime"
);

const monthEl=
document.getElementById(
"monthTime"
);

if(todayEl)
todayEl.innerHTML=
formatMinutes(today);

if(weekEl)
weekEl.innerHTML=
formatMinutes(week);

if(monthEl)
monthEl.innerHTML=
formatMinutes(monthTotal);

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

✔ ${v.text}

<br>

<small>

⏱
${formatMinutes(v.duration)}

</small>

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

<br>

<small>

⏱
${formatMinutes(v.duration)}

</small>

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

updateStats();

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
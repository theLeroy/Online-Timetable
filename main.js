var opi = 0;
var $from = document.querySelector("header.from");
var $theme = document.querySelector("h2.theme");
var $room = document.querySelector("span.room");
var $teacher = document.querySelector("span.teacher");
var $to = document.querySelector("footer.to");
var $to = document.querySelector("footer.to");
var $next = document.querySelector(".next");
var $before = document.querySelector(".before");
var $btn = document.querySelector("#btn-1");
var $btnC = document.querySelector(".btnC");
var beforeSubs = Array();

function nextSubject(nsd,nsh,nsmin) {
  var time = Array(Number(nsd),Number(nsh),Number(nsmin));
  var rVal = Array();
  if (time[0] < 1 || time[0] > 2) {
    return false;
  } else {
    var sTime = Array();
    for (var i = 0; i < stundenPlan.days[time[0]].subjects.length; i++) {
      sTime = stundenPlan.days[time[0]].subjects[i].from.split(":");
      if (Number(sTime[0]) > time[1] ) {
        rVal.push(stundenPlan.days[time[0]].subjects[i]);
      }else if (Number(sTime[0]) == time[1] && Number(sTime[1]) >= time[2]) {
        rVal.push(stundenPlan.days[time[0]].subjects[i]);
      }else {
        beforeSubs.push(stundenPlan.days[time[0]].subjects[i])
      }
    }
    return rVal;
  }
  return false;
}

var d = new Date();
// var nSub = nextSubject(d.getDay(),d.getHours(),d.getMinutes());
var nSub = nextSubject(d.getDay(),d.getHours(),d.getMinutes());
// var nSub = nextSubject(1,13,55);

fillBox(nSub[0]);

function fillBox(pSub) {
  if (pSub) {
     $from.innerHTML = pSub.from;
     $to.innerHTML = pSub.to;
     $theme.innerHTML = pSub.theme;
     $room.innerHTML = pSub.room;
     $teacher.innerHTML = pSub.teacher;
  }else {
    opi = 1;
    alert("du hast keine Schule (mehr)");
  }
}
console.log(beforeSubs);
$btn.addEventListener("click", function(){
  console.log(beforeSubs);
    generateList(beforeSubs, $before);
});

generateList(nSub, $next, 1);
function generateList(pSubs,elm,sPoint = 0) {
  var dump = "";
  for (var i = sPoint; i < pSubs.length; i++) {
    dump += '<section class="card">      <header class="from">' + pSubs[i].from + '</header>      <main class="card-content">        <h2 class="theme">' + pSubs[i].theme + '</h2>        <p>          <span class="room">' + pSubs[i].room + '</span>          <span class="teacher">' + pSubs[i].teacher + '</span>        </p>      </main>      <footer class="to">' + pSubs[i].to + '</footer>    </section>';
    // dump += nSub[i].from+" - "+nSub[i].to+" "+nSub[i].theme+"<br>";
  }
  elm.innerHTML = dump;
}

function Days() {
  let st = $btnC.innerHTML;
  for (var i = 1; i < stundenPlan["days"].length; i++) {
    st = st + '<button type="button" id="btn-'+i+'"class="btn show-day">'+stundenPlan["days"][i]["name"]+'</button>';
  }
  $btnC.innerHTML = st;
}
Days();

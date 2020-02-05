//Carousel
$(document).ready(function() {
 
    $("#owl-demo").owlCarousel({
        items : 6
    });

    $('.link').on('click', function(event){
        var $this = $(this);
        if($this.hasClass('clicked')){
            $this.removeAttr('style').removeClass('clicked');
        } else{
            $this.css('background','#1e1e1e').addClass('clicked');
        }
    });

});

//getting api json 
var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};

getJSON('https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json').then(function(data) {

    var result = data;
    document.getElementById('bkg').style.backgroundImage = "url('"+result['Images']['Background']+"')";
    console.log(data);
    console.log(result['Images']['Background']);
    var gen = document.getElementsByClassName("title");
    var dd = gen[0].getElementsByTagName("p");
    dd[0].innerHTML = "80% INDICADO / "+ result["Genres"][0]["Title"] + " " + result["Genres"][1]["Title"] + " / 2015 / EUA / 14";
    console.log(result["Genres"][0]["Title"]);
    var synopse = document.getElementById("synopse");
    var text = synopse.getElementsByTagName("p");
    text[1].innerHTML = result["Synopsis"];
}, function(status) {
    alert('Something went wrong.'); 
});

//Set Footer Elenco
getJSON('https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json').then(function(data) {

    var result = data;
    var cast = document.getElementById("owl-demo");
    var actor = cast.getElementsByClassName("item");
    for(i=0;i<result["Cast"].length;i++){
        actor[i].innerHTML = result["Cast"][i]["Name"];
    }
    }, function(status) {
    alert('Something went wrong.'); 
});

//tab content

document.getElementById("defaultOpenSeason").click();
function openSeason(evt, season) {
    //Season change
    var i, tabcontent, tablinks, j = 0;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(season).style.display = "block";
    evt.currentTarget.className += " active";
    
    //Season episode making
   
    getJSON('https://sample-api-78c77.firebaseio.com/episodes/SHOW123.json').then(function(data) {
        // console.log(data);
        var result = data;
        var seasonid = document.getElementById(season);
        console.log(season);
        var j = 0;
        if(season == "t2") { 
            j = 5;
        }
        i = 0;
        while(i < 4){

            var episode = seasonid.getElementsByClassName("episode");
            console.log(episode[i]);
            var episodetitle = episode[i].getElementsByTagName("p");
            // console.log(episodetitle);
            console.log(episodetitle);
            
            console.log(result[j]);
            if(result[j] == null) {
                j++;
            }
            // console.log(j);
            // console.log(result[j]['Title']);
            episodetitle[0].innerHTML = i + 1 + " " + result[j]['Title'];
            j++;
            i++;
        }
        }, function(status) {
        alert('Something went wrong.'); 
    });
}

//Episode Content Making
var flag = [0,0,0,0,0,0,0,0];
function openEpisode(episodenumber, seasonnumber){
   
    console.log(flag);
    console.log("episodenumber" + episodenumber);
    console.log("seasonnumber" + seasonnumber);
    

    var seasonid = document.getElementById(seasonnumber);
    var episode = seasonid.getElementsByClassName("episode");
    console.log("AAAAAAAAAA");
    console.log(seasonid);
    console.log(episode[episodenumber%4]);
    var epicontent = episode[episodenumber%4].getElementsByTagName("div");
    console.log(epicontent[0]);
    for(i=0;i<8;i++){
        if(i == episodenumber) continue;
        flag[i] = 0;
    }
    if(flag[episodenumber] == 0) {
        flag[episodenumber] = 1;
        document.getElementsByClassName("epicontent")[0].style.display = "none";
        epicontent[0].style.display = "block";
    }else{
        flag[episodenumber] = 0;
        epicontent[0].style.display = "none";
    }
    var synopsis = epicontent[0].getElementsByTagName("p");

    getJSON('https://sample-api-78c77.firebaseio.com/episodes/SHOW123.json').then(function(data) {

        var result = data;
        if(result[episodenumber] == null || episodenumber > 2){
            episodenumber++;
        }

        var episodeimg = epicontent[0].getElementsByTagName("img");
        console.log(episodeimg[0]);
        episodeimg[0].src = result[episodenumber]['Image'];
        synopsis[0].innerHTML = result[episodenumber]["Synopsis"];
        console.log(result[episodenumber]['Image']);

        }, function(status) {
        alert('Something went wrong.'); 
    });
    
}
//Footer Content
function openfooter(evt, name) {
    if ( name == 'elenco') {
        
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//open and close menu
function openmenu(){
    document.getElementById("season").style.display = "block";
}
function closemenu(){
    document.getElementById("season").style.display = "none";
}
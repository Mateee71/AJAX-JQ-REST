$(function(){
   
    $("#beolvas").on("click",beolvas);
    $("#kuld").on("click",adBeir);
    
});

function kiir(){
//    var nev = $("#nev").val();
//    var tel = $("#tel").val();
//    var kep = $("#kep").val();
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var nev = telefonkonyvem[i].nev;
        var tel = telefonkonyvem[i].tel;
        var kep = telefonkonyvem[i].kep;
        var elem = "<div><h2>"+nev+"</h2><p>"+tel+"</p><p>"+tel+"</p><button class='torol'>Törlés</button></div>";
            $("article").append(elem);
    }
    
}

function beolvas(){
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result){
            console.log(result);
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}

function adBeir(){
    var szemely = {
        nev: $("#nev").val(),
        tel:  $("#tel").val(),
        kep: $("#kep").val()
    };
    
    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function (ujSzemely){
            console.log(ujSzemely);
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok mentésekor!");
        }
    });
}
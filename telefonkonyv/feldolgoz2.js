$(function(){
   
    $("#beolvas").on("click",beolvas);
    $("#kuld").on("click",adBeir);
    $("article").delegate(".torol","click", adTorol);
    $("article").delegate(".szerkeszt","click", adSzerkeszt);
    $("#megse").on("click", adMegse);
    $("#modosit").on("click", adModosit);
    
});

function kiir(){
//    var nev = $("#nev").val();
//    var tel = $("#tel").val();
//    var kep = $("#kep").val();
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var ID = telefonkonyvem[i].ID;
        var nev = telefonkonyvem[i].nev;
        var tel = telefonkonyvem[i].tel;
        var kep = telefonkonyvem[i].kep;
        var elem = "<div><h2>"+nev+"</h2><p>"+tel+"</p><p>"+kep+"</p>\n\
        <button class='torol' id='"+ID+"'>Törlés</button></div><button class='szerkeszt' id='"+i+"'>Szerkeszt</button></div>";
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

function adTorol(){
    var aktelem = $(this).closest("div");
    var id = $(this).attr("id");
    console.log("Törlés ************"+id);
    
    $.ajax({
        type: "DELETE",
        url: "torles.php?ID="+id,
        success: function (){
            console.log("törlés");
            aktelem.remove();
        },
        error: function () {
            alert("Hiba az adatok törlésekor!");
        }
    });
}

function adSzerkeszt(){
    console.log("Módosít");
    $(".szerkesztes").removeClass("elrejt");
    var index = $(this).attr("id");
       $("#id2").val(telefonkonyvem[index].ID);
       $("#nev2").val(telefonkonyvem[index].nev);
       $("#tel2").val(telefonkonyvem[index].tel);
       $("#kep2").val(telefonkonyvem[index].kep);
    
}

function adMegse(){
    $(".szerkesztes").addClass("elrejt");
}

function adModosit(){
    var editSzemely = {
        ID: $("#id2").val(),
        nev: $("#nev2").val(),
        tel:  $("#tel2").val(),
        kep: $("#kep2").val()
    };
    console.log(editSzemely);
    
    $.ajax({
        type: "PUT",
        url: "modosit.php",
        data: editSzemely,
        success: function (){
            beolvas();
            
        },
        error: function () {
            alert("Hiba az adatok módosításakor!");
        }
    });
}
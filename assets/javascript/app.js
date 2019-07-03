var movies;

//initialize movies array
movies=["Forrest Gump","Pulp Fiction","The Guilty", "Blindspotting","Vice","Free Solo","Deadpool 2","Apostle","Widows "];

//display buttons on the page
function displayButtons(){
    $("#buttons-view").empty();

    for (i=0;i<movies.length;i++){
    var newbBtn=$("<button>");                            
    newbBtn.attr("data-name", movies[i]);                 
    newbBtn.addClass("giphy btn btn-success ml-1 mt-2");  
    newbBtn.text(movies[i]);
    $("#buttons-view").append(newbBtn);                    
    }
}
displayButtons();      


// render buttons
$("#add-movie").on("click", function(){

    event.preventDefault();                           
    var userInput=$("#movie-input").val().trim();     
    movies.push(userInput);
    displayButtons();   

});

// show giphys 
$(document).on("click",".giphy",displayGiphyInfo);

function displayGiphyInfo(){

$("#giphy-view").empty();
var movieName=$(this).attr("data-name");
var queryUrl="https://api.giphy.com/v1/gifs/search?q="+movieName+"&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

$.ajax({
    url:queryUrl,
    method:"GET"
}).then(function(response){
    console.log(queryUrl);
    var giphys=response.data;
    $.each(giphys, function(i){        

        var gifImg=$("<img>").attr("src",giphys[i].images.fixed_height_still.url);
        gifImg.addClass("img-fluid ml-2 mb-1 mt-3")                
        gifImg.attr("data-animate",giphys[i].images.fixed_height.url ).attr("data-still", giphys[i].images.fixed_height_still.url).attr("data-state","still");
        gifImg.addClass("giph");

        var gifFigure=$("<figure>").addClass("figure").css("width", "200px");
        gifFigure.addClass("ml-2 mb-1 mt-3");

        var gifCaption=$("<figcaption>").addClass("figure-caption").css("text-align", "center");
        gifCaption.text(giphys[i].rating);

        gifFigure.append(gifImg, gifCaption)

        $("#giphy-view").append(gifFigure);

        })
});
}
// animate still function
$(document.body).on("click", ".giph", function(){

    var dataState=$(this).attr("data-state");
    var dataAnimate=$(this).attr("data-animate");
    var dataStill=$(this).attr("data-still");

    if (dataState === "still"){

    $(this).attr("src", dataAnimate);
    $(this).attr("data-state", "animate");
    } 
    else{
    $(this).attr("src", dataStill);
    $(this).attr("data-state", "still");
    }
    
});
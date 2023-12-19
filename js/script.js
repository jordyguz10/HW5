const LetterImagesPaths =[
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_A.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_B.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_C.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_D.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_E.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_F.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_G.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_H.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_I.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_J.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_K.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_L.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_M.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_N.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_O.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_P.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_Q.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_R.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_S.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_T.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_U.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_V.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_W.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_X.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_Y.jpg',
    '..graphics_data/Scrabble_Tiles/Scrabble_Tile_Z.jpg'
];

var imageDistribution;
var CurrentRack = [];
var Score = 0;
const CurrentBoard = [];

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch JSON data from a file
    async function fetchJSONData(filePath) {
        const response = await fetch(filePath);
        const data = await response.json();
        return data;
    }

    // Function to get a random image path based on weights
    function getRandomImagePath(array) {
        var totalWeight = array.reduce((acc, obj) => acc + obj.amount, 0);
        var randomNum = Math.random() * totalWeight;

        for (var i = 0; i < array.length; i++) {
            if (randomNum < array[i].amount) {
                array[i].amount -= 1;
                CurrentRack += array[i].letter;
                if (array[i].letter == '_'){
                    return '..graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg';
                }
                return '..graphics_data/Scrabble_Tiles/Scrabble_Tile_'+ array[i].letter + '.jpg'; // Use the letter as the image path for this example
            }
            randomNum -= array[i].amount;
        }
    }

    // Display random images in existing divs
    async function displayRandomImages() {
        const filePath = '..graphics_data/pieces.json';
        imageDistribution = await fetchJSONData(filePath);
        
        var imageDivs = document.querySelectorAll('.source');
        imageDivs.forEach(function(div) {
            var img = document.createElement("img");
            img.src = getRandomImagePath(imageDistribution.pieces);
            div.appendChild(img);
        });
    }

    // Call the function to display random images
    displayRandomImages();
});

function getRandomImagePath(array) {
        var totalWeight = array.reduce((acc, obj) => acc + obj.amount, 0);
        var randomNum = Math.random() * totalWeight;

        for (var i = 0; i < array.length; i++) {
            if (randomNum < array[i].amount) {
                array[i].amount -= 1;
                CurrentRack += array[i].letter;
                if (array[i].letter == '_'){
                    return '..graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg';
                }
                return '..graphics_data/Scrabble_Tiles/Scrabble_Tile_'+ array[i].letter + '.jpg'; // Use the letter as the image path for this example
            }
            randomNum -= array[i].amount;
        }
    }

function startOver(){
    location.reload();
}

function AddImage(target){
    var imageDivs = document.getElementById(target);
    var img = document.createElement("img");
    img.src = getRandomImagePath(imageDistribution.pieces);
    imageDivs.appendChild(img);
}

function getCurrentRack(array){
    //get current rack displayed
}

function NextWord(){
    for(var i = 0; i < CurrentBoard.length; i++){
        var myDiv = document.getElementById(CurrentBoard[i]);
        // Find the img element within the div
        var myImage = myDiv.querySelector('img');
        // Check if the img element exists before attempting to remove it
        if (myImage) {
        // Remove the img element from the div
            myDiv.removeChild(myImage);
        }
        AddImage(CurrentBoard[i]);
        $("#" + CurrentBoard[i]).animate({ left: 0, top: 0 }, 1);
    }
    getCurrentRack(CurrentRack);
    CurrentBoard.length = 0;
}
//Update score as tile is put on scrabble board.
function UpdateScore(letter, target){
    var addedNum = getLetterValue(imageDistribution.pieces, letter);
    if(target == 'target7' || target == 'target9'){
        addedNum += addedNum;
    }
    Score += addedNum;
    var element = document.getElementById('CurrentScore');
    element.innerHTML = "Score: " + Score;
}
function getLetterValue(array, letter){
    for (var i = 0; i < array.length; i++) {
        if(array[i].letter == letter){
            return array[i].value;
        }
    }
}

$(document).ready(function() {
    // Make sources draggable
    $('.source').draggable({
        revert: function(valid) {
            // If dropped on a valid target, don't revert
            if (valid) {
              return false;
            } else {
              // If dropped outside a valid target, revert to the original position
              return true;
            }
        },
        start: function(event, ui) {
          // Save the original position of the source
          $(this).data('ui-draggable').originalPosition = {
            top: 0,
            left: 0
          };
        }
    });
    // Make targets droppable
    $('.target').droppable({
      drop: function(event, ui) {
        // Get the dropped element
        const droppedElement = ui.helper.clone();

        // Identify which source was dropped on which target
        const sourceId = ui.draggable.attr('id');
        const targetId = $(this).attr('id');

        const LetNum = sourceId[sourceId.length - 1];

        UpdateScore(CurrentRack[LetNum - 1], targetId);
        CurrentBoard.push(sourceId);
        console.log(CurrentRack);
    },
      out: function(event, ui) {
        const sourceId = ui.draggable.attr('id');
        const LetNum = sourceId[sourceId.length - 1];
        console.log(LetNum);
        
      }
    });
  });

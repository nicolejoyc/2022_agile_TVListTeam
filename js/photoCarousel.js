// This js file is for the index html page.
// This allows for a basic js photo carousel

// base class variables
// get and count photos
let photoClassName = "photo-carousel";
let photos = document.getElementsByClassName(photoClassName),
    totalPhotos = photos.length,
    slide = 0;

var acctId;

//0 = title, 1 = director, 2 = releaseYear, 3 = genre, 4 = length
let popularMovies = new Map([
    ["images/dontLookUp.jpg", ["Don't Look Up", "Adam McKay", "2021", "Comedy", "145"]],
    ["images/tinderSwindler.jpg", ["The Tinder Swindler", "Felicity Morris", "2022", "Crime", "114"]],
    ["images/throughMyWindow.jpg", ["Through My Window", "Marçal Forès", "2022", "Romance", "116"]],
    ["images/royalTreatment.jpg", ["The Royal Treatment", "Rick Jacobson", "2022", "Romantic Comedy", "97"]],
    ["images/brazen.jpg", ["Brazen", "Monika Mitchell", "2022", "Thriller", "94"]],
    ["images/motherAndroid.jpg", ["Mother/Android", "Mattson Tomlin", "2021", "Science-Fiction", "111"]],
    ["images/homeTeam.jpg", ["Home Team", "Charles Kinnane, Daniel Kinnane", "2022", "Sports-Comedy", "95"]],
    ["images/tallGirlTwo.jpg", ["Tall Girl 2", "Emily Ting", "2022", "Comedy", "97"]],
    ["images/theEdgeOfWar.jpg", ["The Edge Of War", "Christian Schwochow", "2021", "Historical", "123"]],
    ["images/redNotice.jpg", ["Red Notice", "Rawson Marshall Thurber", "2021", "Comedy, Action", "118"]],
]);

// initialise carousel
function setInitialClasses() {
    photos[totalPhotos - 1].classList.add("previous");
    photos[0].classList.add("active");
    photos[1].classList.add("next");
}

function moveCarouselTo(slide) {
    let newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

    // check if there are more than three photos in the carousel
    if ((totalPhotos - 1) > 3) {

        if (newPrevious <= 0) {
            oldPrevious = (totalPhotos - 1);
        } else if (newNext >= (totalPhotos - 1)) {
            oldNext = 0;
        }

        // test if the current slide is at the end or at the beginning
        if (slide === 0) {
            newPrevious = (totalPhotos - 1);
            oldPrevious = (totalPhotos - 2);
            oldNext = (slide + 1);
        } else if (slide === (totalPhotos - 1)) {
            newPrevious = (slide - 1);
            newNext = 0;
            oldNext = 1;
        }

        photos[oldPrevious].className = photoClassName;
        photos[oldNext].className = photoClassName;

        photos[newPrevious].className = photoClassName + " previous";
        photos[slide].className = photoClassName + " active";
        photos[newNext].className = photoClassName + " next";
    }
    
}

// previous arrow
function movePrevious() {
    if (slide === 0) {
        slide = (totalPhotos - 1);
    } else {
        slide--;
    }
    moveCarouselTo(slide);
}

// next arrow
function moveNext() {
    if (slide === (totalPhotos - 1)) {
        slide = 0;
    } else {
        slide++;
    }	
    moveCarouselTo(slide);
}

function addToWishlist(recordID, info) {
    //console.log(info);
    createRspHandler = (obj) => {
        location.assign(buildURLString("index.html"));
    };

    var createTransactor = new DBCreateTransaction(createRspHandler);

    createTransactor.sendRequest("tvlist", {
        id: recordID,
        accountId: acctId.toString(),
        title: info[0],
        showOrMovie: "Movie",
        director: info[1],
        releaseYear: info[2],
        genre: info[3],
        length: info[4],
        viewed: false,
        wishlist: true,
        rating: "",
        dateAdded: new Date().toISOString().slice(0, 10)
    });

}

function confirmAdd() {
    let text = "That movie title you entered was already found in the database. Did you want to add it again? If so click ok " ;
    return (confirm(text));
}

function photoClick() {

    // clicked image's src: 
    let imageSrc = this.getAttribute('src');

    listTablesRspHandler = (obj) => {
        let newRecordID = "";
        let addRecord;
        tables = obj.tables;
    
        function tblExists(table) {
          return table === 'tvlist';
        }
    
        if (tables.find(tblExists) === 'tvlist') { 
          
          // table exists, find highest id and add one
          queryRspHandler = (obj) => {
            var records = obj.records;
            records.forEach(record => {
                if (record.accountId === acctId && record.title === (popularMovies.get(imageSrc))[0]) {
                  addRecord = confirmAdd();
                } 
            });

            var highestID = 0;
    
            // search through records to find record with highest id
            records.forEach(record => {
              if (Number(record.id) > highestID) {
                highestID = Number(record.id);
              }
            });
    
            newRecordID = (highestID + 1).toString();

            if (addRecord !== false) {
                addToWishlist(newRecordID, popularMovies.get(imageSrc));
            }
          };
    
          var queryTransactor = new DBQueryTransaction(queryRspHandler);
    
          // sends a request to query the tvlist data, limit 1000 so we get max possible records
          queryTransactor.sendRequest('tvlist', {
            table: "tvlist",
            limit: 1000,
          });
    
        } else { // table does not exist, so set first record to id of 1
          newRecordID = "1";

          if (addRecord !== false) {
            addToWishlist(newRecordID, popularMovies.get(imageSrc));
          }
        }
    };
    
    var listTablesTransactor = new DBListTablesTransaction(listTablesRspHandler);
    
    listTablesTransactor.sendRequest();

}

function setEventListeners() {
    let previous = document.getElementsByClassName('prev-button')[0],
        next = document.getElementsByClassName('next-button')[0];

    previous.addEventListener('click', movePrevious);
    next.addEventListener('click', moveNext);
    
    for (let photo of photos) {
        photo.addEventListener('click', photoClick);
    }
}


function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // User Account Record Query Response Handler
    var queryAccountRspHandler = (obj) => {

        // Update user form
        if(obj.records.length === 1) {
    
        // Save the record id
        acctId = obj.records[0].id;
    
        } else {
        alert("Sorry, no account found.");
        console.log("Account query, records found: " + rsp.records.length);
        }
    };

    // Query for user account
    let emailAddress;
    let queryAccountTransactor = new DBQueryTransaction(queryAccountRspHandler);

    if((emailAddress = getSignedInKey())) {
        queryAccountTransactor.sendRequest(userAccountTableName, {
            "query": `email == "${emailAddress}"`
        });
    }
}

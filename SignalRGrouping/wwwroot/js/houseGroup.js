let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

var connectionHouseGroup = new signalR.HubConnectionBuilder().withUrl("/hub/houseGroup").build();

// Joining house
btn_gryffindor.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("JoinHouse", "Gryffindor");
});
btn_slytherin.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("JoinHouse", "Slytherin");
});
btn_hufflepuff.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("JoinHouse", "Hufflepuff"); // Fixed typo
});
btn_ravenclaw.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("JoinHouse", "Ravenclaw");
});

// Leave house
btn_un_gryffindor.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("LeaveHouse", "Gryffindor");
});
btn_un_slytherin.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("LeaveHouse", "Slytherin");
});
btn_un_hufflepuff.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("LeaveHouse", "Hufflepuff"); // Fixed typo
});
btn_un_ravenclaw.addEventListener('click', function (event) {
    event.preventDefault();
    connectionHouseGroup.send("LeaveHouse", "Ravenclaw");
});

connectionHouseGroup.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {
        // Subscribe to house
        switch (houseName.toLowerCase()) { // Ensure consistency in case
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "block";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "block";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "block";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "block";
                break;
            default:
                break;
        }

        Toastify({
            text: `You have Subscribed Successfully from ${houseName}`,
            duration: 3000
        }).showToast();
    } else {
        // Unsubscribe from house
        switch (houseName.toLowerCase()) { // Ensure consistency in case
            case 'slytherin':
                btn_slytherin.style.display = "block";
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "block";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "block";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "block";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }
        Toastify({
            text: `You have Unsubscribed Successfully from ${houseName}`,
            duration: 3000
        }).showToast();

        Toastify({
            text: "This is a basic toast",
            duration: 3000
        }).showToast();
        //toastr.success(`You have Unsubscribed Successfully from ${houseName}`);
    }
});

function success() {
    console.log("Connected!");
}

function failure(error) { // Fixed typo and added error parameter
    console.log("Connection failed: ", error);
}

connectionHouseGroup.start().then(success).catch(failure); // Added error handling

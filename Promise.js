var fetchData = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {   // on introduit un délais de réponse de 250 ms
           
            resolve({
                users: [
                    {name: 'Jack', age: 22},
                    {name: 'Tom',age: 21},
                    {name: 'Isaac',age: 21},
                    {name: 'Iain',age: 20}]
            });
            }, 250);
    });
};

var prepareDataForCsv = function (data) {
    return new Promise(function (resolve, reject) {
        resolve("Bliepbliep, verwerk de data.");
        reject("We kunnen de data niet verwerken. Het is geen geldig format.");
    });
};

var writeToCsv = function (data) {
    return new Promise(function (resolve, reject) {
        //Schrijf de data naar een CSV
        resolve();
    });
};

//========================//
fetchData().then(function (data) {
    return prepareDataForCsv(data);
    }).then(function (data) {
    return writeToCsv(data);
    }).then(function () {
    console.log('De data is bewaard.');
    }).catch (function (error) {
    console.log('Er ging iets mis!', error);
});

console.log("Ik ga eerst terwijl ik later in de rij sta van functies.");
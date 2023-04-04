// DOM Elements
let vehName = document.getElementById("vehName");
let CheckVan = document.getElementById("van");
let CheckAT = document.getElementById("at");
let Check4WD = document.getElementById("4wd");
let M1 = document.getElementById("m1");
let N1 = document.getElementById("n1");
let mess = document.getElementById("mess")
let Carbon = document.getElementById("co2");
let aGrade = document.getElementById("aGrade");
let bGrade = document.getElementById("bGrade");
let cGrade = document.getElementById("cGrade");
let dGrade = document.getElementById("dGrade");
let eGrade = document.getElementById("eGrade");
let fGrade = document.getElementById("fGrade");
let gGrade  = document.getElementById("gGrade");
let rejected = document.getElementById("rejected");
let messageBox = document.getElementById("message");
let table = document.getElementById("table");
let printGrades = $('article .grade-Output div');
// --------------------------------------------------------------------
// Dates
let period1Start = new Date("22 june 2022").getTime();
let period1End = new Date("20 june 2024").getTime();
let period2Start = new Date("21 june 2024").getTime();
let period2End = new Date("21 june 2027").getTime();
let period3Start = new Date("22 june 2027").getTime();
// --------------------------------------------------------------------
function gradeDeterminant(co2, b) {
    for (let i = 0; i < printGrades.length; i++) {
        printGrades[i].style.opacity = '10%';
    }
    if(co2 <= 0.64 * b){
        aGrade.style.opacity = "100%";
        printGrades[0].style.opacity = "100%"
        finalGrade = 'A';
        colorCode = "#006600";
    }else if((co2 > 0.64 * b) && (co2 <= 0.7 * b)){
        bGrade.style.opacity = "100%";
        printGrades[1].style.opacity = "100%"
        finalGrade = 'B';
        colorCode = "#009900";
    }else if((co2 > 0.7 * b) && (co2 <= 0.76 * b)){
        cGrade.style.opacity = "100%";
        printGrades[2].style.opacity = "100%"
        finalGrade = 'C';
        colorCode = "#33cc33";
    }else if((co2 > 0.76 * b) && (co2 <= 0.82 * b)){
        dGrade.style.opacity = "100%";
        printGrades[3].style.opacity = "100%"
        finalGrade = 'D';
        colorCode = "#e5e51b";
    }else if((co2 > 0.82 * b) && (co2 <= 0.88 * b)){
        eGrade.style.opacity = "100%";
        printGrades[4].style.opacity = "100%"
        finalGrade = 'E';
        colorCode = "#f6bb00";
    }else if((co2 > 0.88 * b) && (co2 <= 0.94 * b)){
        fGrade.style.opacity = "100%";
        printGrades[5].style.opacity = "100%"
        finalGrade = 'F';
        colorCode = "#e66914";
    }else if((co2 > 0.94 * b) && (co2 <=  b)){
        gGrade.style.opacity = "100%";
        printGrades[6].style.opacity = "100%"
        finalGrade = 'G';
        colorCode = "#c00000";
    }else if(co2 > b){
        rejected.style.opacity = "100%";
        printGrades[7].style.opacity = "100%"
        finalGrade = 'Rejected';
        colorCode = "#7e0000";
    }
}
// --------------------------------------------------------------------
let colorCode = "";
let finalGrade = '';
let finaleOutput = '';
document.getElementById("submitBTN").addEventListener("click", function (e) {
    e.preventDefault();
    let now = new Date().getTime();
    if(mess.value == '' && Carbon.value == ''){
        messageBox.innerText = "لطفا فیلد جرم در حال حرکت و دی اکسید کربن را پر کنید"
        $(messageBox).fadeIn();
    }else if(mess.value == '' && Carbon.value != ''){
        messageBox.innerText = "لطفا فیلد جرم در حال حرکت را پر کنید"
        $(messageBox).fadeIn();
    }else if(Carbon.value == '' && mess.value != ''){
        messageBox.innerText = "لطفا فیلد دی اکسید کربن را پر کنید"
        $(messageBox).fadeIn();
    }else{
        printBTN();
        let benchmarkLine = 0;
        $(messageBox).fadeOut();
        aGrade.style.opacity = '20%';
        bGrade.style.opacity = '20%';
        cGrade.style.opacity = '20%';
        dGrade.style.opacity = '20%';
        eGrade.style.opacity = '20%';
        fGrade.style.opacity = '20%';
        gGrade.style.opacity = '20%';
        rejected.style.opacity = '20%';
        let M = Number(mess.value);
        let CO2 = Number(Carbon.value)
        let percentageFactor = 0
        if (CheckVan.checked) {
            percentageFactor += 5;
            document.getElementById("vanTD").innerHTML = '<i class ="fa fa-check" style="color: dodgerblue;"></i>'
        }
        if(CheckAT.checked){
            percentageFactor += 5;
            document.getElementById("atTD").innerHTML = '<i class ="fa fa-check" style="color: dodgerblue;"></i>'
        }
        if(Check4WD.checked){
            percentageFactor += 5;
            document.getElementById("4wdTD").innerHTML = '<i class ="fa fa-check" style="color: dodgerblue;"></i>'
        }
        // -----------------------------------------------
        if(M1.checked){
            if(now >= period1Start && now < period1End){
                benchmarkLine = 169 + 0.0267 * (M - 1186.32);
            }else if(now >= period2Start && now < period2End){
                benchmarkLine = 162 + 0.0267 * (M - 1186.32);
            }else if(now >= period3Start){
                benchmarkLine = 155 + 0.0267 * (M - 1186.32);
            }
            let B = benchmarkLine + percentageFactor/100 * (benchmarkLine);
            gradeDeterminant(CO2, B);
            document.getElementById("groupTD").innerText = "M1";
        }else if(N1.checked){
            if(now >= period1Start && now < period1End){
                benchmarkLine = 228.83 + 0.09 * (M - 1467.73);
            }else if(now >= period2Start && now < period2End){
                benchmarkLine = 223.98 + 0.09 * (M - 1467.73);
            }else if(now >= period3Start){
                benchmarkLine = 219.12 + 0.09 * (M - 1467.73);
            }
            let B = benchmarkLine + percentageFactor/100 * (benchmarkLine);
            gradeDeterminant(CO2, B);
            document.getElementById("groupTD").innerText = "N1, N2, M2";
        }
        document.getElementById("fuelTD").innerText = finalGrade;
        document.getElementById("fuelTD").style.backgroundColor = `${colorCode}`
        document.getElementById("fuelTD").style.color = `whitesmoke`;
        document.getElementById('nameTD').innerText = vehName.value;
        document.getElementById("messTD").innerText = mess.value + " kg";
        document.getElementById("coTD").innerText = Carbon.value + " g/km";
    }
})
document.getElementById('btnPrint').addEventListener('click', function () {
    window.print();
})
function printBTN() {
    document.getElementById('btnPrint').style.left = "15px";
}
// ===================================================
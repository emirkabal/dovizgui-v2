var app;

function loadApp() {
    app = setTimeout(showPage, 2000);
}

function showPage() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("dovizApp").style.display = "block";
    document.body.classList = ["bg-color-sky-light"];
}
//last update search box
let animated = false;
$(document).ready(function () {
    $("#search_box").on("keyup", function () {
        var val = $(this).val().replace(/İ/g, 'i').toLocaleLowerCase();
        var matcher = new RegExp(val, 'gi');
        $('.box').show().not(function () {
            return matcher.test($(this).find('.name, .code').text().replace(/İ/g, 'i').toLocaleLowerCase());
        }).hide();
        if(animated != true && val != "") {
            $('html').animate({
                scrollTop: $("#items").offset().top
            }, 1000);
            animated = true;
            setTimeout(() => {
                animated = false;
            }, 4000);
        } 
        $('#doviz_size').text($('#items .box').filter(':visible').length);
    });
});

function loadApp() {
    update();
}

function update() {
    hidePage();
    $.ajax({
        url: "/list",
        success: (res) => {
            let items = $('#items');
            let items_size_text = $('#doviz_size');
            items.empty();
            var result = JSON.parse(res);
            result.forEach(e => {
                let item = `
                        <div class="col-md-4 md-margin-b-30 box">
                    
                            <div class="pricing-list-v4 radius-10">
                        
                                <div class="pricing-list-v4-header">
                                    <h4 class="pricing-list-v3-title name">${e.name}</h4>
                                    <span class="pricing-list-v2-subtitle code">${e.code}</span>
                                </div>
                        
                                <div class="pricing-list-v4-content">
                                    <div class="margin-b-40">
                                        <span class="pricing-list-v4-price-sign"><i class="fa fa-dollar"></i></span>
                                        <span class="pricing-list-v4-price">${e.sell}</span>
                                        <span class="pricing-list-v4-subprice">₺</span>
                                    </div>
                                </div>

                            </div>

                        </div>`;
                items.append(item);
            });
            items_size_text.text(result.length);
            showPage();
        },
        error: () => {
            alert("Bir hata oluştu lütfen daha sonra tekrar deneyiniz.");
        }
    });
}

function hidePage() {
    document.getElementById("preloader").style.display = "block";
    document.getElementById("dovizApp").style.display = "none";
    document.body.style = null;
}

function showPage() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("dovizApp").style.display = "block";
    document.body.style.backgroundColor = "#ededed"
}
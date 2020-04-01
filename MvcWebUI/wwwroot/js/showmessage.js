function ShowInlineMessage(message, type) {
    var header = "";
    var c = "";
    if (type == "Success") {
        c = "alert-success";
        header = "Başarılı!";
    }
    else if (type == "Info") {
        c = "alert-info";
        header = "Bilgi!";
    }
    else if (type == "Warning") {
        c = "alert-warning";
        header = "Uyarı!";
    }
    else if (type == "Error") {
        c = "alert-danger";
        header = "Hata!";
    }
    $(window).scrollTop(0);
    $(".alert-parent").empty();
    $(".alert-parent").append("<div class='alert " + c + " fade in'>" +
        "<button type='button' class='close' data-dismiss='alert'></button>" +
        "<strong>" + header + "</strong> <span>" + message + "</span>" +
        "</div>");
    window.setTimeout(function () {
        $(".alert-parent").empty();
    }, 30000);
}
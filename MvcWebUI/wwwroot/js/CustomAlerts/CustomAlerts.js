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
    $("#alert-parent").empty();
    $("#alert-parent").append("<div class='alert  " + c + " alert-dismissible fade show' role='alert' > " +

        "<strong>" + header + "</strong> <span>   &nbsp&nbsp" + message + "</span>" +

        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>  <span /*style='color:#A9A9A9'*/ aria-hidden='true'>  &nbsp&nbsp&nbsp&times;</span> </button>  " +
        "</div>");
    window.setTimeout(function () {
        $("#alert-parent").empty();
    }, 10000);
}
function ShowModalMessage(message, type) {
    var header = "";
    if (type == "Success") {   
        header = "Başarılı!";
    }
    else if (type == "Info") {      
        header = "Bilgi!";
    }
    else if (type == "Warning") {
              header = "Uyarı!";
    }
    else if (type == "Error") {
            header = "Hata!";
    }

    Swal.fire({
        icon: type.toLowerCase(),
        title: header,
        text: message,
        allowOutsideClick: false,
        confirmButtonText:'<i class="fa fa-thumbs-up"></i> Tamam!',
        confirmButtonAriaLabel: 'Harika , başarılı!',
    });

}
function ShowToastrMessage(message, type) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if (type == "Success") {

        toastr.success(message);
    }
    else if (type == "Info") {

        toastr.info(message);
    }
    else if (type == "Warning") {

        toastr.warning(message);
    }
    else if (type == "Error") {

        toastr.error(message);
    }



}
function ShowTimerMessage(message, type) {   
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
        icon: type.toLowerCase(),
        title: message
    });
}
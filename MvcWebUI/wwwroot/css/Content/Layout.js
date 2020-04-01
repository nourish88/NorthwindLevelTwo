
var JugaLayout = function () {

    return {
        init: function () {
            $(".btn-confirm").live("click", function (event) {
                event.preventDefault();
                //confirm("Emin?");
                $("#btn_message_box").click();
            });
            $("#btn_yes").live("click", function (event) {
                $(".btn-continue").click();
            });
            //InitMenu();
            $(".remove-favorite-current-page").live("click", function (event) {
                $(this).removeClass("font-green-haze remove-favorite-current-page");
                $(this).addClass("add-favorite-current-page");
                event.stopPropagation();
            });
            $(".add-favorite-current-page").live("click", function (event) {
                $(this).addClass("font-green-haze remove-favorite-current-page");
                $(this).removeClass("add-favorite-current-page");
                event.stopPropagation();
            });
            $(".remove-favorite").live("click", function (event) {
                $this = $(this);
                $this.closest("li").animate({ opacity: 0 }, 500, function () { $this.closest("li").remove(); });
                $.ajax({
                    url: "/Menu/RemoveFromFavorites",
                    type: "GET",
                    cache: false,
                    data: { "PRJKOD": $this.closest("a").data("id"), "PRJURL": $this.closest("a").attr("href"), "PRJACK": $this.closest("a").find("span").html() },
                    dataType: "json",
                    success: function (d) {
                    },
                    error: function (d) {
                    }
                });
                event.stopPropagation();
            });
        },



        initModals: function () {
            $("[data-frame]").on("click", function (event) {
                event.preventDefault();
                $($(this).attr("href")).find(".modal-body").html("<iframe id='custom_frame' class='embed-responsive-item' src='" + $(this).data("frame") + "' />");
                $($(this).attr("href")).find("#btn_save_selected").data("parent", $(this));
                //$("#btn_custom_modal").click();
            });
            $("#btn_save_selected").on("click", function (event) {
                var text = $("#custom_frame").contents().find("#frame_text").val();
                var value = $("#custom_frame").contents().find("#frame_value").val();
                if (text != null && text != undefined && text != "")
                    $(this).data("parent").html(text + "&nbsp;<i class='fa fa-search'></i>");
                var textFieldId = $(this).data("parent").data("destination");
                //var valueFieldId = textFieldId.substring(0, textFieldId.lastIndexOf("_"));
                if (value != null && value != undefined && value != "")
                    $(textFieldId).val(value);
            });
        }

    }

}();
function InitMenu() {
    $(".leaf-node").off();
    $(".leaf-node").on("contextmenu", function (e) {
        var $div = $(".favorites-context-menu");
        var $a = $(".favorites-context-menu > a");
        var favList = $(".dropdown-favorites .dropdown-menu-list a");
        var $this = $(this);
        var contains = false;
        favList.each(function (i) {
            if ($(this).data("id") != null && $(this).data("id").indexOf($this.attr("pid")) >= 0)
                contains = true;
        });
        if (contains == false) {
            $a.html("Favorilere Ekle");
            $a.addClass("add-to-favorites");
            $a.removeClass("remove-from-favorites");
        }
        else {
            $a.html("Favorilerden Çıkar");
            $a.removeClass("add-to-favorites");
            $a.addClass("remove-from-favorites");
        }

        $a.data("id", $this.attr("pid"));
        $a.data("href", $this.attr("href"));
        $a.data("name", $this.find(".title").html());
        $div.css("left", e.pageX);
        $div.css("top", e.pageY);
        $div.css("display", "block");
        $div.animate({ opacity: 0.8 }, 200, function () { });
        e.preventDefault();
        e.stopPropagation();
    });
    $(document).on("click", function (e) {
        var $div = $(".favorites-context-menu");
        $div.animate({ opacity: 0 }, 200, function () { $div.css("display", "block"); });
    });
    $(".favorites-context-menu > a").off();
    $(".favorites-context-menu > a").on("click", function (e) {
        $this = $(this);
        if ($this.hasClass("add-to-favorites")) {
            var $li = "<li>";
            $li += "<a data-id='" + $this.data("id") + "' href='" + $this.data("href") + "'>";
            $li += "<span>" + $this.data("name") + "</span><i class='glyphicon glyphicon-star-empty pull-right remove-favorite'></i>";
            $li += "</a>";
            $li += "</li>";
            $(".dropdown-favorites .dropdown-menu-list").append($li);
            $.ajax({
                url: "/Menu/AddToFavorites",
                type: "GET",
                cache: false,
                data: { "PRJKOD": $this.data("id"), "PRJURL": $this.data("href"), "PRJACK": $this.data("name") },
                dataType: "json",
                success: function (d) {

                },
                error: function (d) {
                    alert("Error");
                }
            });

        }
        else {
            var $item = $(".dropdown-favorites .dropdown-menu-list [data-id='" + $this.data("id") + "']");
            $item.closest("li").remove();
            $.ajax({
                url: "/Menu/RemoveFromFavorites",
                type: "GET",
                cache: false,
                data: { "PRJKOD": $this.data("id"), "PRJURL": $this.data("href"), "PRJACK": $this.data("name") },
                dataType: "json",
                success: function (d) {
                },
                error: function (d) {
                }
            });
        }
    });
}

function SetBusy() {
    Metronic.startPageLoading({ animate: true, boxed: true });
}
function SetUnbusy() {
    window.setTimeout(function () {
        Metronic.stopPageLoading();
    }, 2000);
}
function ShowNotification(message, typeParam) {
    if (typeParam == "Success") {
        var type = "Başarı";
    }
    else if (typeParam == "Info") {
        var type = "Bilgi";
    }
    else if (typeParam == "Warning") {
        var type = "Uyarı";
    }
    else if (typeParam == "Danger") {
        var type = "Hata";
    }
    UINotific8.showNotification(message, type);
}
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
function ShowModalMessage(message, type) {
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
    swal({
        icon: type.toLowerCase(),
        title: header,
        text: message,
        allowOutsideClick: false,
        button: 'Tamam'
    });
}
function GetRoot() {
    return "";
}

function ShowAlert(message, tit, type) {
    var shortCutFunction = type;
    var msg = message;
    var title = tit;
    var $showDuration = "1000";
    var $hideDuration = "1000";
    var $timeOut = "600000";
    var $extendedTimeOut = "100000";
    var $showEasing = "swing";
    var $hideEasing = "linear";
    var $showMethod = "fadeIn";
    var $hideMethod = "fadeOut";
    
    //var toastIndex = toastCount++;

    toastr.options = {
        closeButton: true,
        debug: false,
        positionClass: 'toast-bottom-right',
        onclick: null,
        //positionClass: "toast-bottom-full-width",
        progressBar: true
    };

    //if ($('#addBehaviorOnToastClick').prop('checked')) {
    //    toastr.options.onclick = function () {
    //        alert('You can perform some custom action after a toast goes away');
    //    };
    //}

    //if ($showDuration.val().length) {
    toastr.options.showDuration = $showDuration;
    //}

    //if ($hideDuration.val().length) {
    toastr.options.hideDuration = $hideDuration;
    //}

    //if ($timeOut.val().length) {
    toastr.options.timeOut = $timeOut;
    //}

    //if ($extendedTimeOut.val().length) {
    toastr.options.extendedTimeOut = $extendedTimeOut;
    //}

    //if ($showEasing.val().length) {
    toastr.options.showEasing = $showEasing;
    //}

    //if ($hideEasing.val().length) {
    toastr.options.hideEasing = $hideEasing;
    //}

    //if ($showMethod.val().length) {
    toastr.options.showMethod = $showMethod;
    //}

    //if ($hideMethod.val().length) {
    toastr.options.hideMethod = $hideMethod;
    //}

    if (!msg) {
        msg = message;
    }

    $("#toastrOptions").text("Command: toastr[" + shortCutFunction + "](\"" + msg + (title ? "\", \"" + title : '') + "\")\n\ntoastr.options = " + JSON.stringify(toastr.options, null, 2));

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    var $toastlast = $toast;
    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            //alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
            $toast.remove();
        });
    }
    if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function () {
            //alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
        });
    }

    //$('#clearlasttoast').click(function () {
    //    toastr.clear($toastlast);
    //});
}
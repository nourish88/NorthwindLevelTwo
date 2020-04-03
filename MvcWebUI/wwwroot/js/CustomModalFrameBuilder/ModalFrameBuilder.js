$("[data-frame]").on("click", function (event) {
    event.preventDefault();
    $($(this).attr("href")).find(".modal-body").html("<iframe id='custom_frame' class='embed-responsive-item' src='" + $(this).data("frame") + "' />");
    $($(this).attr("href")).find("#btn_save_selected").data("parent", $(this));
    //$("#btn_custom_modal").click();
});
$("#btn_popup_save_selected").on("click", function (event) {
    var text = $("#custom_frame").contents().find("#frame_text").val();
    var value = $("#custom_frame").contents().find("#frame_value").val();
    if (text != null && text != undefined && text != "")
        $(this).data("parent").html(text + "&nbsp;<i class='fa fa-search'></i>");
    var textFieldId = $(this).data("parent").data("destination");
    //var valueFieldId = textFieldId.substring(0, textFieldId.lastIndexOf("_"));
    if (value != null && value != undefined && value != "")
        $(textFieldId).val(value);
});
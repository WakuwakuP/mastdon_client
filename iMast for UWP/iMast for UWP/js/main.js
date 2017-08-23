// コードをここに挿入。
WinJS.UI.processAll().done(function () {
    var splitView = document.querySelector(".splitView").winControl;
    new WinJS.UI._WinKeyboard(splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
});

// Toolbar
//WinJS.Namespace.define("ToolBar", {
//    outputCommand: WinJS.UI.eventHandler(function (ev) {
//        var status = document.querySelector('.status');
//        var command = ev.currentTarget;
//        if (command.winControl) {
//            var label = command.winControl.label || command.winControl.icon || "button";
//            var section = command.winControl.section || "";
//            var msg = section + " command " + label + "was pressed.";
//            status.textContent = msg;
//        }
//    })
//});


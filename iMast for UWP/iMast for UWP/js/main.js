// コードをここに挿入。

// アプリデータの管理用変数
var applicationData = Windows.Storage.ApplicationData.current;
var localSettings = applicationData.localSettings;
var localFolder = applicationData.localFolder;

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

// 初回起動時の処理
var startUp = localSettings.values["StartUp"];

if (!startUp || startUp === false) {
    localSettings.values["StartUp"] = false;
    var oauth = document.querySelector("#OAuth").winControl;
    oauth.show();
}

function OAuth() {
    var mastodonHost = $("#InstanceDomain").val();
    var clientName = $("#clientName").val();
    if (mastodonHost !== "" && clientName !== "") {
        $.post("https://"+mastodonHost+"/api/v1/apps", {
            client_name: clientName,
            redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
            website: "https://wakuwakup.net/mastdon_client",
            scopes: "read write follow"
        }, function (json) {
            localSettings.values["OAuth_id"] = json.id;
            localSettings.values["OAuth_redirect_uri"] = json.redirect_uri;
            localSettings.values["OAuth_client_id"] = json.client_id;
            localSettings.values["OAuth_client_secret"] = json.client_secret;
            document.querySelector("#OAuth").winControl.hide(none);
            localSettings.values["StartUp"] = true;
        });
    }
}

(function () {
    "use strict";
    WinJS.Application.onready = function () {
        WinJS.UI.processAll();
    };
    WinJS.Application.start();
})();
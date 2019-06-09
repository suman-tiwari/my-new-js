desktopBootloader = function() {
    storeddata = localStorage.getItem('desktop');
    actualData = JSON.parse(storeddata);
    if (!!actualData) {
        desktop.background = actualData.background;
        desktop.height = actualData.height;
        desktop.width = actualData.width;
        desktop.backgroundSize = actualData.backgroundSize;
    }
}

windowsBootloader = function() {
    storeddata = localStorage.getItem('windows');
    actualData = JSON.parse(storeddata);
    if (!!actualData) {
        actualData.forEach(function(windowData) {
            var newWindow = new ourWindow();
            newWindow.model = windowData;
            newWindow.render();
            collection.objects.push(newWindow);
        });
    }
}

desktopBootloader();
windowsBootloader();
desktop.render();

setInterval(() => {
    desktop.save();
    collection.save();
}, 2000);

var menu = {
    changeBg: function() {
        var fileObject = Q('.file');
        fileObject.click();

        fileObject.addEventListener('change', function() {
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                desktop.background = "url(" + reader.result + ")";
                desktop.render();
            }, false);

            if (fileObject.files[0]) {
                reader.readAsDataURL(fileObject.files[0]);
            }
        });
    },

    changeBgSize: function() {
        desktop.backgroundSize = "contain";
        desktop.render();
    },

    changeBgSizeCover: function() {
        desktop.backgroundSize = "cover";
        desktop.render();
    }
}


Q('#changeBg').addEventListener('click', menu.changeBg);
Q('#bgSizeContain').addEventListener('click', menu.changeBgSize);
Q('#bgSizeCover').addEventListener('click', menu.changeBgSizeCover);

var menu = Q('.menu');
Q('.desktop').addEventListener('contextmenu', function() {
    menu.classList.toggle("hidden");
    menu.style.top = event.clientY - 15 + "px";
    menu.style.left = event.clientX + "px";
})

Q('.desktop').addEventListener('click', function() {
    menu.classList.add("hidden");
})
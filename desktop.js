var desktop = {
    background: "red",
    height: '100%',
    width: '100%',
    backgroundSize: "auto",
    render: function() {
        var desktop = Q('.desktop');
        desktop.style.height = this.height;
        desktop.style.width = this.width;
        desktop.style.background = this.background;
        desktop.style.backgroundSize = this.backgroundSize;

        Q('#addWindow').onclick = function() {
            var lastWindow = collection.objects.reverse()[0];

            var newWindow = new ourWindow();
            if (!lastWindow) {
                lastWindow = newWindow
            }
            newWindow.model.id = lastWindow.model.id + 1;
            newWindow.model.top = parseInt(lastWindow.model.top) + 12 + 'px';
            newWindow.model.left = parseInt(lastWindow.model.left) + 12 + 'px';
            newWindow.model['z-index'] = lastWindow.model['z-index'] + 1;
            newWindow.render();
            collection.objects.push(newWindow);
        }
    },

    save: function() {
        var model = {
            background: this.background,
            height: this.height,
            width: this.width,
            backgroundSize: this.backgroundSize
        }

        localStorage.setItem('desktop', JSON.stringify(model))
    }
}
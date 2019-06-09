var elemnt;

function dragMouseDown(thisWindow, e) {
    e = e || window.event;
    elemnt = thisWindow.viewObject;
    thisDraggedWindow = thisWindow;

    e.preventDefault();
    //mouse position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call function when mouse moves
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element to the new calculated
    elemnt.style.top = elemnt.offsetTop - pos2 + "px";
    elemnt.style.left = elemnt.offsetLeft - pos1 + "px";
    thisDraggedWindow.model.top = elemnt.style.top;
    thisDraggedWindow.model.left = elemnt.style.left;
}

function closeDragElement() {
    // stop moving when the mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
}
// }

var ourWindow = function() {
    this.viewObject = null;
    this.model = {
        id: 0,
        height: '500px',
        width: '600px',
        top: '20px',
        left: '50px',
        'z-index': 0,
        state: 'normal'
    }

    this.minimize = function() {
        this.viewObject.classList.add('minimize');
        this.viewObject.classList.remove('maximize');
        this.viewObject.querySelector('.fa-square').style.display = "none";
        this.viewObject.querySelector('.fa-window-restore').style.display = "inline";
        this.model.state = "minimized";
    }

    this.maximize = function() {
        this.viewObject.classList.add('maximize');
        this.viewObject.classList.remove('minimize');
        console.log(this.viewObject);
        this.viewObject.querySelector('.fa-square').style.display = "none";
        this.viewObject.querySelector('.fa-window-restore').style.display = "inline";
        this.model.state = "maximized";
    }

    this.restore = function() {
        this.viewObject.classList.remove('maximize');
        this.viewObject.classList.remove('minimize');
        this.viewObject.querySelector('.fa-square').style.display = "inline";
        this.viewObject.querySelector('.fa-window-restore').style.display = "none";
        this.model.state = "normal";
    }

    this.close = function() {
        var newThis = this;
        this.viewObject.remove();
        collection.objects = collection.objects.filter(function(item) {
            return (item.model.id != newThis.model.id)
        })
        delete(this);
    }

    this.reRender = function() {
        this.viewObject.style.top = this.model.top;
        this.viewObject.style.height = this.model.height;
        this.viewObject.style.width = this.model.width;
        this.viewObject.style.left = this.model.left;
        this.viewObject.style.zIndex = this.model['z-index'];
        var desktop = Q('.desktop');
        desktop.append(this.viewObject);
    }

    this.render = function() {
        var thisWindow = this;
        var originalWindow = Q('#originalWindow');
        this.viewObject = originalWindow.cloneNode(true);
        this.viewObject.style.top = this.model.top;
        this.viewObject.style.height = this.model.height;
        this.viewObject.style.width = this.model.width;
        this.viewObject.style.left = this.model.left;
        this.viewObject.style.zIndex = this.model['z-index'];
        this.viewObject.id = "random" + this.model.id;
        this.viewObject.classList.remove('hidden');
        var desktop = Q('.desktop');
        this.viewObject.querySelector('.fa-times').addEventListener('click', function(e) {
            e.stopPropagation();
            thisWindow.close();
        });
        this.viewObject.querySelector('.fa-square').addEventListener('click', function() {
            thisWindow.maximize();
        });
        this.viewObject.querySelector('.fa-window-restore').addEventListener('click', function() {
            thisWindow.restore();
        });
        this.viewObject.querySelector('.fa-minus').addEventListener('click', function() {
            thisWindow.minimize();
        });
        this.viewObject.addEventListener('click', function() {
            collection.objects.forEach(function(obj) {
                obj.model["z-index"] = 0;
            })
            thisWindow.model["z-index"] = 999;
            thisWindow.reRender();
        });

        if (this.model.state == "normal") {
            this.viewObject.classList.remove('maximize');
            this.viewObject.classList.remove('minimize');
            this.viewObject.querySelector('.fa-window-restore').style.display = "none";
            this.viewObject.onmousedown = function() {
                dragMouseDown(thisWindow, event);
            };
        }
        if (this.model.state == "maximized") {
            this.viewObject.classList.add('maximize');
            this.viewObject.classList.remove('minimize');
            this.viewObject.querySelector('.fa-square').style.display = "none";
            this.viewObject.querySelector('.fa-window-restore').style.display = "inline";
            this.viewObject.onmousedown = function() {
                dragMouseDown(thisWindow, event);
            };
        }
        if (this.model.state == "minimized") {
            this.viewObject.classList.remove('maximize');
            this.viewObject.classList.add('minimize');
            this.viewObject.querySelector('.fa-square').style.display = "none";
            this.viewObject.querySelector('.fa-window-restore').style.display = "inline";
            this.viewObject.onmousedown = function() {
                return null;
            };
        }


        desktop.append(this.viewObject);
    }
}
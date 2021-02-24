/* Basic Implementation of a Dynamic Table */
function DynamicTable(tableElementId, width, height) {
    this.width = width;
    this.height = height;
    this.tds = new Array();
    this.div = document.getElementById(tableElementId);
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');
    this.removeRowCallback = null;

    for (var row = 0; row < height; row++) {
        var tr = document.createElement('tr');
        for (var col = 0; col < width; col++) {
            if (row == 0) {
                var th = document.createElement('th');
                th.style.textAlign = "center";
                tr.appendChild(th);
                if (this.tds[col] == null) {
                    this.tds[col] = new Array();
                }
                this.tds[col][row] = th;
            } else {
                var td = tr.insertCell(-1);
                td.style.textAlign = "center";
                if (this.tds[col] == null) {
                    this.tds[col] = new Array();
                }
                this.tds[col][row] = td;
            }
        }
        if (row == 0) {
            this.thead.appendChild(tr);
        } else {
            this.tbody.appendChild(tr);
        }
    }
    this.element = document.createElement('table');
    this.element.appendChild(this.thead);
    this.element.appendChild(this.tbody);
    this.element.className = "table";
    this.div.appendChild(this.element);

    if (!DynamicTable.classDefined) {
        DynamicTable.classDefined = true;

        DynamicTable.prototype.setRemoveRowCallback = function(fct) {
            this.removeRowCallback = fct;
        }

        DynamicTable.prototype.addRow = function() {
            this.height++;
            var tr = this.element.insertRow(-1);
            for (var col = 0; col < this.width; col++) {
                var td = tr.insertCell(-1);
                td.style.textAlign = "center";
                if (this.tds[col] == null) {
                    this.tds[col] = new Array();
                }
                this.tds[col][this.height - 1] = td;
            }
            this.tbody.appendChild(tr);
        };

        DynamicTable.prototype.removeRow = function(rowIndex) {
            if (rowIndex < 0 || rowIndex > this.height - 1) {
                throw "removeRow() error: rowIndex out of range";
            }
            for (var i = 0; i < this.width; i++) {
                delete this.tds[i][rowIndex];
                for (var j = rowIndex; j < this.height - 1; j++) {
                    this.tds[i][j] = this.tds[i][j + 1];
                }
                this.tds[i].pop();
            }
            this.element.deleteRow(rowIndex);
            this.height--;
        };

        DynamicTable.prototype.drawText = function(x, y, text, fontColor) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                throw "drawText() error: co-ords out of range";
            }
            if (fontColor) {
                this.tds[x][y].style.color = fontColor;
            }
            this.tds[x][y].innerHTML = text;
        };

        DynamicTable.prototype.drawButton = function(x, y, symbol) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                throw "drawButton() error: co-ords out of range";
            }

            this.tds[x][y].innerHTML = "<a name=\"" + symbol + "\" href=\"#\">&#128465;</a>";
            this.tds[x][y].name = symbol;

            var tbl = this;
            this.tds[x][y].onclick = function(e) {
                e = e || window.event;
                var obj = e.target || e.srcElement;
                tbl.removeRowCallback(obj.name);
            };
        };

        DynamicTable.prototype.drawBoldText = function(x, y, text, id) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                throw "drawBoldText() error: co-ords out of range";
            }
            if (id) {
                this.tds[x][y].setAttribute('id', id);
            }
            this.tds[x][y].innerHTML = text;
        };

        DynamicTable.prototype.setColor = function(x, y) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                throw "setColor() error: co-ords out of range";
            }
            this.tds[x][y].setAttribute(((this.tds[x][y].getAttribute('className') != null) ? 'className' : 'class'), 'success');
        };

        DynamicTable.prototype.setBlankColor = function(x, y) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                throw "setBlankColor() error: co-ords out of range";
            }
            this.tds[x][y].setAttribute(((this.tds[x][y].getAttribute('className') != null) ? 'className' : 'class'), '');
        };

        DynamicTable.prototype.setTimestamp = function(x, y, timestamp) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                throw "setDate() error: co-ords out of range";
            }
            this.tds[x][y].timestamp = timestamp;
        };

        DynamicTable.prototype.getTimestamp = function(x, y) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
                return null;
            }
            return this.tds[x][y].timestamp ? this.tds[x][y].timestamp : null;
        };
    }
    return this;
}
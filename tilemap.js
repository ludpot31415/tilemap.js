//Tilemap Library

function Tilemap() {
    this.width = 10;
    this.height = 10;
    this.fillTile = 0;
    this.map = [];
    this.cells = [];

    //Generate tilemap with defined fillTile
    this.create = function() {
        for (y = 0; y < this.height; y++) {
            this.map[y] = [];
            for (x = 0; x < this.width; x++) {
                this.map[y][x] = this.fillTile;
            }
        }
    }
    
    //Bake methods
    this.bakeWall = function(tileValue,a,b,c,d) {
        if (arguments.length == 1) {
            x1 = 0;
            y1 = 0;
            x2 = this.map[0].length-1;
            y2 = this.map.length-1;
        } else if (arguments.length == 5) {
            x1 = a;
            y1 = b;
            x2 = c;
            y2 = d;
        } else {
            throw new Error("missing arguments");
            return(false);
        }
        
        for (y = y1; y < y2+1; y++) {
            for (x = x1; x < x2+1; x++) {
                if (y == y1 || y == y2) {
                    if (x => x1 && x <= x2) {
                        this.map[y][x] = tileValue;
                    }
                } else {
                    this.map[y][x1] = tileValue;
                    this.map[y][x2] = tileValue;
                }
            }
        }
    }
    
    this.bakeRect = function(tileValue,fillTileValue,a,b,c,d) {
        if (arguments.length == 2) {
            x1 = 0;
            y1 = 0;
            x2 = this.map[0].length-1;
            y2 = this.map.length-1;
        } else if (arguments.length == 6) {
            x1 = a;
            y1 = b;
            x2 = c;
            y2 = d;
        } else {
            throw new Error("missing arguments");
            return(false);
        }
        

        //Outer rectangle / wall (tileValue)
        for (y = y1; y < y2+1; y++) {
            for (x = x1; x < x2+1; x++) {
                if (y == y1 || y == y2) {
                    if (x => x1 && x <= x2) {
                        this.map[y][x] = tileValue;
                    }
                } else {
                    this.map[y][x1] = tileValue;
                    this.map[y][x2] = tileValue;
                }
            }
        }
        
        //Rectangle / Fill (fillTileValue)
        for (y = y1; y < y2; y++) {
            for (x = x1+1; x < x2; x++) {
                this.map[y][x] = fillTileValue;
            }
        }
        
            
    }

    //Replace by tileValue
    this.replace = function(tileValue, newTileValue) {
        for (y = 0; y < this.map.length; y++) {
            for (x = 0; x < this.map[0].length; x++) {
                if (this.map[y][x] == tileValue) {
                    this.map[y][x] = newTileValue;
                }
            }
        }
    }
    
    //Replace all values regardless of tileValue
    this.replaceAll = function(newTileValue) {
        for (y = 0; y < this.map.length; y++) {
            for (x = 0; x < this.map[0].length; x++) {
                this.map[y][x] = newTileValue;
            }
        }
    }
    
    //Get or set tileValue of given position
    this.pos = function(x, y, tileValue) {
        if (arguments.length == 2) {
            return(this.map[y][x]);
        } else if (arguments.length == 3) {
            this.map[y][x] = tileValue;
        } else {
            throw new Error("pos requires 2 or 3 arguments");
        }
    }
    
    //Get surrounding tiles in an array, clockwise from upper tile
    this.surround = function(x, y) {
        return([
            this.map[y-1][x],
            this.map[y-1][x+1],
            this.map[y][x+1],
            this.map[y+1][x+1],
            this.map[y+1][x],
            this.map[y+1][x-1],
            this.map[y][x-1],
            this.map[y-1][x-1]
        ]);
    }
    
    //Print tilemap to developer console
    this.printToDev = function() {
        xString = "";
        for (y = 0; y < this.map.length; y++) {
            for (x = 0; x < this.map[0].length; x++) {
                xString += this.map[y][x].toString() + "  ";
            }
            xString += "\n";
        }
        console.log(xString);
    }

    this.createCell = function(x,y) {
        this.cells.push(new TilemapCell(x,y));
    }
}

function TilemapCell(x,y,tileValue, valueDictionary = {}) {
    if (arguments.length < 2) {
        throw new Error("createCell requires 2 arguments. Vector is now 0,0.")
        x = 0;
        y = 0;
    }
    this.pos = createVector(x,y);
    this.tileValue = "#";
}

document.addEventListener('DOMContentLoaded', function() {
    //QuickTest
    var tilemap = new Tilemap(); tilemap.create()
    tilemap.printToDev();
}, false);

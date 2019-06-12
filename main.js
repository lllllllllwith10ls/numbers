class Number {
	constructor(str) {
		this.type = "number";
		if(str[0] === "1" && str[1] === "0" && str[2] === "^") {
			this.magnitude = new Number(str.substring(3, str.length));
		} else {
			this.value = parseFloat(str);
		}
	}
	clean() {
		if(this.type === "number") {
			if(this.value != undefined) {
				if(this.value > 1e6) {
					return new Number("10^"+Math.log10(this.value).toString());
				}
			} else {
				this.magnitude = this.magnitude.clean();
				return this;
			}
		}
	}
	toString() {
		if(this.magnitude) {
			return "10^"+this.magnitude.toString();
		} else {
			return Math.floor(this.value).toString();
		}
	}
	static comp(a,b) {
		if(a.value != undefined && b.value != undefined) {
			if(a.value > b.value) {
				return a;
			} else if(a.value < b.value) {
				return b;
			} else {
				return "equal";
			}
		} else if(a.value != undefined && b.value == undefined) {
			return b;
		} else if(b.value != undefined && a.value == undefined) {
			return a;
		} else {
			if(Number.comp(a.magnitude,b.magnitude) === a.magnitude) {
				return a;
			} else if(Number.comp(a.magnitude,b.magnitude) === b.magnitude) {
				return b;
			} else {
				return "equal";
			}
		}
	}
}
let add = 0;
let add2 = 0
let add3 = 0
let add4 = 0.001;
let number = new Number("0");
let phase = 0;
let threshold1 = new Number("10000");
function update() {
	add3 += add4;
	add2 += add3;
	add += add2;
	if(phase === 0) {
		number.value += add;
	}
	number = number.clean();
	document.getElementById("number").innerHTML = number.toString();
}
setInterval(update,10);

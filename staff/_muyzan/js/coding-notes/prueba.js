concat(1).concat(2).concat(3).concat(4).toString();

function concat(text){
	var accum = text;

return {
		concat: function(text){
			accum = accum + " " + text;

			return this;
        },
		toString: function(){
			return accum;
		}
}
}

a = concat(1).concat(6).concat(9)

//console.log(a)

console.log(a.concat(3))
console.log(a.toString())
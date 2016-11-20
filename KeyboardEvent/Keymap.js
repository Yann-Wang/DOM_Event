/*
*  注册按键监听函数
*
* */
function Keymap(bindings){
	this.map={};
	if(bindings){
		for(var name in bindings)
			this.bind(name,bindings[name]);
	}
}

Keymap.prototype.bind=function(key,func){
	this.map[Keymap.normalize(key)] = func;
};

Keymap.prototype.unbind = function(key){
	delete this.map[Keymap.normalize(key)];
};

Keymap.prototype.install = function(element){
	var keymap = this;
	function handler(event){
		return keymap.dispatch(event,element);
	}

	if(element.addEventListener)
		element.addEventListener("keydown",handler,false);
	else if(element.attachEvent)
		element.attachEvent("onkeydown",handler);
};

Keymap.prototype.dispatch = function(event,element){
	var modifiers = "";
	var keyname = null;

	if(event.altKey)
		modifiers += "alt_";
	if(event.ctrlKey)
		modifiers += "ctrl_";
	if(event.metaKey)
		modifiers += "meta_";
	if(event.shiftKey)
		modifiers += "shift_";

	if(event.key)
		keyname = event.key;
	else if(event.keyIdentifier && event.keyIdentifier.substring(0,2)!== "U+")
		keyname = event.keyIdentifier;
	else
		keyname = Keymap.keyCodeToKeyName[event.keyCode];

	if(!keyname)
		return;

	var keyid = modifiers + keyname.toLowerCase();

	var handler = this.map[keyid];

	if(handler){
		var retval = handler.call(element,event,keyid);

		if(retval === false){
			if(event.stopPropagation)
				event.stopPropagation();
			else
				event.cancelBubble = true;

			if(event.preventDefault)
				event.preventDefault();
			else
				event.returnValue = false;
		}

		return retval;
	}
};

Keymap.normalize = function(keyid){
	keyid = keyid.toLowerCase();
	var words = keyid.split(/\s+|[\-+_]/);
	var keyname = words.pop();
	keyname = Keymap.aliases[keyname] || keyname;
	words.sort();
	words.push(keyname);
	return words.join("_");
};

Keymap.aliases = {
	"escape": "esc",
	"delete": "del",
	"return": "enter",
	"ctrl": "control",
	"space": "spacebar",
	"ins": "insert"
};

Keymap.keyCodeToKeyName = {
	//使用词或方向键的按键
	8:"Backspace",
	9:"Tab",
	13:"Enter",
	16:"Shift",
	17:"Control",
	18:"Alt",
	19:"Pause",
	20:"CapsLock",
	27:"Esc",
	32:"Spacebar",
	33:"PageUp",
	34:"PageDown",
	35:"End",
	36:"Home",
	37:"Left",
	38:"Up",
	39:"Right",
	40:"Down",
	45:"Insert",
	46:"Del",
    //主键盘（非数字小键盘）上的数字键
	48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
    //字母按键，注意我们不区分大小写（统一按大写）
	65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",
	75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",
	86:"V",87:"W",88:"X",89:"Y",90:"Z",
    //数字小键盘的数字和标点符号按键（Opera不支持这些）
    96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
    106:"Multiply",107:"Add",109:"Subtract",110:"Decimal",111:"Divide",
    //功能键
    112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",
    118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",
    124:"F13",125:"F14",126:"F15",127:"F16",128:"F17",129:"F18",
    130:"F19",131:"F20",132:"F21",133:"F22",134:"F23",135:"F24",
    //不需要按下Shift键的标点符号键
    //连字符不兼容，FF返回的编码和建好一样
    59:";",61:"=",186:";",187:"=", // Firefox和Opera返回59，61
    188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"

};
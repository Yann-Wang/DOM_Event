## custom event

### createEvent / dispatchEvent

```html

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div>click me</div>
	<script>
		// custom event: goBigBlue
		var cheer = document.createEvent('CustomEvent');
		//initCustomEvent(event,bubble,cancelable,event.detail)
		cheer.initCustomEvent('goBigBlue',true,false,{goBigBlueIs:'its gone!'});

		var div = document.querySelector('div');
		div.addEventListener('goBigBlue',function(event){
			console.log(event.detail.goBigBlueIs);
		});
		
		div.addEventListener('click',function(){
			console.log("dispatch goBigBlue event");
			div.dispatchEvent(cheer);
		},false);



	</script>
	
</body>
</html>

```
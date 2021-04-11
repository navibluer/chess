$(document).ready(function(){
	var i = 0;
	while (i < 4) {
		// append 4 row
		$('.board').append('<div class="row'+i+'"></div>');
		var j = 0;
		while (j < 8) {
			// append 8 collumn
			if (i==0 && j==3) {
				// 2 cross line
				$('.row'+i).append('<div class="check slash"></div>');
			} else if ((i==1 && (j==0 || j==6)) || (i==2 && j%2==1)) {
				if (j==1 || j==7) {
					// small L on right-bottom & left-top
					$('.row'+i).append('<div class="check"><div class="rb"></div><div class="lt"></div></div>');
				} else {
					// small L on right-bottom
					$('.row'+i).append('<div class="check"><div class="rb"></div></div>');
				}
			} else if ((i==1 && (j==1 || j==7)) || (i==2 && j%2==0)) {
				if (j==0 || j==6) {
					// small L on left-bottom & right-top
					$('.row'+i).append('<div class="check"><div class="lb"></div><div class="rt"></div></div>');
				} else {
					// small L on left-bottom
					$('.row'+i).append('<div class="check"><div class="lb"></div></div>');
				}
			} else if (i==3 && j%2==0) {
				// small L on left-top
				$('.row'+i).append('<div class="check"><div class="lt"></div></div>');
			} else if (i==3 && j%2==1) {
				// small L on right-top
				$('.row'+i).append('<div class="check"><div class="rt"></div></div>');
			} else {
				// normal check
				$('.row'+i).append('<div class="check"></div>');
			}
			j++;
		}
		i++;
	}
});
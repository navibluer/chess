$(document).ready(function(){
	// draw the checkerboard
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

	// draw the chess route
	i = 0;
	// append 10 row
	while (i < 10) {
		j = 0;
		// append 9 collumn
		while (j < 9) {
			var id = i*10+j;
			$('.route').append('<div id="'+id+'" class="spot"></div>');
			j++;
		}
		i++;
	}

	// add chessman
	// black
	$('#30, #32, #34, #36, #38').each(function(){
		$(this).append('<span class="chessman_black pawns">卒</span>');
	});
	$('#21, #27').each(function(){
		$(this).append('<span class="chessman_black cannons">包</span>');
	});
	$('#0, #8').each(function(){
		$(this).append('<span class="chessman_black rooks">車</span>');
	});
	$('#1, #7').each(function(){
		$(this).append('<span class="chessman_black knights">馬</span>');
	});
	$('#2, #6').each(function(){
		$(this).append('<span class="chessman_black elephants">象</span>');
	});
	$('#3, #5').each(function(){
		$(this).append('<span class="chessman_black advisors">士</span>');
	});
	$('#4').append('<span class="chessman_black generals">將</span>');

	// red
	$('#60, #62, #64, #66, #68').each(function(){
		$(this).append('<span class="chessman_red pawns">兵</span>');
	});
	$('#71, #77').each(function(){
		$(this).append('<span class="chessman_red cannons">炮</span>');
	});
	$('#90, #98').each(function(){
		$(this).append('<span class="chessman_red rooks">俥</span>');
	});
	$('#91, #97').each(function(){
		$(this).append('<span class="chessman_red knights">傌</span>');
	});
	$('#92, #96').each(function(){
		$(this).append('<span class="chessman_red elephants">相</span>');
	});
	$('#93, #95').each(function(){
		$(this).append('<span class="chessman_red advisors">仕</span>');
	});
	$('#94').append('<span class="chessman_red general">帥</span>');

	// Rules

	// return the team of chessman
	function chess_team(chessman) {
		return chessman.attr('class').split(' ')[0];
	}
	// follow chess rules to select valid target
	function valid_target(picked) {
		// cannons moving rules
		function cannons_move(direct) {
			var next;
			var bound;
			var step;
			function go() {
				next += step;
			}
			switch (direct) {
				case 'up':
					next = picked_id-10;
					bound = function() {return next >= 0;};
					step = -10;
					break;
				case 'down':
					next = picked_id+10;
					bound = function() {return next <= 98;};
					step = 10;
					break;
				case 'left':
					next = picked_id-1;
					bound = function() {return next >= Math.floor(picked_id/10)*10;};
					step = -1;
					break;
				case 'right':
					next = picked_id+1;
					bound = function() {return next <= Math.ceil((picked_id+1)/10)*10-2;};
					step = 1;
					break;
			}
			while ($('#'+next).children().length == 0 && bound()) {
				valid.push(next);
				go();
			}
		}
		// Moving Cases
		const chessman = picked.children();
		const chess_class = chessman.attr('class').split(' ')[1];
		const picked_id = parseInt(picked.attr('id'));
		var valid = [];
		switch (chess_class) {
			case 'pawns':
				valid.push(picked_id-10);
				break;
			case 'cannons':
				cannons_move('up');
				cannons_move('down');
				cannons_move('left');
				cannons_move('right');
				// // up
				// up = picked_id-10;
				// while ($('#'+(up)).children().length == 0 && up >= 0) {
				// 	valid.push(up);
				// 	up -= 10;
				// }
				// // down
				// down = picked_id+10;
				// while ($('#'+(down)).children().length == 0 && down <= 98) {
				// 	valid.push(down);
				// 	down += 10;
				// }
				// // left
				// left = picked_id-1;
				// while ($('#'+(left)).children().length == 0 && left >= Math.floor(picked_id/10)*10) {
				// 	valid.push(left);
				// 	left -= 1;
				// }
				// // right
				// right = picked_id+1;
				// while ($('#'+(right)).children().length == 0 && right <= Math.ceil((picked_id+1)/10)*10-2) {
				// 	valid.push(right);
				// 	right += 1;
				// }
				break;
			case 'rooks':
				cannons_move('up');
				cannons_move('down');
				cannons_move('left');
				cannons_move('right');
				// rooks eating rule
				var x = Math.floor(picked_id/10)*10;
				var left;
				var right;
				for(var chess_id = x; chess_id <= x+8; chess_id++) {
					var wantoeat = $('#'+chess_id).children();
					// find the chessman on x that can eat
					if (wantoeat.length > 0 && chess_team(chessman) != chess_team(wantoeat) && chess_id < picked_id) {
						left = chess_id;
					}
					if (wantoeat.length > 0 && chess_team(chessman) != chess_team(wantoeat) && chess_id > picked_id) {
						right = chess_id;
						break;
					}
				}
				function push_can_eat(can_eat) {
					if (can_eat) {
						valid.push(can_eat);
					}
				}
				push_can_eat(left);
				push_can_eat(right);
				break;
			case 'knights':
				break;
			case 'elephants':
				break;
			case 'advisors':
				break;
			case 'general':
				break;
		}
		// console.log(valid);
		return valid;
	}
	// whether target is valid
	function follow_rules(picked, target) {
		const picked_id = parseInt(picked.attr('id'));
		const target_id = parseInt(target.attr('id'));
		var follow = false;
		// avoid to target to the original spot
		if (picked_id == target_id) {
			return follow;
		}
		if (valid_target(picked).includes(target_id)) {
			follow = true;
		}
		return follow;
	}
	

	// CLICK
	var hold;
	$('.route').children().each(function(){
		// click spot
		$(this).click(function(){
			var chessman = $(this).children();
			// if already picked chessman & follow the rules
			if (hold) {
				const follow = follow_rules(hold, $(this));
				switch (true) {
					// do not follow rules & target to blank spot
					// (need this case because blank spot has no class to split)
					case !follow && chessman.length == 0:
						break;
					// do not follow rules & do not target to self team
					case !follow && hold.children().attr('class').split(' ')[0] != chessman.attr('class').split(' ')[0]:
						break;
					// follow rules & target to blank spot
					// (need this case because blank spot has no class to split)
					case follow && chessman.length == 0:
						// put it down
						$('.valid_target').removeClass('valid_target');
						$(this).html(hold.contents());
						$(this).children().removeClass('active');
						hold = null;
						break;
					// target to self chessman, place the hold
					case hold.children().attr('class').split(' ')[0] == chessman.attr('class').split(' ')[0]:
						// remove original picked
						hold.children().removeClass('active');
						// pick the new chessman
						hold = $(this);
						chessman.addClass('active');
						$('.valid_target').removeClass('valid_target');
						$.each(valid_target(hold), function() {
							$('#'+this).addClass('valid_target');
						});
						break;
					//  eating another chessman
					case follow && chessman.length > 0:
						// eat red
						if (chessman.hasClass('chessman_red')) {
							$('#eaten_red').append($(this).contents());
						// eat black
						} else {
							$('#eaten_black').append($(this).contents());
						}
						// put it down
						$('.valid_target').removeClass('valid_target');
						$(this).html(hold.contents());
						$(this).children().removeClass('active');
						hold = null;
						break;
				}
			// if not picked & spot has chess
			} else if (!hold && chessman.length > 0) {
				// pick it
				hold = $(this);
				chessman.addClass('active');
				$.each(valid_target(hold), function() {
					$('#'+this).addClass('valid_target');
				});
			}
			
		});
	});
});

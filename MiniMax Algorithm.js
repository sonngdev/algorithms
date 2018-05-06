const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const gamestate = ["x", "e", "o", "e", "e", "e", "e", "e", "e"];

function minimaxAI(gamestate, stepdown, thisturn) {
		function isTerminal(gamestate) {
			for (let i = 0; i < win.length; i++) {
				if (gamestate[win[i][0]] === gamestate[win[i][1]] && gamestate[win[i][1]] === gamestate[win[i][2]] && gamestate[win[i][0]] !== "e") {
					return {is: true, why: gamestate[win[i][0]]}
				}
			}
			if (!gamestate.includes("e")) {
				return {is: true, why : "draw"}
			}
			return {is: false, why: null}
		}

		let a = isTerminal(gamestate);
		if (a.is) {
			if (a.why === "x") {
				return {score: 10-stepdown};
			} else if (a.why === "o") {
				return {score: stepdown-10};
			} else {
				return {score: 0};
			}
		} else if (stepdown === 7) {
			return {score: 0};
		} else {
			let eArr = [], i = -1;
			while (gamestate.indexOf("e", i+1) !== -1) {
				i = gamestate.indexOf("e", i+1);
				eArr.push(i);
			}
			if (thisturn === "x") {
				let bestvalue = {score: -1000};
				for (let j = 0; j < eArr.length; j++) {
					let gamestatecopy = gamestate.slice();
					gamestatecopy[eArr[j]] = "x";
					let v = minimaxAI(gamestatecopy, stepdown+1, "o");
					v.route = eArr[j];
					bestvalue = (bestvalue.score < v.score) ? v : bestvalue;
				}
				return bestvalue;
			} else {
				let bestvalue = {score: 1000};
				for (let j = 0; j < eArr.length; j++) {
					let gamestatecopy = gamestate.slice();
					gamestatecopy[eArr[j]] = "o";
					let v = minimaxAI(gamestatecopy, stepdown+1, "x");
					v.route = eArr[j];
					bestvalue = (bestvalue.score > v.score) ? v : bestvalue;
				}
				return bestvalue;
			}
		}
	}

console.log(
minimaxAI(gamestate, 0, "o")
)

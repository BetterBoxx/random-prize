import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "./.env" });

const authRoom = process.env.RANDOM_PRIZE_AUTH.split(",");

let lastWinTime;

function readTime() {
	fs.readFile("./data/prizeLastWin", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		lastWinTime = parseInt(data);
	});
}

function saveTime() {
	const currentUnixTime = Date.now();
	fs.writeFile("./data/prizeLastWin", currentUnixTime.toString(), (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
}

readTime();

export function randomPrize(msg) {
	if (authRoom.includes(msg.room)) {
		if (Date.now() - lastWinTime < 604800000) {
			return;
		}

		if (Math.random() <= 0.001) {
			msg.reply(msg.sender.name + process.env.RANDOM_PRIZE);
			saveTime();
			readTime();
		}
	}
}

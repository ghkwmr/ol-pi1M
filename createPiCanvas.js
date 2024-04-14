
import pi from "./pi.js";

const rad = 15 * Math.PI / 180;
const dy = Math.sin(rad);

export default function (width, height, bbox) {

	//描画用canvas
	const cv = document.createElement("canvas");
	cv.width = width;
	cv.height = height;
	const ctx = cv.getContext("2d");

	//座標変換
	ctx.translate(width * 0.5, height * 0.5);
	ctx.scale(width / (bbox[2] - bbox[0]), -height / (bbox[3] - bbox[1]));
	ctx.translate(-(bbox[2] + bbox[0]) * 0.5, -(bbox[3] + bbox[1]) * 0.5);

	//解像度
	const level = (bbox[2] - bbox[0]) / width;

	//表示する桁数範囲
	const s = Math.max(Math.floor(bbox[0]) - 100, 0);
	const e = Math.min(Math.floor(bbox[2]) + 100, pi.length);

	//文字を表示
	if (level < 10) {
		ctx.font = "1.5px sans-serif";
		ctx.fillStyle = "yellow";

		for (let i = s; i < e; i++) {
			ctx.save();
			ctx.translate(i, i * dy);
			ctx.rotate(rad);
			ctx.scale(1, -1);	//文字が上下逆にならなうように一時的に上下反転
			ctx.fillText(pi[i], 0, 0);
			ctx.restore();
		}
	}

	//10桁ごとの目盛り
	if (level < 100) {
		ctx.font = "10px sans-serif";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";

		for (let i = s; i < e; i++) {
			if (i == 0 || i % 10 != 0) continue;

			const x = i + 2;		//最初の"3."の2文字は除く
			const y = i * dy;
			
			ctx.save();
			ctx.translate(x - 0.5, y);
			ctx.beginPath();
			ctx.moveTo(0, - 0.1);
			ctx.lineTo(-0.05, - 3);
			ctx.lineTo(0.05, - 3);
			ctx.fill();
			ctx.restore();
		}
	}

	//100桁ごとの目盛り
	if (level < 100) {
		ctx.font = "10px sans-serif";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";

		for (let i = s; i < e; i++) {
			if (i == 0 || i % 100 != 0) continue;

			const x = i + 2;		//最初の"3."の2文字は除く
			const y = i * dy;

			ctx.save();
			ctx.translate(x - 0.5, y);
			ctx.beginPath();
			ctx.moveTo(0, - 0.1);
			ctx.lineTo(-0.5, - 30);
			ctx.lineTo(0.5, - 30);
			ctx.fill();

			ctx.scale(1, -1);
			ctx.fillText(i + "桁", 5, 30);
			ctx.restore();
		}
	}

	//10000桁ごとの目盛り
	if (level < 10000) {
		ctx.font = "1000px sans-serif";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";

		for (let i = s; i < e; i++) {
			if (i == 0 || i % 10000 != 0) continue;

			const x = i + 2;		//最初の"3."の2文字は除く
			const y = i * dy;

			ctx.save();
			ctx.translate(x - 0.5, y);
			ctx.beginPath();
			ctx.moveTo(0, - 0.1);
			ctx.lineTo(-50, - 3000);
			ctx.lineTo(50, - 3000);
			ctx.fill();
			
			ctx.scale(1, -1);
			ctx.fillText(i + "桁", 500, 3000);
			ctx.restore();
		}
	}

	//文字を表示するサイズに満たない場合は線を表示
	if (level > 1) {
		ctx.lineWidth = level;	//1px相当

		ctx.strokeStyle = "rgba(255,255,0,0.8)";
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(pi.length, pi.length * dy);
		ctx.stroke();
	}

	return cv;
}
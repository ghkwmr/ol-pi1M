
import createPiCanvas from "./createPiCanvas.js";

const projection = "EPSG:3857";

//文字表示位置
const [cx, cy] = ol.proj.fromLonLat([131,34], projection);

const canvasFunction = function (extent, resolution, pixelRatio, size, projection) {

	//表示条件
	const [width, height] = size.map(e => Math.floor(e));
	const bbox = [
		extent[0] - cx,
		extent[1] - cy,
		extent[2] - cx,
		extent[3] - cy,
	];

	//円周率を書いたcanvasを返す
	return createPiCanvas(width, height, bbox);
};


const layer = new ol.layer.Image({
	source: new ol.source.ImageCanvas({
		canvasFunction,
		ratio: 1,
		interpolate: false,
	}),
});


const map = new ol.Map({
	target: "map",
	pixelRatio: 1,

	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM(),
			className: "basemap",
		}),
		layer,
	],

	view: new ol.View({
		center: ol.proj.fromLonLat([135.3,35], projection),
		zoom: 7,
		projection,
	}),
});
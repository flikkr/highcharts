

// The mappoint series type
defaultPlotOptions.mappoint = Highcharts.merge(defaultPlotOptions.scatter, {
	dataLabels: {
		enabled: true,
		formatter: function () { // #2945
			return this.point.name; 
		},
		crop: false,
		defer: false,
		overflow: false,
		style: {
			color: '#000000'
		}
	}
});
Highcharts.seriesTypes.mappoint = Highcharts.extendClass(Highcharts.seriesTypes.scatter, {
	type: 'mappoint',
	forceDL: true,
	pointClass: Highcharts.extendClass(Point, {
		applyOptions: function (options, x) {
			var point = Point.prototype.applyOptions.call(this, options, x);
			if (options.lat !== undefined && options.lon !== undefined) {
				point = Highcharts.extend(point, this.series.chart.fromLatLonToPoint(point));
			}
			return point;
		}
	})
});
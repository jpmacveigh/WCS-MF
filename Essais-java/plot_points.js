function plot_points(data,container,titre){
    anychart.onDocumentReady(function () {
    	// create a chart
      	var chart = anychart.scatter();
        // create a line series and set the data
      	chart.line(data);
        // enable major grids
        chart.xGrid(true);
        chart.yGrid(true);
        // enable minor grids 
        chart.xMinorGrid(true);
        chart.yMinorGrid(true);
      	// set the chart title
      	chart.title(titre);
      	// set the container id
      	chart.container(container);
      	// initiate drawing the chart
      	chart.draw();
    });
}
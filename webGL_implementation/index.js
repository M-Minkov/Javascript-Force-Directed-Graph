var graphGenerator = Viva.Graph.generator();
var graph = graphGenerator.grid(10, 5);


var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength : 40,
    springCoeff : 0.0001,
    dragCoeff : 0.002,
    gravity : -0.5
});

var graphics = Viva.Graph.View.webglGraphics();

var renderer = Viva.Graph.View.renderer(graph, {
    container: document.querySelector(".graph-container"),
    layout: layout,
    graphics: graphics
});

renderer.run();
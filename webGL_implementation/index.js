var graphGenerator = Viva.Graph.generator();
var graphics = Viva.Graph.View.svgGraphics();

var graph = Viva.Graph.graph();

var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength: 20,
    springCoeff: 0.0001,
    dragCoeff: 0.02,
    gravity: -0.1
});

for (var i = 0; i < list_of_countries.length; i++) {
    graph.addNode(i, list_of_countries[i]);
}

for (var i = 0; i < edges.length; i++) {
    graph.addLink(edges[i].source, edges[i].target);
}

function highlightRelatedNodes(nodeId, isOn) {
    var j = 30;
    var l = 30;
    // just enumerate all realted nodes and update link color:
    graph.forEachLinkedNode(nodeId, function (node, link) {
        // console.log(node);
        var linkUI = graphics.getLinkUI(link.id);
        if (linkUI) {
            // linkUI is a UI object created by graphics below
            linkUI.attr('stroke', isOn ? 'red' : 'gray');
        }

        var nodeUI = graphics.getNodeUI(node.id);
        /*
        Add a div tag to the div with id "top-left" with the following style:
            <div id="top-left-1" style="position: absolute; top: 0; left: 0; width: 100px; height: 50px; background-color: #000000; color: #ffffff; z-index: 1;">
                <img src="./flags/flag_of_Afghanistan.svg" alt="Afghanistan" style="width: 50px; height: 50px;">
                <p>Afghanistan</p>
            </div>
        get src and alt from node.data.url and node.data.name
        */

        // add a div tag to the div with id "top-left"
        if(isOn) {
            var div = document.createElement("div");
            div.id = "top-left-" + node.id;
            div.style.position = "absolute";
            // convert j to string
            div.style.top = j.toString() + "px";
            div.style.left = l.toString() + "px";
            div.style.width = "100px";
            div.style.height = "100px";
            div.style.backgroundColor = "#000000";
            div.style.color = "#ffffff";
            div.style.zIndex = "1";
            div.innerHTML = '<img src="' + node.data.url + '" alt="' + node.data.name + '" style="width: 50px; height: 50px;"> <br>' + node.data.country + '';
            document.getElementById("top-left").appendChild(div);
        }
        else {
            var myNode = document.getElementById("top-left");
            while(myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }


        j += 100;
        if(j > 540) {
            j = 30;
            l += 100;
        }
    });
};


graphics.node(function (node) {
    // console.log(node);
    // The function is called every time renderer needs a ui to display node
    try {
        var ui = Viva.Graph.svg('image')
            .attr('width', 24)
            .attr('height', 24)
            .link(node.data.url); // node.data holds custom object passed to graph.addNode();

        $(ui).hover(function () { // mouse over
            highlightRelatedNodes(node.id, true);
        }, function () { // mouse out
            highlightRelatedNodes(node.id, false);
        });
        return ui;
    }
    catch (err) {
        return Viva.Graph.svg('circle')
            .attr('width', 24)
            .attr('height', 24)
            .attr('fill', '#eaeaea');
    }

})


var renderer = Viva.Graph.View.renderer(graph, {
    container: document.querySelector(".graph-container"),
    layout: layout,
    graphics: graphics
});

renderer.run();
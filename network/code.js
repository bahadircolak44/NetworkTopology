

$(function(){ // on dom ready
	var network = [];
	var edge;
	var edge_list=[];
	var parent_list = [];
	var c=500;
	var d=500;
	var k=0;
	var l=0;
	var x=[];
	var y=[];
	var deneme;
    $.ajax({

      type     : "GET",
      dataType : "json",
      url      : "exampleNetwork.TXT",
      success  :  function(data){
try {
	
	console.log("-----------------------------Check 1---------------------------------------",Math.random()*10+5);
	$.each(data, function(index, value){
		if (value.data.type !=null) {
			console.log("-----------------------------Check 2---------------------------------------");
			network.push(value.data);
		}else if(value.data.type ==null){
			console.log("-----------------------------Check 3---------------------------------------");
			edge={source:value.data.source ,target:value.data.target };
			edge_list.push(edge);

		}
		});
		console.log("NETWORK",network);
	  console.log("EDGES",edge_list);

		for (var i = 0; i < edge_list.length; i++) {
			for (var j = 0; j < network.length; j++) {
				if (edge_list[i].source == network[j].id){
						edge_list[i].source = network[j].label;

				}
				if (edge_list[i].target == network[j].id){
						edge_list[i].target = network[j].label;
				}
			}
		}

		for (var i = 0; i < network.length; i++) {
			for (var j = 0; j < network.length; j++) {
				if (network[i].type != "IPNetworkLayer") {
					if (network[i].parent == network[j].id) {
							network[i].parent = network[j].label;
					}
				}

			}
		}

		console.log("NEW--------NETWORK",network);
	  console.log("NEW--------EDGES",edge_list);
	  x[0]=Math.random()*300;
	  y[0]=Math.random()*300;
	for(i=1;i<network.length;i++){
		
		x[i]=Math.random()*300;
		y[i]=Math.random()*300;
	for(j=0;j<i;j++){	
	if(((x[i]-x[j])*(x[i]-x[j]) + (y[i]-y[j])*(y[i]-y[j]) <900 )){
		console.log("");
		x[i]=Math.random()*300;
		y[i]=Math.random()*300;
	
		}
	}
}
console.log("X arrayi", x);
console.log("Y arrayi",y);

var i,
    s,
    N = network.length,
    E = edge_list.length,
    g = {
	nodes: [],
	edges: []
    };
	console.log("G",g);
	console.log("-----------------------------Check 4---------------------------------------");
	//g.nodes.push({data:{
	//		id: deneme[0].id
//	}});
	console.log("G",g);
	console.log("-----------------------------Check 5---------------------------------------");
	for (i = 1; i < N; i++){
		console.log("-----------------------------Check 6---------------------------------------");
	if(network[i].type=="Subnet"){
		k++;
		l++;
		if(k%2==0){c=c+375;}
		if(l%2==1 && l!=1){d=d+375; c=c-375}
		g.nodes.push({ 
		data:{
			id: network[i].label,
			parent: network[i].parent
		}
		
		});
	}else if(network[i].type!="Subnet"){
		console.log("K",k);
				
					
					g.nodes.push({
						data:{
							id: network[i].label,
							parent: network[i].parent
						},
						position:{
							x:x[i]+c,
							y:y[i]+d
			}
		
		});
					

		
	}

}
for (i = 0; i < E; i++){
	console.log("-----------------------------Check 7---------------------------------------");
	console.log("SOURCE",edge_list[i].source);
	g.edges.push({data:{
    id: 'e' + i,
    source: edge_list[i].source ,
    target: edge_list[i].target

	}});
}


		console.log("-----------------------------Check 8---------------------------------------");
		console.log("NODES",g.nodes);
	var cy = window.cy = cytoscape({
          container: document.getElementById('cy'),

          layout: {
            name: 'cose-bilkent'
          },

          style: [
            {
              selector: 'node',
              style: {
				'content': 'data(id)',
				'text-valign': 'top',
				'text-halign': 'top',
				'font-size': 8,
                'background-color': '#005580',
				'width': 30,
				'height':30
              }
            },

            {
              selector: ':parent',
              style: {
                'background-opacity': 0.333,
				'background-color': '#c6d9ec',
				'font-size': 20,
				'border-width':2,
				'border-color':'navy'
              }
            },

            {
              selector: 'edge',
              style: {
                'width': 2,
				
				'curve-style':'unbundled-bezier',
				//'edge-distances' :'node-position',
                'line-color': 'red',
				'line-style':'dashed'
				
              }
            },
			
          ],


  elements: {
    nodes: g.nodes,
    edges: g.edges
  },

  layout: {
    name: 'preset',
    padding: 5
  }
});



			} catch (e) {
				console.log("------ERROR------\n " + e.message);

			}
		}
    });
}); // on dom ready
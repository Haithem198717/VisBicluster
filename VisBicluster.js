/**
 *  authors: Haithem Aouabed (haithem.abdi@gmail.com).  University of Sfax 
             Rodrigo Santamaría (rodri@usal.es).        University of Salamanca
			 Mourad Elloumi (mourad.elloumi@gmail.com). University of Tunis Elmanar 
 
    VisBicluster, an interactive web based visualization technique 
	designed to analyze biclusters generated from gene expression data.
	
    License: -GPL3.0 with authorship attribution (extension 7.b) -
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  
    
    If not, see <https://www.gnu.org/licenses/gpl.txt>; applying 7.b extension:
    Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; 
 
 */
 
 
var InGC = [];
var setsB = [];
var rowLabels = [];
var globalIndice = 0;
var globalFile = null;
var globalRow = null;
var globalRowc = null;
var RowColIndex = 0;
var columnLabels = [];
//

var tabFinalResults = [];
var obj = {};
var max_expression = 0;
var min_expression = 0;
var median_expression =0;
var no_expression = 0;
//
var myIndexGlob = -1;
var otherIndexGl = -1;
var otherIndexGlCell = -1;
//var cellIndexR = null;
//var cellIndexC = 0;
var indicator = 0;
//
//variables for new usage of biclust results
var tabForConditions = [];
var tabForGenes = [];
var TheConditions = [];
var TheGenes = [];

var numbG = 0;
var numbC = 0;
//variable for reset button
var setFileR = null;
var setFileG = null;

//index of cell
var cellIndex = null;
var cellIndexC = 0;
var cellIndexR = null;
//list of rows
var ListRowIndex = [];
var ListRowIndexLabel = [];
var dblclickYN = 0;
var glListRowIndex = [];
var glListRowIndexLabel = [];
var ListotherIndexGl = [];
var globalRowcR = null;
var cellIndexRR = null;

var comptBic = 0;
var toBuildGl = 0;

//
var cardGl1 = 0;
var cardGL2 = 0;
//
var infoBox = $('#dataset-info-content');

function initData(url, little, bigger) {
	$(EventManager).bind("vis-svg-resize", function (event, data) {
            //url   vis-svg-resize", { newWidth:+(leftWidth + (endX - startX)) });
            updateFrames(null, data.newWidth);
            

        });
	//document.getElementById("loadFileXml").disabled = true;
	setFileR = url;
	reinitialize();
	var test = false;
	
	if(url.name.indexOf(".bic") == -1){
			alert("Error on the Biclustering results file!");
			document.getElementById("sortNrSetsInIntersection4").disabled = true;
			document.getElementById("sortNrSetsInIntersection5").disabled = true;
			document.getElementById("sortNrSetsInIntersection6").disabled = true;
	        document.getElementById("sortNrSetsInIntersection").disabled = true;
	        document.getElementById("sortIntersectionSize").disabled = true;
	        document.getElementById("sortNrSetsInIntersection1").disabled = true;
	        document.getElementById("sortNrSetsInIntersection2").disabled = true;
	        document.getElementById("sortNrSetsInIntersection3").disabled = true;
			document.getElementById("sortNrSetsInIntersection7").disabled = true;
	        document.getElementById("sortNrSetsInIntersection8").disabled = true;
			document.getElementById("save_as_png").disabled = true;
	        document.getElementById("save_as_txt").disabled = true;	
	}else{
	   
         infoBox.empty();
	     var isSize = true;
	      var biclusters = {
              name : "",
              rows : [],
              columns : []
            };
	     var genes = [];
         var conditions = [];
         var lineSplit;
        var areGenes = true;
	
		infoBox.append("<b>.bic File:</b> " + url.name + "<br />");
		document.getElementById("loadFileXml1").disabled = false;
		
		
		
		var reader = new FileReader();
		reader.onload = function(e){
		    var lines = e.target.result.split('\n');
			var AllBic = ["Bimax", "SAMBA", "COALESCE", "CCA", "BiBit", "ISA", "BBC", "FABIA", "Plaid", "Spectral", "xMOTIFs", "XMotifs", "Xmotifs", "LAS", "CPB", "QUBIC", "OPSM", "MSSRCC", "DeBi"]
	        var testBicluster = false;
	        for(var i = 0; i < AllBic.length; i++){
		        if(lines[0].includes(AllBic[i]) == true){
			        testBicluster = true;
		        }
	        }
			
			if( testBicluster == false){
			
			    alert("Error reading the list of biclusters!!");
			    document.getElementById("sortNrSetsInIntersection4").disabled = true;
			    document.getElementById("sortNrSetsInIntersection5").disabled = true;
			    document.getElementById("sortNrSetsInIntersection6").disabled = true;
	            document.getElementById("sortNrSetsInIntersection").disabled = true;
	            document.getElementById("sortIntersectionSize").disabled = true;
	            document.getElementById("sortNrSetsInIntersection1").disabled = true;
	            document.getElementById("sortNrSetsInIntersection2").disabled = true;
	            document.getElementById("sortNrSetsInIntersection3").disabled = true;
				document.getElementById("sortNrSetsInIntersection7").disabled = true;
	            document.getElementById("sortNrSetsInIntersection8").disabled = true;
			    document.getElementById("save_as_png").disabled = true;
	            document.getElementById("save_as_txt").disabled = true;
				//document.getElementById("maxi1").disabled = true;
	            //document.getElementById("maxi2").disabled = true;
		    }else{
				//alert("the loading of data takes some times, please wait...");
				document.getElementById("sortNrSetsInIntersection4").disabled = false;
	            document.getElementById("sortNrSetsInIntersection5").disabled = false;
	            document.getElementById("sortNrSetsInIntersection6").disabled = false;
				document.getElementById("sortNrSetsInIntersection7").disabled = false;
	            document.getElementById("sortNrSetsInIntersection8").disabled = false;
	            document.getElementById("sortNrSetsInIntersection").disabled = false;
	            document.getElementById("sortIntersectionSize").disabled = false;
	            document.getElementById("sortNrSetsInIntersection1").disabled = false;
	            document.getElementById("sortNrSetsInIntersection2").disabled = false;
	            document.getElementById("sortNrSetsInIntersection3").disabled = false;
				//document.getElementById("maxi1").disabled = false;
	            //document.getElementById("maxi2").disabled = false;
			    document.getElementById("save_as_png").disabled = true;
	            document.getElementById("save_as_txt").disabled = true;
				
		        var linesL = lines.length;
		        for(var line = 1; line < linesL-1; line++){
					
                    if (isSize){
			            isSize = false;
                        comptBic++;
                        biclusters.name = "B"+comptBic; 
                        columnLabels.push(biclusters.name);						
                         
			        }else{
				        if (areGenes) {
				            areGenes = false;
					        lineSplit = lines[line].split(' ');
							
					        var sline = lineSplit.length;
							
					        var i;
                            for (i=0;i < sline;i++){
						        var c = lineSplit[i];
						       if(c !== "" && c !== " ") 
								   genes.push(c.trim());
					        }
					        biclusters.rows = genes;
				        }else {
				            lineSplit = lines[line].split(' ');
					        var lline = lineSplit.length;
					        var i;
                            for (i=0;i < lline;i++) {
						        var c = lineSplit[i];
						       if(c !== "" && c !== " ") 
								   conditions.push(c.trim());     
					        }
					        biclusters.columns = conditions;
					        isSize = true;
					        areGenes = true;
					        setsB.push(biclusters);
					        biclusters = {
					           name : "",
	                           rows : [],
	                           columns : []
					        };
                            genes = [];
                            conditions = [];
				        }
			        }
		        }
				
				/*if(little == 0)
			        alert("The loading of biclustering results takes some times, please wait...");
		        if(little == 1)
			        alert("The Reset process takes some times, please wait...");*/
				
				if(bigger == 1)
					do_totals1();
					//document.getElementById("myModal1").style.visibility = "visible";
					//readfile1(setsB, columnLabels, 1, 1);
				if(bigger == 2)
					do_totals11();
					//readfile1(setsB, columnLabels, 1, 2);
				
		        //setsBReset = setsB;
		        //columnLabelsReset = columnLabels;
				
				
                	
		    }
			
		
	  };
		 reader.readAsText(url);
	
	}
	
}


function do_totals1()
 {
 document.all.myModal1.style.visibility="visible";
 window.setTimeout('do_totals2()',1)
 }
 
function do_totals2()
 {
 readfile1(setsB, columnLabels, 1, 1);
 document.all.myModal1.style.visibility="hidden";
 } 

function do_totals11()
 {
 document.all.myModal4.style.visibility="visible";
 window.setTimeout('do_totals12()',1)
 }
 
function do_totals12()
 {
 readfile1(setsB, columnLabels, 1, 2);
 document.all.myModal4.style.visibility="hidden";
 } 



function do_totals5(url)
 {
 document.all.myModal3.style.visibility="visible";
 setTimeout(function() {
    do_totals6(url);
   }, 1);
 }
 
function do_totals6(url)
 {
 initData1(url);
 document.all.myModal3.style.visibility="hidden";
 } 


function initData1(url) {
	toBuildGl = 1;
	setFileG = url;
	if(url.name.indexOf(".txt") == -1){
			alert("Error on the Biclustering results file!");
			document.getElementById("sortNrSetsInIntersection4").disabled = true;
			document.getElementById("sortNrSetsInIntersection5").disabled = true;
			document.getElementById("sortNrSetsInIntersection6").disabled = true;
	        document.getElementById("sortNrSetsInIntersection").disabled = true;
	        document.getElementById("sortIntersectionSize").disabled = true;
	        document.getElementById("sortNrSetsInIntersection1").disabled = true;
	        document.getElementById("sortNrSetsInIntersection2").disabled = true;
	        document.getElementById("sortNrSetsInIntersection3").disabled = true;
			document.getElementById("sortNrSetsInIntersection7").disabled = true;
	        document.getElementById("sortNrSetsInIntersection8").disabled = true;
			document.getElementById("save_as_png").disabled = true;
	        document.getElementById("save_as_txt").disabled = true;	
			//document.getElementById("maxi1").disabled = true;
	        //document.getElementById("maxi2").disabled = true;
	}else{
		    //alert("The loading of gene expression data takes some times, please wait...");
		    var reader = new FileReader();
		    reader.onload = function(e){
		
			
			var lines = e.target.result.split('\n');
		    var linesL = lines.length;
		    var tabLevels = [];
		    var tabConditions = [];
		// the conditions one by one
		    var lineSplit1 = lines[0].split("\t");
		   var sline = lineSplit1.length;
		   var i;
           for (i=0;i < sline;i++){
			   var c = lineSplit1[i];
			   if(c.indexOf("\r") !== -1){
				   c = c.substr(0,c.length-1)
			   }
               if(c !== ""){
				   numbC++;
				   TheConditions.push(c.trim());
				   tabConditions.push(c.trim());
			    }
		    }
		    tabFinalResults.push(tabConditions);
		
		// the genes and their levels
		    for(var line = 1; line < linesL-1; line++){
		   
		        var lineSplit2 = lines[line].split("\t");
			    var sline = lineSplit2[0].trim();
			    if(sline !== ""){
				    numbG++;
				    TheGenes.push(sline);
			    }
			    var i;
			    var sline2 = lineSplit2.length;
                for (i=0;i < sline2;i++){
				    var c = lineSplit2[i];
				    if(c.indexOf("\r") !== -1){
					    c = c.substr(0,c.length-1)
				    }
				    if(c !== ""){
                        tabLevels.push(c.trim());
				    }
			    }
		        tabFinalResults.push(tabLevels);
		        tabLevels = [];
			
		    }
			
			document.getElementById("loadFileXml1").disabled = true;
		    alert("Done. Click on the number of a row or column to add a new visualization of elements.");
			infoBox.append("<b>.txt File:</b> " + url.name + "<br />");
			infoBox.append("<b>&nbsp;&nbsp;# Number of genes:</b> " + numbG + "<br />");
		    infoBox.append("<b>&nbsp;&nbsp;# Number of conditions:</b> " + numbC + "<br />");
		  
		};
	   reader.readAsText(url);
	}
}



function updateFrames(windowHeight, windowWidth) {
	
	d3.select('#bodyVis')
                .style({
                    width: windowWidth +"px" // TODO: HACK
                });
	/*leftWidth = $(".bicElement").width();
	rightLeft = $(".bicElement").offset().left;
	d3.select('#element-viewers-visualization')
                .style({
                    width: (windowWidth + 100) +"px" // TODO: HACK
					
                })
				.style("overflow", "auto");*/
}
function reinitialize() {
	document.getElementById("sortNrSetsInIntersection").checked = true;
	document.getElementById("sortIntersectionSize").checked = false;
	document.getElementById("sortNrSetsInIntersection1").checked = false;
	document.getElementById("sortNrSetsInIntersection2").checked = false;
	document.getElementById("sortNrSetsInIntersection3").checked = false;
	document.getElementById("minCardinality1").value = 1;
	document.getElementById("minCardinality2").value = 1;
	document.getElementById("minCardinality3").value = 1;
	document.getElementById("minCardinality4").value = 1;
	document.getElementById("minCardinality5").value = 0;
	//document.getElementById("maxiCardinality1").value = 5;
	//document.getElementById("maxiCardinality2").value = 2;
	d3.select('#element-viewers-particular').select('p').remove();
	d3.select('#element-viewers-visualization').selectAll('div').remove();
	d3.select('#element-viewers-visualization').select('svg').remove();
	d3.select('#bodyVis').select('svg').remove();
	document.getElementById("sortNrSetsInIntersection4").disabled = true;
	document.getElementById("sortNrSetsInIntersection5").disabled = true;
	document.getElementById("sortNrSetsInIntersection6").disabled = true;
	document.getElementById("sortNrSetsInIntersection7").disabled = true;
	document.getElementById("sortNrSetsInIntersection8").disabled = true;
	document.getElementById("sortNrSetsInIntersection").disabled = true;
	document.getElementById("sortIntersectionSize").disabled = true;
	document.getElementById("sortNrSetsInIntersection1").disabled = true;
	document.getElementById("sortNrSetsInIntersection2").disabled = true;
	document.getElementById("sortNrSetsInIntersection3").disabled = true;
	//document.getElementById("maxi1").disabled = true;
	//document.getElementById("maxi2").disabled = true;
	document.getElementById("save_as_png").disabled = true;
	document.getElementById("save_as_txt").disabled = true;
	
	var elview = document.getElementById('element-viewers-empty');
    if(elview !== null)
	   document.getElementById('element-viewers-empty').remove();
   
    var elview1 = document.getElementById('element-viewers-empty1');
		if(elview1 !== null)
			document.getElementById('element-viewers-empty1').remove();
		
	var parentDiv = document.getElementById('matrix-elements');
	var container = document.getElementById('element-viewers-particular');
    var closeDiv = document.createElement('div');
	closeDiv.setAttribute("id", "element-viewers-empty1");
	closeDiv.setAttribute("class","info-message1");
	closeDiv.innerHTML = 'No visualizations configured. Click <b>Load Expression Data</b> button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data.';
	
	parentDiv.insertBefore(closeDiv, container);
	
	
	
	
	InGC = [];
    setsB = [];
    rowLabels = [];
    globalIndice = 0;
    globalFile = null;
	globalRow = null; 
	globalRowc = null;
	RowColIndex = 0;
	otherIndexGl = -1;
	otherIndexGlCell = -1;
	cellIndexR = null;
	cellIndexC = 0;
	indicator = 0;
	myIndexGlob = -1;
	columnLabels = [];

    tabFinalResults = [];
	obj = {}; 
    max_expression = 0;
    min_expression = 0;
    median_expression =0;
	no_expression = 0;
	
	tabForConditions = [];
    tabForGenes = [];
    TheConditions = [];
    TheGenes = [];
	
	//columnLabelsReset = [];
    //setsBReset = [];
    toBuildGl = 0;
	comptBic = 0;
	
	numbG = 0;
	numbC = 0;
	
	ListRowIndex = [];
    ListRowIndexLabel = [];
    dblclickYN = 0;
    glListRowIndex = [];
    glListRowIndexLabel = [];
    ListotherIndexGl = [];
    globalRowcR = null;
    cellIndexRR = null;
}




function readfile1(setsB, columnLabels, indexNO, indexRES) {
	        
	
	            var bicNames = []; 
	            var bicNamesF = []; 
	            var bicElems = [];
	            //var bicOverlaps = [];
	            //var elemOverlaps = [];
	            //var finalElem = [];
	            //var gfinalElem = [];
                var elemBiclust = [];
	   //var globalElem = [];
	            var globalElem = [];
	            var max = 0;
	            var min = 0;
				var median = 0;
				var somme = 0;
	            var setB = setsB.length;
		        var n;
					
		        for(n = 0; n < setB; n++){
			        var rset = setsB[n].rows.length;
			        var i;
			        for(i = 0; i < rset; i++){
				    
				        if(setsB[n].name !== null)
						elemBiclust.push(setsB[n].name);
					
					    if(setsB[n].name !== null)
						   elemBiclust.push(setsB[n].rows[i]);
					
					    if(elemBiclust[0] !== null && elemBiclust[1] !== null)
						   globalElem.push(elemBiclust);
					
					    elemBiclust = [];
				
			        }
			        var sset = setsB[n].columns.length;
			        var i;
			        elemBiclust = [];
			        for(i = 0; i < sset; i++){
				 
				        if(setsB[n].name !== null)
						    elemBiclust.push(setsB[n].name);
					
					    if(setsB[n].columns[i] !== null)
						    elemBiclust.push(setsB[n].columns[i]);
					
					    if(elemBiclust[0] !== null && elemBiclust[1] !== null)
						    globalElem.push(elemBiclust);
					
					
					    elemBiclust = [];
				
			        }
		        }
		        
		        var InBic = [];
		        //setB = globalElem.length;
		        //n = 0;
				var len2 = globalElem.length;
				
		        for(var n = 0, len = globalElem.length; n !== len; n++){
			        if(globalElem[n][1] !== null && globalElem[n][1] !== " "){
			            bicElems.push(globalElem[n][1]);
			            bicNames.push(globalElem[n][0]);
			    
			            var i = n+1;
						while(i !== len2){
							if(globalElem[n][1] !== globalElem[i][1]){
								i++;
							}else{
								bicNames.push(globalElem[i][0]);
				                globalElem[i][1] = null;
							}
						}
			            /*for(var i = n+1, len2 = globalElem.length; i !== len2; i++){
				            if(globalElem[n][1] == globalElem[i][1]){
			                   bicNames.push(globalElem[i][0]);
				              globalElem[i][1] = null;
				            }
			            }*/
			            InBic.push(bicNames);
			            bicNames = [];
			    
		            }
		        }
				
	            var filtered = bicElems.filter(function (el) {
                    return el != null;
                });
		  
	            var BicInter = InBic;
		    //var InGC = [];
		        setB = InBic.length;
		        n = 0;
		        var FbicElems = [];
		
		        for(n = 0; n < setB; n++){
	                if(InBic[n] !== null && InBic[n] !== " "){    
			           FbicElems.push(filtered[n]);
			           var i;
			           for(i = n+1; i < setB; i++){
				            if(JSON.stringify(InBic[n]) == JSON.stringify(InBic[i])){
			                   FbicElems.push(filtered[i]);
						       InBic[i] = null;
				            }
			            }
			            InGC.push(FbicElems);
			            FbicElems = [];
		            }
		  
		        }
		        var Bicover = BicInter.filter(function (el) {
                    return el != null;
                });
		        var m;
		        var temp;
		        var temp1;
		        for(i = 0; i < Bicover.length-1 ; i++) {
			        m=i;
			        for(j = i+1; j < Bicover.length ; j++) {
				        if(Bicover[j].length < Bicover[m].length){
					        m=j;
					       temp=Bicover[m];
					       Bicover[m] = Bicover[i];
					       Bicover[i] = temp;
					       temp1=InGC[m];
					       InGC[m] = InGC[i];
					       InGC[i] = temp1;
					       m=i;	
				        }
				
			        }
			    }
		        			
		        min = InGC[0].length;
		        max = InGC[0].length ;
		        for(i = 1; i < Bicover.length ; i++) {
				    somme += InGC[i].length;
			        if(InGC[i].length > max) {
				        max = InGC[i].length;
				
			        }
			        if(InGC[i].length < min) {
				       min = InGC[i].length;
				
			        }
			
                }
	            median = somme / Bicover.length;
                for (var i = 0; i < Bicover.length; i++) {
			        rowLabels[i] = "Ov"+(i+1);
                }
			
		    buildBic(columnLabels.length, Bicover, InGC, max, min, median, setsB, rowLabels, columnLabels);
				
			    
}




function buildBic(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, columnLabels){
	var margin = {top: 50, right: 50, bottom: 100, left: 100},
    width = 20 * Math.floor(intValue),
    height = 20 * Math.floor(bicOverlaps.length);
	var matview = document.getElementById('matrix-viewers-empty');
    if(matview !== null)
		document.getElementById('matrix-viewers-empty').remove();
	d3.select('#bodyVis').select('svg').remove();
	var matrixViewer = document.getElementById('matrix-overlaps');
	var brs = matrixViewer.getElementsByTagName('br');
    while (brs.length) {
		brs[0].parentNode.removeChild(brs[0]);
    }


var zoomfactor = 1;
var zoomlistener = d3.behavior.zoom()
.on("zoom", redraw);	
	
var svg = d3.select("#bodyVis").append("svg")
    .attr("width", width + margin.left + margin.right)  
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 35 + "," + 35 + ")"); //.attr("transform", "translate(" + 35 + "," + 58 + ")"); 

	
	d3.select("#sortNrSetsInIntersection5").on("click", function (){
         zoomfactor = zoomfactor + 0.08;
         zoomlistener.scale(zoomfactor).event(d3.select("svg"));
    });
	d3.select("#sortNrSetsInIntersection6").on("click", function (){
       zoomfactor = zoomfactor - 0.095;
       zoomlistener.scale(zoomfactor).event(d3.select(svg));
    });
    function redraw() {
        svg.attr("transform", "translate(" + 35  + "," + 35 + ")scale(" + d3.event.scale + ")");
    }
	
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
	.attr("fill", "white");
	
var numrows = bicOverlaps.length;
var numcols = intValue;
var matrix = new Array(numrows);
for (var i = 0; i < numrows; i++) {
    matrix[i] = new Array(numcols);
    for (var j = 0; j < numcols; j++) {
        if(bicOverlaps[i].includes(columnLabels[j]) === true){
		    matrix[i][j] = elemOverlaps[i].length;  
	    }else{
			 matrix[i][j] = 0;
	    }
    }
}




var gg = 10 * Math.floor(intValue);
var ff = 10 * Math.floor(bicOverlaps.length);
var x = d3.scale.ordinal()
    .domain(d3.range(numcols))
    .rangeBands([0, gg]);

var y = d3.scale.ordinal()
    .domain(d3.range(numrows))
    .rangeBands([0, ff]);



/*var rowLabels = new Array(numrows);
for (var i = 0; i < numrows; i++) {
  rowLabels[i] = "Ov"+(i+1);
}*/

/*var columnLabels = new Array(numcols);
for (var i = 0; i < numcols; i++) {
  columnLabels[i] = "B"+(i+1);
}*/

/*var colorMap = d3.scale.quantile()
    .domain([min, max])
	.range(["#80bfff", "#001933"]);*/

var colorMap = d3.scale.quantile()    
                 .domain([min, median, max])
	             .range(["#DCDCDC", "#707070", "#000000"]);	
	
var maxBic = setsB[0].rows.length + setsB[0].columns.length;
var minBic = setsB[0].rows.length + setsB[0].columns.length;
for(var i = 1; i < setsB.length ; i++) {
			if((setsB[i].rows.length + setsB[i].columns.length) > maxBic) {
				maxBic = setsB[i].rows.length + setsB[i].columns.length;
					
        
			}
			if((setsB[i].rows.length + setsB[i].columns.length) < minBic) {
				minBic = setsB[i].rows.length + setsB[i].columns.length;
				
			}
			
    }
	
var colorMapBic = d3.scale.linear()
    .domain([minBic, maxBic])
	.range(["#A9A9A9", "#000000"]);
	
	
var row = svg.selectAll(".row")
    .data(matrix)
  .enter().append("g")
    .attr("id", function(d, i) { return "Ov"+(i+1);	})
    .attr("class", "row")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
	

  	

row.append("line")
    .attr("x2", gg)
	.attr("stroke-width", 0)
	.attr("stroke", "#fff");
var compteur = 0;
var previouss = -1;
var idPrevious = null;
var myIndex;
var otherIndex = 0;
var ListotherIndex = [];
row.append("text")
   // .attr("class", "setLabel")
    .attr("x", -6)
    .attr("y", y.rangeBand()/2)
    .attr("dy", ".32em")
    .attr("text-anchor", "end")
	.style("font", "12px sans-serif")
	//.style("font-weight", "")//300
	.style("font-weight", function (d, i) {
                    if (bicOverlaps[i].length == 1)
                        return "";
                   else 
					   return "bold";
                })
	.style("fill", "black")
	.style("cursor", "pointer")
    .text(function(d, i) { 
	    var ov = rowLabels[i];
        var c = ov.substr(2,ov.length-1);
	    var k = parseInt(c, 10);
	    return k;
	   })
	/*.style("fill", function (d, i) {
                    if (bicOverlaps[i].length == 1)
                        return "blue";
                   else 
					   return "black";
                })*/
	.on("click", function(d, i) {
		RowColIndex = 1;
		if(dblclickYN == 1){
	       d3.selectAll(".highlight").remove();
		   dblclickYN = 0;
		   
		    if(glListRowIndex.length > 0 || ListotherIndexGl.length > 0){
				for(var i = 0; i < glListRowIndex.length; i++){
					var asIndex = glListRowIndex[i];
			        if(typeof bicOverlaps[asIndex] != 'undefined' && asIndex > -1 && bicOverlaps[asIndex] != null){
                        if(bicOverlaps[asIndex].length == 1){
				            d3.select("#Ov"+(asIndex+1))	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "")
			                  .style("fill", "black");
		                }else{
				            d3.select("#Ov"+(asIndex+1))	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "bold")
			                  .style("fill", "black");
			            }
			        }
				}
				for(var j = 0; j < ListotherIndexGl.length; j++){
					var IndexGl = ListotherIndexGl[j];
			        if(typeof bicOverlaps[IndexGl-1] != 'undefined' && IndexGl > -1 && bicOverlaps[IndexGl-1] != null){
			            if(bicOverlaps[IndexGl-1].length == 1){
				            d3.select("#Ov"+IndexGl)	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "")
			                  .style("fill", "black");
			            }else{
				            d3.select("#Ov"+IndexGl)	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "bold")
			                  .style("fill", "black");
			            }
			        }
				}
		    }	
		   
		   
		   glListRowIndex = [];
		   glListRowIndexLabel = [];
		}
		if(cellIndexRR != null || globalRowcR != null){
			d3.selectAll(".highlight").remove();
			cellIndexRR = null;
			globalRowcR = null;
		}
		
		//myIndex = i;
		//var ov1 = rowLabels[myIndex];
		
		var ov = this.parentElement.id;
        var c = ov.substr(2,ov.length-1);
	    var k = parseInt(c, 10);
		k--;
		
		
		var ov1 = this.parentElement.id;
        var c1 = ov1.substr(2,ov1.length-1);
	    var k1 = parseInt(c1, 10);
		k1--;
	    var cc = rowLabels[k1].substr(2,rowLabels[k1].length-1);
		
		
		ListRowIndex.push(k);
		ListRowIndexLabel.push(cc);
		glListRowIndex.push(k);
		glListRowIndexLabel.push(cc);

		d3.select("#Ov"+(k+1))
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
			
	    d3.select("#Ov"+(k+1))
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
			
					
		if(indicator == 1){
            d3.select("#col"+cellIndexC)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[cellIndexC].rows.length + setsB[cellIndexC].columns.length);
               });
            var c = cellIndexR.substr(2,cellIndexR.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined'){	
			    if(k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			        d3.select("#"+cellIndexR)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "")
			          .style("fill", "black");
			    }else{
			        if(k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
			             d3.select("#"+cellIndexR)
			               .selectAll("text")
			               .style("font", "12px sans-serif")
			               .style("font-weight", "bold")
			               .style("fill", "black");
			        }
			    }
		    }			   
		}
        if(indicator == 2){
			d3.select("#col"+cellIndexC)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[cellIndexC].rows.length + setsB[cellIndexC].columns.length);
               });
			var c = cellIndexR.substr(2,cellIndexR.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k] != null){
                if(bicOverlaps[k].length == 1){
				    d3.select("#Ov"+(k+1))	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "")
			          .style("fill", "black");
		        }else{
				    d3.select("#Ov"+(k+1))	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
			if(typeof bicOverlaps[otherIndexGlCell-1] != 'undefined' && otherIndexGlCell > -1 && bicOverlaps[otherIndexGlCell-1] != null){
			    if(bicOverlaps[otherIndexGlCell-1].length == 1){
				    d3.select("#Ov"+otherIndexGlCell)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "")
			          .style("fill", "black");
			    }else{
				    d3.select("#Ov"+otherIndexGlCell)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
		}
        indicator = 0;
		cellIndexC = 0;
		cellIndexR = null;
		if(globalRowc != null){
			var c = globalRowc.substr(3,globalRowc.length-1);
	        var kBic = parseInt(c, 10);
		    d3.select("#"+globalRowc)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[kBic].rows.length + setsB[kBic].columns.length);
               });
	    } 
		/*var k1 = -1;
		var test_Over = false;
		myIndex = i;
		RowColIndex = 1;
		d3.selectAll(".highlight").remove();
		
		if(previouss > -1 && previouss != i){
			if(bicOverlaps[previouss].length == 1){
			 d3.select("#"+idPrevious)
			    .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")
			   .style("fill", "blue");
			}else{
			 d3.select("#"+idPrevious)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")
			   .style("fill", "black");
			}
		}
		if(indicator == 1){
            d3.select("#col"+cellIndexC)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[cellIndexC].rows.length + setsB[cellIndexC].columns.length);
               });
            var c = cellIndexR.substr(2,cellIndexR.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined'){	
			    if(k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			        d3.select("#"+cellIndexR)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
			    }else{
			        if(k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
			             d3.select("#"+cellIndexR)
			               .selectAll("text")
			               .style("font", "12px sans-serif")
			               .style("font-weight", "bold")
			               .style("fill", "black");
			        }
			    }
		    }			   
		}
        if(indicator == 2){
			d3.select("#col"+cellIndexC)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[cellIndexC].rows.length + setsB[cellIndexC].columns.length);
               });
			var c = cellIndexR.substr(2,cellIndexR.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k] != null){
                if(bicOverlaps[k].length == 1){
				    d3.select("#Ov"+(k+1))	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
		        }else{
				    d3.select("#Ov"+(k+1))	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
			if(typeof bicOverlaps[otherIndexGlCell-1] != 'undefined' && otherIndexGlCell > -1 && bicOverlaps[otherIndexGlCell-1] != null){
			    if(bicOverlaps[otherIndexGlCell-1].length == 1){
				    d3.select("#Ov"+otherIndexGlCell)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
			    }else{
				    d3.select("#Ov"+otherIndexGlCell)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
		}
        indicator = 0;
		cellIndexC = 0;
		cellIndexR = null;
		if(globalRowc != null){
			var c = globalRowc.substr(3,globalRowc.length-1);
	        var kBic = parseInt(c, 10);
		    d3.select("#"+globalRowc)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[kBic].rows.length + setsB[kBic].columns.length);
               });
	    } 
		
		
        if(myIndexGlob > -1 || otherIndexGl > -1){
			if(typeof bicOverlaps[myIndexGlob-1] != 'undefined' && myIndexGlob > -1 && bicOverlaps[myIndexGlob-1] != null){
                if(bicOverlaps[myIndexGlob-1].length == 1){
				    d3.select("#Ov"+myIndexGlob)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
		        }else{
				    d3.select("#Ov"+myIndexGlob)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
			if(typeof bicOverlaps[otherIndexGl-1] != 'undefined' && otherIndexGl > -1 && bicOverlaps[otherIndexGl-1] != null){
			    if(bicOverlaps[otherIndexGl-1].length == 1){
				    d3.select("#Ov"+otherIndexGl)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
			    }else{
				    d3.select("#Ov"+otherIndexGl)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
		}			
		//d3.selectAll(".active").remove();	
				
		var ov1 = rowLabels[myIndex];
        var c1 = ov1.substr(2,ov1.length-1);
	    var k1 = parseInt(c1, 10);
		myIndexGlob = k1;
		var ov = this.parentElement.id;
        var c = ov.substr(2,ov.length-1);
	    var k = parseInt(c, 10);
		k--;
		var bicIndex;
		var indice = 0;
		if (typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			test_Over = true;
			bicIndex = bicOverlaps[i][0].substr(1,bicOverlaps[i][0].length-1);
		}else{
			if (typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
				test_Over = false;
			}
		}
		d3.select(this.parentElement)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
			
	    d3.select(this.parentElement)
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
			
	    geneMatrix1(k, k1, indice, test_Over, bicIndex, null);
		
     previouss = i;
	 idPrevious = this.parentElement.id;
	 globalRow = this.parentElement.id;*/
        })
	.on("dblclick", function(d,i) {
		dblclickYN = 1;
        if(ListRowIndex.length > 0){
			
			ListRowIndex = ListRowIndex.filter(function(elem, index, self) {
                   return index == self.indexOf(elem);
                });
			ListRowIndexLabel = ListRowIndexLabel.filter(function(elem, index, self) {
                   return index == self.indexOf(elem);
                });
				
			if(ListRowIndex.length == 1){
				var onlyOneRow = ListRowIndex[0];
				//if(i > onlyOneRow || i < onlyOneRow){
					
				//	alert("double click on the selected row!");
				//}else{
					
				    var bicIndex;
		            var indice = 0;
				    var test_Over = false;
				    //var onlyOneRow = ListRowIndex[0];
					var onlyOneRow1 = ListRowIndexLabel[0];
		            if (typeof bicOverlaps[onlyOneRow] != 'undefined' && onlyOneRow > -1 && bicOverlaps[onlyOneRow].length == 1 && bicOverlaps[onlyOneRow] != null){
			            test_Over = true;
			            bicIndex = bicOverlaps[i][0].substr(1,bicOverlaps[i][0].length-1);
		            }else{
			            if (typeof bicOverlaps[onlyOneRow] != 'undefined' && onlyOneRow > -1 && bicOverlaps[onlyOneRow].length > 1 && bicOverlaps[onlyOneRow] != null){
				            test_Over = false;
			            }
		            }
					if(toBuildGl == 0){
						alert("No visualizations configured. Click Load Expression Data button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data then double-click on the selected row.");
					}else{
					   geneMatrix1(onlyOneRow, onlyOneRow1, indice, test_Over, bicIndex, null, null, null);
					}
			   // }
			}else{
				
				var min = ListRowIndex[0];
		        var max = ListRowIndex[0];
		        for(var j = 0; j < ListRowIndex.length ; j++) {
				
			        if(ListRowIndex[j] > max) {
				        max = ListRowIndex[j];
				
			        }
			        if(ListRowIndex[j] < min) {
				       min = ListRowIndex[j];
				
			        }
			
                }
				
				if(i > max || i < min){
					
					alert("double click on one of selected rows!");
				}else{
				    var indice = 2;
					if(toBuildGl == 0){
						alert("No visualizations configured. Click Load Expression Data button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data then double-click on the selected row.");
					}else{
					    geneMatrix1(null, null, indice, false, null, null, ListRowIndex, ListRowIndexLabel);
					}
				}
					
			}
		}
		
        ListRowIndex = [];
        ListRowIndexLabel = [];		
        			
    })
	.on("mouseover", function(d,i) {
		
		var genes = 0;
		var conditions = 0;
		for(var j = 0; j < elemOverlaps[i].length; j++){
				var l=0;
			while(l < setsB.length){
				if(setsB[l].rows.includes(elemOverlaps[i][j])){
					genes++;
					break;
				}
				else {
					if(setsB[l].columns.includes(elemOverlaps[i][j])){
						conditions++;
						break;
					}
					else{
						l=l+1;
					}
				}
			}
		}
		
		if (bicOverlaps[i].length == 1){
		 var c = bicOverlaps[i][0].substr(1,bicOverlaps[i][0].length-1);
		 d3.select(this).insert("title").text("Genes and conditions of Bicluster "+ c +" not integrated in any overlap (genes: "+genes+" -- "+"conditions: "+conditions+")"); 
		}else{
		var c = rowLabels[i].substr(2,rowLabels[i].length-1);
		var floatstring = "";
		for(var j=0; j < bicOverlaps[i].length; j++){
			floatstring = floatstring + bicOverlaps[i][j] + ", ";
		}
		floatstring = floatstring.substr(0,floatstring.length-2);
		 d3.select(this).insert("title").text("Overlap "+ c +" -- "+bicOverlaps[i].length+" Biclusters overlapped (genes: "+genes+" -- "+"conditions: "+conditions+") ("+floatstring+")");
		}		 
	   })
	.on("mouseout", function(d,i) {				
           d3.select(this).select("title").remove();			
         });

		 
/*if(globalRow != null && RowColIndex == 1){		
	var jj = 0;
	d3.selectAll(".highlight").remove();
	row.selectAll("text")
	 .each(function(d, i){
		 var ii = d3.select(this).text();
		 jj = jj + 1;
        if (myIndexGlob == ii) {
            d3.select(this)
              .style("fill", "red")
			  .style("font-size", "90%");
			  
			otherIndex = jj;
			otherIndexGl = jj;
        }
    });
	
  if(otherIndex > 0){
	    d3.select("#Ov"+otherIndex)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
    }
	
}*/

if(glListRowIndex.length > 0 && RowColIndex == 1){	
d3.selectAll(".highlight").remove();
ListotherIndexGl = [];
ListotherIndex = [];
for(var h=0; h < glListRowIndexLabel.length; h++){	
	var jj = 0;
	
	row.selectAll("text")
	 .each(function(d, i){
		 var ii = d3.select(this).text();
		 jj = jj + 1;
        if (glListRowIndexLabel[h] == ii) {
            d3.select(this)
              .style("fill", "red")
			  .style("font-size", "90%");
			  
			//otherIndex = jj;
			ListotherIndex.push(jj);
			//otherIndexGl = jj;
			ListotherIndexGl.push(jj);
        }
    });
}
for(var i = 0; i < ListotherIndex.length; i++){	
  if(ListotherIndex[i] > 0){
	    d3.select("#Ov"+ListotherIndex[i])
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
    }
}

	
}

	
var column = svg.selectAll(".column")
    .data(columnLabels)
  .enter().append("g")
    .attr("id", function(d, i) { return "col"+i; })
    .attr("class", "column")
    .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

column.append("line")
    .attr("x1", -ff)
	.attr("stroke-width", 0)
	.attr("stroke", "#fff");
var previouc = -1;
var idPreviouc = null;
column.append("text")
    //.attr("class", "setLabel")
	.attr("id", function(d, i) { return d; })
    .attr("x", 6)
    .attr("y", y.rangeBand()/2)
    .attr("dy", ".32em")
    .attr("text-anchor", "start")
	.style("font", "12px sans-serif")
	.style("font-weight", "bold")//300
	.style("fill", function (d, i) {
		        return colorMapBic(setsB[i].rows.length + setsB[i].columns.length);
        })
	//.style("fill", "black")
	.style("cursor", "pointer")
    .text(function(d, i) { return d; })
	.on("click", function(d, i) {
		
		RowColIndex = 2;
		var test_Over = false;
		d3.selectAll(".highlight").remove();
		if(previouc > -1 && previouc != i){		
			var c = idPreviouc.substr(3,idPreviouc.length-1);
	        var kBic = parseInt(c, 10);
		    d3.select("#"+idPreviouc)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {
				   
		          return colorMapBic(setsB[kBic].rows.length + setsB[kBic].columns.length);
               });
	    } 
		if(indicator == 1){
            d3.select("#col"+cellIndexC)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[cellIndexC].rows.length + setsB[cellIndexC].columns.length);
               });
            var c = cellIndexR.substr(2,cellIndexR.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined'){	
			    if(k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			        d3.select("#"+cellIndexR)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "")
			          .style("fill", "black");
			    }else{
			        if(k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
			             d3.select("#"+cellIndexR)
			               .selectAll("text")
			               .style("font", "12px sans-serif")
			               .style("font-weight", "bold")
			               .style("fill", "black");
			        }
			    }
		    }			   
		}
        if(indicator == 2){
			d3.select("#col"+cellIndexC)
			   .selectAll("text")
			   .style("font", "12px sans-serif")
			   .style("font-weight", "bold")//300
	           .style("fill", function () {  
		          return colorMapBic(setsB[cellIndexC].rows.length + setsB[cellIndexC].columns.length);
               });
			var c = cellIndexR.substr(2,cellIndexR.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k] != null){
                if(bicOverlaps[k].length == 1){
				    d3.select("#Ov"+(k+1))	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "")
			          .style("fill", "black");
		        }else{
				    d3.select("#Ov"+(k+1))	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
			if(typeof bicOverlaps[otherIndexGlCell-1] != 'undefined' && otherIndexGlCell > -1 && bicOverlaps[otherIndexGlCell-1] != null){
			    if(bicOverlaps[otherIndexGlCell-1].length == 1){
				    d3.select("#Ov"+otherIndexGlCell)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "")
			          .style("fill", "black");
			    }else{
				    d3.select("#Ov"+otherIndexGlCell)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
		}
        indicator = 0;
		cellIndexC = 0;
		cellIndexR = null;
		
		    if(glListRowIndex.length > 0 || ListotherIndexGl.length > 0){
				for(var i = 0; i < glListRowIndex.length; i++){
					var asIndex = glListRowIndex[i];
			        if(typeof bicOverlaps[asIndex] != 'undefined' && asIndex > -1 && bicOverlaps[asIndex] != null){
                        if(bicOverlaps[asIndex].length == 1){
				            d3.select("#Ov"+(asIndex+1))	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "")
			                  .style("fill", "black");
		                }else{
				            d3.select("#Ov"+(asIndex+1))	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "bold")
			                  .style("fill", "black");
			            }
			        }
				}
				for(var j = 0; j < ListotherIndexGl.length; j++){
					var IndexGl = ListotherIndexGl[j];
			        if(typeof bicOverlaps[IndexGl-1] != 'undefined' && IndexGl > -1 && bicOverlaps[IndexGl-1] != null){
			            if(bicOverlaps[IndexGl-1].length == 1){
				            d3.select("#Ov"+IndexGl)	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "")
			                  .style("fill", "black");
			            }else{
				            d3.select("#Ov"+IndexGl)	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "bold")
			                  .style("fill", "black");
			            }
			        }
				}
		    }
	    /*if(globalRow != null){
			var c = globalRow.substr(2,globalRow.length-1);
	        var k = parseInt(c, 10);
		    k--;
			if(typeof bicOverlaps[k] != 'undefined'){	
			    if(k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			        d3.select("#"+globalRow)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
			    }else{
			        if(k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
			             d3.select("#"+globalRow)
			               .selectAll("text")
			               .style("font", "12px sans-serif")
			               .style("font-weight", "bold")
			               .style("fill", "black");
			        }
			    }
		    }
		}
		if(myIndexGlob > -1 || otherIndexGl > -1){
			if(typeof bicOverlaps[myIndexGlob-1] != 'undefined' && myIndexGlob > -1 && bicOverlaps[myIndexGlob-1] != null){
                if(bicOverlaps[myIndexGlob-1].length == 1){
				    d3.select("#Ov"+myIndexGlob)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
		        }else{
				    d3.select("#Ov"+myIndexGlob)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
			if(typeof bicOverlaps[otherIndexGl-1] != 'undefined' && otherIndexGl > -1 && bicOverlaps[otherIndexGl-1] != null){
			    if(bicOverlaps[otherIndexGl-1].length == 1){
				    d3.select("#Ov"+otherIndexGl)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "blue");
			    }else{
				    d3.select("#Ov"+otherIndexGl)	
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")
			          .style("fill", "black");
			    }
			}
		}*/			   
			   
		  d3.select("foreignObject").remove();
		  var ov = this.parentElement.id;
          var c = ov.substr(3,ov.length-1);
	      var k = parseInt(c, 10);
		  var ov = d;
          var c = ov.substr(1,ov.length-1);
	      var k1 = parseInt(c, 10);
		  var indice = 1;
		  
		d3.select(this.parentElement)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("x", -ff)
	        .attr("width", ff)
	        .attr("height", x.rangeBand()-2);
			
		d3.select(this.parentElement)
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
		if(toBuildGl == 0){
			alert("No visualizations configured. Click Load Expression Data button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data then click on the selected column.");
		}else{	
		    geneMatrix1(k, null, indice, test_Over, null, k1, null, null);
		}
		
	
	 previouc = i;
	 idPreviouc = this.parentElement.id;
	 globalRowc = this.parentElement.id;
	 globalRowcR = this.parentElement.id;
		
      })
	.on("mouseover", function(d,i) {
		var ov = this.parentElement.id;
        var c = ov.substr(3,ov.length-1);
	    var k = parseInt(c, 10);
		var ov = d;
        var c = ov.substr(1,ov.length-1);
	    var k1 = parseInt(c, 10);
		d3.select(this).insert("title").text("Bicluster "+k1+" (genes: "+setsB[k].rows.length+" -- "+"conditions: "+setsB[k].columns.length+")"); 
	   })
	.on("mouseout", function(d,i) {				
           d3.select(this).select("title").remove();			
         });
		 
if(globalRowc != null && RowColIndex == 2){		
	d3.select("#"+globalRowc)
	    .selectAll("text")
		.style("fill", "red")
		.style("font-size", "90%");
		
	d3.select("#"+globalRowc)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("x", -ff)
	        .attr("width", ff)
	        .attr("height", x.rangeBand()-2);
}		


var previousCellR = null;
var previousCellC = -1;							
row.selectAll(".cell")
    .data(function(d) { return d; })
  .enter().append("rect")
    //.attr("id", function(d, i) { return "cell"+(i+1); })
    .attr("class", "cell")
    .attr("x", function(d, i) { return x(i); })
	//.attr("cy", 10)
	//.attr("r", 9)
    .attr("width", x.rangeBand()-1)
    .attr("height", x.rangeBand()-1)
    .style("stroke-width", 0)	
    .style("fill", function (d, i) {
                    if (d == 0)
                        return "#F8F8F8";//dcdadb
                   else 
					   return colorMap(d);
                })
	.on("click", function(d, i) {
		if (d !== 0){
		//alert("id  "+this.id);
		    d3.selectAll(".highlight").remove();
		    indicator = 1;
		    cellIndexR = this.parentElement.id;
			cellIndexRR = this.parentElement.id;
			cellIndexC = i;
			if(previousCellC > -1 && previousCellR != null){
				d3.select("#col"+previousCellC)
			      .selectAll("text")
			      .style("font", "12px sans-serif")
			      .style("font-weight", "bold")//300
	              .style("fill", function () {  
		             return colorMapBic(setsB[previousCellC].rows.length + setsB[previousCellC].columns.length);
                });
                var c = previousCellR.substr(2,previousCellR.length-1);
	            var k = parseInt(c, 10);
		        k--;
			    if(typeof bicOverlaps[k] != 'undefined'){	
			        if(k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			            d3.select("#"+previousCellR)
			              .selectAll("text")
			              .style("font", "12px sans-serif")
			              .style("font-weight", "")
			              .style("fill", "black");
			        }else{
			            if(k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
			                 d3.select("#"+previousCellR)
			                   .selectAll("text")
			                   .style("font", "12px sans-serif")
			                   .style("font-weight", "bold")
			                   .style("fill", "black");
			            }
			        }
		        }	
			}
		    d3.select(this.parentElement)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
			
            d3.select("#col"+i)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("x", -ff)
	        .attr("width", ff)
	        .attr("height", x.rangeBand()-2);
			
			d3.select("#col"+i)
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
			
			d3.select(this.parentElement)
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
			
			/*if(globalRow != null){
			    var c = globalRow.substr(2,globalRow.length-1);
	            var k = parseInt(c, 10);
		        k--;
			    if(typeof bicOverlaps[k] != 'undefined'){	
			        if(k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
			            d3.select("#"+globalRow)
			               .selectAll("text")
			               .style("font", "12px sans-serif")
			               .style("font-weight", "bold")
			               .style("fill", "blue");
			        }else{
			            if(k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
			                 d3.select("#"+globalRow)
			                   .selectAll("text")
			                   .style("font", "12px sans-serif")
			                   .style("font-weight", "bold")
			                   .style("fill", "black");
			            }
			        }
		        }
		    }*/
			if(globalRowc != null){
			    var c = globalRowc.substr(3,globalRowc.length-1);
	            var kBic = parseInt(c, 10);
		        d3.select("#"+globalRowc)
			      .selectAll("text")
			      .style("font", "12px sans-serif")
			      .style("font-weight", "bold")//300
	              .style("fill", function () {  
		              return colorMapBic(setsB[kBic].rows.length + setsB[kBic].columns.length);
                });
	        } 
			if(glListRowIndex.length > 0 || ListotherIndexGl.length > 0){
				for(var y = 0; y < glListRowIndex.length; y++){
					var asIndex = glListRowIndex[y];
			        if(typeof bicOverlaps[asIndex] != 'undefined' && asIndex > -1 && bicOverlaps[asIndex] != null){
                        if(bicOverlaps[asIndex].length == 1){
				            d3.select("#Ov"+(asIndex+1))	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "")
			                  .style("fill", "black");
		                }else{
				            d3.select("#Ov"+(asIndex+1))	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "bold")
			                  .style("fill", "black");
			            }
			        }
				}
				for(var j = 0; j < ListotherIndexGl.length; j++){
					var IndexGl = ListotherIndexGl[j];
			        if(typeof bicOverlaps[IndexGl-1] != 'undefined' && IndexGl > -1 && bicOverlaps[IndexGl-1] != null){
			            if(bicOverlaps[IndexGl-1].length == 1){
				            d3.select("#Ov"+IndexGl)	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "")
			                  .style("fill", "black");
			            }else{
				            d3.select("#Ov"+IndexGl)	
			                  .selectAll("text")
			                  .style("font", "12px sans-serif")
			                  .style("font-weight", "bold")
			                  .style("fill", "black");
			            }
			        }
				}
		    }
		    /*if(myIndexGlob > -1 || otherIndexGl > -1){
			    if(typeof bicOverlaps[myIndexGlob-1] != 'undefined' && myIndexGlob > -1 && bicOverlaps[myIndexGlob-1] != null){
                    if(bicOverlaps[myIndexGlob-1].length == 1){
				        d3.select("#Ov"+myIndexGlob)	
			              .selectAll("text")
			              .style("font", "12px sans-serif")
			              .style("font-weight", "bold")
			              .style("fill", "blue");
		            }else{
				        d3.select("#Ov"+myIndexGlob)	
			              .selectAll("text")
			              .style("font", "12px sans-serif")
			              .style("font-weight", "bold")
			              .style("fill", "black");
			        }
			    }
			    if(typeof bicOverlaps[otherIndexGl-1] != 'undefined' && otherIndexGl > -1 && bicOverlaps[otherIndexGl-1] != null){
			        if(bicOverlaps[otherIndexGl-1].length == 1){
				       d3.select("#Ov"+otherIndexGl)	
			             .selectAll("text")
			             .style("font", "12px sans-serif")
			             .style("font-weight", "bold")
			             .style("fill", "blue");
			        }else{
				       d3.select("#Ov"+otherIndexGl)	
			             .selectAll("text")
			             .style("font", "12px sans-serif")
			             .style("font-weight", "bold")
			             .style("fill", "black");
			        }
			    }
		    }*/	
			RowColIndex = 0;
		    var ov = this.parentElement.id;
            var c = ov.substr(2,ov.length-1);
            var k = parseInt(c, 10);
			var bicIndex;
		    k--;
		    var indice = 0;
		    if (typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] != null){
				bicIndex = bicOverlaps[k][0].substr(1,bicOverlaps[k][0].length-1);
			    test_Over = true;
		    }else{
			    if (typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] != null){
				    test_Over = false;
			    }
		    }
			previousCellR = cellIndexR;
			previousCellC = cellIndexC;
			if(toBuildGl == 0){
			    alert("No visualizations configured. Click Load Expression Data button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data then click on the selected cell.");
			}else{
		        geneMatrix1(k, k+1, indice, test_Over, bicIndex, null, null, null);
			}
		}
	})
	.on("mouseover", function(d,i) {
            if (d !== 0){
            				
           // d3.selectAll(".row text").classed("active");
           // d3.selectAll(".column text").classed("active");
		  /* var ov = d3.select(this.parentElement)
			        .selectAll("text")
					.filter(function (d, i) { return d;});*/
			var ov = this.parentElement.id;
            //d3.select(this).insert("title").text(ov+"--"+"B"+(i+1));
			var c = ov.substr(2,ov.length-1);
			var k = parseInt(c, 10);
			k--;
		
		    var genes = 0;
		    var conditions = 0;
			for(var j = 0; j < elemOverlaps[k].length; j++){
				var l=0;
			while(l < setsB.length){
				if(setsB[l].rows.includes(elemOverlaps[k][j])){
					genes++;
					break;
				}
				else {
					if(setsB[l].columns.includes(elemOverlaps[k][j])){
						conditions++;
						break;
					}
					else{
						l=l+1;
					}
				}
			}
			               
			}
			
			if(bicOverlaps[k].length == 1){
				var c = bicOverlaps[k][0].substr(1,bicOverlaps[k][0].length-1);
		        d3.select(this).insert("title").text("Genes and conditions of Bicluster "+ c +" not integrated in any overlap (genes: "+genes+" -- "+"conditions: "+conditions+")"); 
		
			}else{
				var c = rowLabels[k].substr(2,rowLabels[k].length-1);
		        var floatstring = "";
		        for(var j=0; j < bicOverlaps[k].length; j++){
			       floatstring = floatstring + bicOverlaps[k][j] + ", ";
		        }
		        floatstring = floatstring.substr(0,floatstring.length-2);
		        d3.select(this).insert("title").text("Overlap "+ c +" -- "+bicOverlaps[k].length+" Biclusters overlapped (genes: "+genes+" -- "+"conditions: "+conditions+") ("+floatstring+")");
		
			}
			
			
            d3.select(this.parentElement)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
			
            d3.select("#col"+i)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("x", -ff)
	        .attr("width", ff)
	        .attr("height", x.rangeBand()-2);
			
			d3.select("#col"+i)
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
			
			d3.select(this.parentElement)
			.selectAll("text")
			.style("fill", "red")
			.style("font-size", "90%");
			
			if (cellIndex !== null){
	            d3.select(cellIndex)
                  .style("stroke", "red")
	              .style("stroke-width", 2);
            }
			
	        }			
            })
    .on("mouseout", function(d,i) {
            if (d !== 0){
                
					d3.select(this).select("title").remove();
                    d3.selectAll(".highlight").remove();
			
			        d3.select("#col"+i)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
			          .style("font-weight", "bold")//300
	                  .style("fill", function () {
		                   return colorMapBic(setsB[i].rows.length + setsB[i].columns.length);
                      });
			
			        var ov = this.parentElement.id;
			        var c = ov.substr(2,ov.length-1);
			        var k = parseInt(c, 10);
			        k--;
			        if(typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k].length == 1 && bicOverlaps[k] !== null){
			             d3.select(this.parentElement)
			               .selectAll("text")
			               .style("font", "12px sans-serif")
			               .style("font-weight", "")
			               .style("fill", "black");
			        }else{
						if(typeof bicOverlaps[k] != 'undefined' && k > -1 && bicOverlaps[k].length > 1 && bicOverlaps[k] !== null){
				          d3.select(this.parentElement)
			                .selectAll("text")
			                .style("font", "12px sans-serif")
			                .style("font-weight", "bold")
			                .style("fill", "black");
						}
			        }
					
					if(RowColIndex == 1){
						//if(glListRowIndex.length > 0 || ListotherIndexGl.length > 0)
						/*
					if(glListRowIndex.length > 0 && RowColIndex == 1){	
d3.selectAll(".highlight").remove();
ListotherIndexGl = [];
ListotherIndex = [];
for(var h=0; h < glListRowIndexLabel.length; h++){	
	var jj = 0;
	
	row.selectAll("text")
	 .each(function(d, i){
		 var ii = d3.select(this).text();
		 jj = jj + 1;
        if (glListRowIndexLabel[h] == ii) {
            d3.select(this)
              .style("fill", "red")
			  .style("font-size", "90%");
			  
			//otherIndex = jj;
			ListotherIndex.push(jj);
			//otherIndexGl = jj;
			ListotherIndexGl.push(jj);
        }
    });
}
for(var i = 0; i < ListotherIndex.length; i++){	
  if(ListotherIndex[i] > 0){
	    d3.select("#Ov"+ListotherIndex[i])
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
    }
}

	
}
					*/
						//do that
						if((glListRowIndex.length > 0 && ListotherIndex.length == 0) || ListotherIndexGl.length > 0){
							var ind = [];
							for(var h=0; h < glListRowIndexLabel.length; h++){
					            var jj = 0;
					            row.selectAll("text")
	                           .each(function(d, i){
		                            var ii = d3.select(this).text();
		                            jj = jj + 1;
                                    if (glListRowIndexLabel[h] == ii) {
                                         d3.select(this)
                                           .style("fill", "red")
			                               .style("font-size", "90%");
			                            ind.push(jj);
                                    }
                                });
							}
						    for(var n = 0; n < ind.length; n++){	
						        if(ind[n] > 0){
	                               d3.select("#Ov"+ind[n])
	                                 .append("rect")
	                                 .attr("class", "highlight")
	                                 .attr("width", gg)
	                                 .attr("height", x.rangeBand()-2);
                                }
							}
						}else{
							
							if(glListRowIndex.length > 0  && RowColIndex == 1 && ListotherIndex.length > 0){
						        for(var m = 0; m < ListotherIndex.length; m++){	
						            d3.select("#Ov"+ListotherIndex[m])
	                                  .append("rect")
	                                  .attr("class", "highlight")
	                                  .attr("width", gg)
	                                  .attr("height", x.rangeBand()-2);
			
	                                d3.select("#Ov"+ListotherIndex[m])
			                          .selectAll("text")
			                          .style("fill", "red")
			                          .style("font-size", "90%");
								}
						  
							ListotherIndex = [];
						    }
						}
						/*if((globalRow != null && otherIndex == 0) || otherIndexGl > -1){
							var ind = 0;
					        var jj = 0;
					        row.selectAll("text")
	                     .each(function(d, i){
		                        var ii = d3.select(this).text();
		                        jj = jj + 1;
                                if (myIndexGlob == ii) {
                                     d3.select(this)
                                       .style("fill", "red")
			                           .style("font-size", "90%");
			                         ind = jj;
                                }
                            });
						
						    if(ind > 0){
	                          d3.select("#Ov"+ind)
	                            .append("rect")
	                            .attr("class", "highlight")
	                            .attr("width", gg)
	                            .attr("height", x.rangeBand()-2);
                            }
						}else{
							
							if(globalRow != null && RowColIndex == 1 && otherIndex > 0){
						
						       d3.select("#Ov"+otherIndex)
	                             .append("rect")
	                             .attr("class", "highlight")
	                             .attr("width", gg)
	                             .attr("height", x.rangeBand()-2);
			
	                           d3.select("#Ov"+otherIndex)
			                     .selectAll("text")
			                     .style("fill", "red")
			                     .style("font-size", "90%");
						  
						        otherIndex = 0;
						    }
						}*/
					}
					if(RowColIndex == 2){
							//do that
					    if(globalRowc != null){
					
					        d3.select("#"+globalRowc)
	                          .append("rect")
	                          .attr("class", "highlight")
	                          .attr("x", -ff)
	                          .attr("width", ff)
	                          .attr("height", x.rangeBand()-2);
			
			                d3.select("#"+globalRowc)
			                  .selectAll("text")
			                  .style("fill", "red")
			                  .style("font-size", "90%");
				        }
					}
				if(indicator == 1){	
			
				    d3.select("#"+cellIndexR)
	                  .append("rect")
	                  .attr("class", "highlight")
	                  .attr("width", gg)
	                  .attr("height", x.rangeBand()-2);
			
                    d3.select("#col"+cellIndexC)
	                  .append("rect")
	                  .attr("class", "highlight")
	                  .attr("x", -ff)
	                  .attr("width", ff)
	                  .attr("height", x.rangeBand()-2);
			
			        d3.select("#col"+cellIndexC)
			          .selectAll("text")
			          .style("fill", "red")
			          .style("font-size", "90%");
			
			        d3.select("#"+cellIndexR)
			          .selectAll("text")
			          .style("fill", "red")
			          .style("font-size", "90%");
					  	
                }
                if(indicator == 2){	
				    if((cellIndexR != null && otherIndexCell == 0) || otherIndexGlCell > -1){
							var ind = 0;
					        var jj = 0;
							var ov = cellIndexR;
                            var c = ov.substr(2,ov.length-1);
                            var k = parseInt(c, 10);
					        row.selectAll("text")
	                     .each(function(d, i){
		                        var ii = d3.select(this).text();
		                        jj = jj + 1;
                                if (k == ii) {
                                     d3.select(this)
                                       .style("fill", "red")
			                           .style("font-size", "90%");
			                         ind = jj;
                                }
                            });
						
						    if(ind > 0){
	                          d3.select("#Ov"+ind)
	                            .append("rect")
	                            .attr("class", "highlight")
	                            .attr("width", gg)
	                            .attr("height", x.rangeBand()-2);
                            }
					}else{
							
							if(cellIndexR != null && otherIndexCell > 0){
						
						       d3.select("#Ov"+otherIndexCell)
	                             .append("rect")
	                             .attr("class", "highlight")
	                             .attr("width", gg)
	                             .attr("height", x.rangeBand()-2);
			
	                           d3.select("#Ov"+otherIndexCell)
			                     .selectAll("text")
			                     .style("fill", "red")
			                     .style("font-size", "90%");
						  
						        otherIndexCell = 0;
						    }
					}
                    d3.select("#col"+cellIndexC)
	                  .append("rect")
	                  .attr("class", "highlight")
	                  .attr("x", -ff)
	                  .attr("width", ff)
	                  .attr("height", x.rangeBand()-2);
			
			        d3.select("#col"+cellIndexC)
			          .selectAll("text")
			          .style("fill", "red")
			          .style("font-size", "90%");
					  
				}	
			    //if((globalRow != null && RowColIndex == 1 && otherIndex == 0) || otherIndexGl > -1){
					/*d3.select("#"+globalRow)
	                  .append("rect")
	                  .attr("class", "highlight")
	                  .attr("width", gg)
	                  .attr("height", x.rangeBand()-2);
			
	                d3.select("#"+globalRow)
			          .selectAll("text")
			          .style("fill", "red")
			          .style("font-size", "90%");*/
					/*  var ind = 0;
					  var jj = 0;
					  row.selectAll("text")
	                     .each(function(d, i){
		                        var ii = d3.select(this).text();
		                        jj = jj + 1;
                                if (myIndexGlob == ii) {
                                     d3.select(this)
                                       .style("fill", "red")
			                           .style("font-size", "90%");
			                         ind = jj;
                                }
                        });
						
						if(ind > 0){
	                          d3.select("#Ov"+ind)
	                            .append("rect")
	                            .attr("class", "highlight")
	                            .attr("width", gg)
	                            .attr("height", x.rangeBand()-2);
                        }
				}else{
					if(globalRow != null && RowColIndex == 1 && otherIndex > 0){
						
						d3.select("#Ov"+otherIndex)
	                      .append("rect")
	                      .attr("class", "highlight")
	                      .attr("width", gg)
	                      .attr("height", x.rangeBand()-2);
			
	                    d3.select("#Ov"+otherIndex)
			              .selectAll("text")
			              .style("fill", "red")
			              .style("font-size", "90%");
						  
						otherIndex = 0;
					}else{
					    if(globalRowc != null && RowColIndex == 2){
					
					        d3.select("#"+globalRowc)
	                          .append("rect")
	                          .attr("class", "highlight")
	                          .attr("x", -ff)
	                          .attr("width", ff)
	                          .attr("height", x.rangeBand()-2);
			
			                d3.select("#"+globalRowc)
			                  .selectAll("text")
			                  .style("fill", "red")
			                  .style("font-size", "90%");
				        }
					}
				}*/
	        }			
            });

if(cellIndexR != null && cellIndexC != 0){
    indicator = 2;	
	var jj = 0;
	var ov = cellIndexR;
    var c = ov.substr(2,ov.length-1);
    var k = parseInt(c, 10);
	d3.selectAll(".highlight").remove();
	row.selectAll("text")
	 .each(function(d, i){
		 var ii = d3.select(this).text();
		 jj = jj + 1;
        if (k == ii) {
            d3.select(this)
              .style("fill", "red")
			  .style("font-size", "90%");
			  
			otherIndexCell = jj;
			otherIndexGlCell = jj;
        }
    });
	
    if(otherIndexCell > 0){
	    d3.select("#Ov"+otherIndexCell)
	        .append("rect")
	        .attr("class", "highlight")
	        .attr("width", gg)
	        .attr("height", x.rangeBand()-2);
    }
	d3.select("#col"+cellIndexC)
	  .append("rect")
	  .attr("class", "highlight")
	  .attr("x", -ff)
	  .attr("width", ff)
	  .attr("height", x.rangeBand()-2);
			
    d3.select("#col"+cellIndexC)
	  .selectAll("text")
	  .style("fill", "red")
	  .style("font-size", "90%");
}

d3.selectAll(("#sortNrSetsInIntersection")).on('click', function(){

	var m;
    var temp;
    var temp1;
	var temp2;
    for(i = 0; i < bicOverlaps.length-1 ; i++) {
		m=i;
	    for(j = i+1; j < bicOverlaps.length ; j++) {
			if(bicOverlaps[j].length < bicOverlaps[m].length){
				m=j;
			    temp=bicOverlaps[m];
			    bicOverlaps[m] = bicOverlaps[i];
			    bicOverlaps[i] = temp;
			    temp1=elemOverlaps[m];
			    elemOverlaps[m] = elemOverlaps[i];
			    elemOverlaps[i] = temp1;
				temp2=rowLabels[m];
			    rowLabels[m] = rowLabels[i];
			    rowLabels[i] = temp2;
			    m=i;
			 				
		    }
		}
	}
	for(i = 0; i < bicOverlaps.length-1 ; i++) {
		m=i;
	    for(j = i+1; j < bicOverlaps.length ; j++) {
			var c1 = rowLabels[m].substr(2,rowLabels[i].length-1);
			var k1 = parseInt(c1, 10);
			var c2 = rowLabels[j].substr(2,rowLabels[i].length-1);
			var k2 = parseInt(c2, 10);
			if(k2 < k1){
				m=j;
			    temp=bicOverlaps[m];
			    bicOverlaps[m] = bicOverlaps[i];
			    bicOverlaps[i] = temp;
			    temp1=elemOverlaps[m];
			    elemOverlaps[m] = elemOverlaps[i];
			    elemOverlaps[i] = temp1;
				temp2=rowLabels[m];
			    rowLabels[m] = rowLabels[i];
			    rowLabels[i] = temp2;
			    m=i;
			 				
		    }
		}
	}
  InGC = elemOverlaps;
  buildBic(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, columnLabels)
  //buildBicSort(intValue, bicOverlaps, elemOverlaps, max, min,setsB, rowLabels)
});



 d3.selectAll(("#sortIntersectionSize")).on('click', function(){
order();
});

function order() {
	var tabString = [];
	var tabbicOverlaps = [];
	var tabelemOverlaps = [];
	var tabelabels = [];
	for (var i = 0; i < bicOverlaps.length; i++) {
		var floatstring = "";
        for (var j = 0; j < bicOverlaps[i].length; j++) {
            floatstring += bicOverlaps[i][j];
        }
		tabString.push(floatstring);
    }
	
	   var maximum = 5;
       var _source, matches, x, y;
      _source = tabString.slice();
	 
       matches = [];
    for (x = _source.length - 1; x >= 0; x--) {
          var output = _source.splice(x, 1);
        for (y = _source.length - 1; y >= 0; y--) {
            if (Levenshtein.get(output[0], _source[y]) <= maximum) {
                output.push(_source[y]);
                _source.splice(y, 1);
                x--;
            }
        }
       matches.push(output);
    }
	

	for (var i = 0; i < matches.length; i++) {
		for (var j = 0; j < matches[i].length; j++) {
		   var condIndex = tabString.indexOf(matches[i][j]);
		   tabbicOverlaps.push(bicOverlaps[condIndex]);
		   tabelemOverlaps.push(elemOverlaps[condIndex]);
		   tabelabels.push(rowLabels[condIndex]);
		   
		}
	}
    InGC = tabelemOverlaps;
	buildBic(intValue, tabbicOverlaps, tabelemOverlaps, max, min, median, setsB, tabelabels, columnLabels);
	//buildBicSort(intValue, tabbicOverlaps, tabelemOverlaps, max, min, setsB, tabelabels);

 }

/*d3.selectAll(("#maxi1")).on('click', function(){
	   var valeur = document.getElementById("maxiCardinality1").value;
       MaxGenes(setsB, valeur);   
});

d3.selectAll(("#maxi2")).on('click', function(){
	   var valeur = document.getElementById("maxiCardinality2").value;
       MaxColumns(setsB, valeur);   
});*/
 
d3.selectAll(("#sortNrSetsInIntersection1")).on('click', function(){
	   var valeur = document.getElementById("minCardinality1").value;
	   var valeurGC = document.getElementById("geneCondChoice").value;
       DiscardOverGenes(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, valeur, valeurGC);   
});

d3.selectAll(("#sortNrSetsInIntersection7")).on('click', function(){
	   var valeur = document.getElementById("minCardinality4").value;
	   var valeurGC = document.getElementById("geneCondValue").value;
	   var choiceGC = document.getElementById("geneCondChoice1").value;
       DiscardBicNumber(setsB, valeur, valeurGC, choiceGC);   
});

d3.selectAll(("#sortNrSetsInIntersection8")).on('click', function(){
	   var valeur = document.getElementById("minCardinality5").value;
	   var valeurGC = document.getElementById("geneCondValue1").value;
       DiscardBicRate(bicOverlaps, setsB, valeur, valeurGC);   
});

d3.selectAll(("#sortNrSetsInIntersection2")).on('click', function(){
	   var valeur = document.getElementById("minCardinality2").value;
       ShowOverLess(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, valeur);   
});

d3.selectAll(("#sortNrSetsInIntersection3")).on('click', function(){
	   var valeur = document.getElementById("minCardinality3").value;
       ShowOverMore(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, valeur);   
});

/*d3.selectAll(("#sortIntersectionSize1")).on('click', function(){
   MergeOver(intValue, bicOverlaps, elemOverlaps, max, min,setsB);   
});*/
}


/*function MaxGenes(sets, maxCardinality){
	
	var columnLab = columnLabels;
	var setsBB = sets;
    var maxRows = setsBB[0].rows.length ;
	for(var i = 1; i < setsBB.length ; i++) {
				
	    if(setsBB[i].rows.length > maxRows) {
			maxRows = setsBB[i].rows.length;
				
		}
			
    }
	
    if(	maxCardinality > maxRows){
		
		alert("All the biclusters have number of rows less than "+maxCardinality);
		
		
	}else{
		var card = parseInt(maxCardinality, 10);
		for(var i = 0; i < setsBB.length ; i++) {
						
	        if(setsBB[i].rows.length > card) {
			
			    setsBB[i].rows = setsBB[i].rows.slice(0, card);
				
				
		    }
			
        }
		
		
		window.setsB = setsBB;
		
		 var elview = document.getElementById('element-viewers-empty');
            if(elview !== null)
	           document.getElementById('element-viewers-empty').remove();
		    var elview1 = document.getElementById('element-viewers-empty1');
            if(elview1 !== null)
	           document.getElementById('element-viewers-empty1').remove();
            d3.select('#element-viewers-particular').select('p').remove();
	        d3.select('#element-viewers-visualization').selectAll('div').remove();
	        d3.select('#element-viewers-visualization').select('svg').remove();
	        var parentDiv = document.getElementById('matrix-elements');
	        var container = document.getElementById('element-viewers-particular');
            var closeDiv = document.createElement('div');
	        closeDiv.setAttribute("id", "element-viewers-empty1");
	        closeDiv.setAttribute("class","info-message1");
			if(toBuildGl == 0){
				closeDiv.innerHTML = 'No visualizations configured. Click <b>Load Expression Data</b> button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data.';
			}else{
                closeDiv.innerHTML = 'No visualizations configured. Click on <b>the number of a row or column</b> to add a new visualization.';
			}
            parentDiv.insertBefore(closeDiv, container);
        if(document.getElementById('maxi1').checked){
		    document.getElementById("sortNrSetsInIntersection").checked = true;
	        document.getElementById("sortIntersectionSize").checked = false;
	        document.getElementById("sortNrSetsInIntersection1").checked = false;
	        document.getElementById("sortNrSetsInIntersection2").checked = false;
	        document.getElementById("sortNrSetsInIntersection3").checked = false;
		    document.getElementById("sortNrSetsInIntersection8").checked = false;
			document.getElementById("sortNrSetsInIntersection7").checked = false;
			document.getElementById("maxi2").checked = false;
	        document.getElementById("save_as_png").disabled = true;
	        document.getElementById("save_as_txt").disabled = true;
	        document.getElementById("minCardinality1").value = 1;
	        document.getElementById("minCardinality2").value = 1;
	        document.getElementById("minCardinality3").value = 1;
		    //document.getElementById("maxiCardinality2").value = 2;
			//document.getElementById("minCardinality4").value = 1;
	        //document.getElementById("minCardinality5").value = 0;
	        d3.select('#element-viewers-particular').select('p').remove();
	        d3.select('#element-viewers-visualization').selectAll('div').remove();
	        d3.select('#element-viewers-visualization').select('svg').remove();
	        
		
		    InGC = [];
  
            rowLabels = [];
            globalIndice = 0;
            globalFile = null;
	        globalRow = null; 
	        globalRowc = null;
	        RowColIndex = 0;
	        otherIndexGl = -1;
		    otherIndexGlCell = -1;
	        cellIndexR = null;
	        cellIndexC = 0;
	        indicator = 0;
	        myIndexGlob = -1;
		
		    ListRowIndex = [];
            ListRowIndexLabel = [];
            dblclickYN = 0;
            glListRowIndex = [];
            glListRowIndexLabel = [];
            ListotherIndexGl = [];
            globalRowcR = null;
            cellIndexRR = null;
		
	        readfile1(setsB, columnLabels, 2, 3);
	   
	        
	    }
	}
			
}


function MaxColumns(sets, maxCardinality){
	
	var columnLab = columnLabels;
	var setsBB = sets;
    var maxCol = setsBB[0].columns.length ;
	for(var i = 1; i < setsBB.length ; i++) {
				
	    if(setsBB[i].columns.length > maxCol) {
			maxCol = setsBB[i].columns.length;
				
		}
			
    }
	
    if(	maxCardinality > maxCol){
		
		alert("All the biclusters have number of columns less than "+maxCardinality);
		
		
	}else{
		var card = parseInt(maxCardinality, 10);
		for(var i = 0; i < setsBB.length ; i++) {
				
	        if(setsBB[i].columns.length > card) {
				
			    setsBB[i].columns = setsBB[i].columns.slice(0, card);
				
		    }
			
        }
		
		
		window.setsB = setsBB;
		
		 var elview = document.getElementById('element-viewers-empty');
            if(elview !== null)
	           document.getElementById('element-viewers-empty').remove();
		   
		   var elview1 = document.getElementById('element-viewers-empty1');
            if(elview1 !== null)
	           document.getElementById('element-viewers-empty1').remove();
            d3.select('#element-viewers-particular').select('p').remove();
	        d3.select('#element-viewers-visualization').selectAll('div').remove();
	        d3.select('#element-viewers-visualization').select('svg').remove();
	        var parentDiv = document.getElementById('matrix-elements');
	        var container = document.getElementById('element-viewers-particular');
            var closeDiv = document.createElement('div');
	        closeDiv.setAttribute("id", "element-viewers-empty1");
	        closeDiv.setAttribute("class","info-message1");
            if(toBuildGl == 0){
				closeDiv.innerHTML = 'No visualizations configured. Click <b>Load Expression Data</b> button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data.';
			}else{
                closeDiv.innerHTML = 'No visualizations configured. Click on <b>the number of a row or column</b> to add a new visualization.';
			}
			parentDiv.insertBefore(closeDiv, container);
        if(document.getElementById('maxi2').checked){
		    document.getElementById("sortNrSetsInIntersection").checked = true;
	        document.getElementById("sortIntersectionSize").checked = false;
	        document.getElementById("sortNrSetsInIntersection1").checked = false;
	        document.getElementById("sortNrSetsInIntersection2").checked = false;
	        document.getElementById("sortNrSetsInIntersection3").checked = false;
		    document.getElementById("sortNrSetsInIntersection8").checked = false;
			document.getElementById("sortNrSetsInIntersection7").checked = false;
			document.getElementById("maxi1").checked = false;
	        document.getElementById("save_as_png").disabled = true;
	        document.getElementById("save_as_txt").disabled = true;
	        document.getElementById("minCardinality1").value = 1;
	        document.getElementById("minCardinality2").value = 1;
	        document.getElementById("minCardinality3").value = 1;
		    //document.getElementById("maxiCardinality1").value = 5;
			//document.getElementById("minCardinality4").value = 1;
	        //document.getElementById("minCardinality5").value = 0;
	        d3.select('#element-viewers-particular').select('p').remove();
	        d3.select('#element-viewers-visualization').selectAll('div').remove();
	        d3.select('#element-viewers-visualization').select('svg').remove();
	        
		
		    InGC = [];
  
            rowLabels = [];
            globalIndice = 0;
            globalFile = null;
	        globalRow = null; 
	        globalRowc = null;
	        RowColIndex = 0;
	        otherIndexGl = -1;
		    otherIndexGlCell = -1;
	        cellIndexR = null;
	        cellIndexC = 0;
	        indicator = 0;
	        myIndexGlob = -1;
		
		    ListRowIndex = [];
            ListRowIndexLabel = [];
            dblclickYN = 0;
            glListRowIndex = [];
            glListRowIndexLabel = [];
            ListotherIndexGl = [];
            globalRowcR = null;
            cellIndexRR = null;
		
	        readfile1(setsB, columnLabels, 2, 3);
	   
	       
	    }
	}
			
}*/



function DiscardOverGenes(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, minCardinality, geneCondChoice){
	
	//add code to distinguish genes from conditions
	var genes;
	var conditions;
	var numbGen = [];
    var numbCond = [];
	var firstOverlaps = [];
	for (var i = 0; i < bicOverlaps.length; i++) {
		firstOverlaps.push(bicOverlaps[i]);
	}
	for(var i = 0; i < elemOverlaps.length; i++){
		if(elemOverlaps[i] != null){
		    genes = 0;
	        conditions = 0;
		    for(var j = 0; j < elemOverlaps[i].length; j++){
			    var l=0;
			    while(l < setsB.length){
					if(setsB[l] != null){
				        if(setsB[l].rows.includes(elemOverlaps[i][j])){
					        genes++;
					        break;
				        }
				        else {
					        if(setsB[l].columns.includes(elemOverlaps[i][j])){
						        conditions++;
						        break;
					        }
					        else{
						        l=l+1;
					        }
				        }
				    }
			    }
		    }
		    numbGen.push(genes);
		    numbCond.push(conditions);
	    }
	
	}
	
	var numberDisc = 0;
	for (var i = 0; i < bicOverlaps.length; i++) {
		if(bicOverlaps[i].length > 1 && bicOverlaps[i] !== null && bicOverlaps[i] !== " "){
			if(geneCondChoice == 20){
			    if(numbGen[i] <= minCardinality){
				    numberDisc++;
			    }
			}else{
				if(numbCond[i] <= minCardinality){
				    numberDisc++;
			    }
			}
		}
	}
	
if(numberDisc == 0){
	alert("No overlaps with number of genes/conditions less than "+ minCardinality +".");
	
	/*if(document.getElementById('sortNrSetsInIntersection1').checked){
	
	    d3.selectAll(("#minCardinality1")).on('click', function(){
	        var valeur = document.getElementById("minCardinality1").value;
	        if( valeur != minCardinality){
               DiscardOverGenes(intValue, bicOverlaps, elemOverlaps, max, min, setsB, rowLabels, valeur);
	        }
        });
	}*/
}
else{
	
	for (var k = 0; k < numberDisc; k++) {
		for (var i = 0; i < bicOverlaps.length; i++) {
		    if(firstOverlaps[i].length > 1 && firstOverlaps[i] !== null && firstOverlaps[i] !== " "){
			    if(geneCondChoice == 20){
			        if(numbGen[i] <= minCardinality){
				        bicOverlaps[i] = null;
				        elemOverlaps[i] = null;
				        rowLabels[i] = null;
			        }
			    }else{
				    if(numbCond[i] <= minCardinality){
				        bicOverlaps[i] = null;
				        elemOverlaps[i] = null;
				        rowLabels[i] = null;
			        }
			    }
		    }
	    }
	}
	var discOverlaps = bicOverlaps.filter(function (el) {
             return el != null;
          });
    var discEOverlaps = elemOverlaps.filter(function (el) {
             return el != null;
          });
	var discLabels = rowLabels.filter(function (el) {
             return el != null;
          });
		  
	//var isCheckedDegree = $('#sortNrSetsInIntersection').attr('checked')?true:false;
    
    if(document.getElementById('sortNrSetsInIntersection1').checked){
		
		InGC = discEOverlaps;
	   buildBic(intValue, discOverlaps, discEOverlaps, max, min, median, setsB, discLabels, columnLabels);
	   
	    /*d3.selectAll(("#minCardinality1")).on('click', function(){
	        var valeur = document.getElementById("minCardinality1").value;
	        if( valeur != minCardinality){
               DiscardOverGenes(intValue, discOverlaps, discEOverlaps, max, min, setsB, discLabels, valeur);
	        }
        });*/
	}
   
}
	
}
//Hide biclusters with number of genes/conditions less than a threshold
function DiscardBicNumber(sets, minCardinality, geneCondValue, geneCondChoice){
	
	var numberDisc = 0;
	var setsBB = sets;
	var columnLab = columnLabels;
	for (var i = 0; i < setsBB.length; i++) {
		if(setsBB[i] !== null){
		    if(geneCondChoice == 20){
			    if(geneCondValue == 20){
			        if(setsBB[i].rows.length > minCardinality){
				        numberDisc++;
				     
			        }
			    }else{
				    if(geneCondValue == 15){
			            if(setsBB[i].rows.length < minCardinality){
				            numberDisc++;
				         
			            }
			        }else{
					    if(setsBB[i].rows.length == minCardinality){
				            numberDisc++;
				         
			            }
				    }
			    }
		    }else{
			    if(geneCondValue == 20){
			        if(setsBB[i].columns.length > minCardinality){
				        numberDisc++;
				      
			        }
			    }else{
				    if(geneCondValue == 15){
			            if(setsBB[i].columns.length < minCardinality){
				            numberDisc++;
				           
			            }
			        }else{
					    if(setsBB[i].columns.length == minCardinality){
				            numberDisc++;
				           
			            }
				    }
			    }
		    }
		}
		
	}
	
    

	
if(numberDisc == 0){
	if(geneCondValue == 20){
		alert("No biclusters with number of genes/conditions more than "+ minCardinality +".");
	}else{
		if(geneCondValue == 15){
			alert("No biclusters with number of genes/conditions less than "+ minCardinality +".");
		}else{
			alert("No biclusters with number of genes/conditions equals to "+ minCardinality +".");
		}
	}
	
	/*if(document.getElementById('sortNrSetsInIntersection7').checked){
	
	    d3.selectAll(("#minCardinality4")).on('click', function(){
	        var valeur = document.getElementById("minCardinality4").value;
	        var valeurGC = document.getElementById("geneCondValue").value;
	        var choiceGC = document.getElementById("geneCondChoice1").value;
	        if(valeur != minCardinality || valeurGC != geneCondValue || choiceGC != geneCondChoice) {
               DiscardBicNumber(setsB, valeur, valeurGC, choiceGC);
			   
	        }
        });
	}*/
}
else{
	if(numberDisc == setsBB.length-1 || numberDisc == setsBB.length){
		
		if(geneCondValue == 20){
		    alert("All of biclusters have a number of genes/conditions more than "+ minCardinality +". Impossible to hide all of them. Try to change the values of parameters.");
	    }else{
		    if(geneCondValue == 15){
			    alert("All of biclusters have a number of genes/conditions less than "+ minCardinality +". Impossible to hide all of them. Try to change the values of parameters.");
		    }else{
			     alert("All of biclusters have a number of genes/conditions equals to "+ minCardinality +". Impossible to hide all of them. Try to change the values of parameters.");
		    }
	    }
	
	    /*if(document.getElementById('sortNrSetsInIntersection7').checked){
	
	        d3.selectAll(("#minCardinality4")).on('click', function(){
	            var valeur = document.getElementById("minCardinality4").value;
	            var valeurGC = document.getElementById("geneCondValue").value;
	            var choiceGC = document.getElementById("geneCondChoice1").value;
	            if(valeur != minCardinality || valeurGC != geneCondValue || choiceGC != geneCondChoice) {
                     DiscardBicNumber(setsB, valeur, valeurGC, choiceGC);
			   
	            }
            });
	    }*/
		
	}else{
		
		for (var k = 0; k < numberDisc; k++) {
		    for (var i = 0; i < setsBB.length; i++) {
		        if(setsBB[i] !== null){
		            if(geneCondChoice == 20){
			            if(geneCondValue == 20){
			                if(setsBB[i].rows.length > minCardinality){
				                setsBB[i] = null;
					            columnLab[i] = null;
			                }
			            }else{
				            if(geneCondValue == 15){
			                    if(setsBB[i].rows.length < minCardinality){
				                    setsBB[i] = null;
						            columnLab[i] = null;
			                    }
			                }else{
					            if(setsBB[i].rows.length == minCardinality){
				                   setsBB[i] = null;
						           columnLab[i] = null;
			                   }
				            }
			            }
		            }else{
			            if(geneCondValue == 20){
			                if(setsBB[i].columns.length > minCardinality){
				                setsBB[i] = null;
					            columnLab[i] = null;
			                }
			            }else{
				            if(geneCondValue == 15){
			                    if(setsBB[i].columns.length < minCardinality){
				                    setsBB[i] = null;
						            columnLab[i] = null;
			                    }
			                }else{
					            if(setsBB[i].columns.length == minCardinality){
				                   setsBB[i] = null;
						           columnLab[i] = null;
			                    }
				            }
			            }
		            }
		        }
		
	        }
	    }
		
		
	    window.setsB = setsBB.filter(function (el) {
             return el != null;
        });
		
	    window.columnLabels = columnLab.filter(function (el) {
             return el != null;
        });
    
		  
	//var isCheckedDegree = $('#sortNrSetsInIntersection').attr('checked')?true:false;
            var elview = document.getElementById('element-viewers-empty');
            if(elview !== null)
	           document.getElementById('element-viewers-empty').remove();
		    var elview1 = document.getElementById('element-viewers-empty1');
		    if(elview1 !== null)
			   document.getElementById('element-viewers-empty1').remove();
		    d3.select('#element-viewers-particular').select('p').remove();
		    d3.select('#element-viewers-visualization').selectAll('div').remove();
		    //d3.select('#element-viewers-visualization').selectAll('span').remove();
		    d3.select('#element-viewers-visualization').select('svg').remove();
	        var parentDiv = document.getElementById('matrix-elements');
	        var container = document.getElementById('element-viewers-particular');
            var closeDiv = document.createElement('div');
	        closeDiv.setAttribute("id", "element-viewers-empty1");
	        closeDiv.setAttribute("class","info-message1");
            if(toBuildGl == 0){
				closeDiv.innerHTML = 'No visualizations configured. Click <b>Load Expression Data</b> button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data.';
			}else{
                closeDiv.innerHTML = 'No visualizations configured. Click on <b>the number of a row or column</b> to add a new visualization.';
			}
			parentDiv.insertBefore(closeDiv, container);
        if(document.getElementById('sortNrSetsInIntersection7').checked){
		    document.getElementById("sortNrSetsInIntersection").checked = true;
	        document.getElementById("sortIntersectionSize").checked = false;
	        document.getElementById("sortNrSetsInIntersection1").checked = false;
	        document.getElementById("sortNrSetsInIntersection2").checked = false;
	        document.getElementById("sortNrSetsInIntersection3").checked = false;
		    document.getElementById("sortNrSetsInIntersection8").checked = false;
			//document.getElementById("maxi1").checked = false;
			//document.getElementById("maxi2").checked = false;
	        document.getElementById("save_as_png").disabled = true;
	        document.getElementById("save_as_txt").disabled = true;
	        document.getElementById("minCardinality1").value = 1;
	        document.getElementById("minCardinality2").value = 1;
	        document.getElementById("minCardinality3").value = 1;
	    //document.getElementById("minCardinality4").value = 1;
	        //document.getElementById("minCardinality5").value = 0;
			//document.getElementById("maxiCardinality1").value = 5;
			//document.getElementById("maxiCardinality2").value = 2;
	        d3.select('#element-viewers-particular').select('p').remove();
	        d3.select('#element-viewers-visualization').selectAll('div').remove();
	        d3.select('#element-viewers-visualization').select('svg').remove();
	        
		
		    InGC = [];
  
            rowLabels = [];
            globalIndice = 0;
            globalFile = null;
	        globalRow = null; 
	        globalRowc = null;
	        RowColIndex = 0;
	        otherIndexGl = -1;
		    otherIndexGlCell = -1;
	        cellIndexR = null;
	        cellIndexC = 0;
	        indicator = 0;
	        myIndexGlob = -1;
		
		    ListRowIndex = [];
            ListRowIndexLabel = [];
            dblclickYN = 0;
            glListRowIndex = [];
            glListRowIndexLabel = [];
            ListotherIndexGl = [];
            globalRowcR = null;
            cellIndexRR = null;
		
		    comptBic = comptBic - numberDisc;
	        readfile1(setsB, columnLabels, 2, 3);
	   
	        /*d3.selectAll(("#minCardinality4")).on('click', function(){
	            var valeur = document.getElementById("minCardinality4").value;
	            var valeurGC = document.getElementById("geneCondValue").value;
	            var choiceGC = document.getElementById("geneCondChoice1").value;
	            if(( valeur != minCardinality)|| (valeurGC != geneCondValue) || (choiceGC != geneCondChoice)) {
                   DiscardBicNumber(setsB, valeur, valeurGC, choiceGC);
			   
	            }
            });*/
	    }
   
    }
}
	
}

//Hide biclusters with rate of overlaps less than a threshold
function DiscardBicRate(bicOverlaps, sets, minCardinality, geneCondValue){
	
	//add code to distinguish genes from conditions
	var allOver = bicOverlaps.length;
	var rate;
	var roundRate;
	var rateEachBic = [];
	var setsBB = sets;
	var columnLab = columnLabels;
    var numberDisc = 0;
	
	for(var i = 0; i < setsBB.length; i++){
		if(setsBB[i].name !== null){
		    rate = 0;
		    for(var j = 0; j < bicOverlaps.length; j++){
				if(bicOverlaps[j] !== null){
			        if(bicOverlaps[j].includes(setsBB[i].name)){
				        rate++;
			        }
				}
			
		    }// fin forrrrrr
		    roundRate = Math.round((rate/allOver)*100);
		    rateEachBic.push(roundRate);
		}		
	}
	
	for (var i = 0; i < setsBB.length; i++) {
		if(setsBB[i] !== null){
		    if(geneCondValue == 20){
			    if(rateEachBic[i] > minCardinality){
				    numberDisc++;
				    
			    }
	        }else{
			    if(geneCondValue == 15){
			        if(rateEachBic[i] < minCardinality){
				        numberDisc++;
				        
			        }
			    }else{
				
				    if(rateEachBic[i] == minCardinality){
				        numberDisc++;
				        
			        }
			    }
		    }
	    }
		
	}
	

	
if(numberDisc == 0){
	if(geneCondValue == 20){
		alert("No biclusters with rate of overlaps more than "+ minCardinality +"%.");
	}else{
		if(geneCondValue == 15){
			alert("No biclusters with rate of overlaps less than "+ minCardinality +"%.");
		}else{
			alert("No biclusters with rate of overlaps equals to "+ minCardinality +"%.");
		}
	}
	
	/*if(document.getElementById('sortNrSetsInIntersection8').checked){
	
	    d3.selectAll(("#minCardinality5")).on('click', function(){
	        var valeur = document.getElementById("minCardinality5").value;
	        var valeurGC = document.getElementById("geneCondValue1").value;
	        if( valeur != minCardinality || valeurGC != geneCondValue){
               DiscardBicRate(bicOverlaps, setsB, valeur, valeurGC);
	        }
        });
	}*/
}
else{
	if(numberDisc == setsBB.length-1 || numberDisc == setsBB.length){
		
		if(geneCondValue == 20){
		    alert("All of biclusters have a rate of overlaps more than "+ minCardinality +"%. Impossible to hide all of them. Try to change the values of parameters.");
	    }else{
		    if(geneCondValue == 15){
			    alert("All of biclusters have a rate of overlaps less than "+ minCardinality +"%. Impossible to hide all of them. Try to change the values of parameters.");
		    }else{
			     alert("All of biclusters have a rate of overlaps equals to "+ minCardinality +"%. Impossible to hide all of them. Try to change the values of parameters.");
		    }
	    }
	
	    /*if(document.getElementById('sortNrSetsInIntersection8').checked){
	
	        d3.selectAll(("#minCardinality5")).on('click', function(){
	            var valeur = document.getElementById("minCardinality5").value;
	            var valeurGC = document.getElementById("geneCondValue1").value;
	            if( valeur != minCardinality || valeurGC != geneCondValue){
                    DiscardBicRate(bicOverlaps, setsB, valeur, valeurGC);
	            }
            });
	    }*/
	}else{
		
	for (var k = 0; k < numberDisc; k++) {	
		for (var i = 0; i < setsBB.length; i++) {
		    if(setsBB[i] !== null){
		        if(geneCondValue == 20){
			        if(rateEachBic[i] > minCardinality){
				        setsBB[i] = null;
				        columnLab[i] = null;
			        }
	            }else{
			        if(geneCondValue == 15){
			            if(rateEachBic[i] < minCardinality){
				            setsBB[i] = null;
					        columnLab[i] = null;
			            }
			        }else{
				
				        if(rateEachBic[i] == minCardinality){
				            setsBB[i] = null;
					        columnLab[i] = null;
			            }
			        }
		        }
	        }
		
	    }
	}
		
		
		
	    window.setsB = setsBB.filter(function (el) {
             return el != null;
        });
		
	    window.columnLabels = columnLab.filter(function (el) {
             return el != null;
        });
    
		  
	//var isCheckedDegree = $('#sortNrSetsInIntersection').attr('checked')?true:false;
    
        if(document.getElementById('sortNrSetsInIntersection8').checked){
		    document.getElementById("sortNrSetsInIntersection").checked = true;
	        document.getElementById("sortIntersectionSize").checked = false;
	        document.getElementById("sortNrSetsInIntersection1").checked = false;
	        document.getElementById("sortNrSetsInIntersection2").checked = false;
	        document.getElementById("sortNrSetsInIntersection3").checked = false;
		    document.getElementById("sortNrSetsInIntersection7").checked = false;
			//document.getElementById("maxi1").checked = false;
			//document.getElementById("maxi2").checked = false;
	        document.getElementById("save_as_png").disabled = true;
	        document.getElementById("save_as_txt").disabled = true;
	        document.getElementById("minCardinality1").value = 1;
	        document.getElementById("minCardinality2").value = 1;
	        document.getElementById("minCardinality3").value = 1;
	        //document.getElementById("minCardinality4").value = 1;
			//document.getElementById("maxiCardinality1").value = 5;
			//document.getElementById("maxiCardinality2").value = 2;
	    //document.getElementById("minCardinality5").value = 0;
	        d3.select('#element-viewers-particular').select('p').remove();
	        d3.select('#element-viewers-visualization').selectAll('div').remove();
	        d3.select('#element-viewers-visualization').select('svg').remove();
	        var elview = document.getElementById('element-viewers-empty');
            if(elview !== null)
	           document.getElementById('element-viewers-empty').remove();
		    var elview1 = document.getElementById('element-viewers-empty1');
		    if(elview1 !== null)
			   document.getElementById('element-viewers-empty1').remove();
		    d3.select('#element-viewers-particular').select('p').remove();
		    d3.select('#element-viewers-visualization').selectAll('div').remove();
		    //d3.select('#element-viewers-visualization').selectAll('span').remove();
		    d3.select('#element-viewers-visualization').select('svg').remove();
	        var parentDiv = document.getElementById('matrix-elements');
	        var container = document.getElementById('element-viewers-particular');
            var closeDiv = document.createElement('div');
	        closeDiv.setAttribute("id", "element-viewers-empty1");
	        closeDiv.setAttribute("class","info-message1");
            if(toBuildGl == 0){
				closeDiv.innerHTML = 'No visualizations configured. Click <b>Load Expression Data</b> button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data.';
			}else{
                closeDiv.innerHTML = 'No visualizations configured. Click on <b>the number of a row or column</b> to add a new visualization.';
			}
			parentDiv.insertBefore(closeDiv, container);
		
		    InGC = [];
  
            rowLabels = [];
            globalIndice = 0;
            globalFile = null;
	        globalRow = null; 
	        globalRowc = null;
	        RowColIndex = 0;
	        otherIndexGl = -1;
		    otherIndexGlCell = -1;
	        cellIndexR = null;
	        cellIndexC = 0;
	        indicator = 0;
	        myIndexGlob = -1;
		
		    ListRowIndex = [];
            ListRowIndexLabel = [];
            dblclickYN = 0;
            glListRowIndex = [];
            glListRowIndexLabel = [];
            ListotherIndexGl = [];
            globalRowcR = null;
            cellIndexRR = null;
		
		    comptBic = comptBic - numberDisc;
	        readfile1(setsB, columnLabels, 2, 3);
	   
	        /*d3.selectAll(("#minCardinality5")).on('click', function(){
	            var valeur = document.getElementById("minCardinality5").value;
	            var valeurGC = document.getElementById("geneCondValue1").value;
	            if( valeur != minCardinality || valeurGC != geneCondValue){
                   DiscardBicRate(bicOverlaps, setsB, valeur, valeurGC);
	            }
            });*/
	    }
    }
   
}
	
}


//Search for overlaps with few biclusters 
function ShowOverLess(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, minCardinality){
	
	var minn = 0;
	for(i = 0; i < bicOverlaps.length ; i++) {
		if(bicOverlaps[i] !== null && bicOverlaps[i] !== " "){
		    if(bicOverlaps[i].length < minn) {
			    minn = bicOverlaps[i].length;
				
		    }
	    }		
    }
if(minCardinality < minn){
	alert("No overlaps with number of overlapped biclusters less or equal than "+ minCardinality +".");
	/*if(document.getElementById('sortNrSetsInIntersection2').checked){
	
	    d3.selectAll(("#minCardinality2")).on('click', function(){
	        var valeur = document.getElementById("minCardinality2").value;
	        if( valeur != minCardinality){
               ShowOverLess(intValue, bicOverlaps, elemOverlaps, max, min, setsB, rowLabels, valeur);
	        }
        });
	}*/
}else{
	for (var i = 0; i < bicOverlaps.length; i++) {
		if(bicOverlaps[i] !== null && bicOverlaps[i] !== " "){
			if(bicOverlaps[i].length > minCardinality){
				bicOverlaps[i] = null;
				elemOverlaps[i] = null;
				rowLabels[i] = null;
			}
		}
	}
	
	var discOverlaps = bicOverlaps.filter(function (el) {
             return el != null;
          });
    var discEOverlaps = elemOverlaps.filter(function (el) {
             return el != null;
          });
	var discLabels = rowLabels.filter(function (el) {
             return el != null;
          });
		  
	//var isCheckedDegree = $('#sortNrSetsInIntersection').attr('checked')?true:false;
    
    if(document.getElementById('sortNrSetsInIntersection2').checked){
		
		InGC = discEOverlaps;
	   buildBic(intValue, discOverlaps, discEOverlaps, max, min, median, setsB, discLabels, columnLabels);
	   
	   /*d3.selectAll(("#minCardinality2")).on('click', function(){
	        var valeur = document.getElementById("minCardinality2").value;
	        if( valeur != minCardinality){
               ShowOverLess(intValue, discOverlaps, discEOverlaps, max, min, setsB, discLabels, valeur);
	        }
        });*/
	}
    
}	

}

//searach for overlaps with large number of bicluters 
function ShowOverMore(intValue, bicOverlaps, elemOverlaps, max, min, median, setsB, rowLabels, minCardinality){
	var maxx = 0;
	for(i = 0; i < bicOverlaps.length ; i++) {
		if(bicOverlaps[i] !== null && bicOverlaps[i] !== " "){
		    if(bicOverlaps[i].length > maxx) {
			    maxx = bicOverlaps[i].length;
				
		    }
	    }		
    }

if(minCardinality > maxx){
	alert("No overlaps with number of overlapped biclusters more or equal than "+ minCardinality +".");
	
	/*if(document.getElementById('sortNrSetsInIntersection3').checked){
		
	    d3.selectAll(("#minCardinality3")).on('click', function(){
	        var valeur = document.getElementById("minCardinality3").value;
	        if( valeur != minCardinality){
               ShowOverMore(intValue, bicOverlaps, elemOverlaps, max, min, setsB, rowLabels, valeur);
	        }
        });
	}*/
}else{
	for (var i = 0; i < bicOverlaps.length; i++) {
		if(bicOverlaps[i] !== null && bicOverlaps[i] !== " "){
			if(bicOverlaps[i].length < minCardinality){
				bicOverlaps[i] = null;
				elemOverlaps[i] = null;
				rowLabels[i] = null;
			}
		}
	}
	
	var discOverlaps = bicOverlaps.filter(function (el) {
             return el != null;
          });
    var discEOverlaps = elemOverlaps.filter(function (el) {
             return el != null;
          });
	var discLabels = rowLabels.filter(function (el) {
             return el != null;
          });
		  
	//var isCheckedDegree = $('#sortNrSetsInIntersection').attr('checked')?true:false;
    
    if(document.getElementById('sortNrSetsInIntersection3').checked){
		
		InGC = discEOverlaps;
	   buildBic(intValue, discOverlaps, discEOverlaps, max, min, median, setsB, discLabels, columnLabels);
	   
	   /*d3.selectAll(("#minCardinality3")).on('click', function(){
	        var valeur = document.getElementById("minCardinality3").value;
	        if( valeur != minCardinality){
               ShowOverMore(intValue, discOverlaps, discEOverlaps, max, min, setsB, discLabels, valeur);
	        }
        });*/
	}
	
}	

}
 
//function to merge similar overlaps (not used until now)
/*
function MergeOver(intValue, bicOverlaps, elemOverlaps, max, min,setsB){
	var numberMerge = 0;
	for (var i = 0; i < bicOverlaps.length; i++) {
		
		if(bicOverlaps[i].length > 1 && bicOverlaps[i] !== null && bicOverlaps[i] !== " "){
			
			var ovconcat = [];
			var sameGC = [];
			var diff1 = [];
			var diff2 = [];
			var bic1 = [];
			var bic2 = [];
			var bic3 = [];
			
		    for (var j = i+1; j < bicOverlaps.length; j++) {
				
				if(bicOverlaps[j].length > 1 && bicOverlaps[j] !== null && bicOverlaps[j] !== " "){
					
					var sameGC = elemOverlaps[i].filter((word) => elemOverlaps[j].includes(word));
					var commun = sameGC.length;
					var numb1 = elemOverlaps[i].length;
					var numb2 = elemOverlaps[j].length;
					
					if(((commun / numb1) + (commun / numb2)) /2 >= 0.75){
						numberMerge++;
                        var last = elemOverlaps[i].concat(elemOverlaps[j].filter(function (item) {
							return elemOverlaps[i].indexOf(item) < 0;
						}));
						var ovconcat = bicOverlaps[i].concat(bicOverlaps[j].filter(function (item) {
							return bicOverlaps[i].indexOf(item) < 0;
						}));
						if(JSON.stringify(ovconcat) == JSON.stringify(bicOverlaps[i])){
							elemOverlaps[i] = last;
						    elemOverlaps[j] = null;
						    bicOverlaps[j] = null;
						}else{
							if(JSON.stringify(ovconcat) == JSON.stringify(bicOverlaps[j])){
								
								elemOverlaps[j] = last;
						        elemOverlaps[i] = null;
								bicOverlaps[i] = null;
								
							}else{
								var tnt = false;
								for(var k=0; k < bicOverlaps.length; k++){
									if(JSON.stringify(ovconcat) == JSON.stringify(bicOverlaps[k])){
										tnt = true;
										elemOverlaps[k] = last;
										bicOverlaps[i] = null;
										bicOverlaps[j] = null;
						                elemOverlaps[i] = null;
										elemOverlaps[j] = null;
									}
								}
								if(tnt == false){
									bicOverlaps.push(ovconcat);
									elemOverlaps.push(last);
								}
							}
						}
						//kepp it as comments /*
						for(var k=0; k < bicOverlaps.length; k++){
							
							var sameBIC = bicOverlaps[k].filter((word) => ovconcat.includes(word));
							if(sameBIC.length == bicOverlaps[k].length){
								var sameBICki = bicOverlaps[k].filter((word) => bicOverlaps[i].includes(word)); 
								if(sameBICki.length == bicOverlaps[i].length){
									bicOverlaps[i] = ovconcat;
						            elemOverlaps[i] = last;
						            elemOverlaps[j] = null;
									bicOverlaps[j] = null;
								}else{
									var sameBICki = bicOverlaps[k].filter((word) => bicOverlaps[j].includes(word));
									if(sameBICki.length == bicOverlaps[j].length){
										bicOverlaps[j] = ovconcat;
						                elemOverlaps[j] = last;
						                elemOverlaps[i] = null;
										bicOverlaps[i] = null;
								    }else{
										bicOverlaps[k] = ovconcat;
						                elemOverlaps[k] = last;
										bicOverlaps[i] = null;
										bicOverlaps[j] = null;
						                elemOverlaps[i] = null;
										elemOverlaps[j] = null;
									}
								}
                            }
							
                        }*//////////////keep it as comments
						//from here to delete comments
						/*break;
						
					}
			        
				}
					
		    }
		}
	}
if(numberMerge == 0){
	alert("No overlaps to merge.");
}else{
	var discOverlaps = bicOverlaps.filter(function (el) {
             return el != null;
          });
    var discEOverlaps = elemOverlaps.filter(function (el) {
             return el != null;
          });
		  
	
    
    if(document.getElementById('sortNrSetsInIntersection').checked){
		var max = 0;
	    var min = 0;	  
        for(i = 0; i < discOverlaps.length ; i++) {
			if(discEOverlaps[i].length > max) {
				max = discEOverlaps[i].length;
				
		    }
			if(discEOverlaps[i].length < min) {
				min = discEOverlaps[i].length;
				
		    }
			
        }
		InGC = discEOverlaps;
	   buildBic(intValue, discOverlaps, discEOverlaps, max, min,setsB);
    }else{
		
		var tabString = [];
		var tabbicOverlaps = [];
		var tabelemOverlaps = [];
		for (var i = 0; i < discOverlaps.length; i++) {
			var floatstring = "";
			for (var j = 0; j < discOverlaps[i].length; j++) {
				floatstring += discOverlaps[i][j];
			}
			tabString.push(floatstring);
		}
	
	   var maximum = 5;
       var _source, matches, x, y;
      _source = tabString.slice();
	 
       matches = [];
       for (x = _source.length - 1; x >= 0; x--) {
          var output = _source.splice(x, 1);
          for (y = _source.length - 1; y >= 0; y--) {
			  if (Levenshtein.get(output[0], _source[y]) <= maximum) {
				  output.push(_source[y]);
                  _source.splice(y, 1);
                  x--;
                }
            }
			matches.push(output);
        }
	

	    for (var i = 0; i < matches.length; i++) {
		    for (var j = 0; j < matches[i].length; j++) {
		       var condIndex = tabString.indexOf(matches[i][j]);
		       tabbicOverlaps.push(discOverlaps[condIndex]);
		       tabelemOverlaps.push(discEOverlaps[condIndex]);
		    }
	    }
		InGC = tabelemOverlaps;
		buildBic(intValue, tabbicOverlaps, tabelemOverlaps, max, min, setsB);
	}
}
}
*/

function geneMatrix1(index, index1, indice, test, bIndex, numBic, arrayRows, arrayRowsLabels){
	 //readgenefile(globalFile,index, indice);
	 
    var currrentGenes = [];
    var currrentConditions = [];
if(no_expression == 0){	
    var ttFloat =0;
	var somme =0;
	var AllLevels =0;
	var len = 0;
	for(var k = 1, len = tabFinalResults.length; k < len; k++){
		for(var f = 1, len = tabFinalResults[k].length; f < len; f++){
			var floatstring = "" + tabFinalResults[k][f];
            var tempo = parseFloat(floatstring);
            ttFloat = Math.trunc(tempo * 100);
			somme += ttFloat;
			if(ttFloat > max_expression) {
				max_expression = ttFloat;
				
			}
			if(ttFloat < min_expression) {
				min_expression = ttFloat;
				
			}
		}
		AllLevels += tabFinalResults[k].length - 1;
	}
	median_expression = Math.trunc(somme / AllLevels);
		
	var s = 0;
	tabFinalResults.forEach(function(data){
        obj[data[0]] = s;
		s++;
    });
	no_expression = 1;
}
	//build heatmap for list of overlaps
	if(indice == 2){
		var m = 0;
        while(m < arrayRows.length){
			
            var currentR = arrayRows[m];			
		    for(var i = 0, len = InGC[currentR].length; i < len; i++){
			    var l=0;
			    while(l < setsB.length){
				    if(setsB[l].rows.includes(InGC[currentR][i])){
					    currrentGenes.push(InGC[currentR][i]);
					    break;
				    }
				    else {
					    if(setsB[l].columns.includes(InGC[currentR][i])){
						    currrentConditions.push(InGC[currentR][i]);
						    break;
					    }
					    else{
						    l=l+1;
					    }
				    }
			    }
		    }
			
			m = m+1;
		}
		
		var currrentGenesU = currrentGenes.filter(function(elem, index, self) {
                   return index == self.indexOf(elem);
                });
				
		var currrentConditionsU = currrentConditions.filter(function(elem, index, self) {
                   return index == self.indexOf(elem);
                });
		currrentGenesU.sort();
		currrentConditionsU.sort();
	   //overlap with genes and conditions
	    if(currrentGenesU.length > 0 && currrentConditionsU.length > 0){
			var k = 0;
            var floatstring;
            var tempo;
            var i = 0;
            var j = 0;
			var numrows = currrentGenesU.length;
            var numcols = tabFinalResults[0].length;
            var matrix = new Array(numrows);
            for (i = 0; i < numrows; i++) {
                matrix[i] = new Array(numcols);
                for (j = 0; j < numcols; j++) {		
						
						var value = 0;
						if( currrentGenesU[i] in  obj == true){
						   value = obj[currrentGenesU[i]];
					    }
							floatstring = "" + tabFinalResults[value][j+1];
                            tempo = parseFloat(floatstring);
                            matrix[i][j] = Math.trunc(tempo * 100);
                }
            }
               
				if(currrentGenesU.length > 2000){
				
				        var elview = document.getElementById('element-viewers-empty');
                        if(elview !== null)
	                        document.getElementById('element-viewers-empty').remove();
						var elview1 = document.getElementById('element-viewers-empty1');
                        if(elview1 !== null)
	                       document.getElementById('element-viewers-empty1').remove();
                        d3.select('#element-viewers-particular').select('p').remove();
	                    d3.select('#element-viewers-visualization').selectAll('div').remove();
	                    d3.select('#element-viewers-visualization').select('svg').remove();
	                    var parentDiv = document.getElementById('matrix-elements');
	                    var container = document.getElementById('element-viewers-particular');
                        var closeDiv = document.createElement('div');
	                    closeDiv.setAttribute("id", "element-viewers-empty1");
	                    closeDiv.setAttribute("class","info-message1");
                        closeDiv.innerHTML = 'Heatmaps larger than <b>2000</b> rows are not shown.';
                        parentDiv.insertBefore(closeDiv, container);
				
			        }else{
						//alert("Visualization of elements of a set of overlaps takes some times, please wait...");
				        //BuildWithLevels(tabFinalResults[0], currrentConditionsU, currrentGenesU, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
					    do_totals3(tabFinalResults[0], currrentConditionsU, currrentGenesU, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
					}
		}else{
		    //overlap with conditions only
		    if(currrentGenesU.length == 0){
			    
				BuildSharedCG(currrentConditionsU, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);
	        }else{
		        //overlap with genes only
		        
				if(currrentConditionsU.length == 0){
			        var k = 0;
                    var floatstring;
                    var tempo;
                    var i = 0;
                    var j = 0;
                    var numrows = currrentGenesU.length;
                    var numcols = tabFinalResults[0].length;
                    var matrix = new Array(numrows);
                    for (i = 0; i < numrows; i++) {
                        matrix[i] = new Array(numcols);
                        for (j = 0; j < numcols; j++) {	
                            
							var value = 0;
						    if( currrentGenesU[i] in  obj == true){
						       value = obj[currrentGenesU[i]];
					        }    
							floatstring = "" + tabFinalResults[value][j+1];
                            tempo = parseFloat(floatstring);
                            matrix[i][j] = Math.trunc(tempo * 100);
							
                        }
                    }
			        
                    if(currrentGenesU.length > 2000){
				
				        var elview = document.getElementById('element-viewers-empty');
                        if(elview !== null)
	                        document.getElementById('element-viewers-empty').remove();
						
						var elview1 = document.getElementById('element-viewers-empty1');
                        if(elview1 !== null)
	                       document.getElementById('element-viewers-empty1').remove();
                        d3.select('#element-viewers-particular').select('p').remove();
	                    d3.select('#element-viewers-visualization').selectAll('div').remove();
	                    d3.select('#element-viewers-visualization').select('svg').remove();
	                    var parentDiv = document.getElementById('matrix-elements');
	                    var container = document.getElementById('element-viewers-particular');
                        var closeDiv = document.createElement('div');
	                    closeDiv.setAttribute("id", "element-viewers-empty1");
	                    closeDiv.setAttribute("class","info-message1");
                        closeDiv.innerHTML = 'Heatmaps larger than <b>2000</b> rows are not shown.';
                        parentDiv.insertBefore(closeDiv, container);
				
			        }else{
                        //alert("Visualization of elements of a set of overlaps takes some times, please wait...");						
		                //BuildWithLevelsOnlyGenes(tabFinalResults[0], currrentGenesU, matrix, min_expression, median_expression, max_expression, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);			  
					    do_totals7(tabFinalResults[0], currrentGenesU, matrix, min_expression, median_expression, max_expression, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);
					
					}
		        }
				
		    }
	    }
		
	}
	//build heatmap for each overlap between biclusters
	if(indice == 0){	
		for(var i = 0, len = InGC[index].length; i < len; i++){
			var l=0;
			while(l < setsB.length){
				if(setsB[l].rows.includes(InGC[index][i])){
					currrentGenes.push(InGC[index][i]);
					break;
				}
				else {
					if(setsB[l].columns.includes(InGC[index][i])){
						currrentConditions.push(InGC[index][i]);
						break;
					}
					else{
						l=l+1;
					}
				}
			}
		}
		
	   //overlap with genes and conditions
	    if(currrentGenes.length > 0 && currrentConditions.length > 0){
			var k = 0;
            var floatstring;
            var tempo;
            var i = 0;
            var j = 0;
			var numrows = currrentGenes.length;
            var numcols = tabFinalResults[0].length;
            var matrix = new Array(numrows);
            for (i = 0; i < numrows; i++) {
                matrix[i] = new Array(numcols);
                for (j = 0; j < numcols; j++) {		
						
						var value = 0;
						if( currrentGenes[i] in  obj == true){
						   value = obj[currrentGenes[i]];
					    }
							floatstring = "" + tabFinalResults[value][j+1];
                            tempo = parseFloat(floatstring);
                            matrix[i][j] = Math.trunc(tempo * 100);
                }
            }
                    if(currrentGenes.length > 2000){
				
				        var elview = document.getElementById('element-viewers-empty');
                        if(elview !== null)
	                        document.getElementById('element-viewers-empty').remove();
						var elview1 = document.getElementById('element-viewers-empty1');
                        if(elview1 !== null)
	                       document.getElementById('element-viewers-empty1').remove();
                        d3.select('#element-viewers-particular').select('p').remove();
	                    d3.select('#element-viewers-visualization').selectAll('div').remove();
	                    d3.select('#element-viewers-visualization').select('svg').remove();
	                    var parentDiv = document.getElementById('matrix-elements');
	                    var container = document.getElementById('element-viewers-particular');
                        var closeDiv = document.createElement('div');
	                    closeDiv.setAttribute("id", "element-viewers-empty1");
	                    closeDiv.setAttribute("class","info-message1");
                        closeDiv.innerHTML = 'Heatmaps larger than <b>2000</b> rows are not shown.';
                        parentDiv.insertBefore(closeDiv, container);
				
			        }else{
				       // BuildWithLevels(tabFinalResults[0], currrentConditions, currrentGenes, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
					    do_totals3(tabFinalResults[0], currrentConditions, currrentGenes, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
					}
		}else{
		    //overlap with conditions only
		    if(currrentGenes.length == 0){
			    BuildSharedCG(currrentConditions, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);
	        }else{
		        //overlap with genes only
		        
				if(currrentConditions.length == 0){
			        var k = 0;
                    var floatstring;
                    var tempo;
                    var i = 0;
                    var j = 0;
                    var numrows = currrentGenes.length;
                    var numcols = tabFinalResults[0].length;
                    var matrix = new Array(numrows);
                    for (i = 0; i < numrows; i++) {
                        matrix[i] = new Array(numcols);
                        for (j = 0; j < numcols; j++) {	
                            
							var value = 0;
						    if( currrentGenes[i] in  obj == true){
						       value = obj[currrentGenes[i]];
					        }    
							floatstring = "" + tabFinalResults[value][j+1];
                            tempo = parseFloat(floatstring);
                            matrix[i][j] = Math.trunc(tempo * 100);
							
                        }
                    }
			        
					
					if(currrentGenes.length > 2000){
				
				        var elview = document.getElementById('element-viewers-empty');
                        if(elview !== null)
	                        document.getElementById('element-viewers-empty').remove();
						 var elview1 = document.getElementById('element-viewers-empty1');
                        if(elview1 !== null)
	                       document.getElementById('element-viewers-empty1').remove();
                        d3.select('#element-viewers-particular').select('p').remove();
	                    d3.select('#element-viewers-visualization').selectAll('div').remove();
	                    d3.select('#element-viewers-visualization').select('svg').remove();
	                    var parentDiv = document.getElementById('matrix-elements');
	                    var container = document.getElementById('element-viewers-particular');
                        var closeDiv = document.createElement('div');
	                    closeDiv.setAttribute("id", "element-viewers-empty1");
	                    closeDiv.setAttribute("class","info-message1");
                        closeDiv.innerHTML = 'Heatmaps larger than <b>2000</b> rows are not shown.';
                        parentDiv.insertBefore(closeDiv, container);
				
			        }else{
                        //BuildWithLevelsOnlyGenes(tabFinalResults[0], currrentGenes, matrix, min_expression, median_expression, max_expression, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);			  
			            do_totals7(tabFinalResults[0], currrentGenes, matrix, min_expression, median_expression, max_expression, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);
					}
		        }
				
		    }
	    }
		
	}
	// build the heatmap for each bicluster
	if(indice == 1){
       // var k = 0;
        var floatstring;
        var tempo;
        var i = 0;
        var j = 0;	
		if(setsB[index].rows.length > 0 && setsB[index].columns.length > 0){
			var numrows = setsB[index].rows.length;
            var numcols = tabFinalResults[0].length; //setsB[index].columns.length;
            var matrix = new Array(numrows);
            for (i = 0; i < numrows; i++) {
                matrix[i] = new Array(numcols);
                for (j = 0; j < numcols; j++) {		
						
						var value = 0;
						if( setsB[index].rows[i] in  obj == true){
								 value = obj[setsB[index].rows[i]];
							}
						    
							floatstring = "" + tabFinalResults[value][j+1];
                            tempo = parseFloat(floatstring);
                            matrix[i][j] = Math.trunc(tempo * 100);
						    
		                    
                }
            }
				
        		
		}
		    if(setsB[index].rows.length > 2000){
				
				var elview = document.getElementById('element-viewers-empty');
               if(elview !== null)
	              document.getElementById('element-viewers-empty').remove();
			   var elview1 = document.getElementById('element-viewers-empty1');
                if(elview1 !== null)
	               document.getElementById('element-viewers-empty1').remove();
                d3.select('#element-viewers-particular').select('p').remove();
	           d3.select('#element-viewers-visualization').selectAll('div').remove();
	           d3.select('#element-viewers-visualization').select('svg').remove();
	          var parentDiv = document.getElementById('matrix-elements');
	          var container = document.getElementById('element-viewers-particular');
              var closeDiv = document.createElement('div');
	          closeDiv.setAttribute("id", "element-viewers-empty1");
	          closeDiv.setAttribute("class","info-message1");
              closeDiv.innerHTML = 'Heatmaps larger than <b>2000</b> rows are not shown.';
              parentDiv.insertBefore(closeDiv, container);
				
			}else{
				//alert("Visualization of elements of a bicluster takes some times, please wait...");
				do_totals9(tabFinalResults[0], setsB[index].columns, setsB[index].rows, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
                //BuildWithLevels(tabFinalResults[0], setsB[index].columns, setsB[index].rows, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
	            //do_totals3(tabFinalResults[0], setsB[index].columns, setsB[index].rows, matrix, min_expression, median_expression, max_expression, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels)
			}				
	}
}

function do_totals3(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels)
 {
	
 document.all.myModal2.style.visibility="visible";
 setTimeout(function() {
    do_totals4(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
   }, 1);
 
 }
 
function do_totals4(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels)
 {
  BuildWithLevels(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
  document.all.myModal2.style.visibility="hidden";
 } 

function do_totals9(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels)
 {
	
 document.all.myModal4.style.visibility="visible";
 setTimeout(function() {
    do_totals10(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
   }, 1);
 
 }
 
function do_totals10(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels)
 {
  BuildWithLevels(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels);
  document.all.myModal4.style.visibility="hidden";
 } 


function do_totals7(Results, currrentGenes, matrixl, minl, pivot, maxl, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice)
 {
	
 document.all.myModal2.style.visibility="visible";
 setTimeout(function() {
    do_totals8(Results, currrentGenes, matrixl, minl, pivot, maxl, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);
   }, 1);
 
 }
 
function do_totals8(Results, currrentGenes, matrixl, minl, pivot, maxl, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice)
 {
  BuildWithLevelsOnlyGenes(Results, currrentGenes, matrixl, minl, pivot, maxl, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice);
  document.all.myModal2.style.visibility="hidden";
 } 

//for overlaps with genes and conditions and for biclusters
function BuildWithLevels(Results, currrentConditions, currrentGenes, matrixl, minl, pivot, maxl, indice, index, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels){
	var floatstring = "";
	var len = 0;
	var margin = {top: 50, right: 50, bottom: 100, left: 100},
    width = 10 * Math.floor(Results.length),
    height = 10 * Math.floor(currrentGenes.length);
    var elview = document.getElementById('element-viewers-empty');
    if(elview !== null)
	   document.getElementById('element-viewers-empty').remove();
    var elview1 = document.getElementById('element-viewers-empty1');
    if(elview1 !== null)
	   document.getElementById('element-viewers-empty1').remove();
    d3.select('#element-viewers-particular').select('p').remove();
	d3.select('#element-viewers-visualization').selectAll('div').remove();
	d3.select('#element-viewers-visualization').select('svg').remove();

if(indice == 0 && test == false){	
d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Overlap'+ index1 + ' (number of genes: '+ currrentGenes.length + '-- number of conditions: '+ currrentConditions.length + ')</p>' );
}                             
if(indice == 0 && test == true){	
d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Genes and conditions of bicluster'+bIndex+' not integrated in any overlap (Number of genes: '+ currrentGenes.length + '-- number of conditions: '+ currrentConditions.length + ')</p>' );
}

if(indice == 1){	
d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Bicluster'+ numBic + ' (number of genes: '+ currrentGenes.length + ' -- number of conditions: '+ currrentConditions.length + ')</p>' );
}
if(indice == 2){
    
    for(var j=0; j < arrayRowsLabels.length; j++){
	    floatstring = floatstring + arrayRowsLabels[j] + ", ";
    }
    floatstring = floatstring.substr(0,floatstring.length-2);	
d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Overlap'+ floatstring + ' (number of genes: '+ currrentGenes.length + '-- number of conditions: '+ currrentConditions.length + ')</p>' );
} 			 
/*var maxi = 0;
for(var i=0, len = currrentGenes.length; i < len; i++){
	if(currrentGenes[i].length > maxi)
		maxi = currrentGenes[i].length;
}
var possible_left = (maxi - 1) * 11;*/
var maxiC = 0;
for(var i=0, len = Results.length; i < len; i++){
	if(Results[i].length > maxiC)
		maxiC = Results[i].length;
}
var possible_bottom = (maxiC - 1) * 20;



var svg = d3.select("#element-viewers-visualization").append("svg")
    .attr("width", width+ margin.left + margin.right)  
    .attr("height", height + margin.top + margin.bottom) 
  .append("g")
    .attr("transform", "translate(" + 120 + "," + possible_bottom + ")"); //possible_left possible_bottom 120

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
	.attr("fill", "white");
	
var numrows = currrentGenes.length;
var numcols = Results.length;

var New_Results = [];
var irow = 0;
var jrow = 0;
var after = currrentConditions.length;
for(var i=0, len = Results.length; i < len; i++){
	
	if(currrentConditions.includes(Results[i]) == true){
	    New_Results[irow] = Results[i];
     	irow++;
	}else{
		var addRow = after + jrow; 
		New_Results[addRow] = Results[i];
     	jrow++;
	}
}

var irow1 = 0;
var jrow1 = 0;
var ii = 0;
var jj = 0;
var New_Levels = new Array(numrows);
for(ii=0; ii < numrows; ii++){
	New_Levels[ii] = new Array(numcols);
	for(jj=0; jj < numcols; jj++){
		if(currrentConditions.includes(Results[jj])){
	        New_Levels[ii][irow1] = matrixl[ii][jj];
     	    irow1++;
	    }else{
			
		    var addRow = after + jrow1; 
			//var addRow = after + jj;
		    New_Levels[ii][addRow] = matrixl[ii][jj];
     	    jrow1++;
			
	    }
	}
	irow1 = 0;
	jrow1 = 0;
}

var ggcolumns = 10 * Math.floor(Results.length);
var fflines = 10 * Math.floor(currrentGenes.length);
var x = d3.scale.ordinal()
    .domain(d3.range(numcols))
    .rangeBands([0, ggcolumns]);

var y = d3.scale.ordinal()
    .domain(d3.range(numrows))
    .rangeBands([0, fflines]);

var colorMap = d3.scale.linear()
    .domain([minl, pivot, maxl])
	.range(["blue", "white", "red"]);
         
var row = svg.selectAll(".row")
    .data(New_Levels)
  .enter().append("g")
    .attr("class", "row")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
	
/*row.selectAll(".cell")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d, i) { return x(i); })
	//.attr("cy", 10)
	//.attr("r", 9)
    .attr("width", x.rangeBand())
    .attr("height", x.rangeBand())
    .style("stroke-width", 0);*/
	
	
row.append("line")
    .attr("x2", ggcolumns)
	.attr("stroke-width", 0)
	.attr("stroke", "#fff");

row.append("text")
   // .attr("class", "setLabel")
    .attr("x", -6)
    .attr("y", y.rangeBand()/2)
    .attr("dy", ".32em")
    .attr("text-anchor", "end")
	.style("font", "12px sans-serif")
	.style("font-weight", 300)
	.style("fill", "black")
    .text(function(d, i) { return currrentGenes[i]; });

var column = svg.selectAll(".column")
    .data(New_Results)
  .enter().append("g")
    .attr("id", function(d, i) { return "column"+i; })
    .attr("class", "column")
    .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

column.append("line")
    .attr("x1", -fflines)
	.attr("stroke-width", 0)
	.attr("stroke", "#fff");

column.append("text")
    //.attr("class", "setLabel")
    .attr("x", 6)
    .attr("y", y.rangeBand()/2)
    .attr("dy", ".32em")
    .attr("text-anchor", "start")
	.style("font", "12px sans-serif")
	//.style("font-weight", 300)
	//.style("fill", "black")
    .text(function(d, i) { return d; })
	.style("fill", function (d) { if(currrentConditions.includes(d)) 
		                            return "black"; 
								  else
									return "gray";})
    .style("font-weight", function (d) { if(currrentConditions.includes(d)) 
		                            return "bold"; 
								  else
									return "";});


							
row.selectAll(".cell")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d, i) { return x(i); })
	//.attr("cy", 10)
	//.attr("r", 9)
    .attr("width", x.rangeBand()-1)
    .attr("height", x.rangeBand()-1)
    .style("stroke-width", 0)	
    .style("fill", function (d, i) {
                     return colorMap(d);
                })
	.on("mouseover", function (d, i) {
                     d3.select(this)
                       .style("stroke", "black")
					   .style("stroke-width", 2);

					  d3.select("#column"+i)
			            .selectAll("text")
			            .style("fill", "blue")
						.style("font-weight", "bold");
			
			          d3.select(this.parentElement)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
	                  .style("font-weight", "bold")
	                  .style("fill", "blue");
					  
					var txxtC = d3.select("#column"+i)
			                      .selectAll("text")
								  .text();
					var txxtR = d3.select(this.parentElement)
			                    .selectAll("text")
								.text();
						
					d3.select(this).insert("title").text("Value: "+ d/100 + "(G: " + txxtR + ", C: "+ txxtC +")");
						
                })
    .on("mouseout", function (d, i) {
                    d3.select(this)
                      .style("stroke", "none")
					   
					if(currrentConditions.includes(New_Results[i])){
						
					   d3.select("#column"+i)
			             .selectAll("text")
			             .style("font", "12px sans-serif")
	                     .style("font-weight", 300)
	                     .style("fill", "black")
						 .style("font-weight", "bold");
					}else{						
					   d3.select("#column"+i)
			             .selectAll("text")
			             .style("font", "12px sans-serif")
	                     .style("font-weight", 300)
	                     .style("fill", "gray");
					}
			
			       
			        
			        d3.select(this.parentElement)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
	                  .style("font-weight", 300)
	                  .style("fill", "black");
                });
							
		document.getElementById("save_as_png").disabled = false;
        document.getElementById("save_as_txt").disabled = false;		
		var textAff = "";
		if(indice == 0 && test == false){
            textAff = textAff + 'Overlap'+ index1 + ' (number of genes: '+ currrentGenes.length + '-- number of conditions: '+ currrentConditions.length + ')' + '\n';			
        }                             
        if(indice == 0 && test == true){
            textAff = textAff + 'Genes and conditions of bicluster'+bIndex+' not integrated in any overlap (Number of genes: '+ currrentGenes.length + '-- number of conditions: '+ currrentConditions.length+ ')' + '\n';			
        }
        if(indice == 1){
       	    textAff = textAff + 'Bicluster'+ numBic + ' (number of genes: '+ currrentGenes.length + ' -- number of conditions: '+ currrentConditions.length + ')'+ '\n';
        }
		if(indice == 2){
            textAff = textAff + 'Overlap'+ floatstring + ' (number of genes: '+ currrentGenes.length + '-- number of conditions: '+ currrentConditions.length + ')' + '\n';			
        } 
        textAff = textAff + '\n';		
		/*for(var i=0; i < New_Results.length; i++){
			textAff = textAff + New_Results[i] + '\t';
		}
        textAff = textAff + '\n';
        
        for(var i=0; i < New_Levels.length; i++){
			textAff = textAff + currrentGenes[i] + '\t';
			for(var j=0; j < New_Levels[i].length; j++){
				
				 textAff = textAff + New_Levels[i][j]/100 + '\t'; 
			}
			textAff = textAff + '\n';
		}*/			
		for(var i=0; i < currrentConditions.length; i++){
			textAff = textAff + New_Results[i] + '\t';
		}
        textAff = textAff + '\n';
        
        for(var i=0; i < currrentGenes.length; i++){
			textAff = textAff + currrentGenes[i] + '\t';
			for(var j=0; j < currrentConditions.length; j++){
				
				 textAff = textAff + New_Levels[i][j]/100 + '\t'; 
			}
			textAff = textAff + '\n';
		}		
      $(".ButtonTxt").on("click", function() {
	      download('downloadAsTxt.txt', 'text/plain');
       });


        function download(name, type) {
           var a = document.getElementById("ex");
           var file = new Blob([textAff], {type: type});
           a.href = URL.createObjectURL(file);
           a.download = name;
		   //textAff = "";
        }  
				
}



//bluid heatmap for only genes
function BuildWithLevelsOnlyGenes(Results, currrentGenes, matrixl, minl, pivot, maxl, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice){
	var floatstring = "";
	var margin = {top: 50, right: 100, bottom: 100, left: 100},
    width = 10 * Math.floor(Results.length),
    height = 10 * Math.floor(currrentGenes.length);
	var elview = document.getElementById('element-viewers-empty');
    if(elview !== null)
	    document.getElementById('element-viewers-empty').remove();
	var elview1 = document.getElementById('element-viewers-empty1');
    if(elview1 !== null)
	    document.getElementById('element-viewers-empty1').remove();
    d3.select('#element-viewers-particular').select('p').remove();
	d3.select('#element-viewers-visualization').selectAll('div').remove();
	d3.select('#element-viewers-visualization').select('svg').remove();
if(indice == 0){
    if(test == false){	
        d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Only genes for Overlap'+ index1 + ' (number of genes: '+ currrentGenes.length + '), the list includes:</p>' );

    }else{
	
	    d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Number of genes of bicluster'+bIndex+' not integrated in any overlap: '+ currrentGenes.length + ', the list includes:</p>' );
    }
}
if(indice == 2){
	
    for(var j=0; j < arrayRowsLabels.length; j++){
	    floatstring = floatstring + arrayRowsLabels[j] + ", ";
    }
    floatstring = floatstring.substr(0,floatstring.length-2);
	d3.select('#element-viewers-particular')
             .append("foreignObject")
			 .attr("class", "fo-message")
             .html('<p> Only genes for Overlap'+ floatstring + ' (number of genes: '+ currrentGenes.length + '), the list includes:</p>' );
}
/*var maxi = 0;
for(var i=0; i < currrentGenes.length; i++){
	if(currrentGenes[i].length > maxi)
		maxi = currrentGenes[i].length;
}
var possible_left = (maxi - 1) * 11;*/
var maxiC = 0;
for(var i=0; i < Results.length; i++){
	if(Results[i].length > maxiC)
		maxiC = Results[i].length;
}
var possible_bottom = (maxiC - 1) * 20;			 	
var svg = d3.select("#element-viewers-visualization").append("svg")
    .attr("width", width+ margin.left + margin.right)  
    .attr("height", height + margin.top + margin.bottom) 
  .append("g")
    .attr("transform", "translate(" + 120 + "," + possible_bottom + ")"); //120
//135  80
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
	.attr("fill", "white");

var numrows = currrentGenes.length;
var numcols = Results.length;


var ggcolumns = 10 * Math.floor(Results.length);
var fflines = 10 * Math.floor(currrentGenes.length);
var x = d3.scale.ordinal()
    .domain(d3.range(numcols))
    .rangeBands([0, ggcolumns]);

var y = d3.scale.ordinal()
    .domain(d3.range(numrows))
    .rangeBands([0, fflines]);

var colorMap = d3.scale.linear()
    .domain([minl, pivot, maxl])
	.range(["blue", "white", "red"]);
       

var row = svg.selectAll(".row")
    .data(matrixl)
  .enter().append("g")
    .attr("class", "row")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
	
	
row.append("line")
    .attr("x2", ggcolumns)
	.attr("stroke-width", 0)
	.attr("stroke", "#fff");

row.append("text")
   // .attr("class", "setLabel")
    .attr("x", -6)
    .attr("y", y.rangeBand()/2)
    .attr("dy", ".32em")
    .attr("text-anchor", "end")
	.style("font", "12px sans-serif")
	.style("font-weight", "bold")
	.style("fill", "black")
    .text(function(d, i) { return currrentGenes[i]; });

var column = svg.selectAll(".column")
    .data(Results)
  .enter().append("g")
    .attr("id", function(d, i) { return "colonne"+i; })
    .attr("class", "column")
    .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

column.append("line")
    .attr("x1", -fflines)
	.attr("stroke-width", 0)
	.attr("stroke", "#fff");

column.append("text")
    //.attr("class", "setLabel")
    .attr("x", 6)
    .attr("y", y.rangeBand()/2)
    .attr("dy", ".32em")
    .attr("text-anchor", "start")
	.style("font", "12px sans-serif")
	.style("font-weight", 300)
	.style("fill", "gray")
    .text(function(d, i) { return d; });
							
row.selectAll(".cell")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d, i) { return x(i); })
	//.attr("cy", 10)
	//.attr("r", 9)
    .attr("width", x.rangeBand()-1)
    .attr("height", x.rangeBand()-1)
    .style("stroke-width", 0)	
    .style("fill", function (d, i) {
                     return colorMap(d);
                })
	.on("mouseover", function (d, i) {
                     d3.select(this)
                       .style("stroke", "black")
					   .style("stroke-width", 2);

					   
					  d3.select("#colonne"+i)
			            .selectAll("text")
			            .style("fill", "blue")
						.style("font-weight", "bold");
			
			          d3.select(this.parentElement)
			            .selectAll("text")
			            .style("fill", "blue");
						
					var txxtC = d3.select("#colonne"+i)
			                      .selectAll("text")
								  .text();
					var txxtR = d3.select(this.parentElement)
			                    .selectAll("text")
								.text();
						
					d3.select(this).insert("title").text("Value: "+ d/100 + "(G: " + txxtR + ", C: "+ txxtC +")");
                })
    .on("mouseout", function (d, i) {
                    d3.select(this)
                      .style("stroke", "none")
					   
					   
					d3.select("#colonne"+i)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
	                  .style("font-weight", 300)
	                  .style("fill", "gray");
			
			       
			        
			        d3.select(this.parentElement)
			          .selectAll("text")
			          .style("font", "12px sans-serif")
	                  .style("font-weight", "bold")
	                  .style("fill", "black");
                });
		document.getElementById("save_as_png").disabled = false;
        document.getElementById("save_as_txt").disabled = false;		
	    var textAff = "";
		if(indice == 0){
		    if(test == false){
               textAff = textAff + 'Only genes for Overlap'+ index1 + ' (number of genes: '+ currrentGenes.length + ')' + '\n';		
            }else{
	            textAff = textAff + 'Number of genes of bicluster'+bIndex+' not integrated in any overlap: '+ currrentGenes.length + '\n';
            }
		}
		if(indice == 2){
            textAff = textAff + 'Only genes for Overlap'+ floatstring + ' (number of genes: '+ currrentGenes.length + ')' + '\n';		
        }
		textAff = textAff + '\n';
		for(var i=0; i < Results.length; i++){
			textAff = textAff + Results[i] + '\t';
		}
        textAff = textAff + '\n';
        
        for(var i=0; i < matrixl.length; i++){
			textAff = textAff + currrentGenes[i] + '\t';
			for(var j=0; j < matrixl[i].length; j++){
				
				 textAff = textAff + matrixl[i][j]/100 + '\t'; 
			}
			textAff = textAff + '\n';
		}			
				
      $(".ButtonTxt").on("click", function() {
	      download('downloadAsTxt.txt', 'text/plain');
       });


        function download(name, type) {
           var a = document.getElementById("ex");
           var file = new Blob([textAff], {type: type});
           a.href = URL.createObjectURL(file);
           a.download = name;
		   //textAff = "";
        }  
				
				
}

//heatmap for only conditions
function BuildSharedCG(listCG, index1, test, bIndex, numBic, arrayRows, arrayRowsLabels, indice){
	    var floatstring = "";
        var elview = document.getElementById('element-viewers-empty');
		if(elview !== null)
			document.getElementById('element-viewers-empty').remove();
		var elview1 = document.getElementById('element-viewers-empty1');
		if(elview1 !== null)
			document.getElementById('element-viewers-empty1').remove();
		d3.select('#element-viewers-particular').select('p').remove();
		d3.select('#element-viewers-visualization').selectAll('div').remove();
		//d3.select('#element-viewers-visualization').selectAll('span').remove();
		d3.select('#element-viewers-visualization').select('svg').remove();
		if(indice == 0){
		    if(test == false){
		        d3.select('#element-viewers-particular')
                  .append("foreignObject")
			      .attr("class", "fo-message")
                  .html('<p> Only conditions for Overlap'+ index1 + ' (number of conditions: '+ listCG.length + '), the list includes:</p>' );
		    }else{
			    d3.select('#element-viewers-particular')
                  .append("foreignObject")
			      .attr("class", "fo-message")
                  .html('<p> Number of conditions of bicluster'+bIndex+' not integrated in any overlap: '+ listCG.length + ', the list includes:</p>' );
		    }
		}		
		if(indice == 2){
			
            for(var j=0; j < arrayRowsLabels.length; j++){
	           floatstring = floatstring + arrayRowsLabels[j] + ", ";
            }
			d3.select('#element-viewers-particular')
               .append("foreignObject")
			   .attr("class", "fo-message")
               .html('<p> Only conditions for Overlap'+ floatstring + ' (number of conditions: '+ listCG.length + '), the list includes:</p>' );
		}			
		var selection = d3.select("#element-viewers-visualization")
                    .selectAll("div")
                    .data(listCG); 

        selection.enter().append("div")
						 .append("span")
						 .attr("class", "info-message")
						 .text(function(d, i){ 
                              return d; 
                            });
		
        document.getElementById("save_as_png").disabled = true;	
        document.getElementById("save_as_txt").disabled = false;		
		var textAff = "";
		if(indice == 0){
		    if(test == false){
                textAff = textAff + 'Only conditions for Overlap'+ index1 + ' (number of conditions: '+ listCG.length + ')' + '\n';		
            }else{
	            textAff = textAff + 'Number of conditions of bicluster'+bIndex+' not integrated in any overlap: '+ listCG.length + '\n';
            }
		}
		
		if(indice == 2){
            textAff = textAff + 'Only conditions for Overlap'+ floatstring + ' (number of conditions: '+ listCG.length + ')' + '\n';		
        }
		//textAff = textAff + 'Only conditions for Overlap'+ index1 + ' (number of conditions: '+ listCG.length + ')'+ '\n';
		textAff = textAff + '\n';
		for(var i=0; i < listCG.length; i++){
			textAff = textAff + listCG[i] + '\t';
		}
        textAff = textAff + '\n';
		
      $(".ButtonTxt").on("click", function() {
	      download('downloadAsTxt.txt', 'text/plain');
       });


        function download(name, type) {
           var a = document.getElementById("ex");
           var file = new Blob([textAff], {type: type});
           a.href = URL.createObjectURL(file);
           a.download = name;
		   //textAff = "";
        }  

         							
	
}

$(".exportImageButton").on("click", function() {
  var svg = document.querySelectorAll("svg")[1];
  var rect = document.querySelectorAll("rect")[1];
  rect.setAttribute("fill", "green")
  var svgData = new XMLSerializer().serializeToString(svg);
  var canvas = document.createElement("canvas");
  var svgSize = svg.getBoundingClientRect();
  canvas.width = svgSize.width * 3;
  canvas.height = svgSize.height * 3;
  canvas.style.width = svgSize.width;
  canvas.style.height = svgSize.height;
  var ctx = canvas.getContext("2d");
  ctx.scale(3, 3);
  var img = document.createElement("img");
  img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
  rect.setAttribute("fill", "red")
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    var canvasdata = canvas.toDataURL("image/png", 1);

    var pngimg = '<img src="' + canvasdata + '">';
    d3.select("#pngdataurl").html(pngimg);

    var a = document.createElement("a");
    a.download = "downloadAsPng" + ".png";
    a.href = canvasdata;
    document.body.appendChild(a);
    a.click();
  };
})


//reset function

function reinitialize1() {
	document.getElementById("sortNrSetsInIntersection").checked = true;
	document.getElementById("sortIntersectionSize").checked = false;
	document.getElementById("sortNrSetsInIntersection1").checked = false;
	document.getElementById("sortNrSetsInIntersection2").checked = false;
	document.getElementById("sortNrSetsInIntersection3").checked = false;
	document.getElementById("sortNrSetsInIntersection7").checked = false;
	document.getElementById("sortNrSetsInIntersection8").checked = false;
	document.getElementById("save_as_png").disabled = true;
	document.getElementById("save_as_txt").disabled = true;
	//document.getElementById("maxi1").checked = false;
	//document.getElementById("maxi2").checked = false;
	document.getElementById("minCardinality1").value = 1;
	document.getElementById("minCardinality2").value = 1;
	document.getElementById("minCardinality3").value = 1;
	document.getElementById("minCardinality4").value = 1;
	document.getElementById("minCardinality5").value = 0;
	//document.getElementById("maxiCardinality1").value = 5;
	//document.getElementById("maxiCardinality2").value = 2;
	d3.select('#element-viewers-particular').select('p').remove();
	d3.select('#element-viewers-visualization').selectAll('div').remove();
	d3.select('#element-viewers-visualization').select('svg').remove();
	document.getElementById("loadFileXml1").disabled = true;
	var elview = document.getElementById('element-viewers-empty');
    if(elview !== null)
	   document.getElementById('element-viewers-empty').remove();
   
    var elview1 = document.getElementById('element-viewers-empty1');
		if(elview1 !== null)
			document.getElementById('element-viewers-empty1').remove();
		
	var parentDiv = document.getElementById('matrix-elements');
	var container = document.getElementById('element-viewers-particular');
    var closeDiv = document.createElement('div');
	closeDiv.setAttribute("id", "element-viewers-empty1");
	closeDiv.setAttribute("class","info-message1");
    if(toBuildGl == 0){
		closeDiv.innerHTML = 'No visualizations configured. Click <b>Load Expression Data</b> button to add a new visualization of elements either of biclusters or their overlaps. Select a .txt file for expression data.';
	}else{
        closeDiv.innerHTML = 'No visualizations configured. Click on <b>the number of a row or column</b> to add a new visualization.';
	}
	parentDiv.insertBefore(closeDiv, container);
	
	InGC = [];
    setsB = [];
    rowLabels = [];
    globalIndice = 0;
    globalFile = null;
	globalRow = null; 
	globalRowc = null;
	RowColIndex = 0;
	otherIndexGl = -1;
	otherIndexGlCell = -1;
	cellIndexR = null;
	cellIndexC = 0;
	indicator = 0;
	myIndexGlob = -1;
	columnLabels = [];

    ListRowIndex = [];
    ListRowIndexLabel = [];
    dblclickYN = 0;
    glListRowIndex = [];
    glListRowIndexLabel = [];
    ListotherIndexGl = [];
    globalRowcR = null;
    cellIndexRR = null;

    
    tabFinalResults = [];
	obj = {};
    max_expression = 0;
    min_expression = 0;
    median_expression = 0;
	no_expression = 0;
	
	tabForConditions = [];
    tabForGenes = [];
    TheConditions = [];
    TheGenes = [];
	
	initData(setFileR, 1, 2);
	if(toBuildGl == 1)
		initData1(setFileG);
}









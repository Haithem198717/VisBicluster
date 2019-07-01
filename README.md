# VisBicluster

## About

VisBicluster is an interactive, web based visualization technique designed to analyze biclusters generated from gene expression data. VisBicluster visualizes both, bicluster intersections and their properties, and the elements (genes and conditions as a heatmap )of each intersection or each bicluster. 


## R data importer

A simple R script stored in the R_code folder, is used to  simplify the loading of a biclustering results. It is based on biclust R package to run different biclustering algorithms. The example in the script is about running Xmotifs biclustering algorithm. 



## Local Deployment

1. Launch the [Python SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) in the project directory.
 
   ```
   $ python -m SimpleHTTPServer 8000
   ```

2. View VisBicluster in your browser at [localhost:8000](http://localhost:8000).

Alternatively you can also **run VisBicluster without a web server**. Simply open the index.html file in Firefox or Google Chrome. 

## Data loading

The data can be loaded from two files: .bic file to specify a biclustering results and .txt file for expression data. Simply select the two files or at least the biclustering results file in order to get the visualization result. The loading of a biclustering result is starting by clicking on the **Load Biclustering Results** button. To load the corresponding gene expression data and visualize it as heatmaps, you need to click on the **Load Expression Data** button.
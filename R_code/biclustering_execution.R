#install.packages("biclust")
require(biclust)
 
#usage example with Xmotifs biclustering algorithm:
data = read.table("gene_expression_file_name.txt")
exprs <- as.matrix(data)
x<-discretize(exprs) # for Xmotifs biclustering execution
res <- biclust(x, method=BCXmotifs(), ns=20, nd=20, sd=5, alpha=0.01, number=10) # Xmotifs as an example
writeBiclusterResults("results_B.bic", res,"Xmotifs with alpha=0.5", dimnames(x)[1][[1]],dimnames(x)[2][[1]])

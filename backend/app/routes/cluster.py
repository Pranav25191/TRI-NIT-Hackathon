
import json
import pymongo
import logging
import pandas as pd
import numpy as np

from sklearn.cluster import DBSCAN
from nltk.metrics.distance import edit_distance
from fastapi import APIRouter, Header, Response, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from config.database import connection
from schemas.inp_conf import Rules

get_cluster = APIRouter()



@get_cluster.post("/cluster")
async def create_asset(result: list):
    rules = inp_pre_process(result)
    data = load_data_from_db()
    print(rules)
    def similarity_func(x,y):
        x = data[int(x)]
        y = data[int(y)]
        # print(x)
        # print
        score = 0
        for param in rules.keys():
            if rules[param] == "full":
                if x[param] != y[param]:
                    return 1
            if rules[param] == "partial":
                dist = edit_distance(x[param], y[param])
                score = dist/max(len(x[param]),len(y[param]))
        # print(score)
        return score
    proxy = np.array(range(len(data)))
    proxy = proxy.reshape(-1, 1)

    # Perform DBSCAN clustering with the defined similarity function
    dbscan_model = DBSCAN(eps=0.3, min_samples=1, metric=similarity_func)
    labels = dbscan_model.fit_predict(proxy)
    labels = dbscan_model.labels_
    # Print the cluster labels
    print("Cluster labels:", labels)
    pp= post_process(data, labels)
    print(type(pp))
    return pp


def inp_pre_process(result):
    print(result)
    for i in range(len(result)):
        if result[i]["match"]==1:
            result[i]["match"]="full"
        else:
            result[i]["match"]="partial"

    rulesdict = {}
    for d in result:
        rulesdict[d["key"]] = d["match"]
    return rulesdict
    

def post_process(listOfDicts,labels):
    clusters = {}
    for i in range(len(labels)):
        if not str(labels[i]) in clusters.keys():
            clusters[str(labels[i])] = []
        clusters[str(labels[i])].append(listOfDicts[i])
        print(len(clusters[str(labels[i])]))
    return clusters







def load_data_from_db():
    data = list(connection.find({},{'_id': False}))
    
    # print(data[0])

    return data

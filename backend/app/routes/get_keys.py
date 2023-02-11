
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

get_keys = APIRouter()



@get_keys.get("/getkeys")
async def list_all_unique_keys():
    keys = list( connection.aggregate([
        {"$project":{"arrayofkeyvalue":{"$objectToArray":"$$ROOT"}}},
        {"$unwind":"$arrayofkeyvalue"},
        {"$group":{"_id":"null","allkeys":{"$addToSet":"$arrayofkeyvalue.k"}}},
        {"$project": {"_id":0}}
    ]))

    return keys[0]["allkeys"]




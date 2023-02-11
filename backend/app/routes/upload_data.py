
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

upload_data = APIRouter()



@upload_data.post("/upload")
async def insert_data(data: list):
    connection.insert_many(data)

    return "Successfull"




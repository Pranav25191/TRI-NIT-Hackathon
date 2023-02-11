from fastapi import FastAPI, Request, status, BackgroundTasks
import pymongo

app = FastAPI()

from pymongo import MongoClient

client = MongoClient("mongodb://mongodb:27017")

db = client['TRINIT']
print(db.list_collection_names())
if "users" not in db.list_collection_names():
    connection = db.create_collection('users')
    
else:
    connection = db.get_collection('users')



@app.post('/data')
def handle_data(data: list, background_tasks: BackgroundTasks):
    # insert the data into the MongoDB database asynchronously
    # to avoid blocking the socketio event loop

    background_tasks.add_task(insert_data_into_db, data)
    return {"message": "data uploaded in the background"}

def insert_data_into_db(data):
    # insert the data into the MongoDB database here
    connection.insert_many(data)


@app.get("/")
def welcome():
    return "Welcome"
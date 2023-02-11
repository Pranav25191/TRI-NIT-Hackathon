from pymongo import MongoClient
from config import settings

client = MongoClient(settings.mongodb_uri, settings.port)
db = client['TRINIT']
print(db.list_collection_names())
if "users" not in db.list_collection_names():
    connection = db.create_collection('users')
    
else:
    connection = db.get_collection('users')


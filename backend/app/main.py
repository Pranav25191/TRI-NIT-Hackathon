"Asset Management API"

import logging
import sys
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from routes.cluster import get_cluster
from routes.get_keys import get_keys
from routes.upload_data import upload_data

logging.basicConfig(
    handlers=[
        logging.StreamHandler(sys.stdout),
    ],
    format='%(asctime)s | %(levelname)s | %(message)s',
    level=logging.DEBUG,
)

logger = logging.getLogger(__name__)



app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(get_cluster)
app.include_router(get_keys)
app.include_router(upload_data)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request: Request, _exc: RequestValidationError):
    """ Request validation error """
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content="Request contains invalid data",
    )


@app.get("/welcome", tags=["Root"], include_in_schema=False)
def hello_world():
    """Default route"""
    return "Welcome to Dynamic Clustering Service Backend"

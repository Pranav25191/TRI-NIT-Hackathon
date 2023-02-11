"Asset Management API"

import logging
import sys
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from routes.cluster import get_cluster

logging.basicConfig(
    handlers=[
        logging.StreamHandler(sys.stdout),
    ],
    format='%(asctime)s | %(levelname)s | %(message)s',
    level=logging.DEBUG,
)

logger = logging.getLogger(__name__)



app = FastAPI()

app.include_router(get_cluster)

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

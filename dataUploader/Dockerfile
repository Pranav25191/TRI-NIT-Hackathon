FROM python:3.8-slim-buster AS compile-image

COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

WORKDIR /app

COPY . .

CMD ["/bin/bash", "-c", "uvicorn main:app --host=0.0.0.0 --port=8001"]

EXPOSE 8001

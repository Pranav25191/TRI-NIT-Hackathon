FROM python:3.8-slim-buster AS compile-image

COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

WORKDIR /app

COPY . .

CMD ["/bin/bash", "-c", "cd app; uvicorn main:app --host=0.0.0.0 --port=8000"]

EXPOSE 8000

FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN pip install pipenv

WORKDIR /opt/project

COPY ./ /opt/project/

RUN pipenv install --system --deploy

EXPOSE 8000

CMD sleep 10 \
  && python manage.py migrate \
  && python manage.py runserver 0.0.0.0:8000

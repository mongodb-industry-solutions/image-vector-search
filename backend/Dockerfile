FROM python:3.11.7
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN poetry env use python3.11
RUN poetry install --no-interaction --no-ansi --no-root
COPY . ./
EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Votr Flask Backend

This is the Flask backend service for the Votr application.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` as needed

5. Run the application:
```bash
flask run
```

The server will start on `http://localhost:5000`

## Project Structure

- `app.py`: Main application file
- `models/`: Database models
- `routes/`: API routes
- `config/`: Configuration files
- `tests/`: Test files

## API Documentation

API documentation will be added as the project develops. 
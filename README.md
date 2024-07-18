# Project Setup

## Prerequisites
- Node.js
- PostgreSQL

## Installation
1. Clone the repository
2.  Navigate to the project directory
3.  Install dependencies
4.  Set up environment variables
5.  Update the .env file with your configuration.

    tart the server
   ## Usage
- Access the API at `http://localhost:3000`
- Access Swagger documentation at `http://localhost:3000/api-docs`

## API Endpoints
- `GET /api/weather/:city` - Fetch weather data for a city
- `POST /api/data` - Create a new data entry
- `GET /api/data` - Retrieve all data entries
- `PUT /api/data/:id` - Update a data entry
- `DELETE /api/data/:id` - Delete a data entry

## Common Issues
- Ensure your PostgreSQL database is running and accessible.
- Check your environment variables for accuracy.

# Analyzer
Prototype of data extraction, processing and visualization system developed using Django and React. System consists of:

• Data extracting component. It is a component that analyzes and extracts data from "https://cvpp.eviesiejipirkimai.lt/".

• User zone - zone where the user can log in and view the extracted data and charts.

• Data visualization component (done with Chart.js).

## Setup instructions:
### For the backend
1. Clone the repository:
> git clone https://github.com/TautvisP/Analyzer.git

2. Navigate into the project directory:
> cd Analyzer

3. Create and activate a virtual environment:
> python3 -m venv scraper
> 
> python3 Scripts\activate

4. Dependencies:

To run the project, you will need to have certaint Python packages. I‘ve generated a „requirements.txt“ file which contains all the necessary Python packages and their versions. You can install them by going to: „cd scraper“ and then run „pip install -r requirements.txt”.

5. Database

Also a database is needed. I used web server solution stack tool “XAMPP” and an administration of MySQL tool “phpMyAdmin”, but you are free to use whatever you like. Just create a database with the name “analyzer_database”, create a user with the username of “bandymas” and password “bandymas” and give the user permissions to the database. Once the database is created and configured, next step is to set up the database schema using Django's migration system. Navigate to “\Analyzer\scraper” and type the following commands: “python3 manage.py makemigrations” and “python3 manage.py migrate”
 
7. Apply migrations and run the server:
To run the backend, navigate to “\Analyzer\scraper” and type “python3 manage.py runserver”

### For the frontend
1. Navigate into the project directory
> cd Analyzer\scraper\frontend

2. Install dependencies
All of the necessary dependencies are located in the “\scraper\frontend\package.json” file if you want to take a look at them.
> npm install

To start the frontend, navigate to “\Analyzer\scraper\frontend” and type “npm start”

## System Specification
System architecture:

![image](https://github.com/user-attachments/assets/c337f95b-3305-40f5-857e-9f91fab6f581)

Entity model:

![image](https://github.com/user-attachments/assets/b25bb00e-7c84-4f19-94c9-44477bd50038)

Users and their stories:

![image](https://github.com/user-attachments/assets/3add0d21-831a-4d3e-8b71-9357ed70d040)

## First Run
The program is set up to scrape 1500 tenders, so if the program is running for the first time, be prepaired, it can take up to 5 minutes, since theres quite a bit of data that it must go and filter through. All the other scrapes after the initial one run for a shorter period, since the scraper runs until it meets the first tender that is already in the database, that means that all other tenders below will also be stored. 

## Admin Panel
To create a superuser in Django, you can use the createsuperuser management command. This command creates a user with superuser privileges, which gives them full access to the Django admin interface and all parts of the Django project that require superuser status.
Open Your Terminal: Navigate to your Django project’s root directory, where manage.py is located and run the following command: “python3 manage.py createsuperuser”. After creating the superuser, you can log in to the Django admin interface using the credentials you just created. The admin interface is typically available at http://localhost:8000/admin.

## Testing Plan
Manual testing was conducted to ensure the functionality and correctness of the application. The following methods and tools were used for testing:

1. API Testing with Thunder Client
Thunder Client, an API testing extension for Visual Studio Code, was used to manually test the API endpoints.
Each API endpoint was tested by sending various HTTP requests (e.g., GET, POST, PUT, DELETE) to ensure that they returned the expected responses.
The inputs were varied to test different scenarios.
The response status codes, headers, and bodies were reviewed for correctness, ensuring proper error handling and expected data structure.

2. Method Testing
Individual methods and functions within the application were manually called and executed to validate their behavior.
The correctness of the output was verified by comparing the actual results against the expected results.

3. Result Verification
The outputs of the methods and API responses were manually checked against the expected values.
Data returned from the API (such as JSON responses) was inspected for completeness and accuracy.
Any issues or bugs encountered during manual testing were recorded and resolved iteratively.

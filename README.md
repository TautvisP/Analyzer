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

To run the project, you will need to have certaint Python packages. I‘ve generated a `requirements.txt` file which contains all the necessary Python packages and their versions. You can install them by going to: `cd scraper` and then run `pip install -r requirements.txt`.

5. Database

Also a database is needed. I used web server solution stack tool “XAMPP” and an administration of MySQL tool “phpMyAdmin”, but you are free to use whatever you like. Just create a database with the name “analyzer_database”, create a user with the username of “bandymas” and password “bandymas” and give the user permissions to the database. Once the database is created and configured, next step is to set up the database schema using Django's migration system. Navigate to `\Analyzer\scraper` and type the following commands: `python3 manage.py makemigrations` and `python3 manage.py migrate`.
 
6. Apply migrations and run the server:
To run the backend, navigate to `\Analyzer\scraper` and type `python3 manage.py runserver`.

### For the frontend
1. Navigate into the project directory
> cd Analyzer\scraper\frontend

2. Install dependencies
All of the necessary dependencies are located in the `\scraper\frontend\package.json` file if you want to take a look at them.
> npm install

To start the frontend, navigate to `\Analyzer\scraper\frontend` and type `npm start`

## System Specification
System architecture:

![image](https://github.com/user-attachments/assets/c337f95b-3305-40f5-857e-9f91fab6f581)

Entity model:

![image](https://github.com/user-attachments/assets/cb1bf78a-21b7-49d0-a598-af8ca25e9331)

Users and their stories:

![image](https://github.com/user-attachments/assets/3add0d21-831a-4d3e-8b71-9357ed70d040)

## First Run
The program is set up to scrape 1500 tenders, so if the program is running for the first time, be prepaired, it can take up to 5 minutes, since theres quite a bit of data that it must go and filter through. All the other scrapes after the initial one run for a shorter period, since the scraper runs until it meets the first tender that is already in the database, that means that all other tenders below will also be stored. 

## Testing Plan for Web Application
### 1. Objective
   
Ensure the application is functioning correctly by testing key features such as API endpoints, database interactions, and UI components using manual testing methods like ThunderClient and browser-based tests.

### 2. Testing Scope
1. API Testing:
* Test user registration, login, tender creation, and retrieval.
* Validate error handling for invalid data.
2. Database Testing:
* Check if data is stored and retrieved correctly.
* Ensure proper database migrations.
3. UI Testing:
* Verify the proper display of UI components and responsiveness.
* Test page navigation and form submissions.
4. Security Testing:
* Test unauthorized API access.
* Ensure sensitive data is not exposed.

  
### 3. Testing Tools
* ThunderClient/Postman for API testing.
* Browser for UI testing.
* phpMyAdmin for database checks.

  
### 4. Test Cases
1. User Registration (API)
* Action: POST to /api/register/.
* Expected: User created, token returned.
2. Tender Retrieval (API)
* Action: GET from /api/tenders/.
* Expected: List of tenders in JSON.
3. Database Check (Admin)
* Action: Check tender created via API.
* Expected: Data stored correctly in DB.
4. UI Check (Frontend)
* Action: Navigate to the tender list.
* Expected: Tenders sorted by date and ID.
5. Unauthorized Access (API)
* Action: Access API without a token.
* Expected: 401 Unauthorized error.

  
### 5. Conclusion
After executing these tests and resolving any major issues, the project will be considered ready for deployment.


## Visuals
<img src="https://github.com/user-attachments/assets/ee187ba5-97af-4e6f-a322-b959f9175b95" width="900">



<img src="https://github.com/user-attachments/assets/63b9178f-6aa8-4ddb-b8e6-dfecf7cd4f45" width="900">


<img src="https://github.com/user-attachments/assets/6892c70c-47b1-4456-8052-761077dc42d9" width="900">


<img src="https://github.com/user-attachments/assets/63b4a1f8-6143-49cd-8f71-c1c463de606f" width="900">


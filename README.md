# Static Code Analysis for Python – A graphical representation of Pylint & SonarQube

This project collects the code analysis results from two different tools, Pylint and SonarQube, and provides a meaningful interface that can be used to analyze the software quality of projects written in Python.

The different types of issues provided by these tools are combined in order to obtain a complete report regarding the code quality of the application under analysis, providing a collection of charts and graphical representations, which will indicate the code areas that can be improved, the files with most of the issues, the types of issues and the concrete code areas where these are located, allowing users to easily find and fix them. 

This tool also provides the ability to compare previous versions of the analysis of the same application, which punctually indicates the issues solved and it is therefore, a great support in the code review process.

## Structure 

It contains two applications, representing the backend and frontend parts of the tool:
- `pylint-findings-service` - provides and API with CRUD operations on the issues database. Handles all the backend requests over the database data.
- `frontend-app` - consists of the user interface which provides ways to configure and analyze projects and presents graphically the issues detected, allowing users to manipulate them.

MongoDB Cloud is used for storing the application data.

## 🌈 Preview


<img src="https://github.com/SavuVeronica/StaticCodeAnalysisforPython/blob/main/Screenshots/main-page.png" width="300"/> 
<img src="https://github.com/SavuVeronica/StaticCodeAnalysisforPython/blob/main/Screenshots/run-overview.png" width="300"/> 


## 🚀 Technologies & Modules

- NestJS
- React

## 🤔 Installation

Clone the project locally using command:
```
git clone https://github.com/SavuVeronica/StaticCodeAnalysisforPython.git
```

Run `npm install` in both backend and frontend applications in order to install the required dependencies.

## 💡 How To Run

1. Run the backend service
```
cd pylint-findings-service
nest start
```
2. Run the frontend service
```
cd frontend-app
npm start
```

## 👤 Author

🤓 Savu Veronica Alexandra
/ *veronica.alexandra.savu@gmail.com*

# React + Tailwind Project - GitHub Repository Search and Import

This project is a React and Tailwind CSS-based web application that allows users to search for GitHub repositories by keyword, view repository details (such as number of stars and forks), import repositories, and track packages used in imported repositories. The application also includes a "Top Packages" page that lists the top 10 packages sourced from the imported repositories.

## Features

1. **Search Repositories:** Users can search for GitHub repositories by keyword. The application makes use of the GitHub REST API to fetch repositories matching the provided keyword.

2. **Repository Details:** The search results display information about each repository, including the number of stars and forks.

3. **Import Repository:** Each repository in the search results has an "Import" button. Clicking on this button triggers the import action, which reads the root of the selected repository and scans for the `package.json` file. If the file is present, it is parsed, and all the packages used in the repository are tracked. If the repository does not contain a valid `package.json` file, a message is displayed to the user indicating the absence of the file.

4. **Top Packages:** The "Top Packages" page lists the top 10 packages that have been sourced from the imported repositories. This provides an overview of the most commonly used packages.

5. **Distinct Marking for Imported Repositories:** On the "Search Repositories" page, if a repository has already been imported, it is distinctly marked with a different font color. This helps users identify repositories that have already been imported.

## Implementation

The application is implemented using React for the frontend and Tailwind CSS for styling. It leverages the GitHub REST API for retrieving repository data and the `package.json` files from the imported repositories.

The following functionalities have been implemented along with unit test cases:

1. **Search repositories by keywords:** User is able to search through the repository and the app performs a debounced search on the github public repositories

2. **Importing repository:** If the search is not returning any results then appropriate message is displayed. Similary appropriate error alerts are displayed if there is no `package.json` file or the file does not contain any dependencies. Loading states are handled as well. Once the imports are complete the import button is disabled and the listed repo changes font color. A clear all functionality is provided that resets all the imports and search field as well. 

## Local Storage

The application uses local storage mechanism to save data. This ensures that imported repositories and their associated package data are retained even after restarting the application.

## Exception Handling and Logging

The codebase incorporates exception handling and logging mechanisms to ensure robustness and facilitate debugging. Exceptions are caught at appropriate places and logged with relevant information for troubleshooting purposes.


## Directory Structure

The project's directory structure follows a modular approach for better maintainability and scalability. 




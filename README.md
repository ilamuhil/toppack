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

1. **Parse package.json file:** Unit tests have been written to ensure correct parsing of the `package.json` file.

2. **Search repositories by keywords:** Unit tests are in place to validate the search functionality and ensure the correct listing of repositories based on keywords.

3. **Import repository with a valid package.json file:** Test cases cover the import action, including the reading and parsing of the `package.json` file and tracking of packages used in the repository. Tests also handle cases where a repository does not contain a valid `package.json` file.

## Persistent Storage

The application uses a persistent storage mechanism to save data as seen fit. This ensures that imported repositories and their associated package data are retained even after restarting the application. The choice of persistent storage can vary based on the specific requirements and technical constraints of the project.

## Exception Handling and Logging

The codebase incorporates exception handling and logging mechanisms to ensure robustness and facilitate debugging. Exceptions are caught at appropriate places and logged with relevant information for troubleshooting purposes.

## Rate Limiting

The GitHub API has rate limits on the number of requests made per hour. To avoid exceeding these limits, the application utilizes efficient request management techniques. Caching mechanisms can be implemented to minimize the number of API requests by storing and reusing previously fetched data. Additionally, rate limiting logic can be implemented to automatically throttle requests and prevent API abuse.

## Directory Structure

The project's directory structure follows a modular approach for better maintainability and scalability. 



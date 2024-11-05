# Electricity Price Application

## Live Demo

You can access the deployed application at [Electricity Price Application on Vercel](https://electricity-price-application-1ejj.vercel.app/).

## Description

The Electricity Price Application is a web-based platform that provides users with real-time electricity prices across various European countries. It features an interactive map, activity widgets, and charts to display electricity data in an engaging way.

## Features

- **Interactive Europe Map**: Displays electricity prices by country with hover and click functionality for details.
- **Activity Widgets**: Shows the cost of various activities based on current electricity prices.
- **Error Handling**: User-friendly messages when data fetching fails.
- **Responsive Design**: Usable across devices and screen sizes.
- **Data Caching**: Caches data to improve performance by minimizing API calls.
- **Charts**: Visual representation of electricity price trends.

## Technologies Used

- **TypeScript**: Ensures type safety in JavaScript.
- **React**: Library for building the user interface.
- **Next.js**: Framework for server-side rendering and routing.
- **react-simple-maps**: Used for the interactive map of Europe.
- **Tailwind CSS**: For styling the application.
- **Chart.js**: Provides charts for visualizing electricity prices.
- **Jest**: Testing framework for unit tests.
- **React Query**: Handles data fetching and caching on the client-side.
- **LRU Cache**: Caches API responses on the server to optimize performance.

## Caching Implementation

### Server-Side Caching with LRU Cache

To minimize the number of API requests and improve response time, the application uses an LRU (Least Recently Used) cache on the server side. The cache is configured with a maximum of 200 entries and a Time-To-Live (TTL) of 1 hour. Here’s how the caching works:

- For each bidding zone (country code), data is stored in the cache with a unique key.
- When a request is made, the application first checks if data exists in the cache.
- If cached data is available, it is served directly without making an API call.
- If not, the application fetches data from the external API, stores it in the cache, and returns it to the client.

This approach reduces load on the external API and ensures faster response times for frequent requests.

### React Query for Client-Side Data Fetching and Caching

On the client side, **React Query** is used to manage data fetching and caching. React Query automatically caches and synchronizes server state, making it easy to fetch data when required without redundant network requests.

## Project Structure

- **app/api**: Contains API-related logic, like fetching prices.
- **app/components**:
    - **charts**: Components for rendering charts of electricity prices.
    - **layout**: Layout components, including `Header`.
    - **map**: Components for displaying the interactive map.
    - **ui**: UI components for widgets and error messages.
- **app/country**: Manages country-specific data and pages.
- **app/fonts**: Custom fonts for styling.
- **app/hooks**: Custom hooks for reusable logic.
- **app/services**: Handles external API interactions.
- **app/tests**: Contains unit and integration tests.
- **app/utils**: Utility functions for formatting data and app logic.

## Running Tests

To run the tests, use the following command:
```bash
npm test

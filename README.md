# Tokenguard - Recruitment

## Description

![project description](https://github.com/AdamShymanski/tokenguard/assets/45077552/2ba569ad-5384-4d3b-abe2-5149b27762f1)

This project is a React application that visualizes cryptocurrency data for Ethereum and Solana. The data is displayed in a chart, which is interactive and allows users to filter the data by different date ranges: 1 week, 2 weeks, 4 weeks, 3 months, and all data.

Key features of the project include:

- **Interactive Chart**: The chart allows users to visualize the Ethereum and Solana data over time. Users can hover over the chart to see the exact data points.

- **Date Range Filters**: Users can filter the data by different date ranges. This is implemented using a series of buttons that set the `dateRange` state when clicked.

- **Dynamic Loading**: The chart data is loaded dynamically using the `Suspense` component from React. This provides a better user experience by displaying a loading message while the data is being fetched.

## Libraries Used

- **React**: Used for building the user interface.

- **Recharts**: Used for creating the interactive chart.

- **Tailwind CSS**: Used for styling the components.

- **Axios**: Used for making HTTP requests to fetch the data.

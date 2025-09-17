# FlexCar Vehicle Search

A React + TypeScript web application for searching and filtering vehicles by ZIP code, built as a take-home challenge solution.

## Features

- **ZIP Code Search**: Search for vehicles available in specific ZIP codes
- **Vehicle Details**: Display comprehensive vehicle information including make, model, trim, year, color, mileage, price, and images
- **Filtering**: Filter results by make and color
- **Sorting**: Sort by price (high to low, low to high) and make (alphabetical)
- **Responsive Design**: Mobile-friendly interface with FlexCar's brand color (#0049B7)
- **Error Handling**: Clear error messages for invalid ZIP codes and no results
- **Modern UI**: Clean, professional design inspired by FlexCar's inventory page

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Vitest** + **React Testing Library** for testing
- **ESLint** for code quality

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flexcar
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## Testing

The application includes comprehensive unit tests for all components:

```bash
# Run all tests
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

Test coverage includes:

- SearchBar component (ZIP code validation, form submission)
- VehicleCard component (data display, formatting)
- FilterPanel component (filtering logic, UI interactions)
- SortDropdown component (sorting options, result count)
- App component (integration tests, search flow)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── SearchBar.tsx    # ZIP code search input
│   ├── VehicleCard.tsx  # Individual vehicle display
│   ├── FilterPanel.tsx  # Make and color filters
│   └── SortDropdown.tsx # Sorting options
├── data/
│   └── vehicles.ts      # Mock vehicle data and utilities
├── test/
│   └── setup.ts         # Test configuration
├── __tests__/           # Test files
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles with TailwindCSS
```

## Design Decisions

### Architecture

- **Component-based architecture** with clear separation of concerns
- **Custom hooks** for state management (could be extended with Context API for larger apps)
- **TypeScript interfaces** for type safety and better developer experience
- **Utility functions** for data processing and formatting

### Styling

- **TailwindCSS** for rapid development and consistent design
- **FlexCar brand color** (#0049B7) used throughout the interface
- **Responsive design** with mobile-first approach
- **Right-side filter panel** as specified in requirements

### Data Management

- **Mock data** in `vehicles.ts` with realistic vehicle information
- **Local filtering and sorting** for immediate responsiveness
- **ZIP code validation** with regex pattern matching
- **Error boundaries** for graceful error handling

### Testing Strategy

- **Unit tests** for individual components
- **Integration tests** for user workflows
- **Mock data** for consistent test results
- **Accessibility testing** with proper ARIA labels

## Mock Data

The application includes 15 mock vehicles across 2 ZIP codes (10001 and 90210) with:

- Multiple makes: Toyota, Honda, Ford, BMW, Mercedes-Benz, Audi, Tesla, Nissan, Chevrolet, Volkswagen
- Various colors: Silver, White, Black, Blue, Red, Gray, Green
- Price range: $24,000 - $65,000
- Mileage range: 5,000 - 30,000 miles
- Years: 2021-2023

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- API integration for real vehicle data
- User authentication and favorites
- Advanced filtering options (price range, year range)
- Vehicle comparison feature
- Image gallery for each vehicle
- Pagination for large result sets
- Search history
- Location-based recommendations

## License

This project is created as part of a take-home challenge and is for demonstration purposes only.

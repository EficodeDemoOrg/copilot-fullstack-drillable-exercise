# GitHub Copilot Instructions for Notes App

This document outlines the coding standards, conventions, and best practices to follow when using GitHub Copilot to contribute to the Notes App project.

## Tech Stack Standards

### Frontend (React/Tailwind)

- **React Components**:
  - Use functional components with hooks instead of class components
  - Keep components focused on a single responsibility
  - Extract reusable UI elements into separate components
  - Use React.memo() for pure components that render often

- **State Management**:
  - Use React hooks (useState, useEffect, useContext) for simpler state management
  - Avoid prop drilling by using context for deeply nested state requirements
  - Handle loading/error states explicitly for async operations

- **Styling**:
  - Follow Tailwind CSS utility-first approach
  - Use consistent spacing and sizing
  - Maintain responsive design patterns
  - Use color variables from existing design system

- **Forms**:
  - Handle form validation on both client and server sides
  - Show clear error messages for invalid inputs
  - Disable submit buttons during form submission

### Backend (Express)

- **API Design**:
  - Follow REST principles for endpoint design
  - Use appropriate HTTP methods (GET, POST, PUT, DELETE)
  - Return consistent HTTP status codes (200, 201, 400, 404, 500)
  - Include error messages in response body

- **Error Handling**:
  - Use try/catch blocks for async operations
  - Pass errors to Express error handler
  - Return appropriate error responses with clear messages

## Naming Conventions

### JavaScript/React

- **Variables and Functions**:
  - Use camelCase for variables and function names (`createNote`, `handleSubmit`)
  - Use descriptive names that indicate purpose (`fetchNotes` not `getData`)
  - Boolean variables should be prefixed with "is", "has", or "should" (`isLoading`, `hasError`)

- **Components**:
  - Use PascalCase for component names (`NoteItem`, `CreateNote`)
  - Use noun phrases for components that render entities (`NoteItem`)
  - Use verb phrases for components that perform actions (`CreateNote`)

- **Files**:
  - Use PascalCase for component files (`NoteItem.jsx`)
  - Use camelCase for utility files (`useCreateDate.jsx`)
  - Group related files in descriptive folders (`components`, `pages`)

### CSS/Tailwind

- Use consistent class naming patterns as in the existing code
- Follow the responsive design pattern established in the project

## Code Organization

- Keep related code together in logical modules
- Separate concerns (UI rendering, data fetching, utility functions)
- Follow the established project structure:
  - `components/` for reusable UI components
  - `pages/` for route components
  - `assets/` for static resources
  - Utility functions in appropriate files

## Security Practices

- **Frontend**:
  - Sanitize all user inputs to prevent XSS attacks
  - Don't store sensitive data in local storage
  - Validate all inputs before submission
  - Use environment variables for API endpoints

- **Backend**:
  - Validate and sanitize all request data
  - Implement proper error handling without exposing internal details
  - Add rate limiting to prevent brute force attacks (in future implementations)
  - Use parameterized queries/sanitized inputs to prevent injection attacks
  - Implement CORS correctly, allowing only trusted origins

- **API Security**:
  - Validate user inputs server-side
  - Return appropriate error codes
  - Implement authorization (in future multi-user implementation)

## Testing Guidelines

- **Unit Tests**:
  - Write tests for individual components and functions
  - Mock external dependencies using Jest mock functions
  - Focus on testing behavior, not implementation details
  - Follow the AAA pattern (Arrange, Act, Assert)

- **Component Testing**:
  - Test rendering with different props
  - Test user interactions using React Testing Library
  - Verify that components respond correctly to state changes

- **API Testing**:
  - Test each endpoint for successful responses
  - Test error handling with invalid inputs
  - Include edge cases in tests (empty inputs, unusual data)

- **Test Coverage**:
  - Aim for high coverage of core functionality
  - Prioritize testing critical user flows
  - Test both success and failure paths

## Documentation Standards

- **Code Comments**:
  - Use JSDoc comments for functions and components
  - Document parameters, return values, and purpose
  - Explain complex logic or business rules
  - Include references to relevant documentation or issues

- **README**:
  - Keep the main README up to date with setup instructions
  - Document API endpoints and responses
  - Include troubleshooting information

## Performance Guidelines

- **Frontend**:
  - Avoid unnecessary re-renders
  - Use appropriate memoization (useMemo, useCallback)
  - Optimize large lists with virtualization
  - Lazy load components when appropriate

- **Backend**:
  - Optimize database queries (in future implementations)
  - Implement appropriate caching strategies
  - Handle errors gracefully to prevent crashes

## Accessibility

- Use semantic HTML elements
- Provide appropriate ARIA attributes for custom components
- Ensure sufficient color contrast
- Support keyboard navigation
- Handle focus management appropriately
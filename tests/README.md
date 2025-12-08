# Genea GEDCOM Engine Tests

This directory contains tests for the GEDCOM parsing and manipulation engine.

## Running the Tests

1. Open `gedcom.test.html` in a web browser
2. The tests will run automatically and display results

## Test Coverage

The test suite covers:

### GEDCOM Parser
- Simple GEDCOM file parsing
- Individual records with nested structures
- CONC tag handling (concatenation without spaces)
- CONT tag handling (continuation with newlines)
- Nested structures (events with dates and places)

### GEDCOM Stringifier
- Converting parsed GEDCOM back to string format
- Handling long values with automatic CONC tags

### GEDCOM Person Operations
- Adding new persons
- Getting all persons from a file
- Person caption generation (name with birth/death years)

### GEDCOM Relationship Operations
- Adding relations between persons
- Adding children to families
- Getting relations for a person
- Finding parents (father/mother)
- Finding siblings
- Finding grandparents (all four types)

### Edge Cases
- Handling missing/nonexistent persons
- Handling missing family members
- Handling persons with no relations

## Test Results

All tests are displayed with:
- ✓ Green checkmark for passing tests
- ✗ Red X for failing tests
- Error messages for failed tests
- Summary showing total/passed/failed counts

## Adding New Tests

To add new tests, edit `gedcom.test.html` and add new test cases using:

```javascript
runner.describe('Test Suite Name', () => {
    runner.it('should do something', () => {
        // Your test code here
        assert(condition, 'Error message');
        assertEqual(actual, expected, 'Error message');
    });
});
```

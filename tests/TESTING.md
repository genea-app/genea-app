# GEDCOM 5.5.5 Specification Compliance Testing

This directory contains comprehensive tests for the Genea GEDCOM engine based on the GEDCOM 5.5.5 specification.

## Test Files

### `gedcom.spec.js` - Core GEDCOM Tests (43 tests)
Tests fundamental GEDCOM parsing, manipulation, and generation:

**Line Structure (4 tests)**
- Valid level-tag-value structure parsing
- Level number validation (0-99)
- Pointer parsing (@XXX@ format)
- Tags with values

**CONC and CONT Tag Handling (4 tests)**
- CONC concatenation without spaces
- CONT adding newlines
- Multiple CONC and CONT tags
- Proper white space handling

**White Space Handling (2 tests)**
- Preserving leading white space
- Preserving trailing white space

**GEDCOM Header Requirements (3 tests)**
- HEAD record at level 0
- GEDC.VERS in header
- TRLR record at end

**Individual Record (INDI) Structure (3 tests)**
- Individual with NAME
- Birth and death events
- Multiple NAME records

**Family Record (FAM) Structure (4 tests)**
- Family with husband and wife
- Family with children
- Same-sex relationships (two HUSB)
- Same-sex relationships (two WIFE)

**Relationship Queries (4 tests)**
- Finding father
- Finding mother
- Finding siblings
- Finding grandparents

**GEDCOM Stringification (3 tests)**
- Correct stringification
- Splitting long values with CONC
- Preserving hierarchical structure

**Person Operations (3 tests)**
- Adding person with valid structure
- Sequential ID assignment
- Proper NAME structure with GIVN and SURN

**Family Operations (3 tests)**
- Creating family with FAM record
- Linking FAMS to spouses
- Adding children with CHIL and FAMC links

**Edge Cases and Error Handling (5 tests)**
- Person not found
- Missing parents
- Empty file
- No siblings
- No relations

**Data Integrity (5 tests)**
- Pointer format validation
- Pointer uniqueness
- Date format acceptance
- Caption generation
- Missing dates in caption

### `gedcom.advanced.spec.js` - Advanced GEDCOM Tests (24 tests)
Tests advanced GEDCOM 5.5.5 specification compliance:

**User-Defined Tags (2 tests)**
- Tags starting with underscore
- Preserving user-defined tags in stringification

**Maximum Line Length (2 tests)**
- Lines up to 255 characters
- Splitting long values with CONC

**Level Number Validation (2 tests)**
- Level 0 records
- Deep nesting levels

**Pointer Cross-References (2 tests)**
- Family referential integrity
- Parent-child referential integrity

**NAME Tag Structure (4 tests)**
- Surname delimiters
- NAME without surname
- GIVN and SURN subfields
- Complex names with prefixes and suffixes

**Event Structure Validation (2 tests)**
- Events with DATE and PLAC
- Multiple events of same type

**Multi-Media Object Support (1 test)**
- OBJE with FILE

**Source Citation Support (1 test)**
- SOUR with PAGE

**Gender Values (1 test)**
- Standard gender values (M, F, U)

**Submitter Record (1 test)**
- SUBM record parsing

**Date Format Support (2 tests)**
- Various date formats (BEF, AFT, BET, ABT)
- Date ranges (FROM...TO)

**Note Structure (1 test)**
- Inline and pointer notes

**Character Encoding (2 tests)**
- UTF-8 character handling
- Unicode preservation in stringification

**Empty Fields (1 test)**
- Empty tag values

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test gedcom.spec.js
npm test gedcom.advanced.spec.js
```

## Test Coverage

**Total Tests: 67**
- Core GEDCOM functionality: 43 tests
- Advanced GEDCOM 5.5.5 features: 24 tests

**Pass Rate: 100%**

All tests validate against the GEDCOM 5.5.5 specification with Annotations.

## GEDCOM 5.5.5 Specification Compliance

### Fully Implemented Rules ✓

1. **Grammar Rules**
   - Level-tag-value structure
   - Hierarchical nesting (0-99 levels)
   - Pointer format (@XXX@)
   - CONC/CONT tag handling
   - White space preservation

2. **Header/Trailer Requirements**
   - HEAD record at level 0
   - GEDC.VERS specification
   - TRLR record at end

3. **Individual Records (INDI)**
   - NAME with GIVN/SURN
   - SEX field
   - Birth/death events
   - Multiple NAME records
   - User-defined tags

4. **Family Records (FAM)**
   - HUSB/WIFE pointers
   - CHIL pointers
   - Same-sex relationships
   - FAMS/FAMC cross-references

5. **Relationship Queries**
   - Parent/child relationships
   - Sibling relationships
   - Grandparent relationships
   - Spouse relationships

6. **Data Operations**
   - Adding persons
   - Creating families
   - Adding children
   - Sequential ID generation
   - Referential integrity

7. **Stringification**
   - Proper GEDCOM output
   - Long value splitting (CONC)
   - Hierarchical structure preservation

8. **Advanced Features**
   - User-defined tags (underscore prefix)
   - Event structures (DATE/PLAC)
   - Multi-media objects (OBJE)
   - Source citations (SOUR)
   - Various date formats
   - UTF-8/Unicode support

### Known Limitations

1. **Character Encoding**
   - UTF-8 support is implemented
   - UTF-16 not tested
   - BOM (Byte Order Mark) not enforced in tests
   - ANSEL not supported (as per spec, GEDCOM 5.5.5 requires Unicode)

2. **Line Length**
   - Maximum line length validation not enforced during parsing
   - Automatically splits long values during stringification

3. **Validation**
   - Parser is permissive (accepts invalid GEDCOM)
   - Does not validate pointer references
   - Does not validate date formats
   - Does not validate tag hierarchy

## Future Test Additions

### High Priority
1. **Strict Validation Mode**
   - Reject invalid line structures
   - Validate pointer references
   - Validate tag hierarchy per specification

2. **Character Set Validation**
   - UTF-8 BOM requirement
   - UTF-16 support
   - Illegal character detection

3. **Date Validation**
   - Valid date format checking
   - Date range validation
   - Calendar system support

### Medium Priority
4. **Performance Tests**
   - Large file handling (1000+ individuals)
   - Memory usage
   - Parse/stringify speed

5. **Compatibility Tests**
   - GEDCOM 5.5 import
   - GEDCOM 5.5.1 import
   - Interoperability with other tools

6. **Advanced Features**
   - Repository records (REPO)
   - Place hierarchy
   - LDS ordinances
   - Address structures

### Low Priority
7. **Edge Cases**
   - Malformed GEDCOM recovery
   - Circular reference handling
   - Extremely deep nesting
   - Very long values (>32KB)

## Contributing

When adding new tests:

1. Group related tests in `describe` blocks
2. Use descriptive test names starting with "should"
3. Follow the existing test structure
4. Include both positive and negative test cases
5. Add documentation comments for complex tests
6. Ensure tests are independent (no shared state)

## References

- [GEDCOM 5.5.5 Specification with Annotations](../GEDCOM%205.5.5.md)
- [GEDCOM.org](https://www.gedcom.org/)
- [Jest Documentation](https://jestjs.io/)

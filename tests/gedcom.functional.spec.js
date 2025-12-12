/**
 * GEDCOM Functional Tests
 * Converted from gedcom.test.html
 * Tests for GEDCOM parser, stringifier, person operations, and relationships
 */

const fs = require('fs');
const path = require('path');

// Read and setup GEDCOM engine
const gedcomCode = fs.readFileSync(path.join(__dirname, '../js/gedcom.js'), 'utf8');
const tagsCode = fs.readFileSync(path.join(__dirname, '../js/tags.js'), 'utf8');

global.tags = {};
eval(tagsCode);
eval(gedcomCode);

describe('GEDCOM Parser', () => {
    test('should parse a simple GEDCOM file', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
2 GIVN John
2 SURN Doe
1 SEX M
0 TRLR`;
        gedcom.parse(data);
        expect(gedcom.data).toBeDefined();
        expect(gedcom.data.length).toBeGreaterThan(0);
    });

    test('should parse individual records correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
2 GIVN John
2 SURN Doe
1 SEX M
1 BIRT
2 DATE 1 JAN 1980
2 PLAC New York
0 TRLR`;
        gedcom.parse(data);
        const person = gedcom.person('@I1@');
        expect(person.name).toBe('John Doe');
        expect(person.gender).toBe('M');
        expect(person.birth).toBe('1 JAN 1980');
    });

    test('should handle CONC tags correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 NOTE This is a very long note that needs to be
2 CONC  concatenated together without spaces
0 TRLR`;
        gedcom.parse(data);
        const person = gedcom.person('@I1@');
        const note = person.items.find(item => item.tag === 'NOTE');
        expect(note.value).toContain('concatenated together without spaces');
    });

    test('should handle CONT tags correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 NOTE First line of note
2 CONT Second line of note
0 TRLR`;
        gedcom.parse(data);
        const person = gedcom.person('@I1@');
        const note = person.items.find(item => item.tag === 'NOTE');
        expect(note.value).toContain('\n');
        expect(note.value).toContain('Second line');
    });

    test('should parse nested structures correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 BIRT
2 DATE 1 JAN 1980
2 PLAC New York, NY
0 TRLR`;
        gedcom.parse(data);
        const person = gedcom.person('@I1@');
        const birth = person.items.find(item => item.tag === 'BIRT');
        expect(birth).toBeDefined();
        expect(birth.items).toBeDefined();
        const date = birth.items.find(item => item.tag === 'DATE');
        expect(date.value).toBe('1 JAN 1980');
    });
});

describe('GEDCOM Stringifier', () => {
    test('should stringify a simple GEDCOM structure', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
0 TRLR`;
        gedcom.parse(data);
        const output = gedcom.stringify();
        expect(output).toContain('0 HEAD');
        expect(output).toContain('0 @I1@ INDI');
        expect(output).toContain('1 NAME John /Doe/');
    });

    test('should handle long values with CONC correctly', () => {
        const gedcom = new Gedcom();
        const longText = 'A'.repeat(250);
        gedcom.data = [{
            level: 0,
            pointer: '@I1@',
            tag: 'INDI',
            items: [{
                level: 1,
                tag: 'NOTE',
                value: longText,
                items: []
            }]
        }];
        const output = gedcom.stringify();
        expect(output).toContain('CONC');
    });
});

describe('GEDCOM Person Operations', () => {
    test('should add a new person correctly', () => {
        const gedcom = new Gedcom();
        gedcom.data = [];
        const person = gedcom.addPerson('Jane', 'Smith', 'F');
        expect(person.id).toBeDefined();
        expect(person.name).toBeDefined();
        expect(person.gender).toBe('F');
    });

    test('should get all persons from GEDCOM', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
0 @I2@ INDI
1 NAME Jane /Smith/
1 SEX F
0 TRLR`;
        gedcom.parse(data);
        const persons = gedcom.getPersons();
        expect(persons.length).toBe(2);
    });

    test('should get person caption correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 BIRT
2 DATE 1 JAN 1980
1 DEAT
2 DATE 31 DEC 2050
0 TRLR`;
        gedcom.parse(data);
        const person = gedcom.person('@I1@');
        expect(person.caption).toBeDefined();
        expect(person.caption).toContain('John Doe');
        expect(person.caption).toContain('1980');
    });
});

describe('GEDCOM Relationship Operations', () => {
    test('should add a new relation correctly', () => {
        const gedcom = new Gedcom();
        gedcom.data = [];
        const person1 = gedcom.addPerson('John', 'Doe', 'M');
        const person2 = gedcom.addPerson('Jane', 'Smith', 'F');
        const relationId = gedcom.addRelation(person1.id, person2.id);
        expect(relationId).toBeDefined();
        const family = gedcom.data.find(item => item.tag === 'FAM' && item.pointer === relationId);
        expect(family).toBeDefined();
    });

    test('should add a child to a relation correctly', () => {
        const gedcom = new Gedcom();
        gedcom.data = [];
        const person1 = gedcom.addPerson('John', 'Doe', 'M');
        const person2 = gedcom.addPerson('Jane', 'Smith', 'F');
        const child = gedcom.addPerson('Junior', 'Doe', 'M');
        const relationId = gedcom.addRelation(person1.id, person2.id);
        gedcom.addChild(relationId, child.id);

        const family = gedcom.data.find(item => item.tag === 'FAM' && item.pointer === relationId);
        const childRef = family.items.find(item => item.tag === 'CHIL');
        expect(childRef).toBeDefined();
        expect(childRef.value).toBe(child.id);
    });

    test('should get relations correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
1 FAMS @F1@
0 @I2@ INDI
1 NAME Jane /Smith/
1 SEX F
1 FAMS @F1@
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
0 TRLR`;
        gedcom.parse(data);
        const relations = gedcom.relations('@I1@');
        expect(relations.length).toBe(1);
        expect(relations[0].partner).toBeDefined();
        expect(relations[0].partner.id).toBe('@I2@');
    });

    test('should get father correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
0 @I2@ INDI
1 NAME Junior /Doe/
1 SEX M
1 FAMC @F1@
0 @F1@ FAM
1 HUSB @I1@
1 CHIL @I2@
0 TRLR`;
        gedcom.parse(data);
        const father = gedcom.father('@I2@');
        expect(father.id).toBeDefined();
        expect(father.id).toBe('@I1@');
    });

    test('should get mother correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Jane /Doe/
1 SEX F
0 @I2@ INDI
1 NAME Junior /Doe/
1 SEX M
1 FAMC @F1@
0 @F1@ FAM
1 WIFE @I1@
1 CHIL @I2@
0 TRLR`;
        gedcom.parse(data);
        const mother = gedcom.mother('@I2@');
        expect(mother.id).toBeDefined();
        expect(mother.id).toBe('@I1@');
    });

    test('should get siblings correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Child1 /Doe/
1 FAMC @F1@
0 @I2@ INDI
1 NAME Child2 /Doe/
1 FAMC @F1@
0 @I3@ INDI
1 NAME Child3 /Doe/
1 FAMC @F1@
0 @F1@ FAM
1 CHIL @I1@
1 CHIL @I2@
1 CHIL @I3@
0 TRLR`;
        gedcom.parse(data);
        const siblings = gedcom.siblings('@I1@');
        expect(siblings.length).toBe(2);
    });

    test('should get grandparents correctly', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Grandpa /Doe/
1 SEX M
0 @I2@ INDI
1 NAME Father /Doe/
1 SEX M
1 FAMC @F1@
0 @I3@ INDI
1 NAME Child /Doe/
1 FAMC @F2@
0 @F1@ FAM
1 HUSB @I1@
1 CHIL @I2@
0 @F2@ FAM
1 HUSB @I2@
1 CHIL @I3@
0 TRLR`;
        gedcom.parse(data);
        const grandpa = gedcom.paternalgrandfather('@I3@');
        expect(grandpa.id).toBeDefined();
        expect(grandpa.id).toBe('@I1@');
    });
});

describe('GEDCOM Edge Cases', () => {
    test('should handle missing person gracefully', () => {
        const gedcom = new Gedcom();
        gedcom.data = [];
        const person = gedcom.person('@NONEXISTENT@');
        expect(typeof person).toBe('object');
        expect(person.id).toBeFalsy();
    });

    test('should handle missing family members gracefully', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Orphan /Child/
0 TRLR`;
        gedcom.parse(data);
        const father = gedcom.father('@I1@');
        expect(typeof father).toBe('object');
        expect(father.id).toBeFalsy();
    });

    test('should handle empty relations', () => {
        const gedcom = new Gedcom();
        const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Single /Person/
0 TRLR`;
        gedcom.parse(data);
        const relations = gedcom.relations('@I1@');
        expect(relations.length).toBe(0);
    });
});
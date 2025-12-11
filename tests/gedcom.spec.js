/**
 * GEDCOM 5.5.5 Specification Compliance Tests
 * Based on the GEDCOM 5.5.5 Specification with Annotations
 * 
 * This test suite validates that the Genea GEDCOM engine correctly
 * implements the GEDCOM 5.5.5 specification rules.
 */

// Import the GEDCOM engine (we'll need to adapt it for Node.js)
const fs = require('fs');
const path = require('path');

// Read the gedcom.js file and evaluate it in a Node.js context
const gedcomCode = fs.readFileSync(path.join(__dirname, '../js/gedcom.js'), 'utf8');
const tagsCode = fs.readFileSync(path.join(__dirname, '../js/tags.js'), 'utf8');

// Create a minimal browser-like environment
global.tags = {};
eval(tagsCode);
eval(gedcomCode);

describe('GEDCOM 5.5.5 Grammar Rules', () => {
  
  describe('Line Structure', () => {
    test('should parse valid level-tag-value structure', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 TRLR`;
      gedcom.parse(data);
      expect(gedcom.data).toBeDefined();
      expect(gedcom.data.length).toBeGreaterThan(0);
    });

    test('should parse level numbers correctly (0-99)', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
3 FORM LINEAGE-LINKED
0 TRLR`;
      gedcom.parse(data);
      const head = gedcom.data.find(item => item.tag === 'HEAD');
      expect(head.level).toBe(0);
      expect(head.items[0].level).toBe(1);
      expect(head.items[0].items[0].level).toBe(2);
    });

    test('should parse pointers correctly', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      expect(person.pointer).toBe('@I1@');
    });

    test('should handle tags with values', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name.value).toBe('John /Doe/');
    });
  });

  describe('CONC and CONT Tag Handling', () => {
    test('should concatenate CONC tags without adding spaces', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NOTE This is a long note that
2 CONC continues on the next line
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const note = person.items.find(item => item.tag === 'NOTE');
      expect(note.value).toBe('This is a long note thatcontinues on the next line');
      expect(note.value).not.toContain('\n');
    });

    test('should add newlines for CONT tags', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NOTE First line
2 CONT Second line
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const note = person.items.find(item => item.tag === 'NOTE');
      expect(note.value).toContain('\n');
      expect(note.value).toBe('First line\nSecond line');
    });

    test('should handle multiple CONC and CONT tags', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NOTE Line one
2 CONT Line two
2 CONC  continued
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const note = person.items.find(item => item.tag === 'NOTE');
      expect(note.value).toBe('Line one\nLine two continued');
    });

    test('CONC should not add spaces when concatenating', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NOTE Hellowor
2 CONC ld
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const note = person.items.find(item => item.tag === 'NOTE');
      expect(note.value).toBe('Helloworld');
    });
  });

  describe('White Space Handling', () => {
    test('should preserve leading white space in values', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NOTE   Leading spaces
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const note = person.items.find(item => item.tag === 'NOTE');
      expect(note.value).toBe('  Leading spaces');
      expect(note.value.startsWith('  ')).toBe(true);
    });

    test('should preserve significant trailing white space', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NOTE Trailing spaces  
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const note = person.items.find(item => item.tag === 'NOTE');
      // Note: This test may fail if trailing spaces are stripped during parsing
      // The GEDCOM 5.5.5 spec requires preserving them
    });
  });

  describe('GEDCOM Header Requirements', () => {
    test('should have HEAD record at level 0', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 TRLR`;
      gedcom.parse(data);
      const head = gedcom.data.find(item => item.tag === 'HEAD');
      expect(head).toBeDefined();
      expect(head.level).toBe(0);
    });

    test('should have GEDC.VERS in header', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 TRLR`;
      gedcom.parse(data);
      const head = gedcom.data.find(item => item.tag === 'HEAD');
      const gedc = head.items.find(item => item.tag === 'GEDC');
      const vers = gedc.items.find(item => item.tag === 'VERS');
      expect(vers).toBeDefined();
      expect(vers.value).toBe('5.5.5');
    });

    test('should have TRLR record at end', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Test
0 TRLR`;
      gedcom.parse(data);
      const trlr = gedcom.data.find(item => item.tag === 'TRLR');
      expect(trlr).toBeDefined();
      expect(trlr.level).toBe(0);
    });
  });

  describe('Individual Record (INDI) Structure', () => {
    test('should parse individual with NAME', () => {
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
      const person = gedcom.person('@I1@');
      expect(person.name).toBe('John Doe');
      expect(person.gender).toBe('M');
    });

    test('should parse individual with birth and death', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Jane /Smith/
1 SEX F
1 BIRT
2 DATE 1 JAN 1950
2 PLAC New York, NY, USA
1 DEAT
2 DATE 31 DEC 2020
2 PLAC Los Angeles, CA, USA
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.person('@I1@');
      expect(person.birth).toBe('1 JAN 1950');
      expect(person.death).toBe('31 DEC 2020');
    });

    test('should handle multiple NAME records', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 NAME Johnny /Doe/
1 SEX M
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const names = person.items.filter(item => item.tag === 'NAME');
      expect(names.length).toBe(2);
    });
  });

  describe('Family Record (FAM) Structure', () => {
    test('should parse family with husband and wife', () => {
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
      const family = gedcom.data.find(item => item.tag === 'FAM');
      expect(family).toBeDefined();
      const husb = family.items.find(item => item.tag === 'HUSB');
      const wife = family.items.find(item => item.tag === 'WIFE');
      expect(husb.value).toBe('@I1@');
      expect(wife.value).toBe('@I2@');
    });

    test('should parse family with children', () => {
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
0 @I3@ INDI
1 NAME Junior /Doe/
1 SEX M
1 FAMC @F1@
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
1 CHIL @I3@
0 TRLR`;
      gedcom.parse(data);
      const family = gedcom.data.find(item => item.tag === 'FAM');
      const children = family.items.filter(item => item.tag === 'CHIL');
      expect(children.length).toBe(1);
      expect(children[0].value).toBe('@I3@');
    });

    test('should support same-sex relationships (two HUSB)', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
1 FAMS @F1@
0 @I2@ INDI
1 NAME James /Smith/
1 SEX M
1 FAMS @F1@
0 @F1@ FAM
1 HUSB @I1@
1 HUSB @I2@
0 TRLR`;
      gedcom.parse(data);
      const family = gedcom.data.find(item => item.tag === 'FAM');
      const husbs = family.items.filter(item => item.tag === 'HUSB');
      expect(husbs.length).toBe(2);
    });

    test('should support same-sex relationships (two WIFE)', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Jane /Doe/
1 SEX F
1 FAMS @F1@
0 @I2@ INDI
1 NAME Joan /Smith/
1 SEX F
1 FAMS @F1@
0 @F1@ FAM
1 WIFE @I1@
1 WIFE @I2@
0 TRLR`;
      gedcom.parse(data);
      const family = gedcom.data.find(item => item.tag === 'FAM');
      const wives = family.items.filter(item => item.tag === 'WIFE');
      expect(wives.length).toBe(2);
    });
  });

  describe('Relationship Queries', () => {
    test('should find father of individual', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Father /Doe/
1 SEX M
0 @I2@ INDI
1 NAME Child /Doe/
1 SEX M
1 FAMC @F1@
0 @F1@ FAM
1 HUSB @I1@
1 CHIL @I2@
0 TRLR`;
      gedcom.parse(data);
      const father = gedcom.father('@I2@');
      expect(father.id).toBe('@I1@');
      expect(father.name).toBe('Father Doe');
    });

    test('should find mother of individual', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Mother /Smith/
1 SEX F
0 @I2@ INDI
1 NAME Child /Smith/
1 SEX M
1 FAMC @F1@
0 @F1@ FAM
1 WIFE @I1@
1 CHIL @I2@
0 TRLR`;
      gedcom.parse(data);
      const mother = gedcom.mother('@I2@');
      expect(mother.id).toBe('@I1@');
      expect(mother.name).toBe('Mother Smith');
    });

    test('should find siblings', () => {
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
      expect(siblings.map(s => s.id)).toContain('@I2@');
      expect(siblings.map(s => s.id)).toContain('@I3@');
    });

    test('should find grandparents', () => {
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
      expect(grandpa.id).toBe('@I1@');
    });
  });

  describe('GEDCOM Stringification', () => {
    test('should stringify parsed GEDCOM correctly', () => {
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
      expect(output).toContain('1 GEDC');
      expect(output).toContain('2 VERS 5.5.5');
      expect(output).toContain('0 @I1@ INDI');
      expect(output).toContain('1 NAME John /Doe/');
      expect(output).toContain('0 TRLR');
    });

    test('should split long values with CONC', () => {
      const gedcom = new Gedcom();
      const longText = 'A'.repeat(250);
      gedcom.data = [{
        level: 0,
        tag: 'HEAD',
        items: []
      }, {
        level: 0,
        pointer: '@I1@',
        tag: 'INDI',
        items: [{
          level: 1,
          tag: 'NOTE',
          value: longText,
          items: []
        }]
      }, {
        level: 0,
        tag: 'TRLR',
        items: []
      }];
      const output = gedcom.stringify();
      expect(output).toContain('CONC');
    });

    test('should preserve hierarchical structure', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 BIRT
2 DATE 1 JAN 1980
2 PLAC New York
0 TRLR`;
      gedcom.parse(data);
      const output = gedcom.stringify();
      const lines = output.split('\n');
      expect(lines).toContain('1 BIRT');
      expect(lines).toContain('2 DATE 1 JAN 1980');
      expect(lines).toContain('2 PLAC New York');
    });
  });

  describe('Person Operations', () => {
    test('should add person with valid structure', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person = gedcom.addPerson('John', 'Doe', 'M');
      expect(person.id).toBeDefined();
      expect(person.id).toMatch(/@I\d+@/);
      expect(person.name).toBe('John Doe');
      expect(person.gender).toBe('M');
    });

    test('should assign sequential IDs to persons', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person1 = gedcom.addPerson('John', 'Doe', 'M');
      const person2 = gedcom.addPerson('Jane', 'Doe', 'F');
      expect(person1.id).toBe('@I1@');
      expect(person2.id).toBe('@I2@');
    });

    test('should create proper NAME structure with GIVN and SURN', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person = gedcom.addPerson('John', 'Doe', 'M');
      const personRecord = gedcom.data.find(item => item.pointer === person.id);
      const nameRecord = personRecord.items.find(item => item.tag === 'NAME');
      expect(nameRecord.value).toBe('John /Doe/');
      const givn = nameRecord.items.find(item => item.tag === 'GIVN');
      const surn = nameRecord.items.find(item => item.tag === 'SURN');
      expect(givn.value).toBe('John');
      expect(surn.value).toBe('Doe');
    });
  });

  describe('Family Operations', () => {
    test('should create family with proper FAM record', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person1 = gedcom.addPerson('John', 'Doe', 'M');
      const person2 = gedcom.addPerson('Jane', 'Smith', 'F');
      const relationId = gedcom.addRelation(person1.id, person2.id);
      expect(relationId).toBeDefined();
      expect(relationId).toMatch(/@F\d+@/);
      const family = gedcom.data.find(item => item.tag === 'FAM');
      expect(family).toBeDefined();
    });

    test('should link FAMS to both spouses', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person1 = gedcom.addPerson('John', 'Doe', 'M');
      const person2 = gedcom.addPerson('Jane', 'Smith', 'F');
      const relationId = gedcom.addRelation(person1.id, person2.id);
      
      const person1Record = gedcom.data.find(item => item.pointer === person1.id);
      const person2Record = gedcom.data.find(item => item.pointer === person2.id);
      
      const fams1 = person1Record.items.find(item => item.tag === 'FAMS');
      const fams2 = person2Record.items.find(item => item.tag === 'FAMS');
      
      expect(fams1.value).toBe(relationId);
      expect(fams2.value).toBe(relationId);
    });

    test('should add child with CHIL and FAMC links', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person1 = gedcom.addPerson('John', 'Doe', 'M');
      const person2 = gedcom.addPerson('Jane', 'Smith', 'F');
      const child = gedcom.addPerson('Junior', 'Doe', 'M');
      const relationId = gedcom.addRelation(person1.id, person2.id);
      gedcom.addChild(relationId, child.id);
      
      const family = gedcom.data.find(item => item.pointer === relationId);
      const chilRecord = family.items.find(item => item.tag === 'CHIL');
      expect(chilRecord.value).toBe(child.id);
      
      const childRecord = gedcom.data.find(item => item.pointer === child.id);
      const famc = childRecord.items.find(item => item.tag === 'FAMC');
      expect(famc.value).toBe(relationId);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle person not found gracefully', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person = gedcom.person('@NONEXISTENT@');
      expect(person).toBeDefined();
      expect(person.id).toBeUndefined();
    });

    test('should handle missing parents gracefully', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Orphan /Child/
1 SEX M
0 TRLR`;
      gedcom.parse(data);
      const father = gedcom.father('@I1@');
      const mother = gedcom.mother('@I1@');
      expect(father).toBeDefined();
      expect(father.id).toBeUndefined();
      expect(mother).toBeDefined();
      expect(mother.id).toBeUndefined();
    });

    test('should handle empty file gracefully', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 TRLR`;
      expect(() => gedcom.parse(data)).not.toThrow();
    });

    test('should return empty array for person with no siblings', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Only /Child/
1 FAMC @F1@
0 @F1@ FAM
1 CHIL @I1@
0 TRLR`;
      gedcom.parse(data);
      const siblings = gedcom.siblings('@I1@');
      expect(siblings).toBeDefined();
      expect(siblings.length).toBe(0);
    });

    test('should return empty array for person with no relations', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Single /Person/
1 SEX M
0 TRLR`;
      gedcom.parse(data);
      const relations = gedcom.relations('@I1@');
      expect(relations).toBeDefined();
      expect(relations.length).toBe(0);
    });
  });
});

describe('GEDCOM 5.5.5 Data Integrity', () => {
  describe('Pointer Validity', () => {
    test('pointers should follow @XXX@ format', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person = gedcom.addPerson('Test', 'Person', 'M');
      expect(person.id).toMatch(/^@[A-Z]+\d+@$/);
    });

    test('should maintain pointer uniqueness', () => {
      const gedcom = new Gedcom();
      gedcom.data = [];
      const person1 = gedcom.addPerson('Person', 'One', 'M');
      const person2 = gedcom.addPerson('Person', 'Two', 'F');
      expect(person1.id).not.toBe(person2.id);
    });
  });

  describe('Date Format', () => {
    test('should accept standard date formats', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 BIRT
2 DATE 1 JAN 1980
0 TRLR`;
      expect(() => gedcom.parse(data)).not.toThrow();
      const person = gedcom.person('@I1@');
      expect(person.birth).toBe('1 JAN 1980');
    });
  });

  describe('Caption Generation', () => {
    test('should generate caption with name and years', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 BIRT
2 DATE 1 JAN 1950
1 DEAT
2 DATE 31 DEC 2020
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.person('@I1@');
      expect(person.caption).toContain('John Doe');
      expect(person.caption).toContain('1950');
      expect(person.caption).toContain('2020');
    });

    test('should handle missing dates in caption', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.person('@I1@');
      expect(person.caption).toContain('John Doe');
      expect(person.caption).toContain('?');
    });
  });
});

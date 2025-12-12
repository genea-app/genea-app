/**
 * GEDCOM 5.5.5 Advanced Validation Tests
 * Tests for specific GEDCOM 5.5.5 specification rules and edge cases
 */

const fs = require('fs');
const path = require('path');

// Read and setup GEDCOM engine
const gedcomCode = fs.readFileSync(path.join(__dirname, '../js/gedcom.js'), 'utf8');
const tagsCode = fs.readFileSync(path.join(__dirname, '../js/tags.js'), 'utf8');

global.tags = {};
eval(tagsCode);
eval(gedcomCode);

describe('GEDCOM 5.5.5 Advanced Validation', () => {
  
  describe('User-Defined Tags (Underscore Prefix)', () => {
    test('should allow user-defined tags starting with underscore', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 _CUSTOM Custom Value
0 TRLR`;
      expect(() => gedcom.parse(data)).not.toThrow();
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const custom = person.items.find(item => item.tag === '_CUSTOM');
      expect(custom).toBeDefined();
      expect(custom.value).toBe('Custom Value');
    });

    test('should preserve user-defined tags in stringification', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 _EMAIL john@example.com
1 _URL https://example.com
0 TRLR`;
      gedcom.parse(data);
      const output = gedcom.stringify();
      expect(output).toContain('1 _EMAIL john@example.com');
      expect(output).toContain('1 _URL https://example.com');
    });
  });

  describe('Maximum Line Length (255 characters)', () => {
    test('should handle lines up to 255 characters', () => {
      const gedcom = new Gedcom();
      const longValue = 'A'.repeat(200); // Safe within limit
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME ${longValue}
0 TRLR`;
      expect(() => gedcom.parse(data)).not.toThrow();
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name.value).toBe(longValue);
    });

    test('should split values longer than 200 chars with CONC', () => {
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
      const lines = output.split('\n');
      const concLines = lines.filter(line => line.includes('CONC'));
      expect(concLines.length).toBeGreaterThan(0);
    });
  });

  describe('Level Number Validation', () => {
    test('should parse level 0 records', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 TRLR`;
      gedcom.parse(data);
      const level0Records = gedcom.data.filter(item => item.level === 0);
      expect(level0Records.length).toBeGreaterThan(0);
    });

    test('should handle deep nesting levels', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
3 FORM LINEAGE-LINKED
4 VERS 5.5.5
0 TRLR`;
      gedcom.parse(data);
      const head = gedcom.data.find(item => item.tag === 'HEAD');
      const gedc = head.items[0];
      const vers = gedc.items[0];
      const form = vers.items.find(item => item.tag === 'FORM');
      expect(form).toBeDefined();
      expect(form.level).toBe(3);
    });
  });

  describe('Pointer Cross-References', () => {
    test('should maintain referential integrity for families', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 FAMS @F1@
0 @I2@ INDI
1 NAME Jane /Smith/
1 FAMS @F1@
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
0 TRLR`;
      gedcom.parse(data);
      
      const person1 = gedcom.data.find(item => item.pointer === '@I1@');
      const person2 = gedcom.data.find(item => item.pointer === '@I2@');
      const family = gedcom.data.find(item => item.pointer === '@F1@');
      
      const fams1 = person1.items.find(item => item.tag === 'FAMS');
      const fams2 = person2.items.find(item => item.tag === 'FAMS');
      const husb = family.items.find(item => item.tag === 'HUSB');
      const wife = family.items.find(item => item.tag === 'WIFE');
      
      expect(fams1.value).toBe(family.pointer);
      expect(fams2.value).toBe(family.pointer);
      expect(husb.value).toBe(person1.pointer);
      expect(wife.value).toBe(person2.pointer);
    });

    test('should maintain referential integrity for parent-child relationships', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Child /Doe/
1 FAMC @F1@
0 @I2@ INDI
1 NAME Father /Doe/
0 @I3@ INDI
1 NAME Mother /Smith/
0 @F1@ FAM
1 HUSB @I2@
1 WIFE @I3@
1 CHIL @I1@
0 TRLR`;
      gedcom.parse(data);
      
      const child = gedcom.data.find(item => item.pointer === '@I1@');
      const family = gedcom.data.find(item => item.pointer === '@F1@');
      
      const famc = child.items.find(item => item.tag === 'FAMC');
      const chil = family.items.find(item => item.tag === 'CHIL');
      
      expect(famc.value).toBe(family.pointer);
      expect(chil.value).toBe(child.pointer);
    });
  });

  describe('NAME Tag Structure', () => {
    test('should parse NAME with surname delimiters', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name.value).toBe('John /Doe/');
      expect(name.value).toContain('/');
    });

    test('should handle NAME without surname', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Madonna
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name.value).toBe('Madonna');
    });

    test('should handle NAME with GIVN and SURN subfields', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
2 GIVN John
2 SURN Doe
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      const givn = name.items.find(item => item.tag === 'GIVN');
      const surn = name.items.find(item => item.tag === 'SURN');
      expect(givn.value).toBe('John');
      expect(surn.value).toBe('Doe');
    });

    test('should handle complex names with prefixes and suffixes', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME Dr. John William /von Smith/ Jr.
2 NPFX Dr.
2 GIVN John William
2 SPFX von
2 SURN Smith
2 NSFX Jr.
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name.items.find(item => item.tag === 'NPFX').value).toBe('Dr.');
      expect(name.items.find(item => item.tag === 'NSFX').value).toBe('Jr.');
    });
  });

  describe('Event Structure Validation', () => {
    test('should parse event with DATE and PLAC', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 BIRT
2 DATE 1 JAN 1950
2 PLAC New York, NY, USA
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const birt = person.items.find(item => item.tag === 'BIRT');
      const date = birt.items.find(item => item.tag === 'DATE');
      const plac = birt.items.find(item => item.tag === 'PLAC');
      expect(date.value).toBe('1 JAN 1950');
      expect(plac.value).toBe('New York, NY, USA');
    });

    test('should handle multiple events of the same type', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 RESI
2 DATE FROM 1950 TO 1960
2 PLAC New York
1 RESI
2 DATE FROM 1960 TO 1970
2 PLAC Chicago
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const residences = person.items.filter(item => item.tag === 'RESI');
      expect(residences.length).toBe(2);
    });
  });

  describe('Multi-Media Object Support', () => {
    test('should parse OBJE with FILE', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 OBJE
2 FILE photo.jpg
2 FORM JPEG
2 TITL Family Photo
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const obje = person.items.find(item => item.tag === 'OBJE');
      const file = obje.items.find(item => item.tag === 'FILE');
      const form = obje.items.find(item => item.tag === 'FORM');
      const titl = obje.items.find(item => item.tag === 'TITL');
      expect(file.value).toBe('photo.jpg');
      expect(form.value).toBe('JPEG');
      expect(titl.value).toBe('Family Photo');
    });
  });

  describe('Source Citation Support', () => {
    test('should parse SOUR with PAGE', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 BIRT
2 SOUR @S1@
3 PAGE Page 42
0 @S1@ SOUR
1 TITL Birth Records
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const birt = person.items.find(item => item.tag === 'BIRT');
      const sour = birt.items.find(item => item.tag === 'SOUR');
      const page = sour.items.find(item => item.tag === 'PAGE');
      expect(sour.value).toBe('@S1@');
      expect(page.value).toBe('Page 42');
    });
  });

  describe('Gender Values', () => {
    test('should accept standard gender values (M, F, U)', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
0 @I2@ INDI
1 NAME Jane /Doe/
1 SEX F
0 @I3@ INDI
1 NAME Unknown /Doe/
1 SEX U
0 TRLR`;
      gedcom.parse(data);
      expect(gedcom.person('@I1@').gender).toBe('M');
      expect(gedcom.person('@I2@').gender).toBe('F');
      expect(gedcom.person('@I3@').gender).toBe('U');
    });
  });

  describe('Submitter Record', () => {
    test('should parse SUBM record', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
1 SUBM @SUBM1@
0 @SUBM1@ SUBM
1 NAME John Doe
1 ADDR 123 Main St
2 CITY New York
2 STAE NY
2 POST 10001
2 CTRY USA
0 TRLR`;
      gedcom.parse(data);
      const submitter = gedcom.data.find(item => item.tag === 'SUBM');
      expect(submitter).toBeDefined();
      expect(submitter.pointer).toBe('@SUBM1@');
    });
  });

  describe('Date Format Support', () => {
    test('should accept various date formats', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 BIRT
2 DATE 1 JAN 1950
0 @I2@ INDI
1 BIRT
2 DATE BEF 1950
0 @I3@ INDI
1 BIRT
2 DATE AFT 1 JAN 1950
0 @I4@ INDI
1 BIRT
2 DATE BET 1950 AND 1960
0 @I5@ INDI
1 BIRT
2 DATE ABT 1950
0 TRLR`;
      expect(() => gedcom.parse(data)).not.toThrow();
    });

    test('should accept date ranges', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 RESI
2 DATE FROM 1950 TO 1960
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const resi = person.items.find(item => item.tag === 'RESI');
      const date = resi.items.find(item => item.tag === 'DATE');
      expect(date.value).toContain('FROM');
      expect(date.value).toContain('TO');
    });
  });

  describe('Note Structure', () => {
    test('should handle both inline and pointer notes', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME John /Doe/
1 NOTE This is an inline note
1 NOTE @N1@
0 @N1@ NOTE This is a shared note
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const notes = person.items.filter(item => item.tag === 'NOTE');
      expect(notes.length).toBe(2);
      expect(notes[0].value).toBe('This is an inline note');
      expect(notes[1].value).toBe('@N1@');
    });
  });

  describe('Character Encoding', () => {
    test('should handle UTF-8 characters', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
1 CHAR UTF-8
0 @I1@ INDI
1 NAME Søren /Müller/
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name.value).toBe('Søren /Müller/');
    });

    test('should preserve unicode characters in stringification', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
1 CHAR UTF-8
0 @I1@ INDI
1 NAME José /García/
1 NOTE Café résumé
0 TRLR`;
      gedcom.parse(data);
      const output = gedcom.stringify();
      expect(output).toContain('José');
      expect(output).toContain('García');
      expect(output).toContain('résumé');
    });
  });

  describe('Empty Fields', () => {
    test('should handle empty tag values', () => {
      const gedcom = new Gedcom();
      const data = `0 HEAD
1 GEDC
2 VERS 5.5.5
0 @I1@ INDI
1 NAME
2 GIVN John
2 SURN Doe
0 TRLR`;
      gedcom.parse(data);
      const person = gedcom.data.find(item => item.tag === 'INDI');
      const name = person.items.find(item => item.tag === 'NAME');
      expect(name).toBeDefined();
      // Empty values are allowed but may be undefined or empty string
      expect(name.value === '' || name.value === undefined).toBe(true);
    });
  });
});



## The
GEDCOM5.5.5Specification
with Annotations
## Editor
## Tamura Jones
## Technical Reviewers
Bob Coretcreator ofGenealogy OnlineandOpen Archives
Diedrich Hesmercreator ofOur Family BookandGEDCOM Service Programs
Andrew Hoylecreator ofChronoplex My Family Treeand theChronoplex GEDCOM
## Validator
Kari Kujansuusoftware developer for The Genealogy Society of Finland'sIsotammi.net
Louis Kesslercreator ofBehold,GEDCOM File Finder, andDouble Match Triangulator
Stanley Mitchellcreator ofezGED Viewer
Nigel Munro Parkercreator of theGED-inlineGEDCOM validator
## First Release
## 2 Oct 2019
## Copyright © 2013 - 2019 Tamura Jones.
All rights reserved.
The latest versions of the GEDCOM specification are available for download on
www.gedcom.org.
## 1

## Copyright
This publication,The GEDCOM 5.5.5 Specification with Annotationsis based on theThe
GEDCOM 5.5.1 Specification, Annotated Edition, which is an annotated edition of theGEDCOM
5.5.1 Specification, which is a minor update of theGEDCOM 5.5 Specification. The GEDCOM
5.5 and 5.5.1 specifications were created byFamilySearch.
TheFamilySearch GEDCOM 5.5 specificationcontains the following copyright notice:
Copyright © 1987, 1989, 1992, 1993, 1995 by The Church of Jesus Christ of Latter-day
Saints. This document may be copied for purposes of review or programming of
genealogical software, provided this notice is included. All other rights reserved.
Similar copyright notices are included in other versions of the GEDCOM specification.
TheFamilySearch GEDCOM 5.5.1 specificationis largely identical to theFamilySearch
GEDCOM 5.5 specification, yet contains a slightly different copyright notice:
Copyright © 1987, 1989, 1992, 1993, 1995, 1999 by The Church of Jesus Christ of Latter-
day Saints. This document may be copied for purposes of review only. It must not be used
for programming of genealogical software while in draft, All other rights reserved.
TheFamilySearch GEDCOM 5.5.1 specificationisn't a draft, in fact never was a draft. The
FamilySearch GEDCOM 5.5.1 specificationis a publicly distributed specification, and it's the
GEDCOM version thatFamilySearchthemselves use since their release of PAF5.0 in 2000CE.
When the creator of a standard uses that standard in its major products, including a major public
product, that standard isn't a draft.
This publication,The GEDCOM 5.5.5 Specification with Annotations, is published for the
purposes of review and programming of genealogical software. It is based on theThe GEDCOM
5.5.1 Specification, Annotated Edition, an in-depth and in-place review (for the purposes of
programming), of theFamilySearch GEDCOM 5.5.1 specification. This is not only allowed by
the GEDCOM 5.5 copyright notice, it is even allowed by the less permissive GEDCOM 5.5.1
copyright notice.
This publication is copyrighted too. Thecopyright noticeis on the front page.
## 2

## TABLE OF CONTENTS
Conventions..................................................................................................................p. 4
About GEDCOM 5.5.5.................................................................................................p. 6
What's New in 5.5.5.....................................................................................................p. 8
GEDCOM Writer & Reader Checklists.....................................................................p. 26
Support for Earlier GEDCOM Versions.....................................................................p. 28
Introduction................................................................................................................p. 29
Purpose and Content ofThe GEDCOM Standard......................................p. 29
Chapter 1 Part I: GEDCOM grammar........................................................................p. 30
Concepts.....................................................................................................p. 30
Grammar.....................................................................................................p. 30
Description of Grammar Components.......................................................p. 36
White Space................................................................................................p. 40
CONC & CONT.........................................................................................p. 41
Symbols Used with Basic GEDCOM Language and GEDCOM forms....p. 44
Chapter 1 Part II: Basic GEDCOM Language...........................................................p. 46
Basic GEDCOM.........................................................................................p. 46
GEDCOM Record Definitions...................................................................p. 47
GEDCOM Tag Definitions.........................................................................p. 51
Chapter 2: Lineage-Linked Form...............................................................................p. 53
Lineage-Linked Form Definition...............................................................p. 55
Top-Level Records of the Lineage-Linked Form.......................................p. 56
Subrecords of the Lineage-Linked Form...................................................p. 64
Primitive Elements of the Lineage-Linked Form.......................................p. 75
The GEDCOM File..................................................................................p. 109
Sample Lineage-Linked GEDCOM File..................................................p. 110
Chapter 3: Using Character Sets in GEDCOM........................................................p. 112
ANSEL.....................................................................................................p. 113
ASCII.......................................................................................................p. 114
Unicode....................................................................................................p. 114
Chapter 4: GEDCOM System Identifiers
System Identifier Registration..................................................................p. 117
Appendix A: Lineage-Linked GEDCOM Tag Definition........................................p. 121
Appendix B: ANSEL To Unicode Conversion
Appendix C: ANSEL Character Set.........................................................................p. 132
Non-spacing graphic characters...............................................................p. 134
Spacing graphic characters.......................................................................p. 135
Bonus Chapters........................................................................................................p. 137
GEDCOM Validation...............................................................................p. 138
GEDCOM Version Detection...................................................................p. 140
GEDCOM 5.5.1 Version Detection..........................................................p. 142
Event GEDCOM......................................................................................p. 147
Known GEDCOM Form Errors...............................................................p. 148
more than one <<SUBMITTER_RECORD>>........................................p. 149
No Standard for Multimedia File Transfer...............................................p. 150
GEDCOM 5.5 <<MULTIMEDIA_RECORD>>.....................................p. 151
GEDCOM 5.5.1 <MULTIMEDIA_LINK>.............................................p. 153
one- and two-digit years illegal................................................................p. 157
alias ALIA................................................................................................p. 159
NOTE.SOUR.NOTE.SOUR....................................................................p. 160
Maximum Path Length.............................................................................p. 161
The ANSEL Header demand....................................................................p. 162
HEAD.CHAR.VERS...............................................................................p. 164
## 3

## Conventions
## Language
This document uses English spelling andlogical quoting; quotes go around an item, full stops are
neither moved into nor out of quoted text.
must, must not, should, should not
This specification usesmust,must not,may,shouldandshould notas defined inIETFRFC2119.
Thus, other sentences in this specification almost always usesmust notinstead ofmay not. This
specification sometimes italicises these phrases for emphasis, but does not capitalise these
phrases.
## Records
A GEDCOM files consists ofrecords. A record that is contained within another record is a
subrecord.
Previous versions of GEDCOM have also referred to records and subrecords asstructuresand
substructures, even“record structures”. They've also been referred to as“tag”,“tag context”and
just“context”, while“context”is generally used to refer to the enclosing record, not the
subrecord itself.
A GEDCOM record consists of several parts, thetagis only part of the record. This version of
GEDCOM consciously avoids using“tag”when“record”is meant.
A GEDCOM record starts with a level number. Records with level number zero are known as
top-level records. Previous GEDCOM versions have referred to top-level records as“zero-level
records”,“logical GEDCOM records”,“logical records”, and“record at level zero”; this
specification always uses“top-level record”.
The termrecordsincludessubrecords, unless restricted by a modifier, as in“top-level records”, or
“INDIrecords”.
## Subrecord Notation
The GEDCOM specification uses a convenient subrecord notation to indicate particular
subrecords. For example,INDI.NAMEis theNAMEsubrecord of theINDIrecord, and
HEAD.GEDC.VERSis theVERSsubrecord of theGEDCsubrecord of theHEADrecord.
## Bolded Tags
Tags in GEDCOM syntax definitions are bolded when they are mandatory in that context.
Characters, Code Units, and Code Points
Characters, code points and code units are related but different concepts. This specification
assumes that the reader is familiar with these.
Previous GEDCOM versions expressed fields length in characters. GEDCOM 5.5.5 expresses
field length incode units.
The text distinguishes between character sets and encodings; GEDCOM 5.5.5 demands the use of
Unicode character set, either the UTF-8 or UTF-16 encoding. GEDCOM 5.5.5 continues the use
of theHEAD.CHARline value“UNICODE”(all-uppercase) to indicate UTF-16.
## 4

Terminator versus Newline
This text continues to use“terminator”for the GEDCOM line terminator, but uses“newline”for
line breaks in (long) logical line values. This makes discussion of theCONTrecord easier to
understand.
GEDCOM Readers & Writers
AGEDCOM writeris code that writes a particular version (and encoding) of GEDCOM. A
GEDCOM readeris code that reads a particular version (and encoding) of GEDCOM.
AGEDCOM 5.5.1 writeris code that writes GEDCOM 5.5.1 files. AGEDCOM 5.5.5 readeris
code that reads GEDCOM 5.5.5 files.
A typical genealogical system contains multiple GEDCOM readers and writers, for the last few
versions of GEDCOM.
GEDCOM Examples
The GEDCOM specification contains some GEDCOM examples.
An effort has been made to ensure that all examples are valid GEDCOM, that do not only follow
GEDCOM rules and best practice, but genealogical best practices as well.
## Deprecated Features
The GEDCOM 5.5.5 specification contains few deprecated features.
Deprecated sections are highlighted through text & background colour, like this example:
escape_text:=
[alphanum|escape_text+alphanum|escape_text+ space ]
where:
space = U+0020, the Space character
The escape_text is the part of an escape between the opening and closing at sign (@).
Escape sequences are defined by a GEDCOM form for that GEDCOM form.
GEDCOM 5.5.1 allows almost any Unicode character inside escape sequences.
GEDCOM 5.5.5 restricts escape sequences to alphanumerical characters and the space
character.
Notice thatescape_textmust start with an alphanumerical character, that it must not
start with a space.
The space character is allowed but deprecated; it is only included to keep the already
existing escape sequence@#DFRENCHR@legal.
The general guideline for deprecated features is that they should not be used. Applications should
avoid using deprecated features in the GEDCOM files they export.
The general guideline for import of deprecated features is that developersshouldnot add support
for deprecated features, but should not remove any already existing support either.
## 5

About GEDCOM 5.5.5
## Maintenance Release
Technically, the GEDCOM 5.5.5 specification succeeds the GEDCOM 5.5.1 specification
(1999CE) as the current GEDCOM specification. Practically, it succeeds theGEDCOM 5.5.1
Specification Annotated Edition(2019CE).
Previous GEDCOM releases were feature releases that introduced major new features. GEDCOM
5.5.5 does not introduce any major new features, quite the opposite: GEDCOM 5.5.5 removes
long obsolete and deprecated features. GEDCOM 5.5.5 is a maintenance release; it fixes a variety
of issues to provide a better specification, and a solid basis for future versions.
TheGEDCOM 5.5.5 Specification with Annotationsis based on theGEDCOM 5.5.1 Specification
Annotated Edition. It is, despite extensive editing, essentially the same specification, but many
textual corrections applied instead of highlighted, obsolete and deprecated parts removed,
ambiguities and contradictions resolved. Both the GEDCOM grammar and the Lineage-Linked
Form have been simplified without really changing things; whatever isn't allowed anymore wasn't
being used anyway, or was deprecated decades ago.
The GEDCOM 5.5.5 focus is on corrections, clarifications, fixes and simplifications, but it's been
twenty years since GEDCOM 5.5.1, and plenty of issues remain. The GEDCOM 5.5.5
specification is the GEDCOM 5.5.5 specificationwith Annotations. That isn't the ideal approach,
it is the practical approach.
The GEDCOM 5.5.5 is based on theGEDCOM 5.5.1 Annotated Editionand contains some of the
same annotations as theAnnotated Edition.
Many annotations have been applied, replaced by a better specification, replaced by new sections
or turned into bonus chapters, but yet other annotations remain.
The annotations and bonus chapter provide useful and interesting information, but arenotpart of
the specification proper.
## Quality
The GEDCOM 5.5.5 specification is about GEDCOM quality. GEDCOM 5.5.5 is a better
GEDCOM; The GEDCOM 5.5.5 specification is a better specification, and GEDCOM 5.5.5 files
are better GEDCOM files. The GEDCOM 5.5.1 and 5.5.5 specification are so close, that most
high-quality GEDCOM 5.5.1 files are GEDCOM 5.5.5 files in all but version number. The
GEDCOM 5.5.5 version number is badge of quality.
Developers of products that already produce GEDCOM 5.5.1 files that already conform with all
GEDCOM rules, recommendations and best practices documented in theGEDCOM 5.5.1
Annotated Edition(2018CE) will find it easy to upgrade the GEDCOM output of their products
to GEDCOM 5.5.5.
GEDCOM 5.5.5 simplifies and tightens the rules to spark a change in genealogy industry culture.
There are technical differences between GEDCOM 5.5.1 and GEDCOM 5.5.5, but the most
important change is that GEDCOM 5.5.5 demands strict compliance.
Many existing GEDCOM 5.5.1 readers tolerate a wide variety of errors known to occur in
GEDCOM 5.5.1 files,. GEDCOM 5.5.5 readersneed notaccepts errors known to occur in
GEDCOM 5.5.1 files, andmust notdo so. GEDCOM 5.5.5 readers must make a clean break with
such practices. Developers improving the GEDCOM output of their products should continue to
use version number 5.5.1 until their GEDCOM output is in compliance with GEDCOM 5.5.5.
It is perfectly possible to combine a GEDCOM 5.5 and GEDCOM 5.5.1 reader into a single
GEDCOM 5.5.0/1 reader, it is not possible to support GEDCOM 5.5.1 and 5.5.5 with a single
combined reader.
A GEDCOM 5.5.5 reader must be separate from readers for GEDCOM 5.5.1 and earlier, not just
to make sure it doesn't support obsolete Lineage-Linked Form records, but because the
GEDCOM 5.5.5 grammar is considerably simpler and stricter than the GEDCOM 5.5.0/1
grammar. A GEDCOM 5.5.5 reader may use some of the same building blocks as the GEDCOM
## 6

5.5.1 reader, but itcan notandmust notbe a combined GEDCOM 5.5.1 & 5.5.5 reader.
The GEDCOM 5.5.5 readerneed notandmust notcompensate for errors that are only known to
occur in ostensible GEDCOM 5.5.1 and earlier files, andmustkeep things simple by rejecting
invalid files.
A GEDCOM 5.5.5 reader should be very clean code that is significantly simpler and noticeably
faster than older GEDCOM readers.
Developers should keep their existing readers for GEDCOM 5.5.1 and earlier for backward
compatibility, but are advised take advantage of the GEDCOM 5.5.5 specification to improve
their GEDCOM 5.5.1 writer, and bring its output as close to that of the GEDCOM 5.5.5 writer as
possible.
TheWhat's New in GEDCOM 5.5.5section provides an overview of changes, including such
things as CONC and CONT rules, tables of superfluous and obsolete records, and is followed by
GEDCOM writer & reader checklists.
## 7

What's New in GEDCOM 5.5.5
This section provides an fairly detailed overview of changes between GEDCOM 5.5.1 and
GEDCOM 5.5.5. The GEDCOM 5.5.5 specification does not include a overview of changes
before GEDCOM 5.5.1. Those changes happened more than two decades ago, and are listed in
theGEDCOM 5.5.1 Annotated Edition.
GEDCOM 5.5.5 isn't a feature release, it's a maintenance release; while a few small additions
have been sneaked in, but there are no major new features.
Both the GEDCOM Grammar and the Lineage-Linked Form have been simplified. A major
improvement is the introduction of a Basic GEDCOM Language and the top-level
<GEDCOM_FILE> definition.
Text has been improved with current and more accurate terminology. When there were two ways
to do the same thing, there's one way to do that thing now. Contradictions have been resolved,
existing specifications has been clarified. Obsolete, deprecated and superfluous stuff has been
taken out.
## General Improvements
## New Specification Parts
▪A shortConventionssection introduces some terminology and terminology changes.
▪A section on CONC & CONT has been added to Chapter 1
▪That new section on CONC & CONT is preceded by a new section about white space
▪New sections defining the Basic GEDCOM Language
▪The chapter on Character Set & Encodings has been rewritten.
▪New chapter on system identifiers.
▪GEDCOM Reader & Writer Checklists
▪New appendix offers consolidated ANSEL / Unicode conversion tables (was bonus chapter in
the Annotated Edition)
▪Bonus chapters on a variety of issues, including GEDCOM Validation, GEDCOM version
detection, and GEDCOM 5.5.1 version detection. The new bonus chapter on GEDCOM
Version detection contains some advice on how to support GEDCOM 5.5.5 while continuing
to support GEDCOM 5.5.1.
## Textual Corrections
## Corrections
Textual improvements include corrections of spelling errors, editing errors and conceptual errors,
and improved terminology.
There are many small changes, some more important than others, but the many small changes
really all add up to a significantly clearer, more consistent and more accurate specification.
## English
As this is an international standard, an effort was made to use International English throughout.
## Logical Quoting
Switched from illogical to logical quoting style to avoid confusion and misinterpretation; logical
quoting style leaves no doubt what's quoted and what's not.
## 8

## Terminology
The specification now uses better, more current, more accurate and more consistent terminology
throughout. The text now uses“file”instead of“transmission”,“transcription”instead of
“variation”and properly distinguishes between“tag”and“record”by no longer using“tag”when
“record”is meant.
There is no more conflation of tag name and meaning into a mixed-case word such as
“INDIvidual”either.
oldnew
zero level recordtop-level record
logical recordtop-level record
tagrecord
tag contextrecord
contextrecord
family recordfamily group record
transmissionfile
variationtranscription
readingtranscription
biologicalofficial
DESTinationDEST (destination)
MARRiageMAR (relationship)
UNICODEUnicode
## UNICODEUTF-16
characterscode units
sent the datacreated the file
8-bit ASCII(contradiction in terms)
ASCII (USA Version)ASCII
record structuresrecords
(wide) characterscode units
Official versus Biological
The text of the specification no longer assumes that recorded relationship are biological.
Relationships recorded on the basis of official paper documentation are official, and should not be
assumed to be biological.
Family versus Family Group
The text is no longer written as iffamilyandfamily groupare the same concept. A so-called
family groupisone couple and their children. A single family often involves more than one such
group.
## Better Record Names
TheFAMrecord is no longer referred to as the“family record”, but more accurately as the
“family group record”. Similarly, theMARRrecord, which is not only used to record marriages,
but for recording every relationship type between two people, is no longer referred to as the
marriage record, but as the relationship record.
## Appendix A Definitions
Significantly improved Appendix A definitions; many definitions are more objective, clearer and
more accurate now.
## 9

## Significant Simplification
One file per GEDCOM File
Multi-volume GEDCOM files (defined in GEDCOM 5.5.1 chapter 2) are no longer legal; a
GEDCOM file must be just one file now. The multi-volume feature was obsolete before it was
introduced, and remains largely unsupported. With GEDCOM 5.5.5 it is one file per GEDCOM
file.
One GEDCOM Version per File
The GEDCOM 5.5.1 specification contains the demand to support a particular GEDCOM 5.5
record, while that record is not legal GEDCOM 5.5.1. The GEDCOM 5.5.1
<<MULTIMEDIA_LINK>> definition demands that applications support the GEDCOM 5.5
<<MULTIMEDIA_LINK>> record as well, because“some applications”use GEDCOM 5.5.1,
yet the GEDCOM 5.5 <<MULTIMEDIA_LINK>> record.
GEDCOM does not demand anything like that. On contrary, GEDCOM 5.5.5 does not allow it; a
GEDCOM form cannot make such a demand. From GEDCOM 5.5.5 onwards, it is one
GEDCOM version per file; a GEDCOM 5.5.5 file must contain GEDCOM 5.5.5 records. A
GEDCOM 5.5.5 reader must not tolerate anything that's only legal in another GEDCOM version.
One line terminator per GEDCOM file
The GEDCOM 5.5.5 definition of the line terminator makes is clear that the line terminator that
ends each GEDCOM line must be the same for all GEDCOM lines in a GEDCOM file.
One Encoding per GEDCOM File
GEDCOM 5.4, 5.5 and 5.5.1 contains anANSEL demand; the encoding of the GEDCOM header
must use ANSEL, regardless of the encoding that header specifies for the (rest of) the GEDCOM
file GEDCOM 5.5.5 demands that the encoding specified in the GEDCOM header be used for the
entire file, including the header itself.
One Character Set for GEDCOM
GEDCOM 5.5.5 no longer allows ASCII or ANSEL. GEDCOM 5.5.5 is Unicode-only.
One Way of Doing Things
Where GEDCOM 5.5.1 still offers two ways of doing things, GEDCOM 5.5.5 offers one way.
These changes have been a long time coming; GEDCOM 5.5.5 is only finishing transitions that
FamilySearch started in GEDCOM 5.4 and 5.5 (1995CE). Developers and users have had more
than a quarter century to adopt the changes made by FamilySearch.
FamilySearch added structured addresses and deprecated unstructured addresses in GEDCOM
5.5. GEDCOM 5.5.5 demands structured addresses only.
Similarly, FamilySearch introduced the citation-source-repository model in GEDCOM 5.4, and
deprecated the unstructured free-text citations. FamilySearch even gave instructions for providing
structure in the previously free-form text field. GEDCOM 5.5.5 demands the use of source and
repository records.
GEDCOM Grammar
There are clarifications, corrections, improvements, simplifications and more.
## 10

One file per GEDCOM file
The multi-volume support still demanded by GEDCOM 5.5.1 is a significant burden on
GEDCOM readers; GEDCOM 5.5.1 readers must contain file handling logic to find and load
multiple volumes from removable media, and prompt the user for a media change when a volume
is missing. Its removal is a significant simplification of GEDCOM.
## Text Files
The specification now explicitly states that GEDCOM files are text files, and that while
GEDCOM allows multiple line terminators, each GEDCOM file must use a single line terminator
choice throughout the file.
## CR, LF & CR/LF
GEDCOM 5.5.5 continues to allow CR, LF & CR/LF as line terminators, but no longer allows
LF/CR as a line terminator. This is a correction of a mistake; no platform uses LF/CR, and its
inclusion creates problems for GEDCOM readers.
This correction is a real change to the GEDCOM grammar, yet does not affect any users; the LF/
CR terminator only occurs in GEDCOM 5.5 and 5.5.1 test files specifically created to test support
for it...
Tags Case-Sensitive
This version of the specification clearly states that GEDCOM tags are case-sensitive.
## Legal Characters
The GEDCOM grammar has been edited to clearly separate which characters are legal in tags,
identifiers and escapes sequences, and which characters are legal as line values.
## Tags Underscore
Tags remain restricted to alphanumerical characters and the underscore. The tag definition has
been tightened; the underscore may only occur as the first character now, and may no longer be
the only character.
Incidentally, it was and remains legal for a tag to start with a digit.
Identifiers must be Alphanumerical
The GEDCOM 5.5.1pointerdefinition allowed many characters inside cross-reference
identifiers, even spaces, something that is almost sure to trip up a parser. It even allowed the bulk
of all Unicode characters, thus creating more issues for a GEDCOM parser to deal with. In the
real world, the flexibility provided by this definition was only used in GEDCOM files specifically
created to test the ability of GEDCOM readers to handle this flexibility.
The GEDCOM 5.5.5 specification restricts the cross-reference identifier definition to
alphanumerical characters, to allow straightforward parsing.
This allows GEDCOM 5.5.5 readers to be significantly simpler than GEDCOM 5.5.1 readers.
## Escape Sequences
The updated GEDCOM grammar no longer allows almost any character in escape sequences.
Escape sequences are restricted to alphanumerical characters, now except that spaces are still
allowed. Spaces are allowed but deprecated because the Lineage-Linked Grammar defines one
escape sequence with a space in it.
## 11

Tab is Legal
Use of Horizontal Tab in user text is legal now. Most genealogy applications already allowed the
use of tabs in text, despite the GEDCOM 5.5.1 specifications disallowing it. GEDCOM 5.5.5
makes the existing practice legal.
## Significant Tag Length
The GEDCOM grammar allows tags to be 31 code units long. The GEDCOM 5.5.1 specification
adds that the first 15 of those 31 must be unique. What this really means is that while tags may be
longer, their so-calledsignificant lengthis only 15 code units. The practical consequence is that a
GEDCOM reader may ignore everything beyond the 15th code unit, and that may result in two
different identifiers being interpreted as being the same one.
This rule has never been off much practical consequence as all the standard GEDCOM tags as
well as those of the Lineage-Linked Form are considerably shorter. Thus, this rule only affect
GEDCOM extensions.
Nevertheless, GEDCOM 5.5.5 ends the complexity created by the limited significant length rule:
the entire tag is significant now.
## Maximum Record Size
The GEDCOM grammar in GEDCOM 5.5.1 limits the size of top-level records; they should fit in
a memory buffer of less than 32K. That restriction made sense in the 1980s, it is obsolete now.
The GEDCOM grammar in the GEDCOM 5.5.5 specification no longer limits the size of top-
level GEDCOM records.
Some records within the Lineage-Linked Form, which did not have an explicit maximum length
before, have had their maximum length set at 32.765 code units.
line_item Fixed
The FamilySearch GEDCOM 5.5.1 specification defined line_item like this:
## [any_char|escape|line_item+any_char|line_item+escape]
According to that recursive definition:
▪line_itemmay consist of nothing but a single escape sequence.
▪line_itemmay consist of a some text followed by an escape sequence.
▪line_itemmay consist of a some text followed by multiple escape sequence.
▪line_itemmay consist of a some text both preceded and followed by an escape sequence.
▪line_itemmay consist of nothing but multiple escape sequences.
Most of that is not as intended. Most of these possibilities are wrong.
The GEDCOM 5.5.5line_itemdefinition explicitly restrictsline_itemto just three different
formats:
▪just text
▪just one escape sequence
▪just one escape sequence followed by text
pointer is an xref_ID
GEDCOM 5.5.1 definesxref_IDas apointer. That's the wrong way round. GEDCOM 5.5.5
defines apointeras anxref_ID. As part of this change,pointer_stringhas been renamed
identifier_string.
## 12

## White Space Rules
The newWhite Spacesectionadds white space rules:
▪GEDCOM linesmust notnot end with superfluous trailing white space.
▪GEDCOM linesmaycontain significant trailing white space.
▪A GEDCOM readermustimport every line value as-is,must notnot strip trailing white
space.
▪A GEDCOM readermustimport every line value as-is,must notnot strip leading white
space.
New CONC & CONT Rule, Clarification and Guideline
▪Rule: TheCONC&CONTrecordsmust notbe used with records defined in the GEDCOM
grammar. They may only be used with records defined in a GEDCOM form.
▪Clarification: It is illegal to haveCONCorCONTrecords subordinate toCONCor CONT
records.
▪Guideline: GEDCOM writersshould notuseCONCrecords for line values with a maximum
length of 248 code unit or less.
Simple CONC & CONT Processing Rules
The new section onCONC&CONTends withCONC&CONTprocessing rules for GEDCOM
writers & readers to ensure correct transfer of white space. Those rules are the simplest yet,
literallyrequiring no effortfrom GEDCOM readers at all; a GEDCOM reader must import all
linesas-is.
## Character Sets & Encodings
## Unicode
Unicode replaces ANSEL astheGEDCOM character set. GEDCOM 5.5.5 does no longer allow
ASCII or ANSEL. GEDCOM 5.5.5 demands Unicode. The recommended encoding is UTF-8+
for Western applications, UTF-16 for Eastern applications. Applications, when asked to create a
GEDCOM file, need not offer users a choice between these two.
Import of either encoding should never be an issue. Applicationsmustbe able to import both
UTF-8 and UTF-16 GEDCOM 5.5.5 files.
Adding UTF-16 GEDCOM import to a Unicode application that already support UTF-8
GEDCOM import is fairly easy to do, as the application is using UTF-16 internally. The import
only needs to pay attention to the normal form, and the application can rely on operating system
routines for that.
## Unicode Applications Only
GEDCOM 5.5.5 is for Unicode applications. Legacy applications that are still code page-based
must notuse GEDCOM 5.5.5, but must continue to use GEDCOM 5.5.1. Code page applications
can and should follow all the rules, recommendations and best practices provided theGEDCOM
## 5.5.1 Annotated Edition.
## Byte Order Mark Mandatory
Unicode demands Byte Order Mark on UTF-16 files, allows them on UTF-8 files. GEDCOM
5.5.5 keeps it simple: use of a Byte Order Mark (BOM) on UTF-8 GEDCOM files is mandatory
for all GEDCOM 5.5.5 files, both UTF-8 and UTF-16 GEDCOM files. This simplifies GEDCOM
detection considerably. Systems reading GEDCOM 5.5.5 files know the character set and
encoding used in the header as soon as they've processed the Byte Order Mark (BOM),before
## 13

they start reading the header.
## Unicode Code Point Notation
The specification now uses Unicode point notation to indicate specific characters; e.g. U+0020 is
the Unicode code point for the Space character.
## ANSEL
Starting with GEDCOM 5.5.5, the ASCII and ANSEL character sets are illegal. It is illegal to use
ANSEL in GEDCOM 5.5.5, so a system need not support ANSEL at all to be fully GEDCOM
5.5.5-compliant. Systems should support ANSEL for import of ANSEL-encoded GEDCOM 5.5.1
and earlier files.
Consolidated ANSEL Table
A single consolidated ANSEL table solves the problem of different“ANSEL”tables in different
GEDCOM versions. This single consolidated table can and should be use for all older GEDCOM
versions; that's why it's there.
## Strict Conformance
GEDCOM 5.5.5 does not tolerate the use of illegal characters sets or encodings.
▪GEDCOM 5.5.5 writersmust notuse anything but the legal encodings.
▪GEDCOM 5.5.5 readersmust notaccept anything but the legal encodings.
▪GEDCOM 5.5.5 readersmustreject all illegal encodings.
GEDCOM Language
Basic GEDCOM Language
The GEDCOM 5.5.1Chapter 1 Data Representation Grammardefines just two records types:
CONC&CONT. TheHEAD&TRLRrecord are not even mentioned.
The chapter has been extensively rewritten and extended to define the Basic GEDCOM
Language, including theHEAD&TRLRrecords.
Multiple GEDCOM Forms Problem
The GEDCOM 5.5.1 specification allows multiple GEDCOM forms, yet it doesn't...
GEDCOM 5.5.1 Chapter 2 defines the Lineage-Linked Form, and that includes the definition of
the GEDCOM header, which specifies the GEDCOM form being used. Specifying a GEDCOM
form within the Lineage-Linked GEDCOM header does not make sense, as that entire GEDCOM
header is part of the Lineage-Linked Form.
TheHEAD.GEDC.FORMline value supposedly specifies the GEDCOM form, butLINEAGE-
LINKEDis the only legal value, and that suggests that theHEAD.GEDC.FORMrecord is
superfluous and redundant.
Basic GEDCOM Language Solution
The GEDCOM 5.5.5 specification distinguishes between the Basic GEDCOM Language and the
Lineage-Lineage Link Form. The record that specifies the GEDCOM form is no longer part of a
specific GEDCOM form, but part of the Basic GEDCOM Language.
GEDCOM 5.5.5 defines a Basic GEDCOM Language first, and only then defines the Lineage-
Linked Form. The Basic GEDCOM language defines the GEDCOM header and trailer record in
addition to theCONC&CONTrecords. TheHEAD.GEDC.FORMis part of the Basic
## 14

GEDCOM Language now, and really specifies which GEDCOM form is being used.
GEDCOM Header Split
The old GEDCOM header has been split into a basic GEDCOM and an extension. The Basic
GEDCOM header is defined by the Basic GEDCOM Language, the extension is defined by the
Lineage-Linked Form.
## Trailer Record
In GEDCOM 5.5.1, theTRLRrecord signifies the end of the GEDCOM file.
However, in GEDCOM 5.4, theTRLRrecord may be followed by embedded multi-media
objects, with the real end of the GEDCOM file marked by an theENDrecord.
GEDCOM 5.5 still supports embedded multimedia records, but they appear before theTRLR
record, just like all other records.
By making the header and trailer records part of the Basic GEDCOM language, and demanding
that all GEDCOM form records occur in between, the GEDCOM 5.5.5 specification ensures that
the trailer record is truly the trailer record.
## CONC & CONT
CONC & CONT Section
TheGEDCOM 5.5.1 Annotated Editioncollected information and instructions aboutCONC&
CONTtogether in a large annotation. The GEDCOM 5.5.5 specification provides a newCONC &
CONTsection as part of Chapter 1.
CONC & CONT Restriction
The GEDCOM specification allowsCONC&CONTanywhere they are needed. GEDCOM 5.5.5
introduces a restriction, that should have been part of GEDCOM from the beginning, to keep
parsing GEDCOM files simple;CONC&CONTmust not be used with basic GEDCOM records,
only with records defined by a GEDCOM form.
It is illegal to useCONCorCONTwithin the Basic GEDCOM header. It is legal, but strongly
discommended, to useCONCorCONTwithin a form-specific header extension. It is important
to keep the GEDCOM header simple. The GEDCOM header is not only examined by GEDCOM
readers, but also by general utilities that report file types.
New CONC Guideline
GEDCOM 5.5.5 introduces a new guideline forCONCusage; GEDCOM writers should not use
CONCfor line values with a maximum length of 248 code units or less.
A GEDCOM reader must not complain about unnecessary use ofCONCrecords as long as
they're valid, but a GEDCOM validator should give a warning.
Simple CONC & CONT Rules
Historically,CONC&CONThandling has been problematic. TheGEDCOM 5.5.1 Annotated
Editionprovided simple guidelines for getting it right.
The GEDCOM 5.5.5 specification provides a new section about white space, and then provides
the simplest rules possible:
▪A GEDCOM writer must not write superfluous white space, may only write significant white
space.
▪A GEDCOM reader must treat all white space as significant; it may never trim leading or
## 15

trailing white space from lines values.
Those two simple rules ensure correct transfer of long text files, even for pathological cases such
as long stretches of white space.
GEDCOM Header
Simplified GEDCOM Detection
All GEDCOM 5.5.5 files are Unicode files, and all GEDCOM 5.5.5 files, both UTF-8 and
UTF-16 files, start with a Byte Order Mark (BOM). The mandatory Byte Order Mark simplifies
GEDCOM detection and header interpretation. Systems reading GEDCOM 5.5.5 files know the
character set and encoding used in the header as soon as they've processed the Byte Order Mark
(BOM), that isbeforethey start reading the header.
## Strict Conformance
GEDCOM 5.5.5 demands a correct GEDCOM header. A GEDCOM 5.5.5 readermust notprocess
an ostensible GEDCOM file if the header is invalid.
GEDCOM Header Split
The GEDCOM header defined in GEDCOM 5.5.1 contains both general subrecords as well as
subrecords specific to Lineage-Linked Form. To continue to accommodate both categories in
GEDCOM 5.5.5 with just one GEDCOM header, the GEDCOM header has been split into a
Basic GEDCOM header and a Lineage-Linked Form extension.
The Basic GEDCOM Language defines the Basic GEDCOM header and allows GEDCOM forms
to extend it with form-specific records. The Lineage-Linked Form extends the GEDCOM header
with Lineage-Linked specific subrecords.
GEDCOM Recognition
The definition of a Basic GEDCOM header moves all the essential header subrecords to the very
front of the GEDCOM file. This aids recognition of GEDCOM files.
## HEAD.GEDC.FORM.VERS
Historically, there is just one version number for both the Basic GEDCOM language and the
Lineage-Linked Form.
GEDCOM 5.5.5 addsHEAD.GEDC.FORM.VERS; a version number for the GEDCOM form
used, distinct from the GEDCOM version number.
## CONC & CONT
ThatCONC&CONTmust not be used with basic GEDCOM records, only with record defined
by a GEDCOM form, specifically means thatCONC&CONTmust not be used in the
## <<GEDCOM_HEADER>>.
Use ofCONC&CONTis allowed but strongly deprecated for header subrecords defined by a
GEDCOM form.
HEAD.DATE.COPR and HEAD.NOTE
To avoid needingCONC&CONTwith header subrecords of the Lineage-Linked Form, the
maximum length of theHEAD.DATE.COPRandHEAD.NOTElines values have both been set at
248 code units.
The 248 code units allowed for <COPYRIGHT_GEDCOM_FILE> is significantly more than the
## 16

maximum of 90 code units allowed by GEDCOM 5.4 and 5.5. The 248 code units allowed for
<GEDCOM_CONTENT_DESCRIPTION> is more than the maximum 213 code units allowed
by GEDCOM 5.4, and identical to the maximum of 248 code units allowed by GEDCOM 5.5.
GEDCOM Dialect
GEDCOM 5.5.5 clearly states that it is theHEAD.DESTline value (nottheHEAD.SOURline
value) that specifies the GEDCOM dialect used, i.e. the interpretation of GEDCOM extensions.
HEAD.DEST Value Rules
▪GEDCOM 5.5.5 clearly states that theHEAD.DESTline value should default to being equal
to theHEAD.SOURline value.
▪GEDCOM 5.5.5 adds that it is illegal for theHEAD.DESTto be a nonsense value.
## HEAD.SUBM
GEDCOM 5.5.5 allows just oneSUBMrecord for the entire file, and it must come directly after
the GEDCOM header. That makes theHEAD.SUBMpointer superfluous. TheHEAD.SUBM
record is no longer mandatory, and has been deprecated.
## XREF.SUBM
Obviously, theXREF:SUBMpointer has been deprecated too.
Lineage-Linked Form
removal of at-signs
The many at-signs (@), which used to be so characteristic of Lineage-Linked Form definitions,
are gone from those definitions. Lineage-linked form definitions used fragments such as
@<XREF:INDI>@, always surrounding a cross-reference with the at-signs that start and end a
cross-reference. The problem with that is not only that it is odd for the record using a cross-
reference to demand at-signs around a cross-reference, but that the GEDCOM grammar makes it
clear thatthe at-signs are already part of the cross-reference. Thus, those definitions were
actually demanding double at-signs.
## Renamed
Some parts of the Lineage-Linked Form have been renamed to ease understanding, avoid
confusion and enhance readability:
▪<<RECORD>> to <<LINEAGE_LINKED_RECORD>>
▪<<FAM_RECORD>> to <<FAM_GROUP_RECORD>>
▪<APPROVED_SYSTEM_IDENTIFIER> to <SYSTEM_IDENTIFIER>
▪<CHARACTER_SET> to <CHARACTER_ENCODING>
▪<FILE_NAME> to <GEDCOM_FILE_NAME>
▪<TRANSMISSION_DATE> to <FILE_CREATION_DATE>
▪<NAME_PHONETIC_VARIATION> to <NAME_PHONETIC>
▪<PLACE_PHONETIC_VARIATION> to <PLACE_PHONETIC>
▪<PHONETIC_TYPE> to <PHONETISATION_METHOD>
▪<NAME_ROMANIZED_VARIATION> to <NAME_ROMANISED>
▪<PLACE_ROMANIZED_VARIATION> to <PLACE_ROMANISED>
▪<ROMANIZED_TYPE> to <ROMANISATION_METHOD>
▪<NATIONAL_ID_NUMBER> to <ID_NUMBER>
## 17

▪<SUBMITTER_TEXT> to <USER_TEXT>
▪<COUNT_OF_MARRIAGES> to <NUMBER_OF_RELATIONSHIPS>
Maximum GEDCOM File Length
The maximum length of <GEDCOM_FILE_NAME.SUBM> has been increased from an
arbitrary 90 to 248 code units - the maximum length a single GEDCOM line will allow.
## NEW_TAG
There is no tag called NEW_TAG and instructions concerning user-defined record should not be
hidden among the definition of GEDCOM form records. There is a smallUser-Defined Records
section now.
## Duplicate Records
The GEDCOM 5.5.1 Lineage-Linked From defines several records duplicate functionality of
other already existing records. The GEDCOM 5.5.1 Annotated Edition (2018CE) marked these
records as deprecate. GEDCOM 5.5.5 simplifies GEDCOM by removing the duplicate records.
The following table summarises which records were still legal in GEDCOM 5.5.1, and what
should be used in GEDCOM 5.5.5 instead:
allowed in GEDCOM 5.5.1GEDCOM 5.5.5
## INDI.BAPLINDI.BAPM
## INDI.BLESINDI.EVENT
## INDI.CONLINDI.CONF
## INDI.ENDLINDI.EVENT
## INDI.ORDNINDI.EVENT
## INDI.SLGCINDI.EVENT
## INDI.SSNINDI.IDNO
## FAM.SLGSFAM.EVENT
LDS Events
The above table contains LDS-specific records. Removal of the LDS-specific records improves
support for these LDS events.
Few genealogy applications support the LDS-specific records. On GEDCOM export from those
applications and subsequent import into another application, the data recorded in these events are
lost. By requiring the use of the universally supported regular baptism record instead of a poorly
supported LDS-specific baptism record, GEDCOM 5.5.5 ensures that the recorded information is
no longer lost in transfer.
## Obsolete Records
The following obsolete and superfluous GEDCOM 5.5.1 records have been retired, and do not
have GEDCOM 5.5.5 alternatives.
## 18

allowed in GEDCOM 5.5.1brief comment
HEAD.CHAR.VERSShould never have been included. Never used, only abused.
## HEAD.PLAC
## HEAD.PLAC.FORM
Unnecessary complexity. Widely unsupported.
HEAD.SUBNSpecific to Ancestral File; obsolete.
EVEN.RESNSpecific to Ancestral File; obsolete.
FAM.RESNSpecific to Ancestral File; obsolete.
FAMC.STATNever used, unsupported not needed.
FAM.SUBMGEDCOM 5.5.5 has one submitter per GEDCOM file.
INDI.RESNSpecific to Ancestral File; obsolete.
INDI.SUBMGEDCOM 5.5.5 has one submitter per GEDCOM file.
## INDI.AFN
Specific to Ancestral File; obsolete
can useIDNOto maintain but should not.
## INDI.ALIA
Never used in practice.
ASSOremains supported.
INDI.ANCINever used, not needed.
INDI.DESINever used, not needed.
## INDI.RFN
Specific to Ancestral File; obsolete
can useIDNOto maintain but should not.
SUBM.LANGServes no purpose. Already have HEAD.LANG.
SUBM.RFNSpecific to Ancestral File; obsolete.
SUBNSpecific to Ancestral File; obsolete.
## <CHILD_LINKAGE_STATUS>
The <CHILD_LINKAGE_STATUS> is not supported by any major applications, and quite
possibly by no application at all. It has been marked obsolete in theGEDCOM 5.5.1 Annotated
Edition, and removed from GEDCOM 5.5.5.
As a result, theSTATtag is obsolete too, no longer used and has been removed from Appendix A.
Tags obsoleted in GEDCOM 5.5.5
The following tags, legal in GEDCOM 5.5.1, do not occur in GEDCOM 5.5.5 files:AFN,ALIA,
ANCI,BAPL,CONL,DESI,ENDL,ORDN,SLGC,RESN,SSN,SLGS,SUBN, andSTAT.
## Maximum Identifier Length
Contradiction between the GEDCOM grammar and the Lineage-Linked Form concerning the
maximum length of cross-reference identifiers has been resolved. The maximum length is as
specified by the GEDCOM grammar.
## C-style Comments
C-style comments in definitions and GEDCOM examples were not universally understood as
comments. When they were recognised as comments, they created the mistaken impression that
GEDCOM files may contain comments.
GEDCOM does not support comments. Removed all C-style comments from definitions.
Confusing CONC & CONT
The GEDCOM grammar makes it clear thatCONC&CONTare allowed anywhere they are
needed. The explicit inclusion ofCONC&CONTin the Lineage-Linked Form is an unnecessary
complication of the syntax, that encouraged misinterpretation, as explicit inclusion at a few select
points in the syntax strongly suggests is not allowed elsewhere...
GEDCOM 5.5.5 respects that this is implicit in any GEDCOM from, and no longer confuses by
including CONC or CONT explicitly. All explicitCONC&CONTreferences have been removed
## 19

from the Lineage-Linked Form definition. The definitions in the Lineage-Linked Form are all
about the Lineage-Linked Form now, as they should be.
The GEDCOM 5.5.1 specification did not set maximum length for the records concerned. The
GEDCOM 5.5.5 specification sets their maximum length at either 248, 4095 or 32.767 (2^15-1)
code units. This is in deference to the old (GEDCOM 5.5.1) rule that GEDCOM records should
fit into a memory of less than 32KB. A Unicode application using UTF-16 internally will need no
more than a 64 KB buffer to hold the largest legal values.
itemmaximum
## IND.DSCR<PHYSICAL_DESCRIPTION>4095
## SOUR.AUTH<SOURCE_ORIGINATOR>248
## SOUR.TITL<SOURCE_DESCRIPTIVE_TITLE>4095
## SOUR.PUBL<SOURCE_PUBLICATION_FACTS>4095
## SOUR.DATA.TEXT<TEXT_FROM_SOURCE>32.767
## SOUR.TEXT<TEXT_FROM_SOURCE>32.767
## NOTE<USER_TEXT>32.767
Same-Sex Marriage
GEDCOM 5.5.5 supports same-sex relationships. Technically, this is not a new feature, but
merely a clarification in support of already existing practice. As theAnnotated Editionalready
noted, the GEDCOM 5.5.1 specification doesnotreally exclude same-sex marriage, but actually
supports itas-is, i.e. without resorting to any GEDCOM extension. The Lineage-Linked Form
specification for recording relationships in the GEDCOM 5.5.5 specification has not changed
from GEDCOM 5.5.1. There's no change in syntax, only improved descriptions.
Sex specified by INDI.SEX
GEDCOM 5.5.5 clearly states the following two rules, already present in the Annotated Edition:
▪No assumption about gender should be made based on the usage of theFAM.HUSBor
FAM.WIFErecords.
▪An individual's sex is specified byINDI.SEX, and byINDI.SEXonly.
relationships
TheFAM.MARRrecord documents the relationship betweenFAM.HUSBorFAM.WIFE. The
nature of the relationship is documented by the optionalMARR.TYPEsubrecord, and GEDCOM
5.5.5 provides a list of the commonMARR.TYPEvalues and their meaning in the definition of
the <<FAM_GROUP_RECORD>>.
valuedescription
unknownrelationship (type unknown)
marriagemarriage
not marriednot married
civilcivil marriage
religiousreligious marriage
common lawcommon law marriage
partnershippartnership
registered partnershipregistered partnership
living togetherliving together
living apart togetherliving apart together
## 20

GEDCOM Examples
Leading White Space in Examples
GEDCOM does not allow GEDCOM lines to have any leading white space. The GEDCOM
specification should lead by example; all examples within the specification should be valid
examples. No more“do as we say, not as we do”. All leading white has been removed from the
examples.
## Best Practices
Some GEDCOM examples contained bad practice such as incomplete or abbreviated place
names. The GEDCOM specification should promote best practices. The examples have been
improved to use complete, unabbreviated place names.
Obsolete and Superfluous Records
## Ancestral File
Ancestral File is a long retired system. All records in support of Ancestral File are obsolete, and
have been removed. This includes the <SUBMISSION_RECORD> and theSUBM.RFNrecord.
## SUBM.LANG
TheSUBM.LANGrecord, which allowed specifying a language preferred by the submitter, does
not serve a clear purpose. The GEDCOM header already provides HEAD.LANG to specify the
language used in the GEDCOM file, and specifying a preferred language only makes sense if you
expect a response. The SUBM.LANG field is superfluous at best, and not used in practice. The
GEDCOM 5.5.1 Annotated Editionmarks it as deprecated, GEDCOM 5.5.5 removes its.
## <PLACE_HIERARCHY>
The intended complexity of the <PLACE_HIERARCHY> feature was insufficiently defined and
remained widely unsupported. The <PLACE_HIERARCHY> feature has been removed. All
place names must be specified as comma-and-space separated place parts, listed from smallest to
largest jurisdiction.
## <SOURCE_CITATION>
GEDCOM 5.5.1 already deprecated, but still allowed the old <SOURCE_CITATION> format in
addition to the new one introduced in GEDCOM 5.4 (1995CE). GEDCOM 5.5.5 simplifies
source citations by allowing just the“new”source citation format, which includes a reference to a
SOURrecord.
## <SOURCE_REPOSITORY_CITATION>
The GEDCOM 5.5.1 <SOURCE_REPOSITORY_CITATION> structure definition is really two
alternate structure definitions that are presented as one. An odd side-effect of this confusing
presentation is that, upon first reading, the <SOURCE_REPOSITORY_CITATION> structure
definition seems to be the only record in the GEDCOM 5.5.1 specification that expect a pointer
value, yet allows it to be absent (<NULL>). That is not the case. What is really going is that
GEDCOM 5.5.1 supports source citations that do reference repositories and source citations that
do not. TheGEDCOM 5.5.1 Annotated Editionshows the split into the two different definitions.
GEDCOM 5.5.5 simplifies <SOURCE_REPOSITORY_CITATION> (which is anoptional
subrecord of <<SOURCE_RECORD>>) by demanding that, if present, it references a repository,
as its name suggest.
## 21

One Submitter per File
GEDCOM no longer allows individual records to labelled with submitters. This feature was not
used in practice, because it has no practical usage, not even for shared trees. GEDCOM 5.5.5
keeps it simple by allowing only one submitter, and therefore only one
<SUBMITTER_RECORD>, for the entire file.
This makes theHEAD.SUBMreference to that single submitter record superfluous, but it is kept
for compatibility's sake.
One Multimedia Record per File, one File per Multimedia Record
GEDCOM 5.5.1 allows multiple media files per multimedia record. This is unnecessary, and
remains poorly supported, so export to GEDCOM import into another system is likely to result in
data loss.
GEDCOM 5.5.5 solves that data loss issue by simplifying multimedia support. GEDCOM 5.5.5
demands one multimedia record per file, one file per multimedia record.
## SSN
GEDCOM version 5.3 through 5.5.1 define aSSNrecord for the U.S. Social Security Number,
duplicating the already existingIDNOrecord functionality.
GEDCOM 5.5.5 uses theIDNOfor all third-party numbers. Application can identify Social
Security numbers with theIDNO.TYPEvalue“SSN”.
It is best practice for GEDCOM writers using GEDCOM 5.5.1 or earlier to ignore theSSN
record, and always use theIDNOrecord, just like a GEDCOM 5.5.5 writer does.
## Fixes
EMAIL not EMAI
TheEMAILrecord always uses anEMAILtag. The confusing EMAI (no L) definition in
Appendix A has been replaced with anEMAILdefinition.
single <CHANGE_DATE>
Replaced two different <CHANGE_DATE> definitions (GEDCOM 5.5.1 page 31 and 44) with a
single <CHANGE_DATE> definition
ASSO Definition in ASSO Definition
MovedASSOdefinition and example from <INDIVIDUAL_RECORD> definition to
<ASSO_RECORD> definition.
## Maximum Length Multimedia Files Names
Fixed the maximum length of multimedia files names, from 30 to 259 code units.
DATE Spaces
Dates contain spaces. Fixed all the date definitions to include spaces in the syntax.
Hebrew B.C.
Removed the erroneous“B.C.”from the Hebrew date syntax.
## 22

Dual-Style Dates: Julian Calendar
England and its colonies used dual-style dates with the Julian Calendar. However, FamilySearch
GEDCOM 5.4 through GEDCOM 5.5.1 restricts dual-style dates to the Gregorian Calendar...
GEDCOM 5.5.5 allows dual-style Julian Calendar dates.
## @#DROMAN@
The escape sequence@#DROMAN@has been removed from <DATE_CALENDAR_ESCAPE>
because there is no associated calendar.
<PERSONAL_NAME_PIECES> Mandatory
To prevent unnecessary loss of information on export & import, theNPFX,GIVN,NICK,SPFX,
SURN, andNSFXsubrecords that identify name parts of the
<PERSONAL_NAME_STRUCTURE> are no longer optional. Each of the subrecords remains
optional, because no name parts occurs in every recorded name, but all name parts must be
clearly identified.
<MULTIMEDIA_FORMAT> Fixes
RemovedOLEfrom the list of multimedia formats: OLE is not a multimedia format at all, it is a
technology. GEDCOM 5.5 uses the valuesJPEGandTIFF, GEDCOM 5.5.1 usesJPGandTIF
instead.
GEDCOM 5.5.5 uses the valuesJPEGandTIFF, notJPGandTIF. TheJPGandTIFvalues
are supported, but deprecated.
The list of allowed multimedia formats has been expanded, but the fact that the enumeration of
allowed formats is supposed to be exhaustive remains a fundamental issue.
<AGE_AT_EVENT> Centenarian Support
The <AGE_AT_EVENT> definition allowed only 2 digits for the year. <AGE_AT_EVENT>
allows three digits for the year now.
TYPE subrecords in <<INDIVIDUAL_ATTRIBUTE_STRUCTURE>>
The GEDCOM 5.5.1 <<INDIVIDUAL_ATTRIBUTE_STRUCTURE>> description states that
theFACTandIDNOrecordsrequireaTYPEsubrecords, while itmaybe used with all the other
record types, while there is noTYPErecord is not in the syntax! GEDCOM 5.5.5 adds theTYPE
subrecords to the syntax.
## <INDIVIDUAL_EVENT_STRUCTURE>
The updated <INDIVIDUAL_EVENT_STRUCTURE> syntax no longer allows1 BIRT Y; we
already know that individuals were born; the only thing that record offers is a chance for a
GEDCOM reader to get confused by it. TheBIRTrecord should only be used to provide real
information.
## Clarifications
GEDCOM Form is Case-Sensitive
Within GEDCOM, so-called controlled line values (exhaustive enumerations) are case-
insensitive, but the GEDCOM formis nota controlled line value, quite the opposite. The
GEDCOM form value is case-sensitive. The line value used for the Lineage-Linked form,
LINEAGE-LINKED, must be written all-uppercase.
## 23

Submitter after Header
The syntax of Lineage-Linked Form has been clarified to explicitly demand that the one
mandatory <SUBMITTER_RECORD> directly follow the <HEADER_RECORD>.
Leading Zeroes on Day
Resolved open issue: <DAY>, the day of the month within a date, maynotstart with leading
zeroes.
## Proper Version Numbers
GEDCOM versions up through GEDCOM 5.5.1 (and the GEDCOM 5.6 draft) defined
<VERSION_NUMBER> as an arbitrary string. GEDCOM 5.5.5 demands that the
HEAD.SOUR.VERSandHEAD.GEDC.VERSline values be version numbers, and nothing else.
The version number records can no longer be abused to contain the product name, system id,
release status or platform. GEDCOM 5.5.5 readers will encounter nothing but a version number.
## Two Version Number Formats
GEDCOM 5.5.1 replaces the single <VERSION_NUMBER> definition with two separate
definitions; <GEDCOM_VERSION_NUMBER> and <PRODUCT_VERSION_NUMBER>.
<GEDCOM_VERSION_NUMBER> demands a version number in the
major.minor.revisionformat. <PRODUCT_VERSION_NUMBER> demands a version number in
themajor.minor.revision.buildformat.
Default <SEX_VALUE>
The default <SEX_VALUE> isUforUnknown.
## <PEDIGREE_LINKAGE_TYPE>
Kept theGEDCOM 5.5.1 Annotated Editionremark that GEDCOM does not support DNA or
biological relationships.
Added statement that, in absence of <PEDIGREE_LINKAGE_TYPE>, the valuebirthfor
official parents is assumed.
## New Features
## HEAD.GEDC.FORM.VERS
The version number for the GEDCOM form, separate from the GEDCOM version number.
New SEX Values
▪AddedX, meaningIntersexas a possible <SEX_VALUE>
▪AddedN, meaningNot recordedas a possible <SEX_VALUE>
Birthdays: Dates without Years
The <DATE_GREG> definition has been expanded to include exact dates without a year; this
acknowledges that we often know a birthday while being unsure of the birthyear.
## 24

## BCE
TheGEDCOM 5.5.1 Annotated Editionalready recommended that GEDCOM readers accept
bothBCandBCEin addition toB.C. GEDCOM 5.5.5 makes theBCEandBCvalues official.
All three values mean the same thing. The religiously neutralBCEis preferred, the other two
values are deprecated. However, it is recommended that developers who want to maximise
compatibility of their GEDCOM 5.5.1 and GEDCOM 5.5.5 output, useB.C.for now.
## 25

GEDCOM Writer & Reader Checklists
GEDCOM 5.5.5 enables simple, straightforward and much faster GEDCOM readers by
demanding strict compliance from GEDCOM writers. GEDCOM 5.5.5 writersmustproduce
correct GEDCOM, so that developers need not spend time complicating their GEDCOM 5.5.5
readers with support for all kinds of third-party errors. In fact, to really ease the burden, a
GEDCOM 5.5.5 readermust notsupport erroneous import. This keeps GEDCOM 5.5.5 readers
simple, and forces all developers to produce quality GEDCOM files. Developers that want to
continue to produce invalid GEDCOM files, must keep using GEDCOM 5.5.1.
The following two checklists are offered as an aid to development.
GEDCOM 5.5.5 Writer
•mustuse the Unicode character set, using either the UTF-8 or UTF-16 encoding
•mustmake sure that it's UTF-8 output is really UTF-8, not CESU-8
•muststart each GEDCOM file with Byte Order Mark (BOM)
•mustuse a proper system identifier
•mustuse a proper version number for its system
•mustdefaultHEAD.DESTto the same system identifier asHEAD.SOUR
•mustspecify GEDCOM version 5.5.5
•need notcreate aHEAD.SUBMrecord, but if it does, the pointer must be valid
•shouldspecify GEDCOM formLINEAGE-LINKED, there is no other GEDCOM form
•does notoutput superfluous white space
•does not include either CR or LF inside line values, usesCONTrecords to
communicate a line feed
•respects the maximum line length of 255 code units, usesCONCrecord to support long
line values
•does notuseCONCorCONTrecords in the GEDCOM header
•never usesCONCrecords for line values with a maximum length of 248 or less
•writes the submitter record directly after the GEDCOM header
•uses legal GEDCOM 5.5.5 records exclusively
•does not create any empty lines or leading white space
•Makes sure that every line value is a valid string in the encoding used, by not merely
splitting lines between code units or code, but between characters
GEDCOM 5.5.5 Reader
•mustdemand that GEDCOM file starts with a Byte Order Mark (BOM),must rejectthe
file as not GEDCOM 5.5.5, with a message such as“ostensible GEDCOM 5.5.5 file
lacks Byte Order Mark”
•mustdemand a legal character encoding,must nottolerate illegal character sets or
encodings
•mustaccept UTF-8, butshoulddetect and reject CESU-8
•mustcheck that theHEAD.CHARvalue matches the encoding used, and abort with a
fatal error when it does not
•mustcheck that each line value is a valid string in the encoding use, andmustreject the
GEDCOM file if any string is invalid
•mustreject a GEDCOM header without a GEDCOM form
•mustcheck that theHEAD.SUBMpointer, if present, is valid
•must nottry to process an GEDCOM form it does not explicitly support, butmustabort
with an“unsupported GEDCOM form”message
•must notaccept lines longer than 255 code units,mustreject the file as invalid, with an
error message such as“Line is too long. This is not a GEDCOM 5.5.5 file.”.
•Accepts all line valuesas-is,does nottrim leading or trailing white space from any line
value
•processes CONC and CONT records correctly
•must nottolerateCONCorCONCrecords in the Basic GEDCOM header
•mustacceptCONCorCONCrecords in the GEDCOM form's header extension
•mustdemands that system identifiers are valid,must nottolerate known nonsense
## 26

values
•mustdemand legal records,must nottolerate illegal records
•mustespecially demand a valid GEDCOM header,must notaccept any error in the
header
•mustimport data as-is,must notmodify anything during import
•must nottolerate empty lines or leading white space, butmustreject such files as not
## GEDCOM.
## 27

Support for Earlier GEDCOM Versions
GEDCOM 5.5.5 succeeds GEDCOM 5.5.1 (1999CE). As the GEDCOM 5.5.1 specification has
been thede factostandard for two decades, there is no pressing need to support any older
GEDCOM versions, not even GEDCOM 5.5.
Applications should take care to recognise GEDCOM5.5.1 files with a truncated version number;
GEDCOM5.5.1 files that are incorrectly labelled as GEDCOM5.5 files.
Application that already support GEDCOM 5.5.1, should add support for GEDCOM 5.5.5, while
continuing to support GEDCOM 5.5.1. New applications should support GEDCOM 5.5.5 first,
and developers should only add GEDCOM 5.5.1 support if there is still significant demand for it.
GEDCOM export should default to the latest GEDCOM version.
Applications should maintain existing GEDCOM 5.5.1 export functionality. Applications should
not offer export to GEDCOM versions older than GEDCOM 5.5.1.
Applicationsmustdetect the GEDCOM version of GEDCOM files before trying to read them,
andmust nottry to read GEDCOM versions they do not support, butmusthonestly report
unsupported versions as unsupported.
Applications should read older GEDCOM versions for compatibility's sake. Every application
should be able to read the GEDCOM files it has written, including all GEDCOM files produced
by earlier versions of that application, just as it should be able to read old versions of its own file
format.
Developers who decide to drop import of GEDCOM versions before GEDCOM 5.5.1, should
provide an alternative means to get these imported, for example by providing a free download of
an older version that can import the older files, and then export to GEDCOM 5.5.1.
## 28

## Introduction
GEDCOM is an acronym forGEnealogicalDataCommunication.
That name is a misnomer. GEDCOM neither is nor contains a communication protocol.
GEDCOM is a data file format.
GEDCOM was created by FamilySearch, a subsidiary of theThe Church of Jesus Christ of
Latter-day Saints (LDS), that was originally known as theFamily History Department.
GEDCOM aims to provide a flexible, uniform format for exchanging computerised genealogical
data.
Its purpose is to foster the sharing of genealogical information and the development of a wide
range of interoperable software products to assist genealogists, historians, and other researchers.
Purpose and Content ofThe GEDCOM Standard
The GEDCOM Standardis a technical document written for computer programmers, system
developers, and technically sophisticated users. It covers the following topics:
!Basic GEDCOM Language (seeChapter 1, page 46)
!Lineage-Linked Form (seeChapter 2, page 53)
!Character Sets in GEDCOM (seeChapter 3, page 112)
!Lineage-Linked GEDCOM Tags (seeAppendix A, page 121andChapter 2, page 53)
!ANSEL Character Codes and ANSEL / Unicode conversion (seeAppendix B, page 130and
Appendix C, page 132)
## Two Levels
GEDCOM is a two-level specification. The base level, theGEDCOM data formatis not unlike
XML; it defines the basic format and syntax. The second level, aGEDCOM form, is not unlike an
XML Document Type Definition (DTD); it defines a particular schema on top of the basic rules.
Just like in XML, the base level is a bit more than just format and syntax, but also includes items
that must be present c.q. supported in every file; this is the Basic GEDCOM Language.
Chapter 1 describes the base level, theGEDCOM data format, both the basic syntax and the
Basic GEDCOM Language. This is a general-purpose data representation language for
representing any kind of structured information in a sequential medium. Chapter 1a discusses the
GEDCOM syntax and identification of structured information in general. It does not deal with the
semantic content of any particular kind of data.
Chapter 1b discusses the Basic GEDCOM Language, such as the mandatory header and trailer.
Chapter 2 describes the higher level by way of one particularGEDCOM form, known as the
Lineage-Linked Form. This is the GEDCOM use by genealogical software systems to exchange
data with each other.
The separation between the GEDCOM data format and GEDCOM forms is half-hearted.
The GEDCOM specification does not properly separate the GEDCOM data format and the
lineage-linked from another. The GEDCOM header (in which you specify the GEDCOM form) is
actually defined as part of the lineage-linked form instead of the GEDCOM data format, where it
logically belongs. There is also just one GEDCOM version number, while there really should be
two, one for the GEDCOM data format, and one for the lineage-linked form.
## 29

Chapter 1 Basic GEDCOM Language
## Introduction
This chapter describes the core GEDCOM data representation language.
The generic data representation language defined in this chapter may be used to represent any
form of structured information, not just genealogical data, using a sequential stream of characters.
## Concepts
A GEDCOM file is a text file that represents a database in the form of a sequential stream of
related records. A record is represented as a sequence of tagged, variable-length lines, arranged in
a hierarchy. A GEDCOM line always contains a hierarchical level number, a tag, and an optional
value. A line may also contain a cross-reference identifier or a pointer.
Each line, including the last one, is terminated by either a carriage return (CR), a line feed
character (LF), or the carriage return/line feed combination (CR/LF). GEDCOM allows different
line terminators, but each GEDCOM file must use a single line terminator throughout the file.
GEDCOM 5.5.1 and earlier allow the line feed/carriage return (LF/CR) combination as a
terminator, GEDCOM 5.5.5 does not.
Record types are identified by tags. Each tag identifies a GEDCOM record type. Different
subrecord types may use the same tag.
Top-level records are identified by their tag. Subrecords are identified by their tag, but only fully
identified by their complete tag hierarchy; all the tags of the enclosing records and the tag of the
subrecord itself.
Recording records as tags with values allows record types to occur one, multiple times or zero
times. It also allows the introduction of new records and subrecords without introducing
incompatibility, as a reading system will continue to process the records it does understand, while
ignore records it does not understand. This allows so-called user extensions.
GEDCOM files consists of records that may have subrecords. Subrecords may have subrecords
again. A record without subrecords takes up exactly one GEDCOM line. A record with
subrecords takes up multiple GEDCOM lines.
Each line is a GEDCOM record. Most one-line records are subrecords of an enclosing record.
The enclosing records of a subrecord are known as the context of that record. The meaning of a
subrecord depends on it context. A record and the subrecord it encloses are simply known as a
record.
The hierarchy of records and subrecords is indicated by the level numbers. Top-level record have
level number 0 (zero). Subrecords have a higher level numbers. Immediate subrecords have a
level number exactly one higher than the enclosing record. It is a fatal error to skip a level.
A GEDCOM file consists of a sequence of top-level records. Each top-level record takes up one
or more lines. Most top-level records have subrecords, so most top-level records consist of
multiple lines. The beginning of one top-level record marks end of the previous top-level record.
each top-level record continues to the next record with level number 0 or theend of file(EOF).
In addition to hierarchical relationships, GEDCOM defines the inter-record relationships that
allow a record to be logically related to other records, without introducing redundancy. These
relationships are represented by two additional, but optional, parts of a line: a cross-reference
pointer and a cross-reference identifier. The cross-reference pointer "points at" a related record,
which is identified by a required, matching unique cross-reference identifier. The cross-reference
identifier is analogous to a primary key in relational database terminology.
## Grammar
This chapter defines the grammar for the GEDCOM format. The grammar is a set of rules that
specify the character sequences that are valid for creating the GEDCOM line. The character
sequences are described in terms of various combinations of elements (variables and/or
## 30

constants). Elements may be described in terms of a set of other elements, some of which are
selected from a set of alternative elements. Each element in the definition is separated by a plus
sign (+) signifying that the items on either side of the plus sign are to be concatenated. When
there is a choice of different elements that can be used, the set of alternatives are listed between
opening and closing square brackets ([]), with each choice separated by a vertical
bar([alternative_1 | alternative_2]). When there is only one alternative shown then the choice is
optional, that is, it is the same as [alternative_1 | <NULL>]. The user can read the grammar
components of the selected element by substituting any sub-elements until all sub-elements have
been resolved.
A GEDCOM file consists of a sequence of top-level records, which may contain subrecords. Each
record consists of a sequence ofgedcom_lines, all contained in a sequential file or stream of
characters. The simplest GEDCOM records consist of just onegedcom_line. The following rules
pertain to thegedcom_line:
## Grammar Rules
!Long values can be broken into shorter GEDCOM lines by using a subordinate CONC or
CONT tag. The CONC tag assumes that the accompanying subordinate value is
concatenated to the previous line value without adding a newline. If a concatenated line
value is broken at a space, then the space must be carried over to the CONC line value. The
CONT record assumes that the subordinate line value is concatenated to the previous line,
after inserting a newline.
A GEDCOM writer should consistently use the same newline throughout the GEDCOM file,
and that newline should be appropriate for the receiving system (HEAD.DEST).
A GEDCOM reader should insert the newline appropriate for the platform it is running on.
!The beginning of a new top-level record is designated by a line whoselevelnumber is 0
## (zero).
!Level numbers must be between 0 to 99 and must not contain leading zeroes, for example,
level one must be 1, not 01.
!Each new level number must be no higher than the previous line plus 1.
!All GEDCOM records must have a value, i.e. each GEDCOM record must have a line value,
subrecords or both. So, every GEDCOM record without subrecords must have a line value.
The two GEDCOM records that are the exceptions to this rule are theCONTandTRLR
record; emptyCONTrecords are needed to record a sequence of empty lines, and the
mandatoryTRLRdoes not have a line value or subrecords.
By the way, theCONCrecordisn'tan exception to this rule; eachCONCrecord must have a
line value.
!Any length constraints are given in code units, not bytes or characters. When wide characters
are used, byte buffer sizes should be adjusted accordingly.
The length of a text is measured in characters, code points or code units, the size of a buffer
is measured in bytes.
Thecharacters, code units, and code pointsannotationprovides a brief explanation.
!The cross-reference ID has a maximum length of 22 code units, including the enclosing ‘at ’
signs (@), and it must be unique within the GEDCOM file.
GEDCOM Identifier Length
Here, the GEDCOM grammar states that GEDCOM identifiers are limited to 22
code units (characters), including the enclosing at signs. Further on, the lineage-
## 31

linked form states that identifiers are at most 22 characters, but that's 22withoutthe
enclosing at signs. Thus, the GEDCOM grammar and the lineage-linked form
contradict each other. The GEDCOM grammar takes precedence over any
GEDCOM form.
▪The maximum length of a GEDCOM identifier is 22 code units.
▪The maximum length of the identifying part within the at signs is 20 code units.
## References
GEDCOM Identifiers: Length
!A GEDCOM file must havereferential integrity; The existence of a pointer does not merely
imply the existence of a corresponding record, itdemandsthe existence of corresponding
record. A GEDCOM readermustmake sure all pointers are valid, and must reject any
GEDCOM file containing invalid pointers as corrupt.
Pointers must be to existing cross-reference identifiers for records in the same GEDCOM
file, and those records must be of the right record type. Pointers to non-existent cross-
reference identifiers are a fatal error. Pointers to existing cross-reference identifiers, but of
the wrong record type, are fatal errors too.
Orphaned top-level records, i.e. top-level record that aren't pointed to, are perfectly legal. A
GEDCOM reader must import orphaned records just like other records. A smart GEDCOM
reader may issue a warning about orphaned top-level records, but should never do so for the
special case of a GEDCOM file that contains just one record.
!The length of a GEDCOM tag is a maximum of 31 code units.
All characters of the tag are significant.
!The total length of a GEDCOM line, including level number, cross-reference number, tag,
value, delimiters, and terminator,must notexceed 255 code units.
An ostensible GEDCOM 5.5.5 file containing longer lines isn't a GEDCOM 5.5.5 file. A
GEDCOM 5.5.5 readermust notaccept longer lines, butmustreject the file as invalid, with
an error message such as“Line is too long. This is not a GEDCOM 5.5.5 file.”.
!Empty lines and leading white space are illegal. Systems generating GEDCOM 5.5.5 files
must not create empty lines or start any lines with leading white space. Systems reading
GEDCOM 5.5.5 files must not accept empty lines or lines starting leading white space.
A GEDCOM 5.5.5 writerdoes notcreate any empty lines or leading white; if it does, it isn't
a GEDCOM 5.5.5 writer.
A GEDCOM 5.5.5 readermust nottolerate empty lines or leading white space, but
mustreject such files as not GEDCOM.
## Grammar Syntax
Agedcom_linehas the following syntax:
gedcom_line:=
level+ [delim+xref_ID] +delim+tag+ [delim+line_value] +terminator
for example:
1 NAME Will /Rogers/
The components used in the pattern above are defined below in alphabetical order. Some of the
components are defined in terms of other primitive patterns. The spaces used in the patterns
below are only to set them apart and are not a part of the resulting pattern. Character constants are
specified by their Unicode code point, using the notation introduced with Unicode 2.0; a Unicode
code point is represented as U+nnnn, wherennnnis the hexadecimal value, e.g. U+0020 is the
Space character. Character constants that are separated by a (-) dash represent any character
within that range from the first constant shown to and including the second constant shown.
## 32

alpha:=
## [U+0041 - U+005A | U+0061 - U+007A ]
where:
U+0041 - U+005A = A through Z
U+0061 - U+007A= a through z
alphanum:=
## [alpha|digit]
delim:=
space
where:
space = U+0020, the Space character
The explicit inclusion of thedelimdefinition as the space character is no mistake. It stresses
that the delimiter is a space character and nothing else.
digit:=
## U+0030 - U+0039
where:
U+0030 - U+0039 = One of the digits 0, 1,2,3,4,5,6,7,8,9
escape:=
## U+0040 + U+0023 +escape_text+ U+0040
where:
## U+0040 = @
## U+0023 = #
A GEDCOM escape sequence begins and ends with an at sign.
An escape sequence must not contain any at sign and must not be followed by an at sign; an
escape sequence must be followed by either adelim(the space character) or aterminator.
escape_text:=
[alphanum|escape_text+alphanum|escape_text+ space ]
where:
space = U+0020, the Space character
The escape_text is the part of an escape between the opening and closing at sign (@).
Escape sequences are defined by a GEDCOM form for that GEDCOM form.
GEDCOM 5.5.1 allows almost any Unicode character inside escape sequences. GEDCOM
5.5.5 restricts escape sequences to alphanumerical characters and the space character.
Notice thatescape_textmust start with an alphanumerical character, that it must not start
with a space.
The space character is allowed but deprecated; it is only included to keep the already
existing escape sequence@#DFRENCHR@legal.
## 33

identifier_string:=
## [alphanum|alphanum+identifier_string]
level:=
## [digit|non_zero_digit+digit]
The level number consists of one or two digits. It may be zero, but must not start with
leading zeroes.
line_char:=
all legal characters with some exceptions and one special case
specifically disallowed:
U+0000 - U+001F, except U+0009 = most C0 control characters
U+00FF = Delete character
specifically allowed:
## U+0009 = Horizontal Tab
special case:
## U+0040 + U+0040 = @@
Most control characters in the range U+0000 - U+001F (C0 Control Set) are disallowed. The
one exception is U+0009, the Horizontal Tab. Text may contain horizontal tabs.
Note that Carriage Return (U+000D) and Line Feed (U+000A) must not occur inside text.
Line breaks are supported through theCONTrecord. The use of the space character ( ),
number-sign (#) and underscore (_), is perfectly legal in text.
## Legal Characters
All text must abide by the rules of the character set used.The character set used determines
which code points are legal. The character set used determines which code point
combinations are legal. Use string functions to make sure that any line breaks are between
characters, not inside characters.
Special Case: At sign (@)
The At sign (@) is legal in text, but because of its special function in GEDCOM, there's a
twist. Text is not allowed to contain a single at sign (@), but must always include two
consecutive at signs (@@) instead, to clearly distinguish an at sign that is just text from an
at sign starting a cross-reference or escape sequence.
This is similar to backward slashes (\) having to be doubled inside C and C++ text strings.
This at sign rule affects all textual line values, but particularlytheEMAILline value,
<ADDRESS_EMAIL>, introduced with GEDCOM 5.5.1, as email addresses always contain
a single at sign. Within a GEDCOM file, that single at sign must be represented by a double
at sign.
A GEDCOM writer must export a double at sign instead of single at sign, and a GEDCOM
reader must import each double at sign as a single one. Exporting a single at sign where a
double at sign should be exported is a serious GEDCOM grammar mistake. A GEDCOM
5.5.5 readermust notinterpret a single at sign as if it were a double at sign, but must report a
fatal error and exit.
dates
GEDCOM writers should pay special attention to at signs in date fields. When an application
## 34

does not provide support for a particular calendar, a user may choose to enter a date
complete with the<DATE_CALENDAR_ESCAPE>for the calendar, e.g.“@#JULIAN@
12 Oct 1492”(without the quotes). The at signs within such dates shouldnotbe doubled.
## Not Deprecated
This feature complicates GEDCOM handling, so it is desirable to mark this GEDCOM
feature as deprecated, and eventually get rid of it, but as long as some records can contain
GEDCOM pointers as well as free text, this feature allows GEDCOM readers to distinguish
between an at sign that starts a pointer (single at sign), and one that is merely an at sign in
some text (double at sign).
line_item:=
## [escape|line_text|escape+delim+line_text]
Thisline_itemdefinition is different from the GEDCOM 5.5.1 definition. It explicitly
restrictsline_itemto just three different formats.
The explicit inclusion of nothing but an escape sequence as a possible line value is as
intended. It has been used in GEDCOM 5.0, it is deprecated now.
line_text:=
## [line_char|line_text+line_char]
line_textis text that neither is nor contains a pointer or an escape sequence.
line_value:=
## [pointer|line_item]
non_zero_digit:=
## U+0031 - U+0039
where:
U+0031 - U+0039 = One of the digits 1,2,3,4,5,6,7,8,9
null:=
nothing
pointer:=
xref_ID
tag:=
[ [ U+005F ] +alphanum|tag+alphanum]
where:
U+005F = _ (underscore)
GEDCOM tags are Case-Sensitive.
Each tag has a single correct casing.
All Basic GEDCOM Language tags are UPPERCASE.
▪A GEDCOM writer must use the correct casing for tags.
▪A GEDCOM reader must recognise tags through case-sensitive comparison.
▪A GEDCOM reader must not recognise tags through case-insensitive comparison.
GEDCOM tags are generally restricted to alphanumeric characters. Tags need not start with
## 35

a letter, but may start with a digit. Tags may additionally start with an underscore; this is
allowed because the Lineage-Linked Form demands that non-standard tags start with an
underscore.
terminator:=
## [carriage_return|line_feed|carriage_return+line_feed]
where:
carriage_return=U+000D, the Carriage Return character
line_feed=U+000A, the Line Feed character
A GEDCOM writer must not use different terminators for different lines.
A GEDCOM writer must use a single terminator throughout a GEDCOM file.
A GEDCOM file is a text file, which you can load into an text editor. Like any other text
file, a GEDCOM file must use a single line terminator throughout the file, and the
occurrence of either ␍ or ␊ outside the line terminator is a fatal error: not a GEDCOM file,
not even a text file.
A GEDCOM writer should not pick the terminator appropriate for the platform it runs on,
but the terminator appropriate for the destination system (HEAD.DEST). GEDCOM writers
should use ␍/␊ when unsure which terminator to pick. Web applications should always use
## ␍/␊.
Starting with GEDCOM 5.5.5, the terminator must be either ␍␍, ␊␊ or ␍␍/␊␊ and may no
longer be ␊␊/␍␍.
This is correction of a mistake; ␊/␍ should never have been included as an option; its
inclusion was a problem instead of a solution. Text editors and GEDCOM readers expect ␍,
␊ and ␍/␊, and are likely to get seriously confused when presented with ␊/␍. Even though it
has been legal for decades, not a single genealogy applications uses ␊/␍ as a GEDCOM line
terminator. The ␊/␍ terminator only appears in test files specifically crafted to test support
for it.
## References
GEDCOM Lines
Famberry GEDCOM
xref_ID:=
at +identifier_string+ at
where:
at = U+0040, the At Sign (@)
GEDCOM 5.5.5 demands that theidentifier_stringbe alphanumerical.
Description of Grammar Components
alpha:=
The alphabetic characters, both uppercase and lowercase, i.e. A through Z and a through z.
delim:=
Thedelim(delimiter), a single space character, terminates both the variable-lengthlevel
number and the variable-lengthtag. Note that space characters may also be present in a
## 36

value.
escape:=
Theescapeis a character sequence in the grammar used to specify special processing, such
as for switching character sets or for indicating an inclusion of a non-GEDCOM data form
into the GEDCOM structure.
An escape sequence should be separated from any line item following it by a delimiter
(space character). The delimiter following the escape sequence is not part of the escape
sequence (the GEDCOM 5.5.1 grammar erroneously states that it is). Failure to include a
delimiter between an escape sequence and a line item following it is a syntax error.
escape_text:=
Legalescape_textvalues and their meaning are defined by each GEDCOM form for that
GEDCOM form.
level:=
Thelevelnumber works the same way as the level of indentation in an indented outline,
where indented lines provide detail about the item under which they are indented. A line at
any level L is enclosed by and pertains directly to thenearest preceding lineat level L-1.
The level L may increase by 1 at most. Level numbersmust notcontain leading zeroes, for
example level one must be1, not01.
The enclosed subordinate lines at level L are said to be in the context of the enclosing
superior line at level L-1. The interpretation of atagmust be in the context of thetags of the
enclosing line(s) rather than just the tag by itself.
Take the following record about an individual's birth and death dates, for example:
## 0 INDI
## 1 BIRT
## 2 DATE 12 MAY 1920
## 1 DEAT
## 2 DATE 1960
In this example, the expression DATE 12 MAY 1920 is interpreted within the INDI
(individual) BIRT (birth) context, representing the individual's birth date. The second DATE
is in the INDI.DEAT (individual's death) context. The complete meaning of DATE depends
on the context.
GEDCOM writersmust notinsert empty lines to highlight the end of one and beginning of
another record nor indent lines based on their level number to increase readability. The
GEDCOM grammar is crystal clear that GEDCOM files do not contain empty lines and
GEDCOM lines do not contain leading white space.
GEDCOM 5.5.5 readers must reject any such files asnot a GEDCOM file.
Anyone viewing or editing a GEDCOM file can enjoy increased readability though colour
coding, indentation and other conveniences by using a dedicated GEDCOM editor or text
editor with GEDCOM support.
line_char:=
Characters legal within a textual line value.
line_text:=
A purely textual line value (no pointers or escape sequences).
line_value:=
Theline_valueidentifies an object within the domain of possible values allowed in the
context of thetag. The combination of thetag, theline_value, and the hierarchical context
of the supportinggedcom_lines provides the understanding of the enclosedvalues. This
## 37

domain is defined by a given GEDCOM form. The lineage-linked form defined inChapter 2
Lineage Linked-Form, page 53is one such GEDCOM form.
Values whose source information contains illegible parts of the value should be indicated by
replacing the illegible part with an ellipsis (...).
Values are generally not encoded in binary or other abbreviation schemes for reducing space
requirements, and they are generally constrained to be understandable by a typical user
without decoding. This is intended to reduce the decoding burden on the receiving software.
GEDCOM files are text files with a fair amount of repetition, and as such compress well
using common file compression methods.
## Line Value Ellipsis
The instructions to use ellipsis for illegible parts is problematic, because original text
may contain ellipsis already.
FamilySearchprobably meant this instruction for names in particular; use ellipsis for
illegible parts of a name.
Theline_valuewithin the context of a tag hierarchy ofgedcom_lines represents one piece
of information and corresponds to one field in traditional database or file terminology.
pointer:=
Apointerstands in the place of the record or context identified by the matchingxref_ID.
The use ofpointers is explicitly defined within the GEDCOM form, such as theLineage-
Linked GEDCOM Form defined in Chapter 2(p. 53).
Thepointeris a link to a top-level records with an identifier inside the same GEDCOM file.
The GEDCOM grammar does not support linking to records in other files or to subrecords.
A pointer must be both legal and valid. A pointer is legal if it conforms to the pointer syntax.
A pointer is valid if it matches the identifier of a record and that record is of the right type.
The pointer and matching record need not appear in any particular order; bothbackward
references(record appeared already) andforward references(pointer appears first) are legal.
GEDCOM readers typically create a look-up table of record identifiers while reading a
GEDCOM file, and verify the validity of pointers against that table after reading the entire
file.
The GEDCOM 5.5.1 specification mentioned two possible future features, for which it
already complicated the parsing of pointers. The two obsolete future features are linking to
records in other files, and linking to subrecords, which demand that GEDCOM readers give
special treatment to colons and exclamation marks respectively.
The GEDCOM 5.5.5 specification does not allow semicolons or exclamation marks in
pointers.
Verifying whether pointers are legal was complex already, as GEDCOM 5.5.1 allowed many
different characters inside pointers. GEDCOM 5.5.5 simplifies pointers by restricting
pointers to alphanumeric characters.
tag:=
Atagconsists of a variable length sequence ofalphanumcharacters. All user-defined tags
that have not been defined in the GEDCOM standard, must begin with an underscore
character (U+005F.
A tag defines the meaning of theline_valuewithin the context of the enclosing tags, and
## 38

contributes to the meaning of the enclosed subordinate lines. Specifictags are defined in
Appendix A, page 121.
The presence of a tag together with a value represents an assertion which the submitter
wishes to communicate to a receiver. A tag without a value does not represent an assertion.
If an optional record (the entire line; level,tag, line value and terminator) is absent, no
assertion is made. Information of a negative nature (such as knowing positively an event did
not occur) is handled through the semantic definition of a different tag and its accompanying
value to assert that information explicitly.
Although all the tags of the lineage-linked form are only three, four or five characters long,
systems must be able to handle all legal tags.
The GEDCOM 5.5.1 specification demanded that tags be unique in the first 15 characters
(code units), and thus allowed for wild variation beyond the first 15 characters. The
GEDCOM 5.5.5 specification simplifies GEDCOM parsing by demanding that all tags are
unique, period. For maximum backward compatibility, developers are still advised to avoid
tags that aren't unique in the first 15 characters.
How different record types and their tags may be combined is defined by a GEDCOM form.
A GEDCOM form defines the valid record and subrecords, their line values and possible
cross-references.
Validtag,line_value,xref_ID, andpointercombinations are constrained by the GEDCOM
form defined for representing a given kind of information.Chapter 2 Lineage-Linked Form,
page 53defines the commonly used GEDCOM form.
Tags and records aren't the same thing. The FamilySearch GEDCOM specifications
sometimes uses“tag”to mean“record”. That is confusing. A conscious effort has been made
to always use the right term throughout the GEDCOM 5.5.5 specification.
terminator:=
Theterminatordelimits the variable-lengthline_valueand signals the end of the
gedcom_line.
The valid terminators are Carriage Return (CR), Line Feed (LF) and the CR/LF
combination. The LF/CR combination is no longer allowed.
GEDCOM writers must pick one line terminator, and use only that line terminator
throughout the entire GEDCOM file.
xref_ID:=
(Seepointer), page 35
Thexref_IDis formed by any arbitrary combination of alphanumeric characters. No
meaning is attributed by the receiver to any part of thexref_ID, other than itsunique
association with the associated record.
## Examples:
The following are examples of valid but unrelated GEDCOM lines:
## 0 @I1234@ INDI
## . . .
1 AGE 13y
## . . .
## 1 CHIL @I1234@
## . . .
1 NOTE This is a note field that is
2 CONT continued on the next line.
The first line has alevelnumber 0, axref_IDof @I1234@, an INDItag, and novalue.
The second line has alevelnumber 1, noxref_ID, an AGEtag, and avalueof 13y (13
years).
The third line has alevelnumber 1, noxref_ID, a CHILtag, and avalueof apointerto a
xref_IDnamed @I1234@.
## 39

History: FamilySearch GEDCOM 5.5.1 allowed many different characters inside pointers,
even spaces, and demanded special handling of colons and exclamation marks in support of
obsolete future features.
GEDCOM 5.5.5 simplifies parsing by limiting pointers to alphanumeric characters.
Implementation note: In practice all systems use table indices to generate unique identifiers;
the identifier for the first record in the individual table is @I1@, the identifier for the fourth
record in the sources table is @S4@, and so on.
The receiving system may ignore this numbering system, but often chooses to use the same
indices as used in the source system. Users of multiple applications like this, as it allows
searching for individuals and family groups using the same numbers as used in the source
system.
## References
Common GEDCOM Identifier Naming Convention
## White Space
## Spaces & Tabs
For purposes of the GEDCOM grammar,white spaceis defined as spaces and tabs (horizontal
tabs, vertical tabs are illegal). White Space includes spaces and tabs only, line terminators are not
considered white space.
Unicode has many more characters in the white space category, but those characters are not
relevant to GEDCOM parsing. GEDCOM readers and writersmust nottake any special action for
those characters.
GEDCOM 5.5.1 versus 5.5.5
GEDCOM 5.5.1 did not allow tabs, but many GEDCOM 5.5.1 files do contain tabs anyway. Few
genealogy software developers ever restricted user from entering horizontal tabs, mostly because
they did not even notice the restriction.
GEDCOM 5.5.5 allows user text to contain horizontal tabs.
Previous GEDCOM versions do not explicitly allow or disallow trailing white space on
GEDCOM lines. GEDCOM 5.5.1 mentions that many systems will strip trailing spaces when
reading GEDCOM lines, and mentions it as fact that should be taken into account, which seems a
tacit approval of that practice.
GEDCOM 5.5.5 changes that: a GEDCOM readermust notstrip trailing white space.
Superfluous versus Significant
This specification distinguishes between superfluous and significant white space.
Superfluous white space is white space that serves no purpose, and really should not be there,
such as white space before or after a place name in a place name field. Superfluous white space is
often the result of an edit error, and its continued presence is a normalisation issue. Superfluous
white space can and should be trimmed from application records.
Significant white space is white space that must not be lost, such as a tab or space between two
words. Significant white space includes all white space entered into free-form text fields,
regardless of senseless some of that white space may seem to a human.
GEDCOM Lines
GEDCOM linesmust notstart with leading space.
## 40

GEDCOM linesshould not, butmaycontain trailing white space.
GEDCOM linesshould nothave trailing white space because most line values should not have
trailing white space.
Things like names, dates and places should have neither leading nor trailing white space, and it is
the job of the GEDCOM writer, or rather the application it is part of, to prevent such leading or
trailing white space from occurring.
GEDCOM linesmaycontain trailing white space because it cannot always be avoided. The
pathological case of a text consisting of lots of white space characters and few newlines forces a
GEDCOM writer to createCONC&CONTrecords that end with white space. A GEDCOM
reader must accept those line values as-is, not remove any white space, to correctly reconstitute
the original text.
## Trailing White Space
GEDCOM linesmust notnot end with superfluous trailing white space.
GEDCOM linesmaycontain significant trailing white space.
A GEDCOM writer, or rather the system it is part of, must ensure that it does not write
superfluous white space, but only significant white space. For many fields, applications should
automatically strip any leading and trailing white space upon user input. Developers should
include warnings about leading and trailing white space as part of the consistency checks.
A GEDCOM reader must import the lines values presented by a GEDCOM file as they are. A
GEDCOM reader must treat every part of a line value, including all white space, as significant.A
GEDCOM readermustimport every line values as-is,must notnot strip trailing white
space.
## Leading White Space
The rules for leading and trailing white space are not really rules about GEDCOM lines, but
about GEDCOM lines values. Line valuesshould not, butmaycontain trailing white space. The
same goes for leading white space: Line valuesshould not, butmaycontain leading white space.
A line value may start with leading white space. ThatCONCline values starts with leading white
space is often deliberate. A GEDCOM reader must import the lines values presented by a
GEDCOM file as they are. A GEDCOM reader must treat every part of a line value, including all
white space, as significant.A GEDCOM readermustimport every line values as-is,must not
not strip leading white space.
## CONC & CONT
GEDCOM Grammar
TheCONC&CONTrecords are defined as part of the GEDCOM grammar. They are always
available for use with any line value of any record in any GEDCOM form.
TheCONC&CONTrecords must not be used with records defined in the GEDCOM grammar.
They may only be used with records defined in a GEDCOM form.
There is no such thing asCONCorCONTrecords subordinate toCONCorCONTrecords.
TheCONC&CONTrecord always appear as immediate subrecords of a GEDCOM form record.
There is no such thing as a top-levelCONCorCONTrecord.
GEDCOM 5.5.5 Rule
The GEDCOM 5.5.5 specification introduces a new rule
## 41

While it is allowed to useCONCrecords for any line value, GEDCOM writersshouldnot use
them needlessly. GEDCOM writersshould notuseCONCrecords for line values with a
maximum length of 248 code unit or less.
GEDCOM 5.5.5 introduces one exception to the rule thatCONC&CONTrecords may be used
with any records; theCONC&CONTrecordsmust notbe used in the GEDCOM header.
Logical versus Physical Line Value
This text distinguishes between logical line values and physical line values. The GEDCOM
grammar defines physical line values, and a GEDCOM form defines logical values:
▪The GEDCOM grammar defines physical line values. A physical line value may be at most
248 code units long, andmust notcontain any carriage return (CR) or line feed (LF) character.
▪A GEDCOM form defines logical values. A single logical line value may be a long text
consisting of multiple lines. A single logical line value may be up to 32.765 code units long,
and may contain newlines.
TheCONC&CONTrecords exist to bridge the differences. TheCONC&CONTrecords enable
support of logical line values despite the limitations of the physical lines values.
Line Terminator versus Newline
This text refers to the line break at end of a GEDCOM line as aline terminator, and a line break
inside a logical line value as anewline. This convention should make the text easier to
understand, and allows making the following point, which is hard to make otherwise: the line
terminator used for GEDCOM lines and the newline used within logical line values need not be
the same. For example, a web application running on a Unix server would typically use line feed
(LF) as its newline inside the logical line value, and the carriage return/line feed (CR/LF)
combination as the line terminator for its GEDCOM lines.
## CONC
TheCONC(concatenation) record allows a single logical line value to split over multiple
GEDCOM lines. This is needed because a GEDCOM line must not be more than 255 character
long, and GEDCOM must still be able to handle logical line values longer than that.
It is called the concatenation record because a GEDCOM reader must concatenate the physical
line value of aCONCrecord to the logical line value of the superior record to reconstitute the
original logical line value.
## CONT
TheCONT(continuation) record is how GEDCOM supports multiple lineswithina logical line
value. This is needed because a logical line value may contain newlines, but a physical line value
must not contain any carriage return (CR) or line feed (LF) characters. It is called the
continuation record because a GEDCOM reader must continue on a new line (by reinserting the
newline that prompted the GEDCOM writer to use aCONTrecord) before appending the
physical line value of theCONCrecord to the physical line value of the superior record.
## Usage
Usage of theCONC&CONTrecords is simple. A GEDCOM writer splits a logical line value
into parts as needed, and writes those parts as the physical line values of a subordinateCONCor
CONTrecord. A GEDCOM reader reconstitutes the logical line value by recombining the line
value of the record with the line values of theCONC&CONTsubrecords.
## 42

CONC Usage
A GEDCOM writer creates anotherCONCrecord whenever the remaining logical line value is
too long for the current physical record.
A GEDCOM reader simply appends the physical line value of theCONTrecord to the logical
line record is it reconstituting,without adding anything in between.
CONT Usage
A GEDCOM writer creates a newCONTrecord whenever it encounters a newline, then
continues writing the rest of the logical line value.
When a GEDCOM reader encounter aCONTrecord, it appends a newline to the logical line
value it is reconstituting before appending the physical line value of theCONTrecord.
Character and Code Point Boundaries
A GEDCOM writer cannot split a line wherever it likes, and certainly not at some fixed number
of code units. After every split, the two resulting parts must both be valid string for the encoding
used.
Text-splitting must respectcode pointboundaries. Many Unicode code points require multiple
code units, not only when UTF-8 is used, but also when UTF-16 is used. Text-splittingmust not
split at just any code unit, as that might split the textinsidea code point. Text-splitting must occur
betweencode points.
Text-splitting must respectcharacterboundaries. Unicode support characters that consists of
multiple code points. Text-splittingmust notsplit at just any code point, as that might split the
textinsidea character. Text-splitting must occurbetweencharacters.
Developersmust notsimply split a line value at a fixed number of code units, or some fixed
number of code points, they must ensure that they split between characters. Developers need not
implement their own string manipulation routines to get this right. Developers can and should
avoid string handling problems by taking advantage of the string routines offered by the their
programming language's library, framework, platform or operating system. These routines know
how to split Unicode strings.
The ANSEL character set allows characters consisting of multiple code points too. There are no
library routines that perform correct splitting of ANSEL strings, but that does not matter, as there
is no need to split ANSEL strings anymore. TheGEDCOM 5.5.1 Annotated Editionrecommends
using Unicode, the GEDCOM 5.5.5 specification demands Unicode.
Developers do not need to write ANSEL at all, and only to read ANSEL if they want to read
GEDCOM 5.5.1 and earlier files, including ANSEL GEDCOM files.
## Practical Problems
Conceptually, usingCONC&CONTis simple. Historically, there are two practical problems:
▪The GEDCOM writer must figure out where to break the logical line value.
▪The GEDCOM reader must decide what to do with leading and trailing white space.
## Trailing White Space
The GEDCOM specification does not forbid trailing white space, but for most records, trailing
white space is meaningless. Historically, many GEDOM readers strip trailing white space from
records.
That is problematic, as the trailing white space on aCONCorCONTrecord may be the space
between words that would be erroneously concatenated if that space were lost.
That is why GEDCOM 5.5.1 requires that a split be done either in the middle of word, or just
## 43

before a space. When the split occurs just before a space, that space becomes the first character of
the line value on the next line. Such leading white space is considerably less likely to be lost than
trailing white space. It might still get lost because some GEDCOM readers skip all white space
after a tag, instead of skipping just one space as they should.
TheCONCorCONTannotation in theGEDCOM 5.5.1 Annotated Editiondiscusses the
problems with and solutions for GEDCOM 5.5.1 and earlier in some detail.
GEDCOM 5.5.5 specifies the simplest possible solution to all theCONCorCONT
complications. It is straightforward rule that GEDCOM 5.5.5 readers must follow anyway: a
GEDCOM reader must import line values correctly.
A GEDCOM reader must import the lines values presented by a GEDCOM file as they are. A
GEDCOM reader must treat every part of a line value, including all white space, as significant. A
GEDCOM readermust nottrim leading or trailing white space from line values. A GEDCOM
reader must simply import the line values as-is, including all leading and trailing white space.
GEDCOM 5.5.5 Writer Best Practice
▪Use operating system or programming library functions to make sure you split between
characters, not inside characters
▪Otherwise, split wherever is convenient; this GEDCOM file will be read by a GEDCOM 5.5.5
or later reader
GEDCOM 5.5.5 Reader Rules
▪import each line valueas-is
▪do nottrim trailing white space from any GEDCOM line or line value
▪do nottrim leading white space from any line value
## References
GEDCOM CONC and CONT
Gaenovium Presentations: Louis Kessler: Reading Wrong GEDCOM Right
Behold blog 2010-01-10: CONC Me on the Head
Symbols Used with Basic GEDCOM Language and GEDCOM
forms
The following symbols are used definitions of the Basic GEDCOM Language and GEDCOM
forms:
<<double_angle bracket>>
The name within the brackets is a subordinate structure of one or more GEDCOM records
(and subrecords) that is to be substituted in place of the line containing the enclosing double
angle brackets.
<Single_angle bracket>
The name within the brackets is a basic value type, also known as a primitive.
## {braces}
Indicates the minimum and maximum occurrences allowed for this structure or line—
{Minimum:Maximum}. Note that minimum and maximum occurrence limits are defined
relative to the enclosing superior line. This means that a required line (minimum = 1)is not
required if the optional enclosing superior line is not present. Similarly, a line occurring only
once (maximum = 1) may occur multiple times as long as each occurs only once under its
own multiple-occurring superior line.
For textual line values, the numbers specify the minimum and maximum length of the
logical line value. Long logical line values may require the use ofCONC&CONTrecords
## 44

to keep all physical line values below the maximum of 255 code units.
When the minimum and maximum are identical, a shorthand is used; the definition simply
gives the size, instead of repeating it with a colon in between, so {Size=3} instead of
{Size=3:3}.
[Square brackets]
Indicates a choice of one or more options—[Choice of].
vertical|bar
Separates the multiple choices, for example [Choice 1|Choice 2].
nlevel number
A level number which assumes the level number of the line which referenced the
substructure name.
## +1,+2...
A+1level number is 1 greater than the level number assumed by the superiornlevel. A+2
level number is 2 greater, and so forth.
0xHH
Indicates an allowable hexadecimal character value where HH is that value, for example,
0x20 (decimal 32) indicates the space character.
## 45

Chapter 1 Part II: Basic GEDCOM Language
The Basic GEDCOM Language is the GEDCOM language shared by all GEDCOM forms. It
defines essential GEDCOM records and the overall structure of a GEDCOM file.
Basic GEDCOM
## Four Record Types
The GEDCOM Language defines four record types (the header record has a few subrecords):
▪HEAD: aheaderrecord to provide basic information about a GEDCOM file.
▪TRLR: atrailerrecord to signal the end of a GEDCOM file.
▪CONC: aconcatenationrecord to support long line values.
▪CONT: acontinuationrecord to support newlines.
The header record provides just the essentials: GEDCOM version, character encoding, GEDCOM
form and form version. The GEDCOM form may extend the header with additional information
of relevance to the form.
The trailer record is technically superfluous, but its presence reassuring; its absence allows
reporting of incomplete GEDCOM files. It was necessary for when GEDCOM still supported
multi-volume GEDCOM files.
TheCONC&CONTaddress limitations of the GEDCOM grammar. They are defined as part of
the GEDCOM Language for used with record defined in GEDCOM forms.
GEDCOM File High-Level Structure
A GEDCOM file starts with a header, ends with trailer record, and has zero or more GEDCOM
form-specific record in between. A specific GEDCOM may demand a minimum number of form
records, the GEDCOM language does not.
## GEDCOM_FILE:=
This is the high-level structure of a GEDCOM file: a GEDCOM file starts with a GEDCOM
header, which may be extended by the GEDCOM form. The header is followed by any
number of form-specific records, and the file is terminated with a trailer record.
The header and trailer record are mandatory, the header extension and form records are
conceptuallyoptional.
## 0<<GEDCOM_HEADER>>
## +1<<GEDCOM_FORM_HEADER_EXTENSION>>
## 0<<FORM_RECORDS>>
## 0<<GEDCOM_TRAILER>>
The above definition demands the presence of
<<GEDCOM_FORM_HEADER_EXTENSION>>, to leave the actual demand up to each
GEDCOM form. If the <<GEDCOM_FORM_HEADER_EXTENSION>> were optional in
this definition, no GEDCOM form could demand the presence of its extensions. A
GEDCOM form can go without any GEDCOM header extensions by defining its
<<GEDCOM_FORM_HEADER_EXTENSION>> to be empty.
Similarly, the above definition demands the presence of <<FORM_RECORDS>>, to leave
the actual demand up to each GEDCOM form.
## {1:1}p. 50
## {1:1}p. 49
## {1:1}p. 48
## {1:1}p. 51
## 46

GEDCOM Record Definitions
{Size=5|7}CHARACTER_ENCODING:=
## [UTF-8|UNICODE|ANSEL|ASCII]
A coded value (exhaustive enumeration) that represents the character set and encoding to be
used to interpret this data.
The name of theUNICODEvalue is confusing, it should have been calledUTF-16.
The ASCII and ANSEL character sets are obsolete; the ASCII and ANSEL encoding
arenotlegal in GEDCOM 5.5.5.
Unicode-based systems creating GEDCOM 5.5.5 filesmust notoffer users the ability to
export using non-Unicode encodings, as such exports are practically sure to lose
information.
It is strongly recommended that applications supportimportof ASCII and ANSEL
GEDCOM files for GEDCOM 5.5.1 and earlier.
All GEDCOM 5.5.5 filesmustuse Unicode, using either the UTF-8 or UTF-16
encoding.
All GEDCOM 5.5.5 files, UTF-8 as well as UTF-16 GEDCOM files,muststart with a
Byte Order Mark (BOM).
Western applications should default to using the UTF-8 encoding, Eastern application should
default to using UTF-16 encoding.
Applicationneed notoffers user a choice between these two options.
A GEDCOM 5.5.5 readermust nottolerate anything but the UTF-8 and UTF-16 encodings,
butmustreject files using any other encoding as not-GEDCOM, specifically as not even
having a valid GEDCOM header.
A GEDCOM 5.5.5 readermust notaccept a GEDCOM file without a BOM, butmust reject
such files file asnotGEDCOM 5.5.5, with a message such as“ostensible GEDCOM 5.5.5
file lacks Byte Order Mark”.
A developer may choose to always use just one legal Unicode encoding on export of
GEDCOM 5.5.5, butmustsupport import of all legal Unicode encodings. A GEDCOM 5.5.5
readermustsupport both UTF-8 and UTF-16 GEDCOM files. The GEDCOM import must
also support both Little-Endian and Big-Endian UTF-16.
Unicode applications generally UTF-16 internally, so adding UTF-16 support is fairly
straightforward. Support for both Little-Endian and Big-Endian UTF-16 takes no more than
a byte swap for every word.
However, even UTF-16 textmust notbe imported with a simple copy operation. Different
operating systems use different Unicode normal forms. For example, Windows uses
NormalFormC, while MacOSX uses NormalFormD. Applications should always use
library, framework or operating system string routines, to ensure their Unicode text has the
proper normal form.
Code-page applications must not use GEDCOM 5.5.5, but must continue to use
GEDCOM 5.5.1, and should default their GEDCOM export to UTF-8 instead of ANSEL.
GEDCOM 5.5.5 Character Encoding Rules
GEDCOM 5.5.5 Writer
▪Use UTF-8 and UTF-16 only
▪Western applications should default to UTF-8
▪Eastern applications should default to UTF-16
## 47

GEDCOM 5.5.5 Reader
▪demand that file starts with a Byte Order Mark (BOM)
▪demand that the encoding is either UTF-8 or UTF-16
▪must support both UTF-8 and UTF-16 GEDCOM files
▪must support both Little-Endian and Big-Endian UTF-16 GEDCOM files
▪reject files using anything else as not-GEDCOM, not even a valid GEDCOM header
GEDCOM 5.5.1 Detection
The introduction of GEDCOM 5.5.5 does not change the detection of GEDCOM 5.5.1 files.
GEDCOM 5.5.5 files must be identified as GEDCOM 5.5.5 files; if they are not identified as
GEDCOM 5.5.5, they aren't GEDCOM 5.5.5 files.
Any file that claims to be a GEDCOM 5.5 file is either a GEDCOM 5.5.1 file (most likely)
or an actual GEDCOM 5.5 file. It is never a GEDCOM 5.5.5 file.
Any GEDCOM file that claims to be a GEDCOM 5.5 file but uses the UTF-8 encoding must
be recognised as a GEDCOM 5.5.1 file with a truncated version number.
## References
GEDCOM Character Encodings
GEDCOM Version detection
## {1:1}FORM_RECORDS:=
GEDCOM-form specific records. These top-level records are defined by the GEDCOM form
specified inGEDCOM_FORM.
Notice that the <<GEDCOM_FILE>> definition does not contain a <<FORM_RECORD>>
(singular) that is allowed to occur many times, but a <<FORM_RECORDS>> (plural) that is
allowed to occur just one.
This allows a GEDCOM form to not only define GEDCOM records types, but their order as
well.
{Size=1:20}GEDCOM_FORM:=
A value that identifies the GEDCOM form used in this GEDCOM file. The value must be
alphanumerical string. This string is case-sensitive.
The GEDCOM grammar does not define any GEDCOM form. The identifier for a
GEDCOM form is defined by the specification for that GEDCOM form.
Chapter 2 of this specification defines the Lineage-Linked Form, identified by the value
## LINEAGE-LINKED.
## Validity Check
A GEDCOM 5.5.5 readermustcheck the specifiedGEDCOM_FORM. It does so by
performing a case-sensitive check against the list of known GEDCOM forms it supports. A
GEDCOM readermust notattempt to correct for casing or spelling errors in the GEDCOM
form.
A GEDCOM reader must reject any file without a <GEDCOM_FORM> as not a GEDCOM
file.A GEDCOM reader may only try to process a GEDCOM file it if recognises and
supports the GEDCOM form used.If a GEDCOM reader does not recognise the GEDCOM
form, itmustabort with a message such as“Unrecognised GEDCOM form”. If a GEDCOM
reader recognises the GEDCOM form, but does not support it, itmustabort with message
such as“Unsupported GEDCOM form”.
## 48

## {1:1}GEDCOM_FORM_HEADER_EXTENSION:=
Zero or more additionalHEADsubrecords, as defined by the GEDCOM form specified in
## HEAD.GEDC.FORM.
GEDCOM Records
{Size=3:11}GEDCOM_VERSION_NUMBER:=
MMM + dot + mmm [ + dot + rrr ]
where:
MMM=1 through 3 digits; the major version number
mmm=1 through 3 digits; the minor version number
rrr=1 through 3 digits; the revision number
dot=(2E), the full stop character
The version number of the specification used.
Version Number is a Contract
There are two GEDCOM version numbers; one for the GEDCOM specification, and one for
the GEDCOM form used.
Both versions numbers are contracts; a promise that everything in the GEDCOM file
conforms to that GEDCOM specification and that GEDCOM form, that the GEDCOM file
only contains records that are legal according to those specifications.
## Three Values
A GEDCOM version consists of at least two and at most three dot-separated values in
major.minor.revisionformat. The three parts of themajor.minor.revisionformat are:
major=the major version number; starts at 0 (zero).
minor=the minor version number; starts at 0 for each newmajorversion.
revision=the revision number; starts at 0 for each newmajor.minorversion.
Dot-Separated Values
The full stops used in version numbers are known as dots, but pronounced as“point”. A
version number never begins or ends with a dot, it always begins and ends with a digit.
Values used must appear in the order shown. The major and minor version number are both
mandatory. The minor version number must included, even if it is zero.
The revision number may be left off when it zero. When missing, it must be assumed to be
zero.
Themajorversion number signals a major new release, often including major new features
or breaking changes. Theminorversion number version number signals a significant update
of the same release, often including some significant new features, but no breaking changes.
Therevisionnumber signals a lesser update, typically including only minor changes.
Each value consists at most 3 digits. Zeroes are allowed, leading zeroes are not;0.99is a
valid version number, and so is1.0, but1.01is not. Trailing zeroes must not be left out
and aren't implied; version2.1and version2.10are two different versions, and version
2.1comes before version2.9. The minimum version number is0.1. The maximum
version number is999.999.999.
Older GEDCOM Versions
It is strongly recommended that systems that continue to export GEDCOM 5.5.1 or earlier
## 49

files in addition to GEDCOM 5.5.5 files, comply with the GEDCOM 5.5.5 version number
rules for all supported versions.
## References
Truncated GEDCOM Version
GEDCOM Version Detection
## GEDCOM_HEADER:=
U+FEFF (Byte Order Mark)
nHEAD
## +1GEDC
## +2VERS<GEDCOM_VERSION_NUMBER>
## +2FORM<GEDCOM_FORM>
## +3VERS<GEDCOM_VERSION_NUMBER>
## +1CHAR<CHARACTER_ENCODING>
## ...
## Essential Information
This is the definition of a basic GEDCOM header.
The basic GEDCOM header provides just the essential information; everything that's needed
for a system to figure out whether it can read this GEDCOM file, no more, no less.
Every GEDCOM file must start with this header.
The continuation dots indicate that the header may be extended by the GEDCOM form.
The GEDCOM header is always preceded by the Byte Order Mark (BOM), Unicode code
point U+FEFF.
## Valid Header
It is important that GEDCOM 5.5.5 writers produce correct GEDCOM files, and especially
important that each file contains a valid GEDCOM header.
A GEDCOM 5.5.5 reader must demand a flawless GEDCOM header; itmust not
process a GEDCOM file if the header is invalid, but must issue a fatal error and abort.
## No Modifications
Developersmust notmodify or extend this record in any way.
No additional records may occur, not evenCONCorCONTrecords.
HEAD.CHAR Record required
TheHEAD.CHARrecord is required.
GEDCOM 5.5.5 demands that GEDCOM files use Unicode, allows only the UTF-8 and
UTF-16 encodings, and demands that each GEDCOM file starts with a Byte Order Mark
(BOM). That Byte Order Mark already tells the GEDCOM what the encoding of the
GEDCOM file is. So, technically, theHEAD.CHARrecord is superfluous now. The
HEAD.CHARrecord remains mandatory for maximum compatibility with GEDCOM 5.5.1
and earlier.
GEDCOM Form Header Extension
GEDCOM forms may extend the Basic GEDCOM header with additional records to create a
form-specific header. The GEDCOM form can onlyextendthe GEDCOM header; all the
additional records must come after the records of the basic GEDCOM header. Use ofCONC
## {1:1}
## {1:1}
## {1:1}p. 49
## {1:1}p. 48
## {:1}p. 49
## {1:1}p. 47
## 50

norCONTrecords is allowed there, but strongly discommended.
Explicit Support required
A GEDCOM writermustprovide correctGEDC.VERSandGEDC.FORMvalues. Systems
which process GEDCOM filesmustcheck theses values, and may only try to read
GEDCOM versions and forms it explicitly supports. For GEDCOM versions or forms it does
not support, the system must state so and abort, itmust nottry to import a GEDCOM version
or form it does not explicitly support.
## Form Version
GEDCOM 5.5.5 introduces theHEAD.GEDC.FORM.VERS, a separate version number for
the GEDCOM form, in addition toHEAD.GEDC.VERS, the general GEDCOM version
number.HEAD.GEDC.FORM.VERSrecord is mandatory.
Systemsmust nottry to read GEDCOM 5.5.5 files if they do not explicitly support
GEDCOM 5.5.5, but if a system that only knows about GEDCOM 5.5.1 and earlier tries to
do so anyway, and follows the rule that unrecognised records may be ignored, it will
probably ignore theHEAD.GEDC.FORM.VERSrecord.
## GEDCOM_TRAILER:=
## 0TRLR
The GEDCOM trailer marks the end of a GEDCOM file.
TheTRLRrecord has neither a line value nor subrecords.
TheTRLRrecord ends with a line terminatorjust like any other record. That terminator
must not be absent, and theTRLRrecord must not be followed by anything else.
GEDCOM 5.5.1 still needed theTRLRrecord in support of multi-volume GEDCOM files,
GEDCOM 5.5.5 no longer allows multi-volume GEDCOM files.
Technically, theTRLRissuperfluous now, but it remains for backward compatibility and
because it's is reassuring; theTRLRrecord confirms that the end of a complete GEDCOM
file has been reached.
GEDCOM Tag Definitions
## CHAR {CHARACTER_ENCODING}:=
The character set and encoding used in this GEDCOM file.
## CONC {CONCATENATION}:=
Additional text for the superior line value. ACONCrecord without a line value is a fatal
syntax error.
TheCONCrecord exists to allow logical line values longer than the maximum physical line
value. A GEDCOM writer must split long line values into parts and use subordinateCONC
records to record the additional parts. A GEDCOM reader must appendCONCline value
must be appended to logical line value it is reconstituting for the superior record.
TheCONC & CONTsection discussesCONC&CONTusage in detail.
## CONT {CONTINUATION}:=
A newline and usually some additional text as well for the superior line value. ACONT
record without a line value isnotan error, but the GEDCOM encoding of an empty line.
TheCONTrecord exists to allow logical line values to contain newlines, while physical
lines must not contain newlines. A GEDCOM writer must split a line values at a newline,
and then continue writing the value using a subordinateCONTrecord. A GEDCOM reader
must append a newline to the logical line value it is reconstituting for the superior record
## {1:1}
## 51

before appending theCONTline value itself.
TheCONC & CONTsection discussesCONC&CONTusage in detail.
## FORM {FORM}:=
The name of theGEDCOM formused in this GEDCOM file.
The GEDCOM specification defines just one GEDCOM form:LINEAGE-LINKED.
## GEDC {GEDCOM}:=
Information about the use of GEDCOM in a GEDCOM file.
## HEAD {HEADER}:=
Information about the entire GEDCOM file.
## TRLR {TRAILER}:=
A top-level record that marks the end of the GEDCOM file.
## VERS {VERSION}:=
Version number.
## 52

Chapter 2 Lineage-Linked Form
## Introduction
The Lineage-Linked Form defined in this chapter is a GEDCOM form based on the general
framework of theBasic GEDCOM Language defined in Chapter 1.
The Lineage-Linked Form is a couple-centric GEDCOM form; the family group record for a
couple and their children is placed centrally in this design. This GEDCOM form is called lineage-
linked because it pertains to individuals linked in parent-child relationships across multiple
generations.
This chapter describes the specific tag, value, and pointer combinations used for exchanging
genealogical information in this format. The chapter also addresses specific compatibility issues
pertaining to previous Lineage-Linked Form releases and contains a simple lineage-linked
GEDCOM file example.
## Organisation
The basic description of theLineage-Linked GEDCOM Formis presented in the following four
major sections:
!"Lineage-Linked Form definition", page 55
!"Top-Level Records of the Lineage-Linked Form", page 56
!"Subrecords of the Lineage-Linked Form, page 64
!"Primitive elements of the Lineage-Linked Form", page 75
The definition of the tags used in defining the lineage-linked structures are contained inAppendix
## A.
Lineage-Linked Form Usage Conventions
!The order in which GEDCOM lines are written to a GEDCOM file is controlled by the
context (level and parent record). The Lineage-Linked syntax may demand that particular
records be in a particular order, e.g. the submitter record must follow directly after the
GEDCOM header, but otherwise, the order of different records within the same context is
not significant.
It is possible for the same record type to occur multiple time within the same context. This
happens in two situations: events that may happen more than once (e.g. burial), and events
that happen just once, but for which there are multiple possible conflicting values (e.g. birth
date). In the latter case, the order of the records is interpreted as the submitter's preference.
The most preferred value being the first with the least preferred data listed in subsequent
lines by order of decreasing preference.For example, a researcher who discovers conflicting
evidence about a person's birth event would list the most credible information first and the
least credible or least preferred items last.
!Systems that support multiple fields or structures should allow their users to indicate their
preference opinion. Systems that only store single value structures should use the preferred
information (the first occurrence listed) and store the remaining information as an exception,
preferablywithin an appropriate NOTE fieldor in some way that the user has ready access
to the less-preferred data when viewing the record.
!Conflicting event dates and places should be represented by placing them in separate event
structures with appropriate source citations rather than by placing them under the same
enclosing event.
!The Lineage-Linked GEDCOM Form uses the TYPE tag to classify its superior tag for the
viewer. The value portion given by the TYPE tag is not intended to inform a computer
program how to process the data, unless there is a list of standardised or controlled
line_value choices given by the definition of the line value in this standard. The difference
between an uncontrolled line value and a note value is that displaying systems should always
display thetype valuewhen they display the data from the associated context. This gives the
## 53

user flexibility in further defining information in a compatible GEDCOM context and the
reader to understand events or facts which have not been classified by a specific tag. For
example:
## 1 EVEN
2 TYPE Awarded BSA Eagle Rank
## 2 DATE 1980
!All controlled line_value choices (enumerated values) are case-insensitive. The values
“Feb”,“FEB”and“feb”are considered equal.
A GEDCOM reader must convert all such values to all-uppercase or all-lowercase prior to
comparing to internally defined values.
GEDCOM tags are case-sensitive.All the tags of the Lineage-Linked Form are
## UPPERCASE.
User-defined tags should be UPPERCASE as well.
!All GEDCOM lines but the last one have either avalueor apointerunless the line contains
subordinate GEDCOM lines. The Lineage-linked formdoes not allowa GEDCOM line
with both a value and a pointer on the same line.
For anything but the TRLR record, the presence of only a level number and a tag, without
any value or any subrecords, is a syntax error. For example, the way to assert that a death
happened at an unknown time and place is not the line1DEATwithout subrecords, but the
line1DEATYwithout subrecords.
## User-defined Records
Any record that isn't part of the Basic GEDCOM Language or the GEDCOM form used, is
assumed to be a user-defined record. User-defined records make use of user-defined tags. All
user-defined tags must start with an underscore (_).
Tags may not contain additional underscores. Developers who use tags with additional
underscores in GEDCOM 5.5.1 or earlier may continue to do so, but must leave out these
underscores in GEDCOM 5.5.5 or later.
additional rules regarding predefined tags
▪It is illegal to use any user-defined tags when predefined tags are sufficient.
▪It is illegal to define a user-defined tags that equals a predefined tag with an underscore in
front.
▪It is also illegal to try and“bring back”a tag that has been obsoleted in GEDCOM 5.5.5 or
later by prefixing it with an underscore.
▪It is legal to support a new record in earlier versions of GEDCOM by using the new tag
prefixed with an underscore, but only in support of that new record in older versions.
So, it is illegal to use_TOWNto record the city within an address, because we already have the
CITYrecord to do so. It is illegal to use_CITYfor anything, because theCITYtag already
exists. It is illegal to_SSNin GEDCOM 5.5.5 or later, because GEDCOM 5.5.5 obsoletedSSN.
It is legal to use_EMAILin GEDCOM 5.5, to support theEMAILrecord introduced in
## GEDCOM 5.5.1.
The list of regular tags that may not be turned into user-defined by prefixing them with an
underscore consists of all the predefined tags, and the tags obsoleted in GEDCOM 5.5.5.
End User-Defined Tags
There are developer-defined records and truly enduser-defined records. The GEDCOM
specification does not distinguish between those two categories. When the GEDCOM
specification mentions user-defined records or tags, that generally means developer- and product-
specific records and tags, but it is not uncommon for genealogy applications to allow users to
define their own records and tags. It is up to applications to keep all user-defined tags legal by
## 54

making sure they all start with an underscore. Applications should keep all developer-defined tags
all-uppercase, and use all-lowercase for truly end-user defined tags. This allows third parties to
easily distinguish between these two different categories of so-called user-defined tags.
tag interpretation
The interpretation of developer-defined tags depends on the GEDCOM dialect as specified by
HEAD.DEST. The interpretation of trulyend user-defined tags is anyone's guess.
TheHEAD.SOURline value identifies the product that created the GEDCOM file - and that is all
it identifies. The GEDCOM dialect used within a GEDCOM file, and thus the interpretation of
GEDCOM extensions, is indicated by theHEAD.DESTline value.
In a typical GEDCOM file, theHEAD.DESTis equal to theHEAD.SOURvalue.
Reading Third-Party Extensions
Although it is perfectly legal for any genealogy application to ignore so-called user-defined tags,
that generally isn't what users want or expect. In practice, many genealogy software developers
try to support the most important GEDCOM extensions used by other developers on GEDCOM
import, as that provides a better user experience than ignoring them. Genealogy software
developers with products that understand GEDCOM extensions used by other products often tout
the product's ability to import GEDCOM files created by those products as a selling point.
Developers can and should improve third-party support for their extensions by publicly
documenting them.
## References
GEDCOM SOUR and DEST
GEDCOM System Identifiers
Behold blog 2011-11-21: A Plethora of Extra GEDCOM Tags
Lineage-Linked Form Definition
The Lineage-Linked Form is a GEDCOM form. A file using the Lineage-Linked Form is known
as a lineage-linked GEDCOM file.
A Lineage-Linked GEDCOM File
▪is identified by the<<GEDCOM_FORM>>valueLINEAGE-LINKED
▪extends the Basic GEDCOM header with the
## <<LINEAGE_LINKED_HEADER_EXTENSION>>
▪contains zero or more<<LINEAGE_LINKED_RECORD>>
▪contains exactly one<<SUBMITTER_RECORD>>that follows directly after the GEDCOM
header
## <<GEDCOM_FORM>>
The definition of the Lineage-Linked Form builds on the definitions of the Basic GEDCOM
Language. The high-level Lineage-Linked Form definitions are as follows:
{Size=14:20}GEDCOM_FORM:=
## [LINEAGE-LINKED]
The line valueLINEAGE-LINKEDidentifies the Lineage-Linked form.
A GEDCOM 5.5.5 readermustcheck the specified <GEDCOM_FORM> for validity. A
## 55

GEDCOM 5.5.5 reader must reject any file without a <GEDCOM_FORM> as not a
GEDCOM file. If the <GEDCOM_FORM> isn'tLINEAGE-LINKEDor another supported
GEDCOM form, the GEDCOM readermust nottry to process the file, but must refuse to
process the file with anunsupported GEDCOM formmessage.
Many GEDCOM 5.5 and GEDCOM 5.5.1 readers correct for knownLINEAGE-LINKED
spelling errors known to occur in GEDCOM 5.5 and 5.5.1 files. A GEDCOM 5.5.5 reader
need notandmust notdo so.
## {1:1}GEDCOM_FORM_HEADER_EXTENSION:=
n<<LINEAGE_LINKED_HEADER_EXTENSION>>
HEADsubrecords specific to the Lineage-Linked Form.
## FORM_RECORDS:=
## 0<<SUBMITTER_RECORD>>
## 0<<LINEAGE_LINKED_RECORD>>
A Lineage-Linked files consists of zero or more lineage-linked records, preceded by a
submitter record. Thus, the submitter record follows directly after the GEDCOM header.
Lineage-Linked GEDCOM File
When you merge the<<GEDCOM_HEADER>>and the high-level Lineage-Linked Form
definitions into the <<GEDCOM_FILE>> definition, you get the following Lineage-Linked
GEDCOM file definition.
## LINEAGE_LINKED_GEDCOM_FILE:=
U+FEFF (Byte Order Mark)
nHEAD
## +1GEDC
## +2VERS<GEDCOM_VERSION_NUMBER>
## +2FORMLINEAGE-LINKED
## +3VERS<GEDCOM_VERSION_NUMBER>
## +1CHAR<CHARACTER_ENCODING>
## +1<<LINEAGE_LINKED_HEADER_EXTENSION>>
## 0<<SUBMITTER_RECORD>>
## 0<<LINEAGE_LINKED_RECORD>>
## 0<<GEDCOM_TRAILER>>
Top-Level Records of the Lineage-Linked Form
## LINEAGE_LINKED_GEDCOM_FILE:=
U+FEFF (Byte Order Mark)
nHEAD
## +1GEDC
## +2VERS<GEDCOM_VERSION_NUMBER>
## +2FORMLINEAGE-LINKED
## +3VERS<GEDCOM_VERSION_NUMBER>
## +1CHAR<CHARACTER_ENCODING>
## +1<<LINEAGE_LINKED_HEADER_EXTENSION>>
## 0<<SUBMITTER_RECORD>>
## 0<<LINEAGE_LINKED_RECORD>>
## 0<<GEDCOM_TRAILER>>
## {1:1}p. 57
## {1:1}p. 63
{0:M}p. 58
## {1:1}
## {1:1}
## {1:1}p. 49
## {1:1}
## {1:1}p. 49
## {1:1}p. 47
## {1:1}p. 57
## {1:1}p. 63
{0:M}p. 58
## {1:1}p. 51
## {1:1}
## {1:1}
## {1:1}p. 49
## {1:1}
## {1:1}p. 49
## {1:1}p. 47
## {1:1}p. 57
## {1:1}p. 63
{0:M}p. 58
## {1:1}p. 51
## 56

## Submitter Record
A Lineage-Linked GEDCOM file consist of a header record, a trailer record, and other
records in between. This top-level definition of the lineage-linked form includes the
mandatory submitter record explicitly because it must follow the header record directly.
This demand is made to avoid breaking existing GEDCOM parsers, which expect the
submitter record to be there.
## Version Number
For Lineage-Linked GEDCOM files based on the GEDCOM 5.5.5 specification, the
GEDCOM version is5.5.5and the Lineage-Linked Form version is5.5.5too.
## LINEAGE_LINKED_HEADER_EXTENSION:=
nDEST<RECEIVING_SYSTEM_NAME>
nSOUR<SYSTEM_ID>
## +1VERS<PRODUCT_VERSION_NUMBER>
## +1NAME<NAME_OF_PRODUCT>
## +1CORP<NAME_OF_BUSINESS>
## +2<<ADDRESS_STRUCTURE>>
## +1DATA<NAME_OF_SOURCE_DATA>
## +2DATE<PUBLICATION_DATE>
## +2COPR<COPYRIGHT_SOURCE_DATA>
nDATE<FILE_CREATION_DATE>
## +1TIME<TIME_VALUE>
nLANG<LANGUAGE_OF_TEXT>
nSUBM<XREF:SUBM>
nFILE<GEDCOM_FILE_NAME>
nCOPR<COPYRIGHT_GEDCOM_FILE>
nNOTE<GEDCOM_CONTENT_DESCRIPTION>
## Form Header
A GEDCOM form does not define a GEDCOM header, it merely defines a form-specific
extension to the mandatory<GEDCOM_HEADER>.
## Extensions
The Basic GEDCOM headermust notcontainCONCorCONTrecords.
A form headermaycontainCONCorCONTrecords, but this is strongly discommended.
The Basic GEDCOM headermust notcontain GEDCOM extensions. A form headermay
contain GEDCOM extensions, but this is strongly discommended.
The form header is complex enough as it is. Developers ignoring this caution should not
expect third parties to support their extensions.
## Valid Header
It is important that GEDCOM 5.5.5 writers produce correct GEDCOM files, and especially
important that each file contains a correct form header.A GEDCOM 5.5.5 reader must
demand a flawless form header; itmust notprocess a GEDCOM file if the header is
invalid, but must issue a fatal error and abort.
HEAD.SUBM Optional
GEDCOM 5.5.5 allows just oneSUBMrecord per GEDCOM file,andit has to follow
immediately after the GEDCOM header. That makesHEAD.SUBMrecord superfluous.
## {0:1}p. 103
## {1:1}p. 106
## {0:1}p. 102
## {0:1}p. 96
## {0:1}p. 96
## {0:1}p. 64
## {0:1}p. 96
## {0:1)p. 103
## {0:1)p. 79
## {0:1}p. 93
## {0:1}p. 107
## {0:1}p. 94
## {0:1}p. 108
## {0:1}p. 93
## {0:1}p. 79
## {0:1}p. 93
## 57

TheHEAD.SUBMis no longer mandatory, but optional now. It may be deprecated in a later
version. It is recommended that GEDCOM 5.5.5 writers do create theHEAD.SUBMrecord,
for maximum compatibility with GEDCOM 5.5.1. TheHEAD.SUBMpointer is not needed,
but when the record is included, the pointer must be valid.
## SOUR & DEST
The header structure provides information about the entire GEDCOM file. TheSOUR
(source) system name identifies which system created the file, and that is all it identifies.
TheDEST(destination) system name identifies the intended receiving system.
TheHEAD.DESTvalue identifies the GEDCOM dialects used, i.e. the interpretation of the
GEDCOM extension. GEDCOM writers must default theHEAD.DESTvalue to be equal to
theHEAD.SOURvalue, to ensure correct interpretation of their system's GEDCOM
extensions.
## LINEAGE_LINKED_RECORD:=
## [
n<<FAM_GROUP_RECORD>>
## |
n<<INDIVIDUAL_RECORD>>
## |
n<<MULTIMEDIA_RECORD>>
## |
n<<NOTE_RECORD>>
## |
n<<REPOSITORY_RECORD>>
## |
n<<SOURCE_RECORD>>
## ]
User-Defined Top-Level Records
GEDCOM allows genealogy software developers to define additional records types, and that
includes top-level record types.
For example, multiple developers use a top-level_PLACEor_LOCrecords to deal with
GEDCOM 5.5.1'splace record design error.
## Bold Letters
Most genealogy applications generate cross-reference identifiers that consist of a single
capital letter followed by a number, e.g.@S123@or@F456@. The emboldened letter for
each type in the definition above is the suggested letter for records of that type.
A GEDCOM 5.5.5 file contains exactly one <<SUBMITTER_RECORD>>, it is suggested
that its identifier be@U1@.
## Reference
Common GEDCOM Identifier Naming Convention
## FAM_GROUP_RECORD:=
n<XREF:FAM>FAM
## +1<<FAMILY_EVENT_STRUCTURE>>
## +1HUSB<XREF:INDI>
## +1WIFE<XREF:INDI>
## +1CHIL<XREF:INDI>
## {1:1}p. 58
## {1:1}p. 61
## {1:1}p. 62
## {1:1}p. 63
## {1:1}p. 63
## {1:1}p. 63
## {1:1}
{0:M}p. 67
## {0:1}p. 108
## {0:1}p. 108
{0:M}p. 108
## 58

## +1NCHI<COUNT_OF_CHILDREN>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<CHANGE_DATE>>
## +1<<NOTE_STRUCTURE>>
## +1<<SOURCE_CITATION>>
## +1<<MULTIMEDIA_LINK>>
TheFAM(“family group”) record records afamily group: a couple and their children, if any.
The family group record is used to record marriages, common law marriages and other
relationships, and all children from that relationship.
relationships
TheFAM.MARRrecord documents the relationship betweenFAM.HUSBorFAM.WIFE.
The nature of the relationship is documented by the optionalMARR.TYPEsubrecord; if
there is noMARR.TYPErecord, marriage is assumed.
The following table is a list of the commonMARR.TYPEvalues and their meaning.
Developers should use these values for maximum compatability with other applications, and
must not use translations, abbreviations or other values that mean the same thing as the
values documented here.
unknownrelationship (type unknown)
marriagemarriage
not marriednot married
civilcivil marriage
religiousreligious marriage
common lawcommon law marriage
partnershippartnership
registered partnershipregistered partnership
living togetherliving together
living apart togetherliving apart together
The religious marriage ceremony that may follow a civil marriage is not included in this list,
as it does not establish a relationship; it must be recorded as an event.
It would make sense forunknownto be the default;marriageis the default for backward
compatability.
Lineage-Linked
In Lineage-Linked GEDCOM, parents and children are not linked directly to each other, but
instead linked through a family group record. A child is linked to its known parent or parents
via their family group record, and each family group record links to all known children for
those parents.
The preferred order of theCHIL(children) pointers within aFAM(family group) structure is
chronological by birth.
The family group record documents unions between at most two people. GEDCOM does not
offer any record to document unions of three or more people. Multiple unions and polygamy
can and must be recorded by using multiple family group records.
## Family Group Record
Each family group record documents just one union between at most two people (one or
both may be unknown). Each union, each relationship requires its own family group record.
An individual who had more than one relationship, will occur in more than one family group
record.
The family group record is the only record for documenting couples, and must be used for
all couples.
## {0:1}p. 79
{0:M}p. 107
## {0:1}p. 107
## {0:1}p. 78
## {0:1}p. 66
{0:M}p. 71
{0:M}p. 73
{0:M}p. 71
## 59

TheHUSBsubrecord andWIFEsubrecord link to the individuals in the relationship. Despite
the gendered names of these subrecords, the family group record can and must be used to
document same-sex relationships. It is legal to link theFAM.HUSBrecord to a female
individual, or theFAM.WIFErecord to a male individual.
## Sex
That the names ofHUSB&WIFEsubrecords suggest a particular sex and gendered roles is
an artefact of GEDCOM's history. The names of these subrecords remain unchanged from
previous versions of GEDCOM for backward compatibility, but they should largely be
thought of as awkward synonyms for a sex-neutralFAM.SPOUrecords.
TheHUSB&WIFEsubrecords do not indicate any sex, gender or role other than partner or
parent. TheFAM.HUSBwill often link to a male individual, andFAM.WIFEwill often link
to a female individual, but that need not be the case.
Applicationmust notassume any particular sex, gender or role based on theFAM.HUSBor
FAM.WIFEsubrecords.
Sex is specified byINDI.SEXand byINDI.SEXonly.Any gendered pronouns used on screen
or in reports must be based on the sex documented in theINDIrecord.
GEDCOM writers must avoid confusing other applications that do still make assumptions
about gender or role based on theFAM.HUSBorFAM.WIFEsubrecords.
If only a father is known, that father must be linked through theFAM.HUSBrecord. If only
a mother is known, that mother must be linked through theFAM.WIFErecord. For any male
& female couple,FAM.HUSBmust link to the male individual andFAM.WIFEto the
female individual. Having theFAM.HUSBrecord point to the wife, and theFAM.WIFE
record to the husband is an error.
## Empty Records
There can be at most oneHUSBsubrecord and oneWIFEsubrecord per family group
record. Neither one is mandatory. Either one can be missing to document one known and one
unknown parent for a child of that couple. Both can be missing to document that we know
children to be siblings, but do not know who their parents are.
The syntax even allows a family group record without either parents or children. Genealogy
applications should not create“empty”family group records, but should automatically delete
a family group record when a user has removed all links to individuals. A family group
record for just one child makes no sense, but a family group for only a single partner should
be maintained, if theMARRsubrecord contains information, such as a marriage date
(marriage date known, partner unknown).
## Remarriage
There may be multiple events for a single relationship, but there may be just one relationship
perFAMrecord. There may be just one relationship per family group record.Everynew
relationship requires a new family group record, even if that relationship is between two
people who already had a previous relationship.
This consistent approach keeps things simple and allows other relationships in between.
The family group record allows multiple events of the same type, but they must be for same
relationship. This provides the flexibility to record multiple marriage records with different
dates and places for the same marriage.
There may be multiple marriages for the same relationship when the legality of one marriage
is doubtful or rejected by another jurisdiction. There may also be multiple marriage records,
with different dates and places, for a single marriage, for example when a Dutch couple
marries in Germany and then goes back to their home town in the Netherlands, the German
town will create a marriage record, and the Dutch town will create a marriage record several
days or weeks later, when the couple comes back and shows the town clerk that they've been
married.
## 60

Order of Children
Children within a family group should be ordered chronologically, i.e. in order of birth, and
not anti-chronologically, and the order of multiplets born on the same day should be
preserved.
Although it would certainly make some sense to let applications put children in order, it is
current practice to let the user decide the order of children. Users expect genealogy
applications to respect the order they choose, and not change it on import on export.
## Genealogy Application Best Practice
▪encourage users to enter dates, including approximate dates
▪Encourage users to put and keep children in order:
▪when you show children, show their birth (or baptism) dates
▪visually indicate problems with the order of children
▪alert users when they insert a child out of order
▪include a children-in-order check as a basic genealogy consistency check
▪Preserve the order of children across GEDCOM import and export
▪optionally: make ordering children easy with a reorder children function
▪checking chronological order
▪when checking, treat dates consisting of just a year as January 1 of that year
▪when checking, treat dates consisting of just a year and a month as the first day of that
month
▪for multiplets born on the same day, simply respect the order chosen by the user
## References
Marriage in GEDCOM
## Married, Divorce, Married Again
Same-Sex Marriage in GEDCOM
## INDIVIDUAL_RECORD:=
n<XREF:INDI>INDI
## +1<<PERSONAL_NAME_STRUCTURE>>
## +1SEX<SEX_VALUE>
## +1<<INDIVIDUAL_EVENT_STRUCTURE>>
## +1<<INDIVIDUAL_ATTRIBUTE_STRUCTURE>>
## +1<<CHILD_TO_FAMILY_LINK>>
## +1<<SPOUSE_TO_FAMILY_LINK>>
## +1<<ASSOCIATION_STRUCTURE>>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<CHANGE_DATE>>
## +1<<NOTE_STRUCTURE>>
## +1<<SOURCE_CITATION>>
## +1<<MULTIMEDIA_LINK>>
The individual record is a compilation of facts, known or discovered, about an individual.
Sometimes these facts are from different sources. This form allows documentation of the
source where each of the facts were discovered.
The GEDCOM 5.5.5INDIis significantly simpler than the GEDCOM 5.5.1INDIrecord;
All the GEDCOM 5.5.1 subrecords that were marked obsolete or deprecated in the
GEDCOM 5.5.1 Annotated Editionhave been removed.
## {1:1}
{0:M}p. 72
## {0:1}p. 105
{0:M}p. 69
{0:M}p. 68
{0:M}p. 67
{0:M}p. 75
{0:M}p. 65
{0:M}p. 107
## {0:1}p. 107
## {0:1}p. 78
## {0:1}p. 66
{0:M}p. 71
{0:M}p. 73
{0:M}p. 71
## 61

TheINDI.SEXrecord is optional. When absent, systemsmustassume the default
<SEX_VALUE>ofU.
The normal lineage links are shown through the use of pointers from the individual to a
family group through either theFAMCtag or theFAMStag. TheFAMCtag provides a
pointer to a family group record where this person is a child. TheFAMStag provides a
pointer to a family group record where this person is a spouse or parent. The
<<CHILD_TO_FAMILY_LINK>>, page 67structure contains aFAMCpointer whichis
required to show any child to parent linkagefor pedigree navigation. The
<<CHILD_TO_FAMILY_LINK>> structure also indicates whether the pedigree link
represents an official lineage (birth record), or an adoption lineage.
Linkagebetween a child and the family group they belonged to at the time of an event can
also be shown by aFAMCpointer subordinate to the appropriate event. For example, a
FAMCpointer subordinate to an adoption event indicates a relationship to a family group by
adoption. Official parents can be shown by aFAMCpointer subordinate to the birth event
## (optional).
Other associations or relationships are represented by the
<<ASSOCIATION_STRUCTURE>>(theASSOrecord).
Order of Parents
TheINDIrecord may contain more than oneFAMCsubrecord, with eachINDI.FAMC
record pointing to a family group the individual was part of at sometime. These should be
listed chronologically; thus, the official parents should be listed first, and the current legal
parents should be listed last.
## References
Behold blog: Sex in GEDCOM
## MULTIMEDIA_RECORD:=
n<XREF:OBJE>OBJE
## +1FILE<MULTIMEDIA_FILE_REFERENCE>
## +2FORM<MULTIMEDIA_FORMAT>
## +3TYPE<SOURCE_MEDIA_TYPE>
## +2TITL<DESCRIPTIVE_TITLE>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<NOTE_STRUCTURE>>
## +1<<SOURCE_CITATION>>
## +1<<CHANGE_DATE>>
The GEDCOM 5.5.1 <<MULTIMEDIA_RECORD>> allowed a singleOBJErecord to link
to multiple related files.
That GEDCOM 5.5.1 feature is not widely supported; many genealogy applications will read
only the firstOBJE.FILE, resulting in loss of data. It was deprecated in the GEDCOM 5.5.1
## Annotated Edition.
GEDCOM 5.5.5 simplifies the multimedia support by no longer allowing multiple files per
media record. There is one multimedia record per file, one file per multimedia record.
GEDCOM does not include any grouping or tagging mechanism for multimedia files.
GEDCOM does not define a standard for bundling multimedia files with a GEDCOM file.
## {1:1}
## {1:1}p. 95
## {1:1}p. 95
## {0:1}p. 106
## {0:1}p. 89
{0:M}p. 107
## {0:1}p. 107
## {0:1}p. 78
{0:M}p. 71
{0:M}p. 73
## {0:1}p. 66
## 62

## NOTE_RECORD:=
n<XREF:NOTE>NOTE<USER_TEXT>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<SOURCE_CITATION>>
## +1<<CHANGE_DATE>>
## REPOSITORY_RECORD:=
n<XREF:REPO>REPO
## +1NAME<NAME_OF_REPOSITORY>
## +1<<ADDRESS_STRUCTURE>>
## +1<<NOTE_STRUCTURE>>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<CHANGE_DATE>>
## SOURCE_RECORD:=
n<XREF:SOUR>SOUR
## +1DATA
## +2EVEN<EVENTS_RECORDED>
## +3DATE<DATE_PERIOD>
## +3PLAC<SOURCE_JURISDICTION_PLACE>
## +2AGNC<RESPONSIBLE_AGENCY>
## +2<<NOTE_STRUCTURE>>
## +1AUTH<SOURCE_ORIGINATOR>
## +1TITL<SOURCE_DESCRIPTIVE_TITLE>
## +1ABBR<SOURCE_FILED_BY_ENTRY>
## +1PUBL<SOURCE_PUBLICATION_FACTS>
## +1TEXT<TEXT_FROM_SOURCE>
## +1<<SOURCE_REPOSITORY_CITATION>>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<CHANGE_DATE>>
## +1<<NOTE_STRUCTURE>>
## +1<<MULTIMEDIA_LINK>>
Source records are used to provide a bibliographic description of the source cited. (See the
<<SOURCE_CITATION>> structure, page 73, which contains the pointer to this source
record.)
## SUBMITTER_RECORD:=
n<XREF:SUBM>SUBM
## +1NAME<SUBMITTER_NAME>
## +1<<ADDRESS_STRUCTURE>>
## +1<<MULTIMEDIA_LINK>>
## +1RIN<AUTOMATED_RECORD_ID>
## +1<<NOTE_STRUCTURE>>
## +1<<CHANGE_DATE>>
The submitter record identifies an individual or organisation that created the GEDCOM file.
All records in the GEDCOM file are understood to be submitted by the same individual or
organisation.
A GEDCOM 5.5.5 file contains exactly one <<SUBMITTER_RECORD>>, directly after
the <<HEADER>>. There is no need for theHEAD.SUBMpointer anymore, so it optional
now.
p. 108{1:1}
{0:M}p. 107
## {0:1}p. 107
## {0:1}p. 78
{0:M}p. 73
## {0:1}p. 66
## {1:1}
## {1:1}p. 96
## {0:1}p. 64
{0:M}p. 71
{0:M}p. 107
## {0:1}p. 107
## {0:1}p. 78
## {0:1}p. 66
## {1:1}
## {0:1}
{0:M}p. 92
## {0:1}p. 85
## {0:1}p. 106
## {0:1}p. 104
{0:M}p. 71
## {0:1}p. 106
## {0:1}p. 105
## {0:1}p. 106
## {0:1}p. 106
## {0:1}p. 106
{0:M}p. 74
{0:M}p. 107
## {0:1}p. 107
## {0:1}p. 78
## {0:1}p. 66
{0:M}p. 71
{0:M}p. 71
## {1:1}
## {1:1}p. 106
## {0:1}p. 64
{0:M}p. 71
## {0:1}
{0:M}p. 71
## {0:1}p. 66
## 63

Subrecords of the Lineage-Linked Form
## ADDRESS_STRUCTURE:=
nADDR
## +1ADR1<ADDRESS_LINE1>
## +1ADR2<ADDRESS_LINE2>
## +1ADR3<ADDRESS_LINE3>
## +1CITY<ADDRESS_CITY>
## +1STAE<ADDRESS_STATE>
## +1POST<ADDRESS_POSTAL_CODE>
## +1CTRY<ADDRESS_COUNTRY>
nPHON<PHONE_NUMBER>
nEMAIL<ADDRESS_EMAIL>
nFAX<ADDRESS_FAX>
nWWW<ADDRESS_WEB_PAGE>
## History
The GEDCOM 5.5.1 specification supports both new style structured addresses (subrecords
for separate address parts) and old style unstructured addresses (a single line value with line
breaks). Structured addresses were introduced in GEDCOM 5.4 (1995), although theADR3
tag was only added in GEDCOM 5.5.1 (1999).
The new style structured addresses were introduced to replace the old style unstructured
addresses. GEDCOM 5.5 (1996) understandably continued to allow the use of old style
unstructured addresses for backward compatibility with applications that did not support
GEDCOM 5.5 yet. GEDCOM 5.5.1 (1999) continued to allow the old style unstructured
addresses. The GEDCOM 5.5.1 Annotated Edition (2018) explicitly deprecated the old style,
unstructured addresses. GEDCOM 5.5.5 supports structured addresses exclusively. The
ADDRline must not have a line value.
## Structure
Notice that the <<ADDRESS_STRUCTURE>> isn't a single GEDCOM record, but one
mandatory record and a few optional records.
The <<ADDRESS_STRUCTURE>> always includes theADDRrecord, while thePHON,
EMAIL,FAXandWWWrecords are optional.
Note that these optional records may only appear in combination with the mandatoryADDR
record; on this point, GEDCOM 5.5.5 agrees with GEDCOM 5.5.1, not GEDCOM 5.5.
## PHONE, EMAIL, FAX & WWW
ThePHON,EMAIL,FAX, andWWWrecords arenotsubrecords of theADDRrecord, nor
does the GEDCOM specification define another record that all these records are a subrecord
of. ThePHON,EMAIL,FAX, andWWWrecords simply appear at the same level as the
ADDRrecord.
Although the order of different records at the same level should not matter, it is strongly
suggested that GEDCOM writers always put the mandatoryADDRrecord first, and any
optionalPHON,EMAIL,FAXandWWWrecords directly after that.
Home, Work and Mobile
The <<ADDRESS_STRUCTURE>> allows up to threePHONrecords,EMAIL,FAX&
WWWrecords. This allows inclusion of say a home, work and mobile phone number, but
GEDCOM does not provide a mechanism for indicating which phone number is which.
## {1:1}
## {0:1}p. 75
## {0:1}p. 75
## {0:1}p. 75
## {0:1}p. 75
## {0:1}p. 76
## {0:1}p. 76
## {0:1}p. 75
## {0:3}p. 99
## {0:3}p. 75
## {0:3}p. 75
## {0:3}p. 76
## 64

PAF Addresses use URL instead of WWW
FamilySearch PAF uses GEDCOM 5.5.1, but PAF addresses do not use theWWWtag
specified here, they use the illegal tagURLinstead. That is an error in PAF, and
FamilySearch should have fixed PAF. Instead, FamilySearch“fixed”the GEDCOM
specification: in GEDCOM 5.6, the tag has changed fromWWWtoURL.
## Best Practices
GEDCOM Writer Best Practice
▪Write the mandatoryADRrecord before any of the optional records
▪Write any optional records directly after the mandatoryADRrecord
GEDCOM 5.5.1 Writer Best Practice
▪Use structured addresses exclusively
GEDCOM 5.5.1 Reader Best Practice
▪AcceptURLas a synonym forWWW
▪Do issue an non-fatal error stating that theURLtag is illegal
GEDCOM 5.5.5 Reader Best Practice
▪Do not accept any nonsense
## References
## GEDCOM ADDR
## ASSOCIATION_STRUCTURE:=
nASSO<XREF:INDI>
## +1RELA<RELATION_IS_DESCRIPTOR>
## +1<<SOURCE_CITATION>>
## +1<<NOTE_STRUCTURE>>
The association pointer only associatesINDI(individual) records toINDI(individual)
records.
TheASSOrecord may only be used for relationships that aren't otherwise supported by the
Lineage-linked Form. Parent-child relationship must be recorded using theINDI.FAMCand
theFAM.CHILrecords.
The person's relation or association is the person being pointed to. The association or
relationship is stated by the value on the subordinateRELAline. For example:
## 0 @I1@ INDI
1 NAME Fred /Jones/
## 1 ASSO @I2@
2 RELA Godfather
This GEDCOM fragment states that@I2@is Fred's godfather.
## {1:1}p. 108
## {1:1}p. 0
{0:M}p. 73
{0:M}p. 71
## 65

The<RELATION_IS_DESCRIPTOR>does not provide a list of standard values. The
ASSO.RELAline value is free-form text that has meaning to the user, not the application.
## GEDCOM-L ASSO.RELA
TheASSO.RELAvalue should be assumed to be nothing but user-provided text, but
it is worth noting that German developers working together through the GEDCOM-
L mailing list have agreed to use the following values where appropriate:
▪Godparent
▪Witness_of_Birth
▪Witness_of_Death
## GEDCOM-L _ASSO.RELA
They also use a GEDCOM extension, the_ASSOrecord, for relationship from an
individual to a couple, with the following agreed-upon_ASSO.RELAvalues:
▪Witness_of_Marriage
▪Witness_of_Civil_Marriage
▪Witness_of_Religious_Marriage
## Discommended
Earlier versions of GEDCOM featured support for witnesses through theWITN
record. FamilySearch GEDCOM 5.4 eliminated theWITNrecord. Various
genealogy software developers solve that limitation through GEDCOM extensions,
most commonly through a_WITNrecord.
ThisASSOand_ASSOrecords approach is strongly discommended.
Witnesses should not be associated with a couple. Witnesses must be associated with
the event they witnessed. This_ASSOrecord approach fails to associate witnesses
with an event and because of that, cannot even tell you which marriage someone
witnessed.
It is better to use some product-specific_WITNrecord on the event itself.
## References
GenWiki: GEDCOM/ASSO-Tag
## Best Practice
▪Applications should not assume any particularASSO.RELAvalue has any
particular meaning.
▪Applications should issue a strong warning when anASSO.RELAvalue seems to
duplicate a familial relationship (e.g. grandfather)
## CHANGE_DATE:=
nCHAN
## +1DATE<DATE_EXACT>
## +2TIME<TIME_VALUE>
## +1<<NOTE_STRUCTURE>>
## {1:1}
## {1:1}p. 83
## {0:1}p. 107
{0:M}p. 71
## 66

The change date is intended to only record the last change to a record. Some systems may
want to manage the change process with more detail, but it is sufficient for GEDCOM
purposes to indicate the last time that a record was modified.
## CHILD_TO_FAMILY_LINK:=
nFAMC<XREF:FAM>
## +1PEDI<PEDIGREE_LINKAGE_TYPE>
## +1<<NOTE_STRUCTURE>>
## EVENT_DETAIL:=
nTYPE<EVENT_OR_FACT_CLASSIFICATION>
nDATE<DATE_VALUE>
n<<PLACE_STRUCTURE>>
n<<ADDRESS_STRUCTURE>>
nAGNC<RESPONSIBLE_AGENCY>
nRELI<RELIGIOUS_AFFILIATION>
nCAUS<CAUSE_OF_EVENT>
n<<NOTE_STRUCTURE>>
n<<SOURCE_CITATION>>
n<<MULTIMEDIA_LINK>>
## FAMILY_EVENT_DETAIL:=
nHUSB
## +1AGE<AGE_AT_EVENT>
nWIFE
## +1AGE<AGE_AT_EVENT>
n<<EVENT_DETAIL>>
## FAMILY_EVENT_STRUCTURE:=
## [
n [ANUL|CENS|DIV|DIVF]
## +1<<FAMILY_EVENT_DETAIL>>
## |
n [ENGA|MARB|MARC]
## +1<<FAMILY_EVENT_DETAIL>>
## |
nMARR[Y|<NULL>]
## +1<<FAMILY_EVENT_DETAIL>>
## |
n [MARL|MARS]
## +1<<FAMILY_EVENT_DETAIL>>
## |
nRESI
## +1 <<FAMILY_EVENT_DETAIL>>
## |
nEVEN[<EVENT_DESCRIPTOR>|<NULL>]
## +1<<FAMILY_EVENT_DETAIL>>
## ]
Residence isn't an Event but an Attribute
This <FAMILY_EVENT_STRUCTURE> definition includesRESI(residence) as a
possible event. However, the residences of a family aren't events, they are attributes.
A building has an age, but a residence has a period. Moving in and moving out are
events, typically happening on a single day, while having residence is an attribute,
## {1:1}p. 108
## {0:1}p. 99
{0:M}p. 71
## {0:1}p. 91
## {0:1}p. 87
## {0:1}p. 72
## {0:1}p. 64
## {0:1}p. 104
## {0:1}p. 104
## {0:1}p. 78
{0:M}p. 71
{0:M}p. 73
{0:M}p. 71
## {0:1}
## {1:1}p. 0
## {0:1}
## {1:1}p. 0
## {0:1}p. 67
## {1:1}
## {0:1}p. 67
## {1:1}
## {0:1}p. 67
## {1:1}
## {0:1}p. 67
## {1:1}
## {0:1}p. 67
## {1:1}
## {0:1}p. 67
## {1:1}p. 91
## {0:1}p. 67
## 67

typical valid for a period of many years.
The miscategorisation ofRESIas an event is a hold-over from earlier GEDCOM
version. TheFACTrecord was only introduced in GEDCOM 5.5.1. Prior to
GEDCOM 5.5.1,FamilySearchdid not really distinguish between events and
attributes.
## INDIVIDUAL_ATTRIBUTE_STRUCTURE:=
## [
nCAST<CASTE_NAME>
## +1 <<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nDSCR<PHYSICAL_DESCRIPTION>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nEDUC<SCHOLASTIC_ACHIEVEMENT>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nIDNO<ID_NUMBER>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nNATI<NATIONAL_OR_TRIBAL_ORIGIN>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nNCHI<COUNT_OF_CHILDREN>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nNMR<NUMBER_OF_RELATONSHIPS>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nOCCU<OCCUPATION>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nPROP<POSSESSIONS>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nRELI<RELIGIOUS_AFFILIATION>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nRESI
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nTITL<NOBILITY_TYPE_TITLE>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1TYPE<USER_REFERENCE_TYPE>
## |
nFACT<ATTRIBUTE_DESCRIPTOR>
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## {1:1}p. 78
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 100
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 105
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 93
## {0:1}p. 69
## {1:1}p. 107
## {1:1}p. 99
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 79
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 99
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 99
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 102
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 104
## {0:1}p. 69
## {0:1}p. 107
## {1:1}
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 99
## {0:1}p. 69
## {0:1}p. 107
## {1:1}p. 77
## {0:1}p. 69
## 68

## +1TYPE<USER_REFERENCE_TYPE>
## ]
TheIDNOandFACTrecord bothrequirea subordinateTYPErecord to identify what kind
of number or fact is being recorded.
TheTYPErecordmaybe used with each of the above tags used in this structure.
## INDIVIDUAL_EVENT_DETAIL:=
n<<EVENT_DETAIL>>
nAGE<AGE_AT_EVENT>
Attributes do not have Age
ThisFamilySearchGEDCOM 5.5.1 specification uses
<INDIVIDUAL_EVENT_DETAIL> for both attributes and events. The inclusion of
theAGE_AT_EVENTsubrecord makes sense for events, but not for attributes.
Some attributes (for example residence and occupation) haveperiodsassociated with
them.
The use of <INDIVIDUAL_EVENT_DETAIL> for attributes is a specification error,
attributes should use a separate <INDIVIDUAL_ATTRIBUTE_DETAIL>.
## INDIVIDUAL_EVENT_STRUCTURE:=
## [
nBIRT
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1FAMC<XREF:FAM>
## |
nCHR[ Y | <NULL> ]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1FAMC<XREF:FAM>
## |
nDEAT[ Y | <NULL> ]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
n [BURI|CREM]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
nADOP
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## +1FAMC<XREF:FAM>
## +2ADOP<ADOPTED_BY_WHICH_PARENT>
## |
n [BAPM|BARM|BASM]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
n [CHRA|CONF|FCOM]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
n [NATU|EMIG|IMMI]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
n [CENS|PROB|WILL]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
n [GRAD|RETI]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## |
## {1:1}p. 107
## {1:1}p. 67
## {0:1}p. 77
## {1:1}
## {0:1}p.34p. 69
## {0:1}
## {1:1}
## {0:1}p.34p. 69
## {0:1}
## {1:1}
## {0:1}p. 69
## {1:1}
## {0:1}p. 69
## {1:1}
## {0:1}p. 69
## {0:1}p. 108
## {0:1}p. 76
## {1:1}
## {0:1}p. 69
## {1:1}
## {0:1}p. 69
## {1:1}
## {0:1}p. 69
## {1:1}
## {0:1}p. 69
## {1:1}
## {0:1}p. 69
## 69

nEVEN[<EVENT_DESCRIPTOR>|<NULL>]
## +1<<INDIVIDUAL_EVENT_DETAIL>>
## ]
The GEDCOM 5.5.5 specification no longer allows the informationless GEDCOM record1
BIRT Y. The above definition includes the<EVENT_DESCRIPTOR>that was missing
## GEDCOM 5.5.1.
As a general rule, events are things that happen on a specific date. Use the date form ‘BET
date AND date ’ to indicate that an event took place sometime between two dates. Resist the
temptation to use a ‘FROM date TO date ’ form in an event structure. If the subject of your
recording occurred over a period of time, then it is probably not an event, but rather an
attribute or fact.
TheEVENtag in this structure is for recording general events that are not shown in the
above<<INDIVIDUAL_EVENT_STRUCTURE>>. The event indicated by this general
EVENtag is defined by the value of the subordinateTYPEtag. For example, a person that
signed a lease for land dated October 2, 1837 and a lease for equipment dated November 4,
1837 would be written in GEDCOM as:
## 1 EVEN
2 TYPE Land Lease
## 2 DATE 2 OCT 1837
## 1 EVEN
2 TYPE Equipment Lease
## 2 DATE 4 NOV 1837
TheTYPEtag can be optionally used to modify the basic understanding of its superior event
or attribute. For example:
## 1 GRAD
2 TYPE College
The occurrence of an event is asserted by the presence of either aDATEtag and value or a
PLAC(place) tag and value in the event structure. When neither the date value nor the place
value are known then aY(yes) value on the parent event tag line is required to assert that the
event happened. For example each of the following GEDCOM structures assert that a death
happened:
## 1 DEAT Y
## 1 DEAT
## 2 DATE 2 OCT 1937
## 1 DEAT
2 PLAC Cove, Cache, Utah, United States of America
This convention asserts that the event happened.
It is not proper GEDCOM form to use aN(no) value with an event tag to record that it did
not happen.
## CHR Y, DEAT Y
TheBIRT(birth),CHR(christening), andDEAT(death) dates may be unknown. The
line value of these records may be empty (indicated by<NULL>in the definition),
but, as stated in chapter 1,records must have value; the line value of most records
may only be empty if it has subrecords. If there are no subrecords, the line valueY
must be used.
The line1 BIRT Ymeansborn; it provides no information whatsoever. The
GEDCOM 5.5.1 Annotated Editiondeprecated it. GEDCOM 5.5.5 makes it illegal.
## {1:1}p. 91
## {0:1}p. 69
## 70

The line1 CHR Ymeanschristened(but do not know where or when), and the line
1 DEAT Ymeansdied(but do not know where or when).
## MULTIMEDIA_LINK:=
nOBJE<XREF:OBJE>
A <<MULTIMEDIA_LINK>> is a link to a<<MULTIMEDIA_RECORD>>(which is a
link to a multimedia file).
There should be one multi-media record per file. There may be multiple multi-media links to
a multi-media record.
The GEDCOM 5.5.1 specification demands support for the GEDCOM 5.5
<<MULTIMEDIA_LINK>>, because FamilySearch's own Personal Ancestral File (PAF)
uses GEDCOM 5.5.1 yet uses the GEDCOM 5.5 <<MULTIMEDIA_LINK>>. That is a
GEDCOM 5.5.1 specific issue. PAF does not create GEDCOM 5.5.5 files.
GEDCOM 5.5.5 does not tolerate the use of records defined in another GEDCOM
version.
## NOTE_STRUCTURE:=
## [
nNOTE<XREF:NOTE>
## |
nNOTE<USER_TEXT>
## ]
ANOTEline value will frequently be too long to fit on a single GEDCOM line, thus
necessitating the use ofCONCandCONTrecords.
GEDCOM writers and readers must follow the rules in theCONC & CONTsection. The
essence is that a GEDCOM reader must accept all GEDCOM lines as-is,must notstrip
leading or trailing white space. That simple rule prevent the loss of white space between
words.
## PERSONAL_NAME_PIECES:=
nNPFX<NAME_PIECE_PREFIX>
nGIVN<NAME_PIECE_GIVEN>
nNICK<NAME_PIECE_NICKNAME>
nSPFX<NAME_PIECE_SURNAME_PREFIX
nSURN<NAME_PIECE_SURNAME>
nNSFX<NAME_PIECE_SUFFIX>
n<<NOTE_STRUCTURE>>
n<<SOURCE_CITATION>>
## Rufnamen
It is odd that the GEDCOM specification does not support call names. Many
Americans have German ancestors and in Germany, people do not just have call
names, theirrufnamen(call names) areofficial, recorded in official documents.
German genealogy software uses the_RUFNAMErecord to record these call names.
## References
GenWiki: GEDCOM/NAME-Tag
## {1:1}p. 108
## {1:1}p. 108
## {1:1}p. 107
## {0:1}p. 97
## {0:1}p. 97
## {0:1}p. 97
## {0:1}p. 98
## {0:1}p. 98
## {0:1}p. 98
{0:M}p. 71
{0:M}p. 73
## 71

## PERSONAL_NAME_STRUCTURE:=
nNAME<NAME_PERSONAL>
## +1TYPE<NAME_TYPE>
## +1<<PERSONAL_NAME_PIECES>>
## +1FONE<NAME_PHONETIC>
## +2TYPE<PHONETISATION_METHOD>
## +2<<PERSONAL_NAME_PIECES>>
## +1ROMN<NAME_ROMANISED>
## +2TYPE<ROMANISATION_METHOD>
## +2<<PERSONAL_NAME_PIECES>>
The name value is formed in the manner the name is normally spoken, with the given name
and family name (surname) separated by slashes (/). (See<NAME_PERSONAL>, page 96
for examples.) Based on the dynamic nature or unknown compositions of naming
conventions, it is difficult to provide more detailed name piece structure to handle every
case.
TheNPFX,GIVN,NICK,SPFX,SURN, andNSFXtags are not optional.
Usage of the GEDCOM records for name parts is mandatory (for every name part that has a
value).
Systems that still do not produce these name part records on export cannot use GEDCOM
5.5.5, but must stick to using GEDCOM 5.5.1 or earlier. A GEDCOM 5.5.5 reader expects
these name parts, and uses these to correctly split names into their parts.
A GEDCOM 5.5.5 readermustsplit a name as specified by the GEDCOM file,must notsplit
a name any other way. A GEDCOM 5.5.5 reader must check that each
<<PERSONAL_NAME_PIECES>> (theNAMErecord and all its subrecords) is self-
consistent, and must report a fatal error and abort import when it is not.
A<NAME_TYPE>is used to specify the particular variation that this name is. For example;
if the name type is subordinate to<NAME_PERSONAL>, page 96it could indicate that this
name is a name taken at immigration or that it could be an ‘also known as’ name (see
NAME_TYPE, page 98.)
## PLACE_STRUCTURE:=
nPLAC<PLACE_NAME>
## +1FONE<PLACE_PHONETIC>
## +2TYPE<PHONETISATION_METHOD>
## +1ROMN<PLACE_ROMANISED>
## +2TYPE<ROMANISATION_METHOD>
## +1MAP
## +2LATI<PLACE_LATITUDE>
## +2LONG<PLACE_LONGITUDE>
## +1<<NOTE_STRUCTURE>>
## Place Record Design Error
TheFamilySearchGEDCOM 5.5.1 specification added the place coordinates, the
LATIandLONGrecords, as subrecords of thePLACrecord. That sounds reasonable
and logical, there is no better place (pun intended) to put these. However, thePLAC
record is itself a subrecord, and a typical GEDCOM file contains the same place
names over and over again.
The GEDCOM 5.5.1 design seems to expect that GEDCOM writers, when place
coordinates are known, include those coordinates with each occurrence of each place
name, thus bloating GEDCOM files even more than frequently repeated place names
## {1:1}p. 96
## {0:1}p. 98
## {0:1}p. 71
{0:M}p. 97
## {1:1}p. 100
## {0:1}p. 71
{0:M}p. 98
## {1:1}p. 105
## {1:1}p. 71
## {1:1}p. 100
{0:M}p. 101
## {1:1}p. 100
{0:M}p. 0
## {1:1}p. 105
## {0:1}
## {1:1}p. 100
## {1:1}p. 100
{0:M}p. 71
## 72

already do.
Worse than that, GEDCOM readers that come across the same place name more than
once, may come across conflicting coordinates, and cannot resolve that by keeping
all the different ones; thisPLACrecord allows just one set of coordinates.
Top-Level Place Record
Genealogy applications developers have long desired the introduction of a top-level
place record, and the introduction of place coordinates in GEDCOM 5.5.1 made a
top-level place record a practical necessity, yet it was still not included.
Top-Level _PLAC Record
Several developers have addressed this design error by introducing a top-level
_PLACrecord, and do not record place coordinates withinPLACrecords, but only
within_PLACrecords.
Different genealogy software developers use different top-level_PLACrecords, but
still matchPLACrecord with those_PLACrecords the same way: aPLACand
_PLACrecord match each other if they contain exactly the same place name string.
Top-Level _LOC Record
Several German software developers created a collective set of extensions called
GEDCOMEL (Extended Locations). The GEDCOMEL extension were originally
created for GEDCOM 5.5, but are also used with GEDCOM 5.5.1.
GEDCOMEL uses a top-level_LOCrecord.
## References
Gaenovium Presentations: Louis Kessler: Reading Wrong GEDCOM Right
Behold blog 2011 Dec 24: The Place Record in GEDCOM
Detecting GEDCOM EL
GenWiki: GEDCOM 5.5EL
## SOURCE_CITATION:=
nSOUR<XREF:SOUR>
## +1PAGE<WHERE_WITHIN_SOURCE>
## +1EVEN<EVENT_TYPE_CITED_FROM>
## +2ROLE<ROLE_IN_EVENT>
## +1DATA
## +2DATE<ENTRY_RECORDING_DATE>
## +2TEXT<TEXT_FROM_SOURCE>
## +1<<MULTIMEDIA_LINK>>
## +1<<NOTE_STRUCTURE>>
## +1QUAY<CERTAINTY_ASSESSMENT>
The data provided in the<<SOURCE_CITATION>>structure is source-related information
specific to the data being cited. (SeeSample Lineage-Linked GEDCOM File, page 110for
an example.)
The information intended to be placed in the citation structure includes:
!The pointer to the<<SOURCE_RECORD>>, which contains a more general
description of the source used for the fact being cited.
!Information, such as a page number, to help the user find the cited data within the
referenced source. This is stored in the “.SOUR.PAGE” record.
!Actual text from the source that was used in making assertions, for example a date
## {1:1}p. 108
## {0:1}p. 107
## {0:1}p. 92
## {0:1}p. 104
## {0:1}
## {0:1}p. 91
{0:M}p. 106
{0:M}p. 71
{0:M}p. 71
## {0:1}p. 78
## 73

phrase as actually recorded in the source, or significant notes written by the recorder, or
an applicable sentence from a letter. This is stored in the “.SOUR.DATA.TEXT” record.
!Data that allows an assessment of the relative value of one source over another for
making the recorded assertions (primary or secondary source, etc.). Data needed for this
assessment is data that would help determine how much time from the date of the
asserted fact and when the source was actually recorded, what type of event was cited,
and what type of role did this person have in the cited source.
-Date when the entry was recorded in source document is stored in the
".SOUR.DATA.DATE" record.
-The type of event that initiated the recording is stored in the “.SOUR.EVEN”
record. The value used is the event code taken from the table of choices shown in
the<EVENT_TYPE_CITED_FROM> primitive on page49.
-The role of this person in the event is stored in the ".SOUR.EVEN.ROLE" record.
GEDCOM 5.4 (1995) introduced source citations using a reference to a (top-level)
<<SOURCE_RECORD>>(SOURrecord) and made it the preferred source citation format,
to reduce redundancy. GEDCOM 5.5 and 5.5.1. continued to allow old format source
citations that do not useSOURrecord for backward compatibility with old systems, but
clearly stated that the new format is preferred.
GEDCOM 5.5.5 no longer supports the old format, which has been deprecated since 1995.
In GEDCOM 5.5.5, each source citationmustreference a (top-level)SOURrecord.
Existing applications that still support the unstructuredSOURCE_CITATIONformat should
actively encourage users to upgrade all such citations (or at least the ones that cannot be
mapped automatically), so that the user can take advantage of its GEDCOM 5.5.5 support.
## SOURCE_REPOSITORY_CITATION:=
nREPO<XREF:REPO>
## +1CALN<SOURCE_CALL_NUMBER>
## +2MEDI<SOURCE_MEDIA_TYPE>
The <<SOURCE_REPOSITORY_CITATION>> is an optional subrecord of the
## <<SOURCE_RECORD>>.
Applications should encourage users to always reference a repository for consulted sources,
but it isn't necessary to identify a particular repository for a widely available published work.
The <<SOURCE_REPOSITORY_CITATION>> is used for both formal and informal
repositories. An example of an informal repository is an uncle who possesses an old bible
that contains genealogical notes; you would enter his name and address as the repository. For
formal repositories, such as a library, the call number of the particular source may be
recorded.
The GEDCOM 5.5.5 <<SOURCE_REPOSITORY_CITATION>> definition is simpler than
the GEDCOM 5.5.1 definition, because GEDCOM 5.5.5 demands that all systems support
the<<REPOSITORY_RECORD>>record.
FamilySearch deprecated theNOTE-only <<SOURCE_REPOSITORY_CITATION>>
format 25 years ago (see<<SOURCE_CITATION>>annotation about new structured
format replacing the old unstructured format).
Existing systems that still support theNOTE-only format must encourage users to change
suchNOTEinto aREPOrecords, so that the user can take advantage of its GEDCOM 5.5.5
support.
This structure is used within a source record to point to a name and address record of the
holder of the source document. Formal and informal repository names and addresses are
stored in the<<REPOSITORY_RECORD>>. Informal repositories include owner's of an
unpublished work or of a rare published source, or a keeper of personal collections. An
example would be the owner of a family bible containing unpublished family genealogical
entries. More formal repositories, such as theFamily History Library, should show a call
number of the source at that repository. The call number of that source should be recorded
using a subordinateCALNtag. Systems which do not use repository name and address
record, should describe where the information cited is stored in the
<<NOTE_STRUCTURE>>of theREPO(repository) source citation structure.
## {1:1}p. 108
## {0:1}p. 105
## {0:1}p. 106
## 74

## REPO.CALN.MEDI
There is a puzzling mistake that has, for the sake of full backward compatibility with
(the not deprecated part of) the GEDCOM 5.5.1 structure, not been corrected in
GEDCOM 5.5.5; the <<SOURCE_REPOSITORY_CITATION>> definition allows
theCALNsubrecord to haveMEDIsubrecord to specify a
<<SOURCE_MEDIA_TYPE>>. That doesn't make sense.
The media type is a property of the source (<<SOURCE_RECORD>>), not of the
repository, and certainly not of the call number.
ConsiderREPO.CALN.MEDIstrongly deprecated.
## SPOUSE_TO_FAMILY_LINK:=
nFAMS<XREF:FAM>
## +1<<NOTE_STRUCTURE>>
Primitive Elements of the Lineage-Linked Form
The field{Size=}specifications show the minimum and maximum field length. The field lengths
are specified independent of other GEDCOM elements, such as level numbers and tags.
GEDCOM lines are limited to 255 code units, but the GEDCOM grammar'sCONC
(concatenation) andCONT(continuation) records allow splitting a field over multiple lines.
{Size=1:60}ADDRESS_CITY:=
The name of the city used in the address. Isolated for sorting or indexing.
{Size=1:60}ADDRESS_COUNTRY:=
The name of the country that pertains to the associated address. Isolated by some systems for
sorting or indexing. Used in most cases to facilitate automatic sorting of mail.
{Size=5:120}ADDRESS_EMAIL:=
An electronic address that can be used for contact such as an email address.
Email addresses contain a single at sign (@), but GEDCOM lines must not contain a single
at sign.
In the GEDCOM grammar, a single at sign indicates the starts or end of an escape sequence.
The GEDCOM grammar states thata single at sign must be encoded as a double at sign.
•A GEDCOM writer must export the single at sign as two consecutive at signs.
•A GEDCOM reader must import that double at sign as a single at sign.
{Size=5:60}ADDRESS_FAX:=
A FAX telephone number appropriate for sending data facsimiles.
{Size=1:60}ADDRESS_LINE1:=
The first line of the address used for indexing.
{Size=1:60}ADDRESS_LINE2:=
The second line of the address used for indexing.
{Size=1:60}ADDRESS_LINE3:=
The third line of the address used for indexing.
## {1:1}p. 108
{0:M}p. 71
## 75

{Size=1:10}ADDRESS_POSTAL_CODE:=
The ZIP or postal code used by the various localities in handling of mail. Isolated for sorting
or indexing.
{Size=1:60}ADDRESS_STATE:=
The name of the province, state or similar country subdivision used in the address. Isolated
for sorting or indexing.
{Size=4:2047}ADDRESS_WEB_PAGE:=
The world wide web page address.
Minimum and Maximum URL Length
Minimum URL Length
The actual minimum URL length is two letters: just a top-level domain. The only
known example is the now retired URL shortenerto, which consist of nothing but
the country code for Tonga. The practical minimum for a field like this four letters, a
one-letter second level domain on a two-letter top-level domain, for examplet.co,
twitter's URL shortener.
Maximum URL Length
There is no official maximum URL length, but there are practical limitations.
RFC7230 recommends that length of at least 8000 bytes should be supported by all
servers and clients, but practical limits are lower. Firefox support longer ULS, but
will not display more than the first 65.536 code units of URL in the address bar. A
default Apache server configuration has a 8192-byte limit on individuals fields of a
request. The maximum length for an URL in a sitemap protocol is 2048 code units.
Internet Explorer has a maximum URL length of 2083 code units, and that value is
provided inWinINET.hasINTERNET_MAX_URL_LENGTH, but the address bar
has a limit of 2047 code units.
The real-world answer is that very long URLs are a mistake, but it is not up to the
GEDCOM specification to unduly limit the length of URLs. That is why the max
length has been set to 2047 code units.
## References
Quora: What's the real minimum URL length?
IEInternals: URL Length Limits
stack overflow: What is the maximum length of a URL in different browsers?
{Size=4:4}ADOPTED_BY_WHICH_PARENT:=
## [HUSB|WIFE|BOTH]
A code which shows which parent in the associated family group record adopted this person.
where:
HUSB=TheHUSBin the associatedFAMrecord adopted this person.
WIFE=TheWIFEin the associatedFAMrecord adopted this person.
BOTH=BothHUSBandWIFEadopted this person.
The names of theFAM.HUSBandFAM.WIFEsubrecords are historical. These subrecords
identify individuals, they donotindicate particular roles within the family group.
## 76

{Size=2:13}AGE_AT_EVENT:=
## [ NULL
| < + space
| > + space ]
## ]
[ YYY + y + space + MM + m + space + DDD + d
| YYY + y
| MM + m
| DDD + d
| YYY + y + space + MM + m
| YYY+ y + space + DDD + d
| MM + m + space + DDD + d
## |CHILD
## |INFANT
## |STILLBORN
## ]
where:
>=greater than indicated age
<=less than indicated age
y=a label indicating years
m=a label indicating months
d=a label indicating days
YYY=number of full years, at most three digits
MM=number of months, at most 11, at most two digits
DDD=number of days, at most 365, at most three digits
CHILD=age < 8 years
INFANT=age < 1 year
STILLBORN=died just prior, at, or near birth, 0 years
space=U+0020, the Space character
Notice that, in the above syntax, the uppercase letters represents a number, while the
lowercase letters are to be included literally, as part of the line value.
A number that indicates the age in years, months, and days that the principal was at the time
of the associated event. Any labels must come after their corresponding number, for
example; 4y 8m 10d.
The line value should be normalised; it should for example not specify2y 13m, but3y 1m
instead. Number of days is allowed to be 365 because of leap years.
The YYY, MM and DDD values must not be zero; if a value equals zero, that part is left off.
The values may not contain leading zeroes either.
The valuesCHILD,INFANT,STILLBORNhave been deprecated because they break the
mold, are technically superflous, and not likely to be understood as precise as they are
defined here. They continue to be allowed for compatability with GEDCOM 5.5.1 only.
A notable shortcoming of theAGE_AT_EVENTsyntax it that it does not support hours or
minutes. Recording that a child died minutes or hours after birth is not supported.
{Size=1:90}ATTRIBUTE_DESCRIPTOR:=
Text describing a particular characteristic or attribute assigned to an individual. This
attribute value is assigned to theFACTrecord. The classification of this specific attribute or
fact is specified by the value of the subordinateTYPErecord selected from the
<EVENT_DETAIL>structure. For example if you were classifying the skills a person had
obtained;
1 FACT Woodworking
2 TYPE Skills
## 77

{Size=4:4}ATTRIBUTE_TYPE:=
## [CAST|EDUC|NATI|OCCU|PROP|RELI|RESI|TITL|FACT]
An attribute which may have caused name, addresses, phone numbers, family listings to be
recorded. Its application is in helping to classify sources used for information.
{Size=1:12}AUTOMATED_RECORD_ID:=
A unique record identification number assigned to the record by the source system. This
number is intended to serve as a more sure means of identification of a record for reconciling
differences in data between two interfacing systems.
{Size=2:4}BEFORE_COMMON_ERA:=
## [ BCE| BC | B.C.]
<BEFORE_COMMON_ERA> allows three different values, all meaning the same thing. A
GEDCOM 5.5.5 reader must support all three.
While enumerated values are case-insensitive, it is recommended that GEDCOM writers
always use all-uppercase for those values, as that is what human readers examining
GEDCOM files expect.
GEDCOM 5.5.1 specifies the use ofB.C.(two full stops), but FamilySearch's own
Personal Ancestral File (PAF) usesBC(just two letters) instead, and so do other applications.
Therefore, theGEDCOM 5.5.1 Annotated Editionrecommends that GEDCOM readers
accept both values,andBCEas well.
A GEDCOM 5.5.5 reader cannot simply continue that GEDCOM 5.5.1 best practice, as a
GEDCOM 5.5.5 readermust notaccept invalid values. To continue to allow acceptance of
bothB.C.andBC, both are defined as legal. Both are deprecated as well, in favour of the
religiously neutralBCEfavoured by science and academia. A future GEDCOM version will
useBCEexclusively.
Developers that aim for maximum compatibility of GEDCOM 5.5.1 and 5.5.5 files should
useB.C.in their GEDCOM 5.5.5 files for now,andmake sure their GEDCOM 5.5.1 reader
acceptsBCE.
{Size=1:90}CASTE_NAME:=
A name assigned to a particular group that this person was associated with, such as a
particular racial group, religious group, or a group with an inherited status.
{Size=1:90}CAUSE_OF_EVENT:=
Used in special cases to record the reasons which precipitated an event. Normally this will
be used subordinate to a death event to show cause of death, such as might be listed on a
death certificate.
{Size=1:1}CERTAINTY_ASSESSMENT:=
## [ 0 | 1 | 2 | 3 ]
TheQUAYtag's value conveys the submitter's quantitative evaluation of the credibility of a
piece of information, based upon its supporting evidence. Some systems use this feature to
rank multiple conflicting opinions for display of most likely information first. It is not
intended to eliminate the receiver's need to evaluate the evidence for themselves.
0=Unreliable evidence or estimated data
1=Questionable reliability of evidence (interviews, census, oral genealogies, or potential
for bias for example, an autobiography)
2=Secondary evidence, data officially recorded sometime after event
3=Direct and primary evidence used, or by dominance of the evidence
## 78

## CERTAINTY_ASSESSMENT
This simple four-value certainty assessment is arguably too simple and too
subjective for serious use. It is not used much.
Several modern genealogy applications use a multi-value quality assessment, which
is recorded as a GEDCOM extension.
{Size=1:248}COPYRIGHT_GEDCOM_FILE:=
A copyright statement needed to protect the copyrights of the submitter of this GEDCOM
file.
The copyright-ability of GEDCOM files is a tricky topic. A typical GEDCOM is a selection
taken from a compilation of facts, interpretations, and notes, complete with mistakes. Fact
aren't copyrightable, but compilations and original notes are, and your interpretations and
mistakes are your own. Then again, a small selection does not necessarily enjoy the same
copyright protection as the entire work. You need a lawyer if you really care about this topic.
{Size=1:248}COPYRIGHT_SOURCE_DATA:=
A copyright statement required by the owner of data from which this information was
downloaded.
This value occurs in the GEDCOM header; usage ofCONCorCONTrecords is not
allowed.
Actual examples are hard to come by, as theHEAD.COPRis rarely used. This is a
GEDCOM header produced byAncestral File 4.19:
## 0 HEAD
## 1 SOUR ANSTFILE
## 2 VERS 4.19
2 NAME Ancestral File (R)
2 CORP The Church of Jesus Christ of Latter-day Saints
## ...
2 DATA Ancestral File
3 DATE 5 January 1998
3 COPR Copyright (c) 1987, June 1998
## 1 DEST PAF
## 1 DATE 6 FEB 2010
## 2 TIME 17:02:05
1 FILE GEDCOM4.ged
## 1 GEDC
## 2 VERS 5.5
## 2 FORM LINEAGE-LINKED
## 1 CHAR ANSEL
## ...
This example is part of an actual GEDCOM file created in 1998 which uses an old-style
unstructured address, which were already deprecated but still legal in GEDCOM 5.5. To
avoid giving a bad example, the old style address has been replaced with continuation dots.
{Size=1:3}COUNT_OF_CHILDREN:=
The known number of children of this individual from all relationships or, if subordinate to a
family group record, the reported number of children known to belong to this family group
(couple), regardless of whether the associated children are represented in the corresponding
structure. This is not necessarily equal to the number of children referenced in the family
group record.
## 79

{Size=4:35}DATE:=
## [
## <DATE_CALENDAR>
## |
<DATE_CALENDAR_ESCAPE>+ space +<DATE_CALENDAR>
## ]
where:
space=U+0020, the space character
## Date Calendar Escape Sequence
It is odd thatFamilySearch's lineage-linked form uses a GEDCOM escape sequence
to specify the calendar. The calendar could easily be expressed with say a
DATE.TYPErecord.
In fact, the GEDCOM 5.6 draft (2000CE) gets rid of the escape sequence by doing
just that; it introduces the optionalDATE.CLNDRrecord.
## Changes
FamilySearchkept changing its mind about the calendar escape sequence.
FamilySearchGEDCOM 4.0 introduced the calendar escape sequences, and
GEDCOM 5.0 still featured them.FamilySearchGEDCOM 5.3 features the calendar
escape sequences, but GEDCOM 5.4 does not, and states that“The Lineage-Linked
GEDCOM Form is restricted to Gregorian calendar forms.”.FamilySearch
GEDCOM 5.5 and 5.5.1 feature the calendar escape sequences, and GEDCOM 5.6
replaces it with a subrecord.
{Size=8:39}DATE_APPROXIMATED:=
## [
ABT+ space + <DATE> |
CAL+ space + <DATE> |
EST+ space + <DATE>
## ]
where:
ABT=About, meaning the date is not exact.
CAL=Calculated mathematically, for example, from an event date and age.
EST=Estimated based on an algorithm using some other event date.
space=U+0020, the Space character
## About Abt
TheFamilySearchGEDCOM specification provides three different date modifiers
for approximated dates, with three slightly different definitions. The implied demand
to use different date modifiers for slightly different situations is not placed on
genealogy software, but on users. In practice, users almost always useABT. Few
users even know that usage ofCALorESTis possible.
## 80

## About Family Tree Maker Abt
The<DATE_RANGE>annotationDate Modifiers in Family Tree Makerprovides a
compatibility note about date modifiers inFamily Tree Maker.
{Size=4:35}DATE_CALENDAR:=
## [<DATE_GREG>|<DATE_JULN>|<DATE_HEBR>|<DATE_FREN>]
The selection is based on the<DATE_CALENDAR_ESCAPE>that precedes the
<DATE_CALENDAR>value immediately to the left. If<DATE_CALENDAR_ESCAPE>
doesn't appear at this point, then@#DGREGORIAN@is assumed.
No future calendar types will use words (e.g., month names) from this list:FROM,TO,BEF,
AFT,BET,AND,ABT,EST,CAL, orINT.
When only a day and month appears as aDATEvalue it is considered a date phrase and not
a valid date form.
Date EscapeSyntax Selected
## @#DGREGORIAN@
## <DATE_GREG>
## @#DJULIAN@
## <DATE_JULN>
## @#DHEBREW@
## <DATE_HEBR>
## @#DFRENCHR@
## <DATE_FREN>
## @#DUNKNOWN@
calendar not known
GEDCOM supports a limited number of calendars. For now, the escape sequence
@#DUNKNOWN@should be used for dates in calendars not supported by GEDCOM.
## Swedish Calendar
It is surprising that even GEDCOM version 5.5.1 still doesn't support the Swedish
## Calendar.
All it takes is adding the escape@#DSWEDISH@to the specification.
Conversion between the Swedish, Julian and Gregorian Calendars is trivially easy.
Sweden is the only country to not simply switch from the Julian to the Gregorian
Calendar on a single day. Instead of simply skipping 11 calendar days as other
countries had done, Sweden decided to gradually switch from the Julian to the
Gregorian Calendar by omitting all the leap days in the period 1700 through 1740.
In 1700, Feb 29 was omitted from the Calendar. So, from that day forward, there was
as Swedish Calendar that was one day behind the Julian Calendar, and ten days
ahead of the Gregorian Calendar. The plan to omit the leap days from 1704 and 1708
wasn't executed: the difference with the Julian Calendar remained one day.
In 1711, Sweden decided to return to the Julian Calendar by adding an extra leap day
to 1712, hence the existence of 30 Feb 1712. 30 Feb 1712 in the Swedish Calendar
corresponds to 29 Feb 1712 in the Julian Calendar.
From 1 March 1712 forward, Sweden was using the Julian Calendar again, to
eventually adopt the Gregorian Calendar in 1753.
Date without Year
The <DATE_CALENDAR> definition states that“When only a day and month
appears as aDATEvalue it is considered a date phrase and not a valid date form.”.
## 81

Not allowing dates without a year is an unfortunate decision, and one that remains
unmotivated.
The reasonis notthat a value like23 Augis ambiguous, and could be understood
to mean either the 23rd of August or August in the year 23; itcannotbe interpreted
as latter, because GEDCOM demands that years are at least 3 digits longs.
It is quite common for people to know birthdays without knowing the birth year, or
remember a death date without the death year.
Knowing a date is so valuable in search for documents that could contain the year,
that applications should support dates without a year. GEDCOM readers should
accept such dates, but issue a warning that the year is missing.
{Size=4:15}DATE_CALENDAR_ESCAPE:=
## [@#DHEBREW@|@#DFRENCHR@|@#DGREGORIAN@|@#DJULIAN@|
## @#DUNKNOWN@]
The date escape determines the date interpretation by signifying which
<DATE_CALENDAR>to use. The default calendar is the Gregorian calendar.
## Supported Calendars
The selection of supported calendars reveals a Western bias.
There are many calendars the GEDCOM specification does not support, including
the Hijiri, Buddhist, Chinese, Japanese and Tibetan calendars.
Space in Calendar Escape
The French Calendar escape,@#DFRENCHR@, contains a space. This looks and
feels like a mistake, but theGEDCOM grammarallows it, and itiswhat genealogy
applications that support the French Revolutionary calendar use and expect.
## Known Error
At least one developer assumed the space to be a mistake.Alsyd Parentèle, later
MindScape Parentèle, now discontinued, exports@#DFRENCHR@(no space) instead
of@#DFRENCHR@.
The GEDCOM lineage-linked form does not define a date escape@#DFRENCHR@.
It is okay for a GEDCOM reader to issue a fatal error and abort upon encountering
calendar escape@#DFRENCHR@, but it is suggested that GEDCOM readers issue a
non-fatal error for each individual occurrence of@#DFRENCHR@, interpret it as
@#DFRENCHR@, and continue processing.
The Gregorian Calendar escape is superfluous
The Gregorian Calendar is the default calendar, so the Gregorian Calendar escape
(@#DGREGORIAN@) is technically superfluous.
## 82

GEDCOM Writer Best Practice
▪do not use the Gregorian Calendar escape (@#DGREGORIAN@)
GEDCOM Reader Best Practice
▪recognise and discard the Gregorian Calendar escape (@#DGREGORIAN@)
{Size=10:11}DATE_EXACT:=
<DAY>+ space +<MONTH>+ space +<YEAR>
where:
space = U+0020, the Space character
## Date Validation
TheFamilySearchGEDCOM specification says nothing about date validation.
Genealogy applications should make sure that dates are valid, and that includes
knowing the rules for leap years. Getting that right is a significant amount of work,
so most developers will want to rely on existing date processing libraries.
## References
Behold Blog: Out on Bad Date
{Size=4:35}DATE_FREN:=
## [
## <YEAR>
## |
<MONTH_FREN>+ space +<YEAR>
## |
<DAY>+ space +<MONTH_FREN>+ space +<YEAR>
## ]
where:
space = U+0020, the Space character
See<MONTH_FREN>, page 94.
{Size=4:35}DATE_GREG:=
## [
<YEAR>[ + space +<BEFORE_COMMON_ERA>]
## |
<MONTH>+ space +<YEAR>
## |
<DAY>+ space +<MONTH>+ space +<YEAR>
## |
<DAY>+ space +<MONTH>
## |
<MONTH>+ space +<DUAL_STYLE_YEAR>
## |
## 83

<DAY>+ space +<MONTH>+ space +<DUAL_STYLE_YEAR>
## ]
where:
space = U+0020, the Space character
Dual-style dates are explained in the<DUAL_STYLE_YEAR>definition.
{Size=4:35}DATE_HEBR:=
## [
## <YEAR>
## |
<MONTH_HEBR>+ space +<YEAR>
## |
<DAY>+ space +<MONTH_HEBR>+ space +<YEAR>
## ]
where:
space = U+0020, the Space character
See<MONTH_HEBR, page 94.
## Calendar Conversion
Genealogy application that show the Gregorian Date for a Hebrew date should take care
when converting the date.
In the Hebrew calendar, days start at sunset. When faced with a date without time
information, conversion between the Hebrew and Julian or Gregorian calendars should
calculate the so-calledtabular date, which is the corresponding date in the other calendar
that has the same daylight period.
## Anno Mundi
Previous versions of GEDCOM included an optional“B.C.”after a Hebrew year,
which is most definitely a specification error.
That christian phrase is only used with proleptic Julian and Gregorian Calendars, it is
never used with the Hebrew calendar.
A Hebrew date may beprecededby“AM”(without quotes), which is an
abbreviation ofAnno Mundi, Latin for“Year of the World”. Users who enter Hebrew
dates (with or without the@#HEBREW@escape) directly into the date field are not
unlikely to use this.
There is no proleptic Hebrew Calendar; the Hebrew Calendar is never used for dates
before AM1.
## Best Practice
▪GEDCOM writers should not write“AM”, as most GEDCOM readers won't
recognise this
▪GEDCOM readers should accept“AM”, as users may have entered this directly
{Size=4:35}DATE_JULN:=
## [
<YEAR>[ + space +<BEFORE_COMMON_ERA>]
## 84

## |
<MONTH>+ space +<YEAR>
## |
<DAY>+ space +<MONTH>+ space +<YEAR>
## |
<MONTH>+ space +<DUAL_STYLE_YEAR>
## |
<DAY>+ space +<MONTH>+ space +<DUAL_STYLE_YEAR>]
where:
space = U+0020, the Space character
Dual-style dates are explained in the<DUAL_STYLE_YEAR>definition.
{Size=7:35}DATE_PERIOD:=
## [
FROM+ space +<DATE>
## |
TO+ space +<DATE>
## |
FROM+ space +<DATE>+ space +TO+ space +<DATE>
## ]
where:
FROM=Indicates the beginning of a happening or state.
TO=Indicates the ending of a happening or state.
space=U+0020, the space character
## Examples:
## FROM1904TO1915
= The state of some attribute existed from 1904 to 1915 inclusive.
## FROM1904
= The state of the attribute began in 1904 but the end date is unknown.
## TO1915
= The state ended in 1915 but the begin date is unknown.
DATE_PERIODTOmeansTHROUGH
Note thatDATE_PERIOD'sTOis misnamed, and is used to meanTHROUGH.
{Size=1:35}DATE_PHRASE:=
## <TEXT>
Any statement offered in lieu of a date when the date is not recognisable to a date parser, but
which gives information about when an event occurred.
A date phrase must be enclosed in matching parentheses. That demand is not immediately
visible in the <DATE_PHRASE> definition, because it is made in the<DATE_VALUE>
definition.
## 85

## Date Phrase
The <DATE_PHRASE> is a bad idea because it enablesanythingin aDATEfield.
As a matter of principle, text that isn't a date should be in aNOTErecord, not inside
theDATEfield itself.
It is strongly recommended that genealogy software tries to keepsDATErecords
clean, by working with the user to relegate“date phrases”to aNOTE.
The only text that isn't recognised as a date yet should still be in a date field is a
valid date for a calendar that the application does not recognise or GEDCOM does
not support. User can actually mark such text as a valid date, for example by
including the escape@FRENCHR@if the application does not recognise French
Revolutionary dates, or the escape@DUNKNOWN@for dates in any calendar not
supported by GEDCOM.
## References
GEDCOM date phrases
{Size=8:35}DATE_RANGE:=
## [
BEF+ space +<DATE>
|AFT+ space +<DATE>
|BET+ space +<DATE>+ space +AND+ space +<DATE>
## ]
where:
AFT=Event happened after the given date.
BEF=Event happened before the given date.
BET=Event happened sometime between date 1 AND date 2
space=U+0020, the Space character
For example, bet 1904 and 1915
indicates that the event state (perhaps a single day) existed somewhere between 1904 and
1915 inclusive.
The date range differs from the date period in that the date range is an estimate that an event
happened on a single date somewhere in the date range specified.
The following are equivalent and interchangeable:
Short formLong Form
## 1852BET 1 JAN 1852 AND 31 DEC 1852
## 1852BET 1 JAN 1852 AND DEC 1852
## 1852BET JAN 1852 AND 31 DEC 1852
## 1852BET JAN 1852 AND DEC 1852
## JAN 1920BET 1 JAN 1920 AND 31 JAN 1920
Date Modifiers in Family Tree Maker
The date modifiersABT,BEF&AFTare three-letter abbreviations. Several old
versions of Family Tree Maker use the illegal four-letter abbreviationsABT.,BEF.
&AFT.instead; Family Tree Maker adds a fourth character, a full stop, to the
abbreviation while it should not.
A GEDCOM 5.5.5 readermustsupport the official date modifiers andmust not
## 86

support any others.
GEDCOM readers for older GEDCOM versions need not accept these illegal date
modifiers, but it is trivial to support. Even a GEDCOM reader that supports it should
still issue a non-fatal error for each occurrence.
Date Range in FamilySearch PAF
The ability to specify a <DATE_RANGE> is an important feature. Oddly,
FamilySearchPAF does not support it, but pops up a messagebox stating“The date
is not standard”when you use it. You can still use date ranges; PAF will
(erroneously) treat the <DATE_RANGE> as a <DATE_PHRASE>, and export it
exactly the way you entered it (without the enclosing parentheses mandatory for date
phrases), so genealogy applications that do support date ranges will import it just
fine.
Incidentally, PAFdoessupport<DATE_PERIOD>.
{Size=1:35}DATE_VALUE:=
## [
## <DATE>
## |
## <DATE_PERIOD>
## |
## <DATE_RANGE>
## |
## <DATE_APPROXIMATED>
## |
## (<DATE_PHRASE>)
## |
INT+ space +<DATE>+ space + (<DATE_PHRASE>)
## ]
The<DATE_VALUE>represents the date of an activity, attribute, or event where:
INT=Interpreted from knowledge about the associated date phrase included in
parentheses.
space=U+0020, the Space character
An acceptable alternative to the date phrase choice is to use one of the other choices such as
<DATE_APPROXIMATED>choice as theDATEline value and then include the date
phrase value as a NOTE value subordinate to theDATEline tag.
The date value can take on the date form of just a date, an approximated date, between a date
and another date, and from one date to another date. The preferred form of showing date
imprecision, is to show, for example,MAY 1890rather thanABT 12 MAY 1890. This is
because limits have not been assigned to the precision of the prefixes such asABTorEST.
## Approximate Exact Date
The <DATE_VALUE> definition does allowABTin front of an exact date; the valueABT
12 May 1890is legal, but applications should warn the user thatABTin front of an exact
date specifies an approximate exact date, which seems self-contradictory. Practically all
cases ofABTin front of an exact date should be eitherBEF(before) orAFT(after) in front
of that date.
## 87

Date Phrases in Parentheses
Note the parentheses around<DATE_PHRASE>; the <DATE_VALUE> definition demands
that all date phrases be enclosed in parentheses.
Date Phrases in PAF
FamilySearchPAF 5 includes<DATE_PHRASE>support, but PAF exports date phrases to
GEDCOM exactly the way users enter them,withoutthe mandatory enclosing parentheses.
This is wrong.
FamilySearch GEDCOM 5.5.1 PAF DATE record abusage
FamilySearch's own PAF does not respect the <DATE_VALUE> definition, but abuses date
fields in ways not intended or allowed by theFamilySearchGEDCOM specification. PAF
includes phrases such asNOT MARRIED,CHILD,STILLBORNandINFANTin date fields
(without the parentheses mandatory for date phrases).
PAF development was abandoned in 2012. There is no such thing as a PAF GEDCOM 5.5.5
file. A GEDCOM 5.5.5 readerneed notandmust notsupport these PAF forms.
## Best Practice
GEDCOM Writer Best Practice
▪Always use parentheses around date phrases as demanded by the GEDCOM
specification
GEDCOM Reader Best Practice
▪Make sure you recognise dates in all the supported calendars
▪Treat every date value you do not recognise as a date phrase
▪Issue an error for date phrase not enclosed in parentheses
## References
Behold blog: Out on a Bad Date
{Size=1:2}DAY:=
dd
Day of the month, where dd is a numeric value within the valid range of the days for the
associated calendar month.
This valuemust notstart with a leading zero.
## Date Validation
The description states that the day value must be legal; i.e. the value must be within
the valid range of dates for the month.
This demand implies thatgenealogy software is expected to validate datesupon both
user input and GEDCOM import.
When validating dates, applications should make sure that the day not only fits the
## 88

month, but - for leap days - the year and calendar as well.
## 30 Feb 1712
The date 30 Feb 1712 was a real date in Sweden. There are records with that date. 30
Feb 1712 on theSwedish Calendarcorresponds with 29 Feb 1712 on the Julian
Calendar. 30 Feb 1712 isn't a date on either the Julian or Gregorian calendar, but
only on theSwedish Calendar, which even GEDCOM version 5.5.1 still fails to
support.
{Size=1:248}DESCRIPTIVE_TITLE:=
The title of a work, record, item, or object.
{Size=1:1}DIGIT:=
A single digit (0-9).
{Size=3:7}DUAL_STYLE_YEAR:=
<YEAR>+ slash + <DIGIT> +<DIGIT>
where:
slash=U+002F, the Slash character
The three-character part after the year (slash + <DIGIT> + <DIGIT>) is the alternate year
indicator.
The alternate year indicator doesnotindicate that the date is uncertain. It createsdual style
date, which indicates that the year is either the one or the other year, depending on the
calendar style. The full year is the Old Style year, the two digits indicate the New Style year.
Dual-Style Dates
The alternate year indicator always has two digits, never one or three, and always indicates
the subsequent year. The alternate date indicator must consist of the last two digits of the
next year; anything else is a syntax error andnot a date.
Old Style and New Style
There are two calendar styles, the OldStyle (OS) calendar and the NewStyle (NS) calendar.
The Old Style calendar starts the year on the 25th of March while the New Style starts the
year on the 1st of January.
## Calendar Act
Before 1752, the English used both what was then known as the Historical Year, starting on
January 1, and the Civil Year or Legal Year, starting on March 25. That is why Dual-style
dates are common in pre-1752 English parish registers.
The Calendar Act of 1750 ended the practice of using both calendar styles by changing the
Legal Year to start on January 1, just like the Historical Year.
Many European countries switched from the Julian to the Gregorian Calendar in 1582,
England continued to use the Julian Calendar through 1752. The Calendar Act of 1750
enacted two changes; it changed the calendar date on which the Legal Year begins, and it
changed the calendar from the Julian Calendar to the Gregorian Calendar. The Legal Year
1751 ran from 25 March 1751 till 1 January 1752. Wednesday 2September1752JC was
followed by Thursday14Sep1752GC.
## 89

Dual Style resolves Ambiguity
The simultaneous use of Old Style and New Style before 1752 created ambiguity; the 21st of
February might be in the year 1750 according to the Old Style calendar, but in the year 1751
according to the New Style calendar. I could write“21Feb1751”hoping that you assume it
is New Style, but I might assume wrongly, and if you believe it to be an Old Style date, you
might misinterpret it as 21Feb1752 New Style. Writing it as“21Feb1750/51”
disambiguates the date, by providing the years for both styles: it explicitly states that it is
21Feb1750 OldStyle and 21Feb1751 NewStyle, no confusion possible.
The Old Style year is listed first, the New Style year is listed second. The second year is
always the next year, is always indicated by exactly two digits, the last two digits of that
year. So“21Feb1750/52”is illegal,“21Feb1759/60”involves the years 1759 and 1760,
while“21Feb759/0”is illegal. Even“21Feb1759/1760”, arguably an easier to understand
more straightforward syntax, is illegal.
## Usage
Dual styling may be needed for dates in January, February and most of March (up to, but not
including March 25). For the rest March, and all of April through December, the Old Style
calendar and the New Style calendar agree on the year, so those dates must not be dual-
styled. Using dual-style for a date that isn't ambiguous does not create ambiguity, it creates
not a date.
## Historic Names
Historically, many authors and publications have referred to dual style dates as double dates
or dual dating. Those ill-considered names create confusion by suggesting that there are two
different dates, while that is not the case at all. There is a single date, in two different
calendar styles, hencedual style date.
## Dual Calendaring
There is also a dual-calendar practice used because of the change from the Julian Calendar
(JC) to the Gregorian Calendar (GC, usually indicated withCE). For example,“2/
12May1608”is 2May1608JC and 12May1608CE.
This dual-calendaring practice is not supported by GEDCOM; GEDCOM demands that you
pick a calendar.
Within GEDCOM, the Gregorian Calendar is the default calendar, but several other
calendars, including the Julian Calendar, can be specified through the
## <DATE_CALENDAR_ESCAPE>.
## Restrictions
Genealogy applications must ensure correct usage of dual-style dates by enforcing
appropriate restrictions.
▪Dual style dates may only be used with the Julian and Gregorian Calendar
▪The use of two years is indicated by a slash (never a hyphen or any other character)
▪The slash must always be followed by two digits, never more or less
▪The year indicated by those digits must be the next year
▪Dual style may only be used for otherwise ambiguous dates, so only for Jan 1 through
## March 24
▪Dual style may only be used for the year 1923 and earlier
## 90

## References
GEDCOM Dual-Style Dates
{Size=1:90}ENTRY_RECORDING_DATE:=
## <DATE_VALUE>
The date that this event data was entered into the original source document.
{Size=1:15}EVENT_ATTRIBUTE_TYPE:=
## [<EVENT_TYPE_INDIVIDUAL>|
## <EVENT_TYPE_FAMILY>|
## <ATTRIBUTE_TYPE>]
A code that classifies the principal event or happening that caused the source record entry to
be created. If the event or attribute doesn't translate to one of these tag codes, then a user
supplied value is expected and will be generally classified in the category of other.
{Size=1:90}EVENT_DESCRIPTOR:=
Text describing a particular event pertaining to the individual or family. This event value is
usually assigned to theEVENtag. The classification as to the difference between this
specific event and other occurrences of theEVEN(event) tag is indicated by the use of a
subordinateTYPEtag selected from the<EVENT_DETAIL>structure. For example:
1 EVEN Appointed Zoning Committee Chairperson
2 TYPE Civic Appointments
## 2 DATE FROM JAN 1952 TO JAN 1956
2 PLAC Cove, Cache, Utah, United States of America
2 AGNC Cove City Redevelopment
{Size=1:90}EVENT_OR_FACT_CLASSIFICATION:=
A descriptive word or phrase used to further classify the parent event or attribute tag. This
should be used whenever either of the genericEVENorFACTtags are used. The value of
this primitive is responsible for classifying the generic event or fact being cited. For
example, if the attribute being defined was one of the persons skills, such as woodworking,
theFACTtag would have the value of `Woodworking', followed by a subordinateTYPEtag
with the value `Skills'.
1 FACT Woodworking
2 TYPE Skills
This groups the fact into a generic skills attribute, and in particular this entry records the fact
that this individual possessed the skill of woodworking. Using the subordinateTYPEtag
classification method with any of the other defined event tags provides a further
classification of the parent tag but does not change the basic meaning of the parent tag. For
example, aMARRtag could be subordinated with aTYPEtag with an
<EVENT_OR_FACT_CLASSIFICATION>value of `Common Law.'
## 1 MARR
2 TYPE Common Law
This classifies the entry as a common law marriage but the event is still a marriage event.
Other descriptor values might include, for example,`stillborn' as a qualifier toBIRT(birth)
or `Tribal Custom' as a qualifier toMARR(relationship).
The <EVENT_OR_FACT_CLASSIFICATION> is an open-ended feature.
There is no list of pre-defined, accepted or suggested descriptor values.
## 91

TYPE tag Correction
TheFamilySearchGEDCOM 5.5.1 description for
<EVENT_OR_FACT_CLASSIFICATION> references <EVENT_DESCRIPTOR>
instead of <EVENT_OR_FACT_CLASSIFICATION> as intended.
This is an editing error, made upon the introduction ofFACTandFACT.TYPEin
GEDCOM 5.5.1. This specification error has been highlighted in theAnnotated
Editionand corrected in GEDCOM 5.5.5.
This error was first noted byKeith Riggleand mentioned in several software
reviews. It was documented byTim Forsythein his 22 Dec 2015 GigaTrees blog
postA New GEDCOM 5.5.1 Wrinkle, but that blog post is no longer available. It is
now documented inKeith Riggle's own blog postThe Event Structure in GEDCOM
## Files.
## References
GenealogyTools: The Event Structure in GEDCOM Files
{Size=1:15}EVENT_TYPE_CITED_FROM:=
## [<EVENT_ATTRIBUTE_TYPE> ]
A code that indicates the type of event which was responsible for the source entry being
recorded. For example, if the entry was created to record a birth of a child, then the type
would beBIRTregardless of the assertions made from that record, such as the mother's
name or mother's birth date. This will allow a prioritised best view choice and a
determination of the certainty associated with the source used in asserting the cited fact.
{Size=3:4}EVENT_TYPE_FAMILY:=
## [ANUL|CENS|DIV|DIVF|ENGA|MARR|
## MARB|MARC|MARL|MARS|EVEN]
A code used to indicate the type of family event. The definition is the same as the
corresponding event tag defined in Appendix A. (SeeAppendix A, page 121).
{Size=3:4}EVENT_TYPE_INDIVIDUAL:=
## [ADOP|BIRT|BAPM|BARM|BASM|
## BURI|CENS|CHR|CHRA|
## CONF|CREM|DEAT|EMIG|FCOM|
## GRAD|IMMI|NATU|
## RETI|PROB|WILL|EVEN]
A code used to indicate the type of individual event. The definition is the same as the
corresponding event tag defined in Appendix A. (SeeAppendix A, page 121).
{Size=1:90}EVENTS_RECORDED:=
## [<EVENT_ATTRIBUTE_TYPE>|
## <EVENTS_RECORDED>,<EVENT_ATTRIBUTE_TYPE>]
An enumeration of the different kinds of events that were recorded in a particular source.
Each enumeration is separated by a comma. Such as a parish register of births, deaths, and
marriages would beBIRT,DEAT,MARR.
## 92

{Size=10:11}FILE_CREATION_DATE:=
## <DATE_EXACT>
The date that this GEDCOM file was created.
{Size=1:248}GEDCOM_CONTENT_DESCRIPTION:=
A note that a user enters to describe the contents of the lineage-linked file in terms of
"ancestors or descendants of" so that the person receiving the data knows what genealogical
information the file contains.
This value occurs in the GEDCOM header; usage ofCONCorCONTrecords is not
allowed.
{Size=5:248}GEDCOM_FILE_NAME:=
The name of the GEDCOM file. A GEDCOM file name should use the format
basename.ext, and use the file extension.GED(or.ged). GEDCOM 5.5.5 increases the
maximum file name length from 90 to 248 code units.
The <GEDCOM_FILE_NAME> is specified as theHEAD.FILEline value. The
HEAD.FILEline value should match the name of the GEDCOM file itself, but when a
GEDCOM file is renamed by a user, theHEAD.FILEline value does not change with the
file name.
<GEDCOM_FILE_NAME> should be just the regular file name (base name plus extension),
withouta file path. The file name shouldnotbe enclosed in parentheses.
Whether file names are case-sensitive is platform-dependant. All GEDCOM reader and
writer file handling code should be case-preserving.
GEDCOM Writer Checklist
▪The line value must be the name of the GEDCOM file itself.
▪Use only the regular filename (basename plus extension)
▪Do notinclude a file path
▪Doinclude the file extension.
▪Use the file extension.GEDor.ged
▪Do notuse parentheses around the name.
▪File handling code must be case-preserving.
{Size=1:30}ID_NUMBER:=
A third-party number assigned to an individual.
ThisIDNOline value must be used for all third party numbers. TheIDNOrecord has a
TYPEsubrecord to identify what kind of number is being stored.
For example:
## 1 IDNO 43-456-1899
2 TYPE Canadian Health Registration
TheIDNOrecord is not restricted to national numbers. TheIDNOrecord should be used for
all third-party numbers, and theREFNrecord for all user-defined numbers.
{Size=1:15}LANGUAGE_ID:=
A list of valid language identification codes.
The following Latin language codes may be used by all systems (including codepage-based
systems):
[Afrikaans|Albanian|Anglo-Saxon|Catalan|Catalan_Spn|Czech|Danish|Dutch|
## 93

English|Esperanto|Estonian|Faroese|Finnish|French|German|Hawaiian|
Hungarian|Icelandic|Indonesian|Italian|Latvian|Lithuanian|Navaho|Norwegian|
Polish|Portuguese|Romanian|Serbo_Croa|Slovak|Slovene|Spanish|Swedish|
Turkish|Wendic]
Additional languages supported by Unicode-based systems:
[Amharic|Arabic|Armenian|Assamese|Belorusian|Bengali|Braj|Bulgarian|
Burmese|Cantonese|Church-Slavic|Dogri|Georgian|Greek|Gujarati|Hebrew|
Hindi|Japanese|Kannada|Khmer|Konkani|Korean|Lahnda|Lao|Macedonian|
Maithili|Malayalam|Mandarin|Manipuri|Marathi|Mewari|Nepali|Oriya|Pahari|
Pali|Panjabi|Persian|Prakrit|Pusto|Rajasthani|Russian|Sanskrit|Serb|Tagalog|
Tamil|Telugu|Thai|Tibetan|Ukrainian|Urdu|Vietnamese|Yiddish]
{Size=1:15}LANGUAGE_OF_TEXT:=
## [<LANGUAGE_ID>]
The human language in which the data in the GEDCOM file is normally read or written. It is
used primarily by programs to select language-specific sorting sequences and phonetic name
matching algorithms.
{Size=3}MONTH:=
## [JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC]
where:
JAN=January
FEB=February
MAR=March
APR=April
MAY=May
JUN=June
JUL=July
AUG=August
SEP=September
OCT=October
NOV=November
DEC=December
{Size=4}MONTH_FREN:=
## [VEND|BRUM|FRIM|NIVO|PLUV|VENT|GERM|
## FLOR|PRAI|MESS|THER|FRUC|COMP]
where:
## VEND=VENDEMIAIRE
## BRUM=BRUMAIRE
## FRIM=FRIMAIRE
## NIVO=NIVOSE
## PLUV=PLUVIOSE
## VENT=VENTOSE
## GERM=GERMINAL
## FLOR=FLOREAL
## PRAI=PRAIRIAL
## MESS=MESSIDOR
## THER=THERMIDOR
## FRUC=FRUCTIDOR
## COMP=JOUR_COMPLEMENTAIRS
{Size=3}MONTH_HEBR:=
## [TSH|CSH|KSL|TVT|SHV|ADR|ADS|
## NSN|IYR|SVN|TMZ|AAV|ELL]
## 94

where:
TSH=Tishri
CSH=Cheshvan
KSL=Kislev
TVT=Tevet
SHV=Shevat
ADR=Adar
ADS=Adar Sheni
NSN=Nisan
IYR=Iyar
SVN=Sivan
TMZ=Tammuz
AAV=Av
ELL=Elul
{Size=1:259}MULTIMEDIA_FILE_REFERENCE:=
A complete local or remote file reference to the auxiliary data to be linked to the GEDCOM
context. Remote reference would include a network address where the multimedia data may
be obtained.
The<MULTIMEDIA_FILE_REFERENCE>definition is for multimedia files only.
The GEDCOM specification has a separate<GEDCOM_FILE_NAME>definition for the
HEAD.FILEline value.
Whether file names are case-sensitive is platform-dependant. Make sure your file handling
code is case-preserving.
The maximum path length specified by GEDCOM 5.5.1 was only 30 code units, which isn't
a realistic maximum length for a full path.
TheAnnotated Editioncorrected the maximum to be 259 code units. GEDCOM 5.5.5 makes
that the official maximum length.
{Size=3:4}MULTIMEDIA_FORMAT:=
[AAC|AVI|BMP|ePub|FLAC|GIF|JPEG|JPG|MKV|mobi|MP3|PCX|PDF|
## PNG|TIFF|TIF|WAV]
where:
AAC=Advanced Audio Codec
AVI=Audio Video Interleaved (Windows)
BMP=BitMaP (Windows)
ePUB=Electronic Publication (ebook)
FLAC=Free Lossless Audio Codec
GIF=Graphics Interchange Format (CompuServe)
JPEG,JPG=Joint Photographic Experts Group
MKV=Matroska Video Container
mobi=MobiPocket (ebook)
MP3=MPEG-2 Audio Layer III
PCX=Personal Computer eXchange (PaintBrush)
PDF=Portable Document Format
PNG=Portable Network Graphics
TIFF,TIF=Tagged Image File Format
WAV=WAVeform audio file format (Windows)
Indicates the format of the multimedia data associated with the specific GEDCOM context.
This allows processors to determine whether they can process the data object. Any linked
files should contain the data required, in the indicated format, to process the file data.
GEDCOM readers must accept any casing for the enumerated formats, but GEDCOM
writers should use the casing preferred in text written for humans.
GEDCOM 5.5.5 expands the list of allowed multimedia formats. The fact that the
enumeration of allowed formats is supposed to be exhaustive remains a fundamental issue.
## 95

Four-LetterJPEG&TIFFversus Three-LetterJPG&TIF
The GEDCOM 5.5 specification includes the four-letter valuesJPEGandTIFF, while the
GEDCOM 5.5.1 specification includes the three-letter valuesJPGandTIF, probably
because some editor thought they should allow three-letters values only. That edit should not
have been made, because now the two three-letter values are invalid in GEDCOM 5.5 while
the four-letter values are invalid in GEDCOM 5.5.1.
Of course, in practice, most GEDCOM 5.5.1 reader accept the four-letter value without so
much as a warning, but many GEDCOM 5.5 readers do not accept the three-letter values.
GEDCOM 5.5.5 uses the four-letter abbreviations, not only because those are the original
abbreviations, but also because these are ones already supported bybothGEDCOM 5.5 and
GEDCOM 5.5.1 readers.
A GEDCOM 5.5.5 writer must useJPEG&TIFFexclusively. Systems must continue to
supportJPG&TIFwhen reading GEDCOM 5.5.1 files.
{Size=1:90}NAME_OF_BUSINESS:=
Name of the business, corporation, or person that produced or commissioned the product.
{Size=1:90}NAME_OF_PRODUCT:=
The name of the software product that produced this GEDCOM file.
{Size=1:90}NAME_OF_REPOSITORY:=
The official name of the archive in which the stated source material is stored.
{Size=1:90}NAME_OF_SOURCE_DATA:=
The name of the electronic data source that was used to obtain the data in this GEDCOM
file. For example, the data may have been obtained from a CD-ROM disc that was named
“U.S. 1880 CENSUS CD-ROM vol. 13”.
{Size=1:120}NAME_PERSONAL:=
## [
## <NAME_TEXT>
## |
## /<NAME_TEXT>/
## |
<NAME_TEXT>+ space + /<NAME_TEXT>/
## |
/<NAME_TEXT>/ + space +<NAME_TEXT>
## |
<NAME_TEXT>+ space + /<NAME_TEXT>/ + space +<NAME_TEXT>
## ]
where:
space=U+0020, the Space character
The surname of an individual, if known, is enclosed between two slash (/) characters. The
order of the name parts should be the order that the person would, by custom of their culture,
have used when giving it to a recorder. Early versions ofPersonal Ancestral File
## ®
and other
products did not use the trailing slash when the surname was the last element of the name. If
part of a name is illegible, that part is indicated by an ellipsis (...). Capitalize the name of a
person or place in the conventional manner — capitalize the first letter of each part and
lowercase the other letters, unless conventional usage is otherwise. For example: McMurray.
## 96

## Examples
William Lee /Parry/given name William Lee, surname Parry
William Leegiven name only or surname not known
/Parry/surname only
William Lee /Mac Parry/both Mac and Parry are part of the surname Mac Parry
William /Parry/ Boatsmansurname Parry embedded in the name string
William Lee /Pa.../surname partly unknown (unreadable)
## Name Guidelines
TheFamilySearchGEDCOM specification for <NAME_PERSONAL> includes a
few quick guidelines on how to record names. The key guideline provided here is to
capitalise names in the conventional manner (sonotin ALL-CAPS).
The articleGenealogy Name Basicsprovides moredo's and don'ts.
## References
## Genealogy Name Basics
Five Freaky Features Your Genealogy Software shouldnothave
{Size=1:120}NAME_PHONETIC:=
The phonetic variation of the name is written in the same form as the name used in the
superior<NAME_PERSONAL>primitive, but phonetically written using the method
indicated by the subordinate<PHONETISATION_METHOD>value, For example if
hiragana was used to provide a phonetic transcription of a name written in kanji. then the
<PHONETISATION_METHOD>value would indicate ‘kana’. See
<PHONETISATION_METHOD>, page 100.
{Size=1:90}NAME_PIECE:=
The piece of the name pertaining to the name part of interest. The surname part, the given
name part, the name prefix part, or the name suffix part.
{Size=1:120}NAME_PIECE_GIVEN:=
[<NAME_PIECE>|<NAME_PIECE_GIVEN>,<NAME_PIECE>] Given name or earned
name. Different given names are separated by a comma.
{Size=1:30}NAME_PIECE_NICKNAME:=
[<NAME_PIECE>|<NAME_PIECE_NICKNAME>,<NAME_PIECE>] A descriptive or
familiar name used in connection with one's proper name.
{Size=1:30}NAME_PIECE_PREFIX:=
## [<NAME_PIECE>|<NAME_PIECE_PREFIX>,<NAME_PIECE>]
Non indexing name piece that appears preceding the given name and surname parts.
Different name prefix parts are separated by a comma.
For example:
Lt. Cmndr.Joseph /Allen/ jr.
In this exampleLt. Cmndr.is considered as the name prefix portion.
## 97

## Nobility Titles
The <NAME_PIECE_PREFIX> should not be used for recording nobility titles.
Nobility titles must be recorded as the<NOBILITY_TYPE_TITLE> line value of an
INDI.TITLrecord.
{Size=1:30}NAME_PIECE_SUFFIX:=
## [<NAME_PIECE>|<NAME_PIECE_SUFFIX>,<NAME_PIECE>]
Non-indexing name piece that appears after the given name and surname parts. Different
name suffix parts are separated by a comma.
For example:
Lt. Cmndr. Joseph /Allen/jr.
In this examplejr.is considered as the name suffix portion.
{Size=1:120}NAME_PIECE_SURNAME:=
[<NAME_PIECE>|<NAME_PIECE_SURNAME>,<NAME_PIECE>] Surname or
family name. Different surnames are separated by a comma.
{Size=1:30}NAME_PIECE_SURNAME_PREFIX:=
## [<NAME_PIECE>]
Surname prefix or article used in a family name.
A surname prefix that consists of multiple parts is writtenas is, and not modified in any way.
Thus, the surname prefix for the surname“delaCruz”is“dela”.
FamilySearch's instruction, present in GEDCOM 5.5 and 5.5.1, to comma-separate parts of
the surname prefix, and write“de,la”instead of“dela”must be ignored, even in GEDCOM
5.5 and 5.5.1 files.
That erroneous instruction remains unmotivated, and no genealogy application is known to
follow it. Modifying a surname prefix by inserting one or more commas is sure to create
those superfluous commas in your reports.
{Size=1:120}NAME_ROMANISED:=
The romanised name is written in the same form prescribed for the name used in the superior
<NAME_PERSONAL>context. The method used to romanise the name is indicated by the
line value of the subordinate<ROMANISATION_METHOD>. For example if romaji was
used to provide a transliteration of a name written in kanji, then the
<ROMANISATION_METHOD>subordinate to theROMNtag would indicateromaji.
See<ROMANISATION_METHOD>, page 105.
{Size=1:120}NAME_TEXT:=
<TEXT>excluding commas, numbers, special characters not considered diacritics.
{Size=5:30}NAME_TYPE:=
## [aka|birth|immigrant|maiden|married| <userdefined>]
Indicates the name type, for example the name issued or assumed as an immigrant.
aka=also known as, alias, etc.
birth=name given on birth certificate.
immigrant=name assumed at the time of immigration.
maiden=maiden name, name before first marriage.
married=name was person's previous married name.
## 98

userdefined=other text name that defines the name type.
{Size=1:120}NATIONAL_OR_TRIBAL_ORIGIN:=
The person's division of national origin or other folk, house, kindred, lineage, or tribal
interest. Examples: Irish, Swede, Egyptian Coptic, Sioux Dakota Rosebud, Apache
Chiricawa, Navajo Bitter Water, Eastern Cherokee Taliwa Wolf, and so forth.
{Size=1:120}NOBILITY_TYPE_TITLE:=
The title given to or used by a person, especially of royalty or other noble class within a
locality.
{Size=0:0}NULL:=
A convention that doesnotindicate the line valueNULL, nor the Null character (U+0000),
but the complete absence of a line value.
{Size=3:4}NUMBER:=
## [<DIGIT>|<NUMBER>+<DIGIT>]
<NUMBER> Size
<NUMBER> definition only occurs in the definition of<YEAR_GREG>. As a year
is at least three digits long (see<YEAR_GREG>definition), at most 4 digits long;
GEDCOM will surely have been replaced before 10.000CE.
{Size=1:3}NUMBER_OF_RELATIONSHIPS:=
The number of different relationships (family groups) that this person was known to have
been a member of as a partner, regardless of whether the associated relationships are present
in the GEDCOM file.
{Size=1:90}OCCUPATION:=
The kind of activity that an individual does for a job, profession, or principal activity.
{Size=5:7}PEDIGREE_LINKAGE_TYPE:=
## [adopted|birth|foster]
where:
adopted=indicates adoptive parents.
birth=indicates official parents (birth parents).
foster=indicates child was included in a foster or guardian family.
A code used to indicate the child to family relationship for pedigree navigation purposes.
When <PEDIGREE_LINKAGE_TYPE> is absent, official parentage (birth) is assumed.
GEDCOM 5.5.5 is essentially GEDCOM 5.5.1 from 1999. GEDCOM 5.5.1 predates both
affordable consumer DNA testing and the Genealogy Framework. That explains why
GEDCOM 5.5.5 supports official genealogy (birth parents are the parents on the birth
certificate), but does not support biological genealogy (parents confirmed by DNA tests) yet.
{Size=1:25}PHONE_NUMBER:=
A phone number.
## 99

{Size=5:30}PHONETISATION_METHOD:=
[<user defined> |hangul|kana]
The phonetisation method used for creating the phonetic text.
<user defined>=record method used to arrive at the phonetic variation of the name.
Hangul=Phonetic method for transcribing Korean glyphs.
kana=Hiragana and/or Katakana characters were used in transcribing the
kanji character used by Japanese
{Size=1:4095}PHYSICAL_DESCRIPTION:=
An unstructured list of the attributes that describe the physical characteristics of a person,
place, or object.
Commas separate each attribute.
## Example:
1 DSCR Hair Brown, Eyes Brown, Height 5 ft 8 in
## 2 DATE 23 JUL 1935
{Size=2:10}PLACE_LATITUDE:=
The value specifying the latitudinal coordinate of the place name. The latitude coordinate is
the direction North or South from the equator in degrees and fraction of degrees carried out
to give the desired accuracy. For example: 18 degrees, 9 minutes, and 3.4 seconds North
would be formatted as N18.150944. Minutes and seconds are converted by dividing the
minutes value by 60 and the seconds value by 3600 and adding the results together. This sum
becomes the fractional part of the degree’s value.
The shortest possible value is“N0”, the longest possible value, with 6 decimals precision is
## “N89.123456”.
{Size=2:11}PLACE_LONGITUDE:=
The value specifying the longitudinal coordinate of the place name. The longitude
coordinate is Degrees and fraction of degrees east or west of the zero or base meridian
coordinate. For example: 168 degrees, 9 minutes, and 3.4 seconds East would be formatted
as E168.150944.
The shortest possible value is“E0”, the longest possible value, with 6 decimals precision is
## “E179.123456”.
Latitude and Longitude Standard
TheFamilySearchGEDCOM specification provides a brief specification of how to
record latitude and longitude in the <PLACE_LATITUDE> and
<PLACE_LONGITUDE> definitions.
Standard formats for geographical coordinates are defined ISO 6709Standard
representation of geographic point location by coordinates.
This format always uses a full stop (.), never a comma (,), as a decimal stop.
Use of the characters N and S for North and South, and E and W for East and West
as sign characters is defined in Annex H.
Several applications use the plus (+) and minus (-) sign as sign characters.
GEDCOM readers should accept both styles.
{Size=1:120}PLACE_NAME:=
## [
## 100

## <PLACE_TEXT>|
<PLACE_TEXT>, + space +<PLACE_NAME>
## ]
where:
space = U+0020, the Space character
The jurisdictional name of the place where the event took place. Jurisdictions are separated
by a comma and space combination. For example: "Cove, Cache, Utah, United States of
## America".
No part of the place name may be replaced by an abbreviation. Place names are not
terminated by a full stop or anything else.
{Size=1:120}PLACE_PHONETIC:=
The phonetic variation of the place name is written in the same form as was the place name
used in the superior<PLACE_NAME>primitive, but phonetically written using the method
indicated by the subordinate<PHONETISATION_METHOD>value. For example if
hiragana was used to provide a phonetic transcription of a name written in kanji, then the
<PHONETISATION_METHOD>value would indicate kana. (See
PHONETISATION_METHOD, page 100.)
{Size=1:120}PLACE_ROMANISED:=
The romanised transcription of the place name is written in the same form prescribed for the
place name used in the superior<PLACE_NAME>context. The method used to romanise
the name is indicated by the line value of the subordinate<ROMANISATION_METHOD>,
for example if romaji was used to provide a transcription of a place name written in kanji,
then the<ROMANISATION_METHOD>subordinate to theROMNtag would indicate
‘romaji’ (SeeROMANISATION_METHOD.), page 105
{Size=1:120}PLACE_TEXT:=
<TEXT>excluding any commas.
A fully specified place name exists of several parts, from place name up to country,
separated by comma & space combinations, <PLACE_TEXT> is one such place name part.
As place name parts are separated by commas, including any commas within a place name
part would create confusion, so they have to be left out.
## Example
An example of a place name that includes a comma is“De Mijl, Krabbe en Nadort”(without
quotes), which existed in the province of Noord-Brabant in the Netherlands. That place
should be specified as“De Mijl Krabbe en Nadort, Noord-Brabant, Netherlands”(without
quotes).
Violation of Place Name Guidelines
The demand to leave out commas violates basic place name guidelines.Thebasic
guideline is to enter place name partsas-is, and that means that you should always
use full names, never abbreviations, and always use just the actual name, without
anything added to it, and without leaving anything out.
The GEDCOM specification demands one exception to this rule: leave commas out
of place names. The GEDCOM specification makes that demand because GEDCOM
cannot support place names that include commas correctly.
TheFamilySearchGEDCOM creators probably thought such place names do not
exist, and later discovered that such names do exist. You should include such place
## 101

names without their comma, just as theFamilySearchGEDCOM specification
demands.
## References
## Place Name Standardisation Basics
{Size=1:248}POSSESSIONS:=
A list of possessions (real estate or other property) belonging to this individual.
{Size=3:15}PRODUCT_VERSION_NUMBER:=
MMM + dot + mmm [ + dot + rrr [ + dot + bbb ] ]
where:
MMM=1 through 3 digits; the major version number
mmm=1 through 3 digits; the minor version number
rrr=1 through 3 digits; the revision number
bbb=1 through 3 digits; the build number
dot=U+002E, the Full Stop character
The version of the product that created the GEDCOM file.
The product version number is controlled by the developers of the product, butmustbe in
this format, andshouldcomply with common software industry version number practices
briefly mentioned here.
The product version numbermustbe provided through
<PRODUCT_VERSION_NUMBER> and should not occur anywhere else. Specifically, the
version numbermust notbe used as part of the product name, but it is allowed to use a
marketing versionin the product name; e.g.“Family Tree Maker 2017”is a marketing
version of the Family Tree Maker product. System version and build information is
conveyed throughHEAD.SOUR.VERand throughHEAD.SOUR.VERSonly.
## Four Values
A product version consists of at least two and most four dot-separated values in
major.minor.revision.buildformat. The four parts of themajor.minor.revision.buildformat
are:
The four parts of themajor.minor.revision.buildformat are:
major=the major version number; starts at 0 (zero).
minor=the minor version number; starts at 0 for each newmajorversion.
revision=the revision number; starts at 0 for each newmajor.minorversion.
build=the build number formajor.minor.revision.
Dot-Separated Values
The full stops used in version numbers are known as dots, but pronounced as“point”. A
version number never begins or ends with a dot, it always begins and ends with a digit.
Values used must appear in the order shown. The major and minor version number are both
mandatory. The minor version number must included, even if it is zero.
The revision number may be left off when it zero.
The build number is optional too, but may only be included if all the other three values are
included. All missing values must be assumed to be zero.
Themajorversion number signals a major new release, often available as an paidupgrade.
Theminorversion number version number signals a significant update of the same release,
## 102

often available as a freeupdate. Therevisionnumber signals a lesser update, typically
available as a freehotfix.
While the first public release of a product may have version number 1.0, earlier development
releases should have version numbers too.
Each value consists at most 3 digits. No other characters are allowed. Zeroes are allowed,
leading zeroes are not;0.99is a valid version number, and so is1.0, but1.01is not.
Trailing zeroes must not be left out and aren't implied; version2.1and version2.10are
two different versions, and version2.1comes before version2.9. The minimum version
number is0.1. The maximum version number is999.999.999.999.
## Build Number
The build number is a number that is different for each build of the same
major.minor.revisionversion, and may indicate the platform the code was build for.
Genealogy software developers that wish to distinguish between 32-bit and 64-bit builds
must notdo so by messing with themajor.minor.revisionversion, but may opt to use build
number32and build number64to indicate the 32-bit and 64-bit builds respectively.
Systems that use the build number to indicate 32-bit and 64-bit build must always specify all
four values.
Many developers use an ever-increasing build number for their product, and can continue
doing so, but that product build number must not be used as part of the
<PRODUCT_VERSION_NUMBER>. Developers that wish to include their product build
number in a GEDCOM file may use it as part of the product name.
Microsoft uses the words build and revision differently; if your genealogy system is a
Microsoft.NET application, do not worry too much about it, simply use
major.minor.build.revisionas defined within .NET, and you should be fine.
{Size=10:11}PUBLICATION_DATE:=
## <DATE_EXACT>
The date this source was published or created.
{Size=1:20}RECEIVING_SYSTEM_NAME:=
The system identifier of the system expected to process the GEDCOM file.
GEDCOM Interpretation
All GEDCOM writers must default theHEAD.DESTvalue to their own system
identifier.
TheHEAD.DESTvalue specifies the interpretation of any GEDCOM extensions. In a
typical GEDCOM file theHEAD.SOURandHEAD.DESTvalues are identical; and the
meaning of that typical situation is that the GEDCOM writer used its own GEDCOM
extensions, if any.
A GEDCOM 5.5.5 writer should only specify another system identifier than its own, when
the GEDCOM file is intended for import by a specific system, and the GEDCOM writer
produces GEDCOM extensions for that systeminstead ofits own. This is not a generally
recommended practice, but can be handy when producing GEDCOM files for some
particular third party system. While theHEAD.DESTvalue may be a system identifier for
an old and no longer supported system, it may only be a system identifier for a system
known to support GEDCOM 5.5.5.
## Nonsense Values
GEDCOM specifications before the GEDCOM 5.5.1 Annotated Edition (2018CE) failed to
clearly specify the usage of theHEAD.DESTvalue. Many GEDCOM 5.5 and 5.5.1 files
contain nonsense values such asANY,GEDCOM,GEDCOM55, andOther, despite the fact
## 103

that the spec demands the value to be a system identifier.
GEDCOM 5.5.5 demands that theHEAD.DESTvalue is a real system identifier. Known
nonsense values must not be used as system identifiers.
A GEDCOM 5.5.5 validator must issue a strong warning when theHEAD.SOURand
HEAD.DESTvalues aren't identical, and a fatal error when it recognises a known nonsense
value.
A GEDCOM validator should also issue an error when it recognises a system identifier for a
system that does not support GEDCOM 5.5.5, and a strong warning when it does not
recognise the system identifier used (probable typo).
More information about system identifiers is provided inChapter 4 GEDCOM System
Identifiers, page 117.
{Size=1:25}RELATION_IS_DESCRIPTOR:=
A word or phrase that states object 1'srelationis object 2. For example you would read the
following as“Joe Jacob's high-school geography teacher is the individual identified by
## @I551@”:
## 0 INDI
1 NAME Joe /Jacob/
## 1 ASSO @I551@
2 RELA high-school geography teacher
The <RELATION_IS_DESCRIPTOR> is theASSO.RELAline value, which provides a
description of the association created by the<<ASSOCIATION_STRUCTURE>> (ASSO
record)it is part of.
Notice that the <RELATION_IS_DESCRIPTOR>does notprovide any predefined values,
but is a free-form text field; by the user, for the user.
Applications cannot and should not try to rely on the user or other applications using
particular values, or any particular value having any particular meaning.
That said, some common values are:godfather,godmother,attendant,
informant,witnessandOther, but you may encounter many different values, such as
godparent,officiating priest, including illegal values such asbrother, or
Grand pere maternel(maternal grandfather in French).
{Size=1:90}RELIGIOUS_AFFILIATION:=
A name of the religion with which this person, event, or record was affiliated.
{Size=1:120}RESPONSIBLE_AGENCY:=
The organization, institution, corporation, person, or other entity that has responsibility for
the associated context. For example, an employer of a person of an associated occupation, or
a church that administered rites or events, or an organization responsible for creating and/or
archiving records.
{Size=1:25}ROLE_DESCRIPTOR:=
A word or phrase that identifies a person's role in an event being described. This should be
the same word or phrase, and in the same language, that the recorder used to define the role
in the actual record.
{Size=3:27}ROLE_IN_EVENT:=
## [CHIL|HUSB|WIFE|MOTH|FATH|SPOU|(<ROLE_DESCRIPTOR>)]
Indicates what role this person played in the event that is being cited in this context. For
example, if you cite a child's birth record as the source of the mother's name, the value for
this field is "MOTH". If you describe the groom of a marriage, the role is "HUSB". If the
## 104

role is something different than one of the six relationship role tags listed above then enclose
the role name within matching parentheses.
The six predefined values must not be within parentheses, but that additional, system-
defined or user-defined values must be. It is an error to put any of the predefined values
within parentheses, or not use parentheses for other values.
{Size=5:30}ROMANISATION_METHOD:=
[<user defined> |pinyin|romaji|wadegiles]
Indicates the method used in transforming the text to a romanised transcription.
{Size=1:248}SCHOLASTIC_ACHIEVEMENT:=
A description of a scholastic or educational achievement or pursuit.
{Size=1:1}SEX_VALUE:=
A code that indicates the sex of an individual:
M=Male
F=Female
X=Intersex
U=Unknown (not found yet)
N=Not recorded
Uis the default value.
The valuesUandNare mostly used for stillborn children, but must be used for every
situation where the sex is unknown (yet).
The difference between the two values is significant. The valueUmerely says that you do
not know the sex (yet), because you did not find or consult a record. The valueNsays that
the record did not record a sex, or that you are sure that there is no record.
The current GEDCOM specification allows just one sex per individual. A future GEDCOM
version should provide the ability to specify different values for the biological, official and
legal sex. The current field should be used to record the official sex, i.e. the sex on the birth
record.
{Size=1:120}SOURCE_CALL_NUMBER:=
An identification or reference description used to file and retrieve items from the holdings of
a repository.
{Size=1:4095}SOURCE_DESCRIPTIVE_TITLE:=
The title of the work, record, or item and, when appropriate, the title of the larger work or
series of which it is a part.
For apublishedwork, a book for example, might have a title plus the title of the series of
which the book is a part. A magazine article would have a title plus the title of the magazine
that published the article.
For Anunpublishedwork, such as:
!A letter might include the date, the sender, and the receiver.
!A transaction between a buyer and seller might have their names and the transaction
date.
!A family Bible containing genealogical information might have past and present
owners and a physical description of the book.
!A personal interview would cite the informant and interviewer.
## 105

{Size=1:60}SOURCE_FILED_BY_ENTRY:=
This entry is to provide a short title used for sorting, filing, and retrieving source records.
{Size=1:120}SOURCE_JURISDICTION_PLACE:=
## <PLACE_NAME>
The name of the lowest jurisdiction that encompasses all lower-level places named in this
source. For example, "Oneida, Idaho" would be used as a source jurisdiction place for events
occurring in the various towns within Oneida County. "Idaho" would be the source
jurisdiction place if the events recorded took place in other counties as well as Oneida
## County.
{Size=1:15}SOURCE_MEDIA_TYPE:=
## [audio|book|card|electronic|fiche|film|magazine|manuscript|map|newspaper|
photo|tombstone|video]
A code, selected from one of the media classifications choices above, that indicates the type
of material in which the referenced source is stored.
{Size=1:255}SOURCE_ORIGINATOR:=
The person, agency, or entity who created the record. For a published work, this could be the
author, compiler, transcriber, abstractor, or editor. For an unpublished source, this may be an
individual, a government agency, church organization, or private organization, etc.
{Size=1:4095}SOURCE_PUBLICATION_FACTS:=
When and where the record was created. For published works, this includes information
such as the city of publication, name of the publisher, and year of publication.
For an unpublished work, it includes the date the record was created and the place where it
was created. For example, the county and state of residence of a person making a declaration
for a pension or the city and state of residence of the writer of a letter.
{Size=1:60}SUBMITTER_NAME:=
The name of the submitter formatted for display and address generation.
{Size=1:20}SYSTEM_ID:=
A system identification name. This name must be unique for each system (product), different
from any other system. The name may include spaces, and isnotrestricted to ASCII
characters.
The system identifier occurs as a line value of the mandatoryHEAD.SOURand
HEAD.DESTrecords in the GEDCOM header.
{Size=1:32767}TEXT:=
A Unicode string.
Some rules and restrictions apply, seeline_chardefinition in the GEDCOM grammar.
{Size=1:32767}TEXT_FROM_SOURCE:=
## <TEXT>
A verbatim copy of any description contained within the source. This indicates notes or text
that are actually contained in the source document, not the submitter's opinion about the
source. This should be, from the evidence point of view, "what the original record keeper
said" as opposed to the researcher's interpretation. The wordTEXT, in this case, means from
the text which appeared in the source record including labels.
## 106

{Size=7:12}TIME_VALUE:=
hh:mm[:ss[.fs]]
The time of a specific event, usually a computer-timed event, where:
hh=hours on a 24-hour clock, one or two digits; no leading zeroes{0:23}
mm=minutes, a two-digit valuewithleading zeroes{0:59}
ss=seconds, a two-digit value,withleading zeroes{0:59}
fs=a two-digit decimal fraction of a second{0:99}
{Size=1:20}USER_REFERENCE_NUMBER:=
A user-defined number or text that the submitter uses to identify this record. For instance, it
may be a record number within the submitter's automated or manual system, or it may be a
page and position number on a pedigree chart.
The <USER_REFERENCE_NUMBER> is the line value of the optionalREFNrecord. The
optionalREFNoccurs in theFAM,INDI,OBJE,NOTE,REPOandSOURrecords; so, in all
the<LINEAGE_LINKED_RECORD>types.
While the name of this line value strongly suggests that it should be a number, the line value
is not limited to digits. It is free-form text that may include any character. It should really
have been called <USER_REFERENCE_IDENTIFIER> instead of
## <USER_REFERENCE_NUMBER>.
The <USER_REFERENCE_NUMBER> allows users to associate any kind of number with
these records. These record types allow any number ofREFNsubrecords, so users can
associate as many identifiers to a record as they like.
The user-defined identifiers used need not be unique. The same identifier may be used
multiple times, on different records.
TheREFNrecord is for user-defined numbers, theIDNOrecord is for third-party numbers.
{Size=1:40}USER_REFERENCE_TYPE:=
A user-defined definition of the <USER_REFERENCE_NUMBER>.
This value is free-form text, but meant to be a value from a relatively short user-defined list.
The <USER_REFERENCE_TYPE> is the line value of the optionalREFN.TYPErecord;
theREFNline value specifies a user reference number, theREFN.TYPEspecifies that
number's type.
This allows users to classify the reference numbers they use in any way they see fit.
{Size=1:32767}USER_TEXT:=
Free-form user text. Comments, opinions.
{Size=1:248}WHERE_WITHIN_SOURCE:=
Specific location within the information referenced. For a published work, this could include
the volume of a multi-volume work and the page number(s). For a periodical, it could
include volume, issue, and page numbers. For a newspaper, it could include a column
number and page number. For an unpublished source or microfilmed works, this could be a
film or sheet number, page number, frame number, etc. A census record might have an
enumerating district, page number, line number, dwelling number, and family number. The
data in this field should be in the form of a label and value pair, such as Label1: value,
Label2: value, with each pair being separated by a comma. For example, Film: 1234567,
## Frame: 344, Line: 28.
{Size=3:22}XREF:=
Either a pointer or an unique cross-reference identifier. If this element appears before the tag
in a GEDCOM line, then it is a cross-reference identifier. If it appears after the tag in a
## 107

GEDCOM line, then it is a pointer.
The at signs that delimit a cross-reference identifier or pointer are part of that cross-reference
identifier or pointer. The identifying part within the at signs has a minimum length of 1, and
maximum length of 20 code units.
## Legal Characters
Each <XREF> corresponds to axref_IDin the GEDCOM grammar, the identifying part
within the at signs corresponds to aidentifier_string.
GEDCOM 5.5.1 and earlier allowed almost any character in an identifier string, with a
special restriction regarding the use of the number sign (#), and restrictions regarding the use
of colon (:) and exclamation mark (!) in an <XREF>.
An identifier string must not start with a number sign (#), as that might create confusion with
an escape sequence prefix (@#), but the number sign is no longer legal in identifiers. The
Lineage-Linked Form reserved the colon (:) and exclamation mark (!) future feature. They
are a no longer reserved, but also no longer legal in identifiers.GEDCOM 5.5.5 solves
many pointer problems simply by restricting identifiers to alphanumeric characters.
## References
GEDCOM Identifiers: Length
{Size=3:22}XREF:FAM:=
A pointer to, or a cross-reference identifier of, a<<FAM_GROUP_RECORD>> (FAM
record).
{Size=3:22}XREF:INDI:=
A pointer to, or a cross-reference identifier of, an<<INDIVIDUAL_RECORD>> (INDI
record).
{Size=3:22}XREF:NOTE:=
A pointer to, or a cross-reference identifier of, a<<NOTE_RECORD>> (NOTErecord).
{Size=3:22}XREF:OBJE:=
A pointer to, or a cross-reference identifier of, a<<MULTIMEDIA_RECORD>> (OBJE
record).
{Size=3:22}XREF:REPO:=
A pointer to, or a cross-reference identifier of, a<<REPOSITORY_RECORD>> (REPO
record).
{Size=3:22}XREF:SOUR:=
A pointer to, or a cross-reference identifier of, a<<SOURCE_RECORD>> (SOURrecord).
{Size=3:22}XREF:SUBM:=
A pointer to, or a cross-reference identifier of, a<<SUBMITTER_RECORD>> (SUBM
record).
{Size=3:4}YEAR:=
A numeric representation of the calendar year in which an event occurred.
## 108

One and two-digit years are illegal. Years 1 through 99 must be padded out to at least 3
digits by using leading zeroes.
Three Digits Demand is Obsolete
The demand to use at least 3 digits for the year is obsolete. This demand was put in
to avoid possible confusion between years and days as entered into early genealogy
applications.
Date entry in genealogy applications continues to require developer and user
attention, particularly in locales still using antilogical date formats. However, the
fixed order date formats used in GEDOM do not allow confusion between days and
years.
The GEDCOM File
## File Name
The GEDCOM file is normally created in a user directory. The filename extension is.GEDor
.ged; the casing does not really matter, but by convention the filename extension is either all-
uppercase or all-lowercase.
Macintosh filenames do not use file extensions.
Multi-Volume GEDCOM Files
GEDCOM 5.0 (1991) through 5.5.1 support multi-volume GEDCOM files. A multi-volume file is
a file split into multiple files (the volumes); each of the volumes should fit onto a single floppy
disk or diskette, even if the original file does not. This feature was never necessary, as multi-
volume archivers were widely available.
In practice, all the Multi-volume GEDCOM support accomplished is needlessly complicating the
reading of GEDCOM files; a GEDCOM 5.5.1 reader must not assume that the end of a file is the
end of the GEDCOM file; the GEDCOM file may continue on another volume (the next file in
the multi-volume series).
TheGEDCOM 5.5.1 Annotated Editiondeprecated this misfeature and the GEDCOM 5.5.5
specification obsoletes it; it is no longer allowed to break a GEDCOM file into multiple files.
This simplifies GEDCOM readers; the end of the GEDCOM file is the end of the GEDCOM file.
User-Defined Tags
Use of user-defined GEDCOM tags is not encouraged. Applications requiring the use of
nonstandard tags must define them with a leading underscore so that they will not conflict with
future GEDCOM standard tags. The meaning and interpretation of user-defined tags is system-
dependant. The system that defined the tags is identified inHEAD.DEST.
The system inHEAD.DESTis often, but not always, the same system as that inHEAD.SOUR;
applications can and do generate GEDCOM files intended for particular third-party systems.
## Escape Sequences
Use of GEDCOM escape sequences is not recommended. The only use of escape sequences in the
current Lineage-Linked Form is the use of calendar escape sequences, to specify a calendar and a
date in single line value.
## 109

## References
Multi-volume GEDCOM files
Sample Lineage-Linked GEDCOM File
The example below is a sample GEDCOM file of genealogical information about three
individuals who are members of the same family — father, mother, and child. In the example,
"Joe/Williams/" is the value specified by the tagNAMEunder theINDItag for the record
(@I3@). Other values in other lines, such as the birth date and place, provide additional
information about Joe Williams. The value (@F1@) specified by theFAMCtag is a pointer to the
<<FAM_GROUP_RECORD>>(@F1@) of which Joe Williams is a child. Included also in this
GEDCOM file example are three other record types: a source record, a submitter record, and a
repository record. These records are pointed to from within other records in the GEDCOM file.
This shows how pointer values can be used in creating a Lineage-Linked GEDCOM file.
## Example:
## 0 HEAD
## 1 GEDC
## 2 VERS 5.5.5
## 2 FORM LINEAGE-LINKED
## 3 VERS 5.5.5
## 1 CHAR UTF-8
## 1 SOUR GS
2 NAME GEDCOM Specification
## 2 VERS 5.5.5
2 CORP gedcom.org
## 3 ADDR
## 4 CITY LEIDEN
3 WWW www.gedcom.org
1 DATE 2 Oct 2019
## 2 TIME 0:00:00
1 FILE 555Sample.ged
1 LANG English
## 1 SUBM @U1@
## 0 @U1@ SUBM
1 NAME Reldon Poulson
## 1 ADDR
2 ADR1 1900 43rd Street West
2 CITY Billings
2 STAE Montana
## 2 POST 68051
2 CTRY United States of America
## 1 PHON +1 (406) 555-1232
## 0 @I1@ INDI
1 NAME Robert Eugene /Williams/
2 SURN Williams
2 GIVN Robert Eugene
## 1 SEX M
## 1 BIRT
2 DATE 2 Oct 1822
2 PLAC Weston, Madison, Connecticut, United States of America
## 2 SOUR @S1@
3 PAGE Sec. 2, p. 45
## 1 DEAT
2 DATE 14 Apr 1905
2 PLAC Stamford, Fairfield, Connecticut, United States of America
## 110

## 1 BURI
2 PLAC Spring Hill Cemetery, Stamford, Fairfield, Connecticut, United States of America
## 1 FAMS @F1@
## 1 FAMS @F2@
## 1 RESI
2 DATE from 1900 to 1905
## 0 @I2@ INDI
1 NAME Mary Ann /Wilson/
2 SURN Wilson
2 GIVN Mary Ann
## 1 SEX F
## 1 BIRT
## 2 DATE BEF 1828
2 PLAC Connecticut, United States of America
## 1 FAMS @F1@
## 0 @I3@ INDI
1 NAME Joe /Williams/
2 SURN Williams
2 GIVN Joe
## 1 SEX M
## 1 BIRT
2 DATE 11 Jun 1861
2 PLAC Idaho Falls, Bonneville, Idaho, United States of America
## 1 FAMC @F1@
## 1 FAMC @F2@
2 PEDI adopted
## 1 ADOP
2 DATE 16 Mar 1864
## 0 @F1@ FAM
## 1 HUSB @I1@
## 1 WIFE @I2@
## 1 CHIL @I3@
## 1 MARR
2 DATE Dec 1859
2 PLAC Rapid City, Pennington, South Dakota, United States of America
## 0 @F2@ FAM
## 1 HUSB @I1@
## 1 CHIL @I3@
## 0 @S1@ SOUR
## 1 DATA
## 2 EVEN BIRT, DEAT, MARR
3 DATE FROM Jan 1820 TO DEC 1825
3 PLAC Madison, Connecticut, United States of America
2 AGNC Madison County Court
1 TITL Madison County Birth, Death, and Marriage Records
1 ABBR Madison BMD Records
## 1 REPO @R1@
## 2 CALN 13B-1234.01
## 0 @R1@ REPO
1 NAME Family History Library
## 1 ADDR
2 ADR1 35 N West Temple Street
2 CITY Salt Lake City
2 STAE Utah
## 2 POST 84150
2 CTRY United States of America
## 0 TRLR
## 111

Chapter 3 Using Character Sets in GEDCOM
## Introduction
GEDCOM was created to exchange genealogical data in multiple languages, so it needs to
support the characters used by those languages. Back in the 20th century of the Common Era,
when GEDOM was still focussed on Western languages, FamilySearch wisely decided to
disallow code pages and use ANSEL instead. GEDCOM 5.3 (1993CE) specification and later
allow Unicode in support of non-Western languages, with ANSEL remaining the default. The
GEDCOM 5.4 (1995CE), GEDCOM 5.5 and GEDCOM 5.5.1 (1999CE) specification all state
that Unicode will eventually replace ANSEL as the standard character set for GEDCOM.
In the twenty years that passed since the release of GEDCOM 5.5.1 the industry has switched to
Unicode. TheGEDCOM 5.5.1 Annotated Edition(2018CE) already states all genealogy
applications should be Unicode-based and always export to Unicode. GEDCOM 5.5.5 completes
the transition to Unicode.
GEDCOM 5.5.5 does not allow ANSEL. GEDCOM 5.5.5 demands Unicode
Systems should continue to support the ANSEL encoding for importing GEDCOM 5.5.1 files.
GEDCOM Character Sets and Encoding
GEDCOM 5.5.5 has just one legal character set: Unicode. Earlier version of GEDCOM supports
three character sets: ASCII, ANSEL and Unicode.
ASCII and ANSEL are characters sets with just one encoding. Unicode has multiple encodings,
GEDCOM supports the two most important ones, UTF-8 and UTF-16.
Thus, GEDCOM supports four character encodings: ASCII, ANSEL, UTF-8 and UTF-16. The
HEAD.CHARline values specifying these encodings areASCII,ANSEL,UTF-8, and
## UNICODE.
## UTF-16:UNICODE
Previous GEDCOM specifications erroneously refer to UTF-16 as UNICODE (all-caps), and
introduced theHEAD.CHARline valueUNICODEfor it.
For compatibility's sake, theHEAD.CHARvalue for UTF-16 remainsUNICODE. TheUNICODE
value must be understood as meaning UTF-16, andmust notbe used for any other Unicode
encoding. UTF-8 GEDCOM filesmustuse theHEAD.CHARvalueUTF-8.
## Legal Encodings
GEDCOM 5.5.5 has just two legal encodings, UTF-8 and UTF-16. Earlier versions of GEDCOM
support four legal encodings: ASCII, ANSEL, UTF-8 and UTF-16.
Historically, many system have created not-really-GEDCOM files using illegal character sets and
encodings. Developers want users to be able to import third-party GEDCOM and not-really-
GEDCOM files, so many GEDCOM 5.5 and 5.5.1 readers support the use of these illegal
character sets and encodings. That well-intentioned flexibility has a serious deleterious effect. By
obviating the need for the developers of the offending third-party product to fix their GEDCOM
output, those too-flexible GEDCOM readers keep the malpractice and the problems its creates
alive.
GEDCOM 5.5.5 ends this malpractice without breaking existing software.
GEDCOM 5.5.5 does not tolerate the use of illegal character sets or encodings.
▪GEDCOM 5.5.5 writersmust notuse anything but the legal encodings.
▪GEDCOM 5.5.5 readersmust notaccept anything but the legal encodings.
▪GEDCOM 5.5.5 readersmustreject all illegal encodings.
Systems that currently accept illegal character sets and encodings in GEDCOM 5.5.1 or earlier
may continue to do so for the sake of compatibility, but only in GEDCOM 5.5.1 and earlier.
Developers that want to continue using illegal character sets and encodings, must continue to do
## 112

so using GEDCOM 5.5.1 or earlier.
## Support
All systems supporting GEDCOM 5.5.5 (or later) should default GEDCOM export to GEDCOM
## 5.5.5.
All GEDCOM 5.5.5 exportmustuse the Unicode character set. All Western systems should
default their GEDCOM export to UTF-8 encoding. All Eastern systems should default their
GEDCOM export to UTF-16 encoding. Users should be able to override that default by setting a
file property.
Export of Unicode data to ASCII or ANSEL would be practically sure to lose information. That is
why GEDCOM 5.5.5 does not allow it. Unicode-based systems that already support export to
ANSEL-encoded GEDCOM 5.5.1 may and should continue to offer that option, for the sake of
compatibility with the user's existing practices. However, export to non-Unicode encodings
should not be offered via the regular GEDCOM export dialog box, but only as an advanced
option.
Real World UTF-8 only Export
Several applications were offering Unicode-only GEDCOM export before GEDCOM 5.5.5
already. RootsMagic has offered nothing but UTF-8 GEDCOM export since it became Unicode-
based with RootsMagic4 in 2008CE. Software MacKiev Family Tree Maker changed to UTF-8
only export starting with Family Tree Maker 2017, and Ahnenblatt changed to UTF-8 only export
with Ahnenblatt 3.0, in 2019CE.
Systems should be able to import all four legal encodings.
UTF-8 and UTF-16 are the preferred encodings of GEDCOM files. GEDCOM 5.5.5 systems
must notcreate ANSEL GEDCOM files, but import of ANSEL GEDCOM 5.5.1 files must be
supported for backward compatibility.
CodePage-based Systems
GEDCOM 5.5.5 demands a Unicode-based system.
Codepage-based systems should no longer be in use. Users of a codepage-based system are
strongly recommended to stop using it and upgrade to one of the many Unicode-based system.
Codepage-based systemsmust notclaim or attempt to support GEDCOM 5.5.5, but must
continue to use GEDCOM 5.5.1 or earlier.
The rule for codepage-based systems has always been to export to GEDCOM using ANSEL, but
it is recommended that even code-page based system now default their GEDCOM export to using
## UTF-8.
## ANSEL
ANSEL (American National Standard for Extended Latin Alphabet Coded Character Set for
Bibliographic Use, Z39.47-1985) is an 8-bit character set. The official specification can be
obtained from the American National Standards Institute (ANSI).
ANSEL wastheAmerican Library Association character set, and was used in library systems
worldwide, including the MARC (Machine-Readable Catalog) format. Those systems have now
transitioned to Unicode.
ANSEL is a superset of ASCII. ANSEL extends ASCII with a some useful characters and non-
spacing character modifiers (diacritics), resulting in a single character set for Western languages
(instead of a confusing mess of incompatible code pages).
ANSEL versus“ANSEL”
FamilySearch has extended ANSEL and kept calling the resulting character set ANSEL, in direct
## 113

violation of the ANSEL specification. FamilySearch also kept changing what's in their“ANSEL”;
different versions of GEDCOM have different“ANSEL”tables. GEDCOM 5.5.5 provides a
consolidated“ANSEL”table inAppendix C ANSEL Character Set. It is strongly recommended
that genealogy software developers use this single table for all GEDCOM versions they support.
Previous versions of GEDCOM stated that ANSEL is the preferred character encoding for
GEDCOM files. GEDCOM 5.5.1 (1999CE) already stated that this would shortly change to
UTF-8 and UTF-16. GEDCOM 5.5.1 remained the last version of GEDCOM for almost two
decades and during that time, the industry has switched to Unicode as the preferred character set
and UTF-8 as the preferred encoding. GEDCOM 5.5.5 merely makes that official.
Starting with GEDCOM 5.5.5, Unicode is the preferred character set for GEDCOM files.
Systems can use either the UTF-8 or UTF-16 encoding.
Use of ANSEL remains legal, but is deprecated now.
## ASCII
The American Standard Code for Information Interchange (ASCII) is one of the oldest character
set standards (1963CE). ASCII is an USA-centric character set. Most Western languages need
characters not supported by ASCII, which is why ANSEL was the preferred character set for
GEDCOM files. Many languages need characters not supported by ANSEL, which is why
Unicode is the preferred character set for GEDCOM files. ANSEL and Unicode are both
supersets of ASCII.
Previous versions of GEDCOM referred to in various incorrect and confused ways, such as
“ASCII (USA Version)”; There are no country-specific versions of ASCII. There is just ASCII,
which is American. Many country-specific code pages are based on ASCII, butare not ASCII.
Previous versions of GEDCOM also referred to ASCII as“8-bit ASCII”, and that is a
contradiction in terms. There is no such thing as 8-bit ASCII. ASCII is a 7-bit character set.
## Unicode
Unicode and ISO10646 are not exactly the same thing, but do define the same character set. It is
a rather persistent myth that Unicode is a 16-bit character set - it is not. Unicode is a 21-bit
character set that currently supports more than a quarter million different characters.
Unicodeisa superset of ASCII and the many 8-bit code pages it replaces.
Unicode is a single character set that supports quite a few different encodings. GEDCOM allows
only the two most important ones, UTF-8 and UTF-16. Support for UTF-8 and UTF-16 is built
into all modern operating systems; developers need not and should not create their own
conversions.
Developer who ignore the above advice and try to make their own conversions anyway should
take particular care to make sure that their conversion from the UTF-16 encoding used by the
operating system to UTF-8 is indeed a conversion to UTF-8 and not a conversion to CESU-8.
GEDCOM readers that take advantage of operating system routines are not unlikely to reject
ostensible UTF-8 GEDCOM files that are actually CESU-8 encoded because of illegal code
sequences. This is a security measure.
To understand Unicode and the supported encodings, it is essential to understand the difference
between characters, code points and code units.
Very briefly: A code point is a particular value within a character set. A single character may
consist of multiple code points.
A code unit is the smallest size used in a particular encoding of a character set; UTF-8 has 8-bit
code units, UTF-16 has 16-bit code units. An encoding may require multiple code units to
represent one code point.
## Byte Order Mark
GEDCOM files are text files, so UTF-8 GEDCOM files are UTF-8 text files. Per Unicode rules,
## 114

starting the text file with Byte Order Mark (BOM) is mandatory for UTF-16 text files, but
optional for UTF-8 text files.
Starting UTF-8 GEDCOM files with a BOM makes sure that text editors will recognise the
GEDCOM file as UTF-8 encoded, so that they do not misrecognise the encoding and mess up the
file. Starting UTF-8 GEDCOM files with a BOM prevents really old genealogy applications, that
do not understand UTF-8, from recognising the GEDCOM file as a GEDOM file. Many old
applications do not check the encoding, and will try to import the GEDCOM file anyway, despite
not supporting the encoding used (and not supporting Unicode at all), resulting in significantly
mangled data and data loss. Including a BOM prevents these old applications from doing so.
TheGEDCOM 5.5.1 Annotated Editionstrongly recommends that UTF-8 GEDCOM files start
with a BOM.GEDCOM 5.5.5 specifies that UTF-8 GEDCOM filesmuststart with a Byte
Order Mark (BOM).This rule aligns with existing practice, as started with FamilySearch PAF
## 5.0 (2000CE).
## Using Character Encodings
Previous versions of GEDCOM suggested that it might be possible to change character sets in the
middle of a GEDCOM file - it is not. That notion was abandoned, but even GEDCOM 5.5.1 still
contained confusing remnants of that notion. Each GEDCOM file uses just one encoding
throughout.
Previous versions of GEDCOM suggested that, regardless of whatever encoding is used for the
GEDCOM file, the GEDCOM header should always be ANSEL-encoded. That is wrong. The
entire GEDCOM file, including the GEDCOM header, always uses just one encoding.
The encoding used by a GEDCOM file is specified in the GEDCOM header through the
mandatoryHEAD.CHARrecord.
The following partial GEDCOM header provides an example:
## 0 HEAD
## 1 SOUR PAF
## 2 VERS 5.2.18
## 1 DEST PAF
## 1 CHAR UTF-8
## ...
## Detecting Character Encoding
The GEDCOM specification provides practically no information about detecting
GEDCOM files and the encoding used by GEDCOM files.
## References
## The Absolute Minimum Every Software Developer Absolutely, Positively Must
Know About Unicode and Character Sets (No Excuses!)
0 HEAD Value
GEDCOM & FTW TEXT Magic
GEDCOM Magic Values
GEDCOM Character Encodings
## Unicode Books
The Unicode Standardhas seen several editions since the publication of GEDCOM 5.5.1
## 115

back in 1999. It is a reference, not very suitable for learning about Unicode.
The Unicode Consortium web site offers many helpful resources, including an
introduction to Unicode and aFAQ.
Two useful books are:
•Unicode Demystified; A Practical Programmer's Guide to the Encoding
StandardbyRichard Gillam(2003, Addison-Wesley, pp. 853, ISBN
## 0-201-70052-2)
•Developing International Software, Second EditionbyDr. International(2003,
Microsoft Press, pp. 1060, ISBN 0-6536-1583-7)
This is the revised edition ofDeveloping International Software for Windows 95
and Windows NTbyNadine Kano(1995, Microsoft Press, pp. 743, ISBN
## 1-55615-840-8).
## 116

Chapter 4 GEDCOM System Identifiers
## System Identifier Registration
Each system that reads or writes GEDCOM files must have a system identifier to identify that
system by. That system identifier must be unique, so that there can be no confusion about which
system is meant.
The obvious way to ensure uniqueness is through a centrally maintained registry of system
identifiers. FamilySearch used to have a registration process, but there is no registry today or
registration process now.FamilySearchsilently abandoned GEDCOM around 2000CE.
FamilySearchdoes not provide a list of system identifiers registered before 2000CE, and most
current genealogy applications were created after 2000CE.
GEDCOM Header
System identifiers are used in the GEDCOM header, to identify the system that created the
GEDCOM file, and the system that the GEDCOM file is for. TheHEAD.SOURvalue identifies
the system that created the GEDCOM file, theHEAD.DESTvalue identifies the system that it is
for. It is theHEAD.DESTvalue, not theHEAD.SOURvalue, that identifies the meaning and
interpretation of any GEDCOM extensions used in the GEDCOM file.
A typical GEDCOM file isn't created for a specific other system, but does contain GEDCOM
extensions specific to the system that created it; that's why theHEAD.DESTvalue must default
to system's own system identifier. Thus, in a typical GEDCOM file, theHEAD.SOURvalue and
theHEAD.DESTvalue are identical.
## Maximum System Identifier Length
The maximum length of a system identifier is 20 code units, as stated in the <SYSTEM_ID>
definition.
Some confusion was created by the GEDCOM 5.5.1 chapterGEDCOM Product Registration,
which stated that system identifiers may be up to 40 characters long. The actual definition takes
precedence over statements in chapters, and that chapter is gone now.
Case-Insensitive
System identifiers aren't controlled line values and should be case-sensitive, but long existing
practice is to treat system identifiers as case-insensitive. Therefore, GEDCOM System Identifiers
are case-insensitive.
Developers are still advised to pick one particular casing and stick with it, for consistency's sake.
Use of mixed case is preferred, but abbreviations should be uppercase.
## Spaces
It is legal to use spaces in system identifiers. Use of spaces within system identifiers has always
been allowed, despite earlier versions of GEDCOM saying otherwise, as FamilySearch
themselves has been using system identifier that contain spaces for decades.
Non-ASCII
The use of non-ASCII characters in the system identifier is legal, andnotdiscouraged.
Systems reading GEDCOM 5.5.5 files know the character set and encoding used in the header as
soon as they've processed the Byte Order Mark (BOM).
## 117

## Digits
System identifiers may contain digits. However, system identifiersmust notcontain version
numbers.
## Version Numbers
System identifiersmust notcontain version numbers. Different versions of the same system must
use the same system identifier. The version number of the system can and must be specified in
## HEAD.SOUR.VERS.
## Editions
Some products are available in multiple editions, such as a Lite Edition or a Pro Edition. System
identifiersmust notindicate an edition. Different editions of the same system must use the same
system identifier. The edition may be included in the product nameHEAD.SOUR.NAME.
## Platforms
The system identifiershould notinclude the platform name (such as“Windows”).
Multiplatform systemsmust notinclude the platform name, but must use the GEDCOM reading
and writing code, and the same system identifiers on all platforms.
## Multiple Identifiers
Each system must be known by just one system identifier. Use of multiple, different identifiers
for a single system is not allowed.
Some genealogy software developers have sold the same product under different names in
different language regions, and then used a different name for each regional version. This is
wrong.
The system identifier must not change merely because the user interface got translated.
## Invalid System Identifiers
Systems creating GEDCOM 5.5.5 filesmustuse a valid system identifier. Systems reading
GEDCOM 5.5.5 filesmustrefuse invalid system identifiers, even if they accept these when used
in GEDCOM 5.5.1 files.
GEDCOM 5.5.5 readersmustreject system identifiers that are too long, contain product version
numbers or product editions.
GEDCOM 5.5.5 readersshouldalso reject all otherwise valid system identifiers that are part of a
collection of multiple system identifiers for a single system.
## Nonsense Values
GEDCOM specifications before the GEDCOM 5.5.1 Annotated Edition (2018CE) failed to
clearly specify the usage of theHEAD.DESTvalue. Many GEDCOM 5.5 and 5.5.1 files contain
nonsense values such asANY,GEDCOM55, andOther, despite the fact that the specification
demands that theHEAD.DESTvalue be a system identifier.
GEDCOM 5.5.5 does not tolerate this malpractice. GEDCOM 5.5.5 demands that the
HEAD.DESTvalue is a real system identifier. Known nonsense values must not be used as
system identifiers.
## 118

## Known Nonsense Values
The following are known nonsense values for the system identifier thatmust notbe used.
GEDCOM 5.5.5 readers that encounter any of these values instead of an actual system identifier,
mustreject the file as not-GEDCOM, specifically as not even having a valid GEDCOM header.
known nonsense values
## ANY
## GED55
## GEDCOM
## GEDCOM55
## Other
The above table of known nonsense values may be expanded as additional nonsense values are
identified. Developers are encouraged to take full advantage of the table published in the latest
GEDCOM version.
Obviously, none of the known nonsense values may be adopted as the system identifier for any
new or existing system.
Quick summary of System Identifier Rules
▪A system identifier must be unique
▪System identifiers are case-insensitive.
▪Spaces are allowed
▪Digits are allowed
▪Non-ASCII characters are allowed
▪The maximum length is 20 code units
▪Same, single system identifier for all versions and platforms
▪Version numbers or version indicators are not allowed
▪The system identifier must not include any platform indication
▪Known nonsense values are illegal
GEDCOM Reader Rules
▪Treat system identifiers as case-insensitive
▪Accept spaces in system identifiers
▪Accept non-ASCII characters (i.e. figure out the character encoding first)
▪Issue a fatal error (not even a correct GEDCOM header!) when the system identifier is
too long
▪Reject known nonsense value with a fatal error: invalid GEDCOM header
GEDCOM Validator Best Practice
▪Allow spaces, inform that spaces were officially illegal, never really illegal
▪Warn against usage of non-ASCII characters in pre-GEDCOM 5.5.5 files only
▪Issue a fatal error (not even a correct GEDCOM header!) when the system identifier is
too long
▪Issue a fatal error (not even a correct GEDCOM header!) when encountering known
nonsense values
▪Upon encountering an ALL-CAPS system identifier, suggest the use of lower case for
readability
▪Try to detect version numbers in system identifiers, and issue a strong warning against
it
## 119

## References
GEDCOM System Identifiers
GEDCOM SOUR and DEST
## 120

Appendix A Lineage-Linked GEDCOM Tag
## Definition
## Introduction
Appendix A is a glossary of the tags used in the Lineage-Linked Form. These tags are used in a
hierarchical structure to describe individuals in terms of their families, names, dates, places,
events, roles, sources, and relationships. Control information and other kinds of data intended for
computer processing is also included.
## .
Extending the Form
Records defined in the Lineage-Linked Form cannot not be redefined.
It is legal to extend the Lineage-Linked Form, but only by using user-defined tags which must
begin with an underscore. The meaning of GEDCOM tags is defined by their context, e.g.
HEAD.SOURandFAM.SOURare two different kind of sources. Software developersare
allowed to introduce_TAG.SOUR; as that does not redefine any existingSOURtag in any way.
However, developers are disallowed from directly extending the Lineage-Linked Form using
existing tags, so they are not allowed to introduce sayOBJE.SOUR, but would have to use
OBJE._SOURinstead.
A GEDCOM readershould notassume that predefined tags occur only in predefined context, but
only assume that the records defined in the Lineage-Linked Form are as defined.
## Illegal Tags
User-defined tags that do not start with an underscore are illegal.
GEDCOM readers that come across an illegal tag should issue a fatal error and abort. It may seem
harsh to reject a GEDCOM file for one illegal tag, but there simply is no reason for a GEDCOM
file to contain illegal tags. It's a trivial effort for the developer of the offending application to use
underscores.
The obvious exception to this rule is a new version of the offending application reading an
GEDCOM file produced by an earlier version of that application; applications should be able to
read files produced by earlier versions of the same application, even if these files should
otherwise be rejected.
## FTW TEXT
The list of definitions below gives both the tag name and, within curly brackets, a longer
text. Typically, the longer text is a valid English word, or two words connected by an
underscore, and the tag an abbreviation of that word or phrase.
GEDCOM uses the tags, most of which are four code units long. Exactly one genealogy
application decided to use the text within the curly brackets instead. That application is
Family Tree Maker for Windows (FTW), and those files are not GEDCOM files. These
file are known as FTWTEXT files.
Back when Family Tree Maker for Windows (Classic) was quite popular, these files used
to be quite prevalent. There are few FTWTEXT files around anymore. They can be
converted to GEDCOM files using a freely downloadable copy ofFamily Tree
Maker2005 StarterEdition. A download link to theFamily Tree Maker2005
StarterEditionis provided in theFamily Tree Makersupport articleOpening Old and
Unsupported Files in FTM 2008-2017 for Windows. So, there is no need to support
## 121

FTWTEXT in modern genealogy applications.
FTW TEXT Detection
Detecting FTW TEXT files is easy.
While the first line of a GEDCOM file is0HEAD, the first line of an FTWTEXT is
## 0HEADER.
GEDCOM Reader Best Practice
▪donotadd support for FTWTEXT
▪do detectFTWTEXT, and when detected
▪inform the user that it isn't a GEDCOM file, but an FTW TEXT file
▪advise the user to convert the FTWTEXT to GEDCOM usingFamily Tree
Maker2005 StarterEdition
▪if youdosupport FTWTEXT
▪do not do so silently, do not let the user keep thinking it's a GEDCOM file when it
isn't
▪clearly state that you detected FTWTEXT, and are processing their FTWTEXT
file
▪make sure you support both GEDCOM and FTWTEXT, but not
FGTEWDTCEOXMT (a mixture of both); keep detecting illegal tags
A download link forFamily Tree Maker2005 StarterEditionis available in the MacKiev
support itemFamily Tree Maker support: Opening Old and Unsupported Files in FTM
2008-2017 for Windows.
## References
## FTW TEXT
Family Tree Maker support: Opening Old and Unsupported Files in FTM 2008-2017
for Windows
Lineage-Linked GEDCOM Tag Definitions
This section provides the definitions of the Lineage-Linked GEDCOM tags and shows their
formal name inside of the {braces}. The formal names arenotused in place of the tag. Full
understanding must come from the context in which the tag is used.
## ABBR {ABBREVIATION}:=
A short name of a title, description, or name.
## ADDR {ADDRESS}:=
The contemporary place, usually required for postal purposes, of an individual, a submitter
of information, a repository, a business, a school, or a company.
## ADR1 {ADDRESS1}:=
The first line of an address.
## ADR2 {ADDRESS2}:=
The second line of an address.
## ADR3 {ADDRESS3}:=
The third line of an address.
## 122

## ADOP {ADOPTION}:=
Adoption is a legal event that changes a child's legal parents from one set of parents to
another set of parents.
While some of the parents involved are likely to be biological or official parents, neither
assumption should be made.
Adoption is an event that changes who the legal parents are. A child that has been adopted
can be adopted again. The official parents should not be assumed to be the biological
parents. A child canand often isadopted by a biological or official parent. In many
jurisdictions, a child is technically always adopted by a couple, even if one of them is
already is a legal parent.
## AGE {AGE}:=
The age of the individual at the time an event occurred, or the age listed in the document.
## AGNC {AGENCY}:=
The institution or individual having authority and/or responsibility to manage or govern.
## ANUL {ANNULMENT}:=
Declaring a marriage void from the beginning (retroactively invalid).
## ASSO {ASSOCIATES}:=
An indicator to link friends, neighbours, or associates, who aren't close relatives of an
individual.
## AUTH {AUTHOR}:=
The name of the individual who created or compiled information.
## BAPM {BAPTISM}:=
The event of baptism, performed in infancy or later. (See alsoCHR, page 124.)
## BARM {BAR_MITZVAH}:=
The religious ceremony held when a Jewish boy reaches age 13.
## BASM {BAS_MITZVAH}:=
The religious ceremony held when a Jewish girl reaches age 13, also known as "Bat
## Mitzvah."
## BIRT {BIRTH}:=
The emergence of offspring from their mother as a separate being.
Birth does not imply life. Birth includes stillbirth.
## BURI {BURIAL}:=
The action of burying a body.
BURIincludes all forms of burial, including burial at sea, and as there is no separate event
for interment (entombment),BURIis used for that too.
## CALN {CALL_NUMBER}:=
The number used by a repository to identify the specific items in its collections.
## CAST {CASTE}:=
The name of an individual's rank or status in society which is sometimes based on racial or
religious differences, or differences in wealth, inherited rank, profession, occupation, etc.
## CAUS {CAUSE}:=
A description of the cause of the associated event or fact, such as the cause of death.
## CENS {CENSUS}:=
The event of the periodic count of the population for a designated locality, such as a national
or state Census.
## 123

## CHAN {CHANGE}:=
Indicates a change, correction, or modification. Typically used in connection with aDATEto
specify when a change in information occurred.
## CHIL {CHILD}:=
The biological, official or legal (adopted) child of a parent or parents.
## CHR {CHRISTENING}:=
The religious event of baptisingandnaming a child.
## CHRA {ADULT_CHRISTENING}:=
The religious event of baptizingandnaming an adult person.
## CITY {CITY}:=
A lower level jurisdictional unit. Normally an incorporated municipal unit.
## CONF {CONFIRMATION}:=
The religious rite that confirms membership of a church (confirmsbecause previously
established by baptism).
## COPR {COPYRIGHT}:=
A statement that accompanies data to protect it from unlawful duplication and distribution.
## CORP {CORPORATE}:=
A name of an institution, agency, corporation, or company.
## CREM {CREMATION}:=
Disposal of a body by fire, by burning it to ashes.
## CTRY {COUNTRY}:=
The name of the country.
## DATA {DATA}:=
## Data.
## DATE {DATE}:=
The time of an event in a calendar format.
## DEAT {DEATH}:=
The end of a life.
## DEST {DESTINATION}:=
A system receiving data.
## DIV {DIVORCE}:=
The legal dissolution of a marriage.
## DIVF {DIVORCE_FILED}:=
An event of filing for a divorce by a spouse.
## DSCR {PHYSICAL_DESCRIPTION}:=
The physical characteristics of a person, place, or thing.
## EDUC {EDUCATION}:=
Indicator of a level of education attained.
## EMAIL {EMAIL}:=
An electronic mail address.
GEDCOM 5.5.1 listsEMAILasEMAI(no L) in this Appendix. A forgiving GEDCOM
5.5.1 reader may treatEMAIas a synonym forEMAIL.
A GEDCOM 5.5.5 writermustuseEMAIL(the actual tag). A GEDCOM 5.5.5 readermust
rejectEMAI(no L) as an illegal tag and abort processing.
## 124

## EMIG {EMIGRATION}:=
An event of leaving one's homeland with the intent of residing elsewhere.
## ENGA {ENGAGEMENT}:=
An event of recording or announcing an agreement between two people to become married.
## EVEN {EVENT}:=
Pertaining to a noteworthy happening related to an individual, a group, or an organisation.
AnEVEN(event) structure is usually qualified or classified by a subordinate use of the
TYPErecord.
## FACT {FACT}:=
Pertaining to a noteworthy attribute or fact concerning an individual, a group, or an
organisation.
AFACTstructure is usually qualified or classified by a subordinate use of theTYPErecord.
## FAM {FAMILY_GROUP}:=
TheFAM(family group) structure records a single family group; a couple and their children.
The group consist of two partners, either or both of which may be unknown, with or without
children. The partners may or may not be spouses, and may or may not have children, but
are biological, official or legal parents to each of the children in the group.
Recording a single family often requires more than one family group record.
## FAMC {FAMILY_CHILD}:=
Identifies the family group in which an individual appears as a child.
## FAMS {FAMILY_SPOUSE}:=
Identifies the family group in which an individual appears as a partner.
The name and abbreviation of this record are misleading: the individual need not be a spouse
in that family group. The family group record is used for all relationships, not just marriages.
Do not assumethat the person is a spouse in that family group.
## FAX {FACSIMILE}:=
Electronic facsimile transmission.
## FCOM {FIRST_COMMUNION}:=
Literally the first communion an individual partakes in. Communion is a rite within christian
churches, and the first communion is considered a rite of passage.
## FILE {FILE}:=
The name of an external file, or, in the case ofHEAD.FILE, the original filename of this
GEDCOM file.
## FONE {PHONETIC}:=
A phonetic rendering of a superior text string.
## GIVN {GIVEN_NAME}:=
A given or earned name used for official identification of a person.
## GRAD {GRADUATION}:=
An event of awarding educational diplomas or degrees to individuals.
## HUSB {HUSBAND}:=
A partner in aFAM(family group) record, often male, often partner to a woman, and a
biological, official or legal parent to each of the children of the couple.
The name of this record strongly suggests that the line value must identify a husband, but
that is not the case; the relationship need not be a marriage, and the individual need not be
male, it may identify a woman in a lesbian relationship.
## 125

## References
Same-Sex Marriage in GEDCOM
## IDNO {IDENT_NUMBER}:=
An identifier, often called a number, assigned to identify a person within some significant
external system.
The value typically isn't number, but a value containing spaces and dashes in addition to
letters and digits.
The prime example is a passport“number”. American genealogists often record Social
## Security Numbers.
The difference between theINDOrecord and theREFNrecord is that theIDNOrecord is for
third-party numbers, and theREFNrecord is for user-defined numbers.
## IMMI {IMMIGRATION}:=
An event of entering into a new locality with the intent of residing there.
## INDI {INDIVIDUAL}:=
A person.
## LANG {LANGUAGE}:=
The name of the language used in a communication or transmission of information.
## LATI {LATITUDE}:=
Latitude of a position on the globe.
## LONG {LONGITUDE}:=
Longitude of a position on the globe.
## MAP {MAP}:=
Pertains to a representation of measurements usually presented in a graphical form.
## MARB {MARRIAGE_BANN}:=
An event of an official public notice given that two people intend to marry.
## MARC {MARR_CONTRACT}:=
An event of recording a formal agreement of marriage, including the prenuptial agreement in
which marriage partners reach agreement about the property rights of one or both, securing
property to their children.
## MARL {MARR_LICENSE}:=
An event of obtaining a legal license to marry.
## MARR {MARRIAGE}:=
Marriage is an official and legal event, defined by the applicable law and customs of the land
and the time, that creates a couple, possibly with children. This includes so-called common
law marriages.
The name of this record is ill-chosen. TheMARRrecord isn't a marriage record, but a
relationship record.
TheMARRrecord can and must be used for all relationship types, with marriage merely
being the default relationship type for the couple.
## 126

## References
Marriage in GEDCOM
Same-Sex Marriage in GEDCOM
## MARS {MARR_SETTLEMENT}:=
An event of creating an agreement between two people contemplating marriage, at which
time they agree to release or modify property rights that would otherwise arise from the
marriage.
## MEDI {MEDIA}:=
Information about the media or having to do with the medium in which information is
stored.
## NAME {NAME}:=
Depending on context, a product name, repository name or an individual's full name.
TheNAMEmust notcontain nobility titles. TheNAMEmaycontain earned titles and
salutations (SeeNPFX, page 127).
More than oneNAMErecord should be used for individuals known by multiple names.
## NATI {NATIONALITY}:=
The nationality of an individual.
## NATU {NATURALISATION}:=
The event of obtaining citizenship.
## NCHI {NUMBER_OF_CHILDREN}:=
The number of children that this individual (INDI.NCHI) or couple (FAM.NCHI) has.
## NICK {NICKNAME}:=
A descriptive or familiar that is used instead of, or in addition to, one's proper name.
## NMR {NUMBER_OF_RELATIONSHIPS}:=
The number of relationships (FAMrecords as a partner) this person would occur in if all
relationships were included.
## NOTE {NOTE}:=
Additional information provided by the submitter for understanding the enclosing data.
## NPFX {NAME_PREFIX}:=
Text which appears on a name line before the given and surname parts of a name.
e.g.Lt. Cmndr.Joseph /Allen/ Jr.
In this example Lt. Cmndr. is considered as the name prefix portion.
## NSFX {NAME_SUFFIX}:=
Text which appears on a name line after or behind the given and surname parts of a name.
e.g. Lt. Cmndr. Joseph /Allen/ Jr.
In this example Jr. is considered as the name suffix portion.
## OBJE {OBJECT}:=
Pertaining to a grouping of attributes used in describing something. Usually referring to the
data required to represent a multimedia object, such an audio recording, a photograph of a
person, or an image of a document.
## OCCU {OCCUPATION}:=
The type of work or profession of an individual.
## PAGE {PAGE}:=
A number or description to identify where information can be found in a referenced work.
## 127

## PEDI {PEDIGREE}:=
Information pertaining to an individual to parent lineage chart.
## PHON {PHONE}:=
A unique number assigned to access a specific telephone.
## PLAC {PLACE}:=
A jurisdictional name to identify the place or location of an event.
## POST {POSTAL_CODE}:=
A code used by a postal service to identify an area to facilitate mail handling.
## PROB {PROBATE}:=
An event of judicial determination of the validity of a will. May indicate several related
court activities over several dates.
## PROP {PROPERTY}:=
Pertaining to possessions such as real estate or other property of interest.
## PUBL {PUBLICATION}:=
Refers to when and/or where a work was published or created.
## QUAY {QUALITY_OF_DATA}:=
An assessment of the certainty of the evidence to support the conclusion drawn from
evidence.
## REFN {REFERENCE}:=
A description or number used to identify an item for filing, storage, or other reference
purposes.
## RELA {RELATIONSHIP}:=
A relationship value between the indicated contexts.
## RELI {RELIGION}:=
A religious denomination to which a person is affiliated or for which a record applies.
## REPO {REPOSITORY}:=
An institution or person that has the specified item as part of their collection(s).
## RESI {RESIDENCE}:=
An address or place of residence that a family or individual resided.
## RETI {RETIREMENT}:=
The event of ending one's occupational career.
## RIN {REC_ID_NUMBER}:=
A number assigned to a record by an originating automated system that can be used by a
receiving system to report results pertaining to that record.
## ROLE {ROLE}:=
A name given to a role played by an individual in connection with an event.
## ROMN {ROMANISED}:=
A romanised transcription of a superior text string.
## SEX {SEX}:=
Indicates the sex of an individual; male, female, intersex or unknown.
## SOUR {SOURCE}:=
The initial or original material from which information was obtained or (HEAD.SOUR) the
system that created the GEDCOM file.
## 128

## SPFX {SURN_PREFIX}:=
A name piece used as a non-indexing pre-part of a surname.
## STAE {STATE}:=
A geographical division of a larger jurisdictional area (country), such as a province or state.
## SUBM {SUBMITTER}:=
An individual or organization who contributes genealogical data to a file or transfers it to
someone else.
## SURN {SURNAME}:=
A family name passed on or used by members of a family.
## TEXT {TEXT}:=
The exact wording found in an original source document.
## TIME {TIME}:=
A time value in a 24-hour clock format, including hours, minutes, and optional seconds,
separated by a colon (:). Fractions of seconds are shown in decimal notation.
## TITL {TITLE}:=
A description of a specific writing or other work, such as the title of a book when used in a
source context, or a formal designation used by an individual in connection with positions of
royalty or other social status, such as Grand Duke.
## TYPE {TYPE}:=
A further qualification to the meaning of the superior record. The value does not have any
computer processing reliability. It is more in the form of a short one or two word note that
should be displayed any time the associated data is displayed.
## WIFE {WIFE}:=
A partner in aFAM(family group), often female, often partner to a man, and a biological,
official or legal parent to each of the children of this couple.
The name of this record strongly suggests that the line value must identify a wife, but that is
not the case; the relationship need not be a marriage, and the individual need not be female,
it may identify a man in a gay relationship.
## References
Same-Sex Marriage in GEDCOM
## WILL {WILL}:=
A legal document treated as an event, by which a person disposes of his or her estate, to take
effect after death. The event date is the date the will was signed while the person was alive.
(See alsoPROB(probate), page 128.)
## WWW {WEB}:=
World Wide Web address.
## 129

Appendix B ANSEL to Unicode Conversion
ANSEL to Unicode Conversion
There is more to conversion from ANSEL (or LANSEL) to Unicode than just the ANSEL to
Unicode conversion tables. A major issue is that, in ANSEL, combining characters (modifiers)
come before the base characters, while in Unicode they come after the base character.
After conversion from ANSEL to Unicode, the result should be normalised as appropriate for the
platform. On MacOSX, the string must be converted to Unicode Normal FormD (decomposed
characters), while on Windows, it must be converted to Unicode Normal FormC (precomposed
characters).
This normalisation step must not be skipped for either platform or normal form, as ANSEL text
may contain both composed and decomposed characters.
ANSEL to Unicode Conversion Algorithm
1.Convert each ANSEL code point into the corresponding Unicode code point
2.mirror the positions of each base character and its modifiers (modifiers after instead of
before base characters)
3.Convert to Unicode Normal FormC or Unicode Normal FormD, as appropriate for the
platform
Unicode to ANSEL Conversion
Conversion from Unicode to ANSEL may seem simple; just perform the ANSEL to Unicode
conversion step in reverse order:
1.Make sure the Unicode string is in Unicode Normal FormD
2.mirror the positions of each base characters and its modifiers (modifiers before instead
of after base characters)
3.Replace Unicode code points with their ANSEL equivalents
However, Unicode to ANSEL conversion is more complicated than that. There are two issues that
require attention:
▪unsupported characters
▪ANSEL's pre-composed characters
## Unsupported Characters
First of all, ANSEL does not support all the same characters that Unicode supports, and does not
feature an Replacement Character like Unicode does. The widespread convention for such cases
is to replace the unsupported character by a question mark. When doing so, care must be taken to
replace an unsupported character and all its modifiers by just one single question mark.
ANSEL does not support all the same combining characters as Unicode either. Generally
speaking, when a modifier isn't supported, the Unicode character isn't supported, and should be
replaced by a question mark.
It is arguably better, albeit inconsistent, to keep the base character if supported, and simply lose
any unsupported modifiers.
ANSEL's Pre-Composed Characters
Special attention must be paid to ANSEL's pre-composed characters. For example, ANSEL does
not contain an equivalent forU+031B Combining Horn, but it does contain equivalents for the
pre-composed charactersU+101A Latin Capital Letter O with HornandU+10AF Latin Capital
Letter U with Horn.
## 130

If your Unicode to ANSEL conversion fails to take the existence of ANSEL's pre-composed
characters into account, your conversion will reduce those characters to their base character.
Unicode to ANSEL Conversion Algorithm
1.Make sure the Unicode string is in Unicode Normal FormD
2.De-normalise for pre-composed characters supported by ANSEL
3.mirror the positions of each base characters and its modifiers (modifiers before instead
of after base characters)
4.Replace Unicode code points with their ANSEL equivalents
▪Replace unsupported characters with a question mark
▪Take care to replace an unsupported characters and all its modifiers by a single
question mark
▪If a base character is supported, but a modifier is not, keep the base character, but
leave off the modifier
The de-normalisation step is essential for taking advantage of ANSEL's pre-composed characters,
and not ending up with just their base character instead.
## Operating System Support
It is generally unwise to try and roll your own character set conversion functions, and best to rely
on built-in functions for any character set handling and conversions. All major operating systems,
operating environments, and several third-party libraries provide character set conversion
functions, but no major systems and few libraries support ANSEL. However, all major operating
systems provide functions for conversion of strings to Unicode Normal Forms:
▪Microsoft Windows provides theNormalizeString()andIsNormalizedString()
functions.
▪Apple MacOSX provides theNSString()function.
▪Oracle Java provides theNormalizer2class, with multiple methods.
▪Microsoft.NET provides theString.Normalize()method.
▪Google Android provides the sameNormalizer2class.
▪Apple iOS provides the sameNSString()function as Apple MacOSX.
Best Practice for Genealogy Applications
▪support import of ANSEL GEDCOM files
▪do not export to ANSEL GEDCOM
▪always export to UTF-8 or UTF-16
▪use built-in functions for Unicode normalisation
## References
ANSEL Administratively Withdrawn
GEDCOM 5.5.1 Specification ANSEL Table
LDS ANSEL versus LDS ANSEL
ANSEL Alif & Ayn
ANSEL / Unicode Conversion Tables
ANSEL / Unicode Conversion Algorithms
## 131

Appendix C ANSEL Character Set
ANSEL Tables
## ANSEL
The ANSEL character set (ANSI/NISO Z39.47-1985) was originally created in 1985CE by the
Standards Committee on Coded Character Sets for Bibliographic Information Interchange of
America. ANSEL is an 8-bit character set that supports dozens of Western languages without
requiring multiple, conflicting code pages to do so. ANSEL became widely used in library
systems, but has effectively been replaced by Unicode. The ANSEL specification was last
updated in 1993CE, reaffirmed in 2003CE, and administratively withdrawn in 2013CE.
ANSEL is mostly of historic interest now.
## Left Hook
The ANSEL character 0xF7 left hook appears as“left hoof”in the ANSEL standard. That is an
acknowledged typographical error. The actual name is“left hook”.
Replaced by Unicode
FamilySearch GEDCOM 4.0 (1989CE) through 5.5.1 (1999CE) recommend the use of ANSEL.
TheGEDCOM 5.5.1 Annotated Edition(2018CE) already notes that the GEDCOM 5.5.1 rules
are obsolete, that all genealogy applications should be Unicode-based and always export to
## Unicode.
GEDCOM 5.5.5 recommends that GEDCOM writers use Unicode instead of ANSEL.
Being phased out
Use of ANSEL in GEDCOM files is being phased out.
Use of the ANSEL character set is officially deprecated now.
New versions of existing systemsneed notandshouldprovide the ability to export ANSEL-
encoded GEDCOM file, but should be able to import ANSEL GEDCOM files, particularly
ANSEL GEDCOM files created by a previous version of the same system.
New systems using GEDCOM 5.5.5must notexport ANSEL-encoded GEDCOM files, andneed
notsupport import of any ANSEL GEDCOM files.
## LANSEL
Not ANSEL, but LANSEL
Technically, the tables provided in the GEDCOM specification aren't ANSEL tables, but
LANSEL tables.
TheFamilySearchtables leave ANSEL characters out and add extensions. Because these
extensions are defined by theLDS(FamilySearch's parent company), they are known as LDS
Extensions, and the resulting character set is known as LDS ANSEL, LANSEL for short.
GEDCOM keeps using the valueANSELto specify the LANSEL character set for backward
compatibility's sake.
## Bad Tables
The LANSEL tables in GEDCOM 5.5.1 and earlier often do not display as intended, because
FamilySearch relied on WordPerfect fonts that most users do not have installed. TheGEDCOM
5.5.1 Annotated Editioncontains LANSEL tables that does not rely on any particular font.
## 132

## Multiple Versions
Different versions ofFamilySearchGEDCOM contain different“ANSEL”tables.Different
FamilySearchGEDCOM versions omit different ANSEL characters and add different extensions.
Thus, FamilySearch actually defined different versions of LANSEL in different GEDCOM
versions.
That creates unnecessary uncertainty about whether specific characters are supported or not.
TheGEDCOM 5.5.1 Annotated Editionprovides consolidated LANSEL tables as bonus
information.
## Consolidated Tables
The consolidated tables are a combination of the original tables in the ANSEL standard and the
LANSEL tables that FamilySearch published in different GEDCOM versions. The consolidated
tables contain all the ANSEL characters that FamilySearch omitted, as well as all the LDS
extensions they added in different GEDCOM versions.
## Recommended Tables
GEDCOM 5.5.5 provides the same consolidated LANSEL table asGEDCOM 5.5.1 Annotated
Editionas the replacement for the tables provided in earlier versions of GEDCOM. Developers
are recommended to not rely on those earlier tables, but simply use the consolidated tables
provided here with previous versions of GEDCOM as well.
WordPerfect Codes
The LANSEL tables in GEDCOM 5.5.1 and earlier contain a column specifying wpcodes; the
WordPerfect code page and code point for a character. That irrelevant information is no longer
provided.
## Unicode
The new LANSEL tables provide the Unicode code points and names that correspond with the
LANSEL codes and the Unicode names (technically, the Unicode names should be ALL-
UPPERCASE, but that does not help readability). It is recommended that developers use the
Unicode names exclusively.
There is more to conversion from ANSEL or LANSEL to Unicode than just the ANSEL to
Unicode conversion tables. SeeAppendix BANSEL to Unicode Conversion, page 130.
## Combining Characters
Thegraphicscolumn of these tables, show theactualcombining characters, not some non-
combining character that approximates it. For example, the first character shown is U+0300
Combining Grave Accent, not U+0060 Grave Accent.
To show the combining characters correctly and to clearly show the relative position of the
combining character, the table uses ◌ (U+25CC Dotted Circle) as a placeholder character.
## 133

ANSEL Non-spacing graphic characters
HexDecGraphicNameexample of use
code
point
## Name
## E0224◌
## ̉
low rising tone markcu
## ̉
iU+0309Combining Hook Above
## E1225◌
## ̀
grave accentrègleU+0300Combining Grave Accent
## E2226◌
## ́
acute accentestáU+0301Combining Acute Accent
## E3227◌
## ̂
circumflex accentmêmeU+0302Combining Circumflex Accent
## E4228◌
## ̃
tildeniñoU+0303Combining Tilde
## E5229◌
## ̄
macrongājējsU+0304Combining Macron
## E6230◌
## ̆
brevealtăU+0306Combining Breve
## E7231◌
## ̇
dot aboveżabaU+0307Combining Dot Above
## E8232◌
## ̈
umlaut (diaeresis)öppnaU+0308Combining Diaeresis
## E9233◌
## ̌
hacekvždyU+030CCombining Caron
## EA234◌
## ̊
circle above (angstrom)hårU+030ACombining Ring Above
## EB235◌
## ︠
ligature, left halfakademii
## ︠
a
## ︡
U+FE20Combining Ligature Left Half
## EC236◌
## ︡
ligature, right halfakademii
## ︠
a
## ︡
U+FE21Combining Ligature Right Half
## ED237◌
## ̕
high comma, off centerrozdel
## ̕
ovacU+0315Combining Comma Above Right
## EE238◌
## ̋
double acute accentidőszakiU+030BCombining Double Acute Accent
## EF239◌
## ̐
candrabinduAlii
## ̐
evU+0310Combining Cadrabindu
F0240◌̧cedillaçaU+0327Combining Cedilla
F1241◌̨right hook, ogonekvietąU+0328Combining Ogonek
## F2242◌
## ̣
dot belowted
## ̣
aU+0323Combining Dot Below
## F3243◌
## ̤
double dot belowk
## ̲
h
## ̲
ut
## ̤
bahU+0324Combining Diaeresis Below
## F4244◌
## ̥
circle belowSamskr
## ̥
taU+0325Combining Ring Below
## F5245◌
## ̳
double underscoreG
## ̳
hulamU+0333Combining Double Low Line
## F6246◌
## ̲
underscores
## ̲
amarU+0332Combining Low Line
## F7247◌
## ̦
left hookda
## ̄
rzin
## ̦
aU+0326Combining Comma Below
## F8248◌
## ̜
right cedillakho
## ̜
ngU+031CCombining Left Half Ring Below
## F9249◌
## ̮
half circle below (upadhmaniya)h
## ̮
umantus
## ̌
U+032ECombining Breve Below
## FA250◌
## ︢
double tilde, left halfn
## ︢
g
## ︣
alanU+FE22Combining Double Tilde Left Half
## FB251◌
## ︣
double tilde, right halfn
## ︢
g
## ︣
alanU+FE23Combining Double Tilde Right Half
FC252◌̸diacritic slash through charU+0338Combining Long Solidus Overlay
## FD253
## �
unusedU+FFFDReplacement Character
## FE254◌
## ̓
high comma, centeredge
## ̓
otermikaU+0313Combining Comma Above
## FF255
## �
illegalU+FFFDReplacement Character
## 134

ANSEL Spacing graphic characters
HexDecGraphicNameexample of use
code
point
## Name
## A0160
## �
unusedU+FFFDReplacement Character
A1161Łslash L — uppercaseŁódźU+0141Latin Capital Letter L with Stroke
A2162Øslash O — uppercaseØstU+00D8Latin Capital Letter O with Stroke
A3163Đslash D — uppercaseĐuroU+0110Latin Capital Letter D with Stroke
A4164Þthorn — uppercaseÞannU+00DELatin Capital Letter Thorn
A5165Æligature AE — uppercaseÆgirU+00C6Latin Capital Letter AE
A6166Œligature OE — uppercaseŒuvreU+0152Latin Capital Ligature OE
A7167◌ʹmjagkij znakfakulʹtetU+02B9Modifier Letter Prime
A8168·middle dotnovel·laU+00B7Middle Dot
## A9169
## ♭
musical flat
## B♭
U+266DMusical Flat Sign
AA170®registered trademarkABC®U+00AERegistered Sign
AB171±plus or minusA±BU+00B1Plus-Minus Sign
AC172Ơhook O - uppercaseBƠU+01A0Latin Capital Letter O with Horn
AD173Ưhook U - uppercaseXƯAU+01AFLatin Capital Letter U with Horn
AE174◌ʼalifUnʼyushoU+02BCModifier Letter Apostrophe
## AF175
## �
unusedU+FFFDReplacement Character
B0176◌ʻaynfaʻilU+02BBModifier Letter Turned Comma
B1177łslash l— lowercaserozbiłU+0142Latin Small Letter L with Stroke
B2178øslash o— lowercasehøjU+00F8Latin Small Letter O with Stroke
B3179đslash d— lowercaseđavolaU+0111Latin Small Letter D with Stroke
B4180þthorn— lowercaseþannU+00FELatin Small Letter Thorn
B5181æligature ae— lowercaseskægU+00E6Latin Small Letter AE
B6182œligature oe— lowercaseœuvreU+0153Latin Small Ligature OE
B7183◌ʺhard sign (tvjordyj znak)obʺi
## ︠
a
## ︡
vlenieU+02BAModified Letter Double Prime
B8184idotless i— lowercasemasaliU+0131Latin Small Letter Dotless I
B9185£British pound£5.00U+00A3Pound Sign
BA186ðethverðurU+00F0Latin Small Letter Eth
## BB187
## �
unusedU+FFFDReplacement Character
BC188ơhook o - lowercaseSơU+01A1Latin Small O with Horn
BD189ưhook u - uppercaseTự ĐứcU+01B0Latin Small U with Horn
BE190□empty box (LDS-extension)U+25A1Empty Box
BF191■black box (LDS-extension)U+25A0Black Box
C0192°degree sign10°C.U+00B0Degree Sign
C1193ℓscript l25 ℓ.U+2113Script Small L
## C2194
## ℗
phono copyright mark
## Decca℗
U+2117Sound recording copyright
C3195©copyright mark©1993U+00A9Copyright Sign
C4196♯music sharp signD♯U+266FMusic Sharp Sign
C5197¿inverted question mark¿Qué?U+00BFInverted Question Mark
C6198¡inverted exclamation mark¡Esta!U+00A1Inverted Exclamation Mark
## C7199
## �
unusedU+FFFDReplacement Character
## C8200
## �
unusedU+FFFDReplacement Character
## C9201
## �
unusedU+FFFDReplacement Character
## CA202
## �
unusedU+FFFDReplacement Character
## CB203
## �
unusedU+FFFDReplacement Character
## CC204
## �
unusedU+FFFDReplacement Character
CD205ee in middle of line (LDS extension)U+0065Latin Small Letter E
CE206oo in middle of line (LDS extension)U+006FLatin Small Letter O
CF207ßEss ZedPreußenU+00DFLatin Small Letter Sharp S
## 135

End of Specification
The end of the GEDCOM 5.5.5 specification.
## 136

## Bonus Chapters
The Bonus Chapters are not part of the GEDCOM Specification proper.
## 137

GEDCOM Validation
Developers must make sure that the GEDCOM files exported by their application are valid
GEDCOM files. There are several GEDCOM validators and some other tools available to help
with that. With the exception of GedChk, these tools are fairly mature.
GEDCOM validators are themselves applications that may contain errors.
When in doubt, try multiple validation tools, and re-read the specification.
GEDCOM Validators
GedChk
GedChkis a free GEDCOM validator byFamilySearch.GedChkis a command-line application
for MS-DOS, for which only version 0.9 Beta is available.GedChksupports GEDCOM 5.5 and
5.5.1.GedChkis available for FTP from theLDSwebsite.GedChkis not well-behaved enough to
run in a Windows DOS Box, but it does run inDOSBox, which is freely available for many
operating systems.
VGedX
VGedXis a free GEDCOM validator created byTim Forsythe, the creator ofGigatrees.
VGedXis a command-line application for Windows, complemented by a windowed
configuration interface.VGedXsupports GEDCOM5.5, GEDCOM5.5.1 and GEDCOM5.6, and
the user interface is available in multiple languages.VGedXis available for Windows, and
requires 64-bit Windows7 or later.
Chronoplex GEDCOM Validator
TheChronoplex GEDCOM Validatoris a free product ofChronoplex(Andrew Hoyle), creators
ofChronoplex Family Tree. TheChronoplex GEDCOM Validatoris a Microsoft.NET
application for Windows. TheChronoplex GEDCOM Validatorsupports GEDCOM5.5,
GEDCOM5.5.1 and GEDCOM5.6, and the user interface is available in multiple languages. The
Chronoplex GEDCOM Validatorrequires Windows and Microsoft.NET.
GED-inline
GED-inlineis a free on-line GEDCOM validator byNigel Munro Parker.
GED-inlinesupports GEDCOM 5.5 and GEDCOM 5.5.1.
## Additional Validation Tools
## Behold
Beholdis a commercial genealogy viewer byLouis Kessler.Behold's forgiving GEDCOM reader
provides so many error and warning messages, thatBeholdbe thought of as a GEDCOM
validator in disguise.
Behold supports every version of GEDCOM, including GEDCOM1.0. Behold requires
WindowsNT4.0 or later.
GedPad
GedPadis free product ofNigel Button Software, makers ofThe Complete Genealogy Reporter.
GedPadisn't a validator, but a GEDCOM editor with some validation features.GedPad's user-
interface is a bit unusual and it does not support ASCII or ANSEL files, but it can be a handy tool
## 138

to have around when some GEDCOM file gives you trouble.
## Genealogica Grafica
Genealogica Graficais a free product byTom de Neef, and the successor to his previous product,
KStableau.Genealogica Graficais a tool for creation of web charts and reports. On loading a
GEDCOM file, it provides a report that includes GEDCOM errors and genealogy consistency
checks.Genealogica Graficasupport GEDCOM 5.5 and GEDCOM 5.5.1.Genealogica Grafica
requires Windows.
## References
GEDCOM Validation
DOSBox
ftp://ftp.ldschurch.org/genealogy/GEDCOM/Utility/GedChk/
VGedX, the Gigatrees GEDCOM Validator
Chronoplex GEDCOM Validator
GED-inline
## Behold
GedPad
## Genealogica Grafica
## 139

GEDCOM Version Detection
## Examine First
A GEDCOM reader cannot simply start reading a GEDCOM file. The various GEDCOM
versions, character encodings and line terminators possible create a catch-22. A GEDCOM reader
must start byexaminingthe GEDCOM header, to discover the GEDCOM version, character
encoding and line terminator used, before it can startreadingthe GEDCOM file - including the
GEDCOM header. The GEDCOM reader can and should detect errors in the GEDCOM header.
Systems supporting GEDCOM need two separate things to read GEDCOM files; a GEDCOM
header recognition routine and at least one GEDCOM reader. A typical system will have more
than one GEDCOM reader, in support of multiple GEDCOM versions. The different readers take
advantage of many of the same subroutines, such as those for character set conversion, but do
parse GEDCOM files differently.
Choosing a GEDCOM Reader
The system chooses which GEDCOM reader to use for a particular GEDCOM file after
examining the GEDCOM header and interpreting the results. A system should only try to read a
particular GEDCOM file if it has a GEDCOM reader that supports its GEDCOM version and
encoding. If a system does not support it, the system should admit implementation limitation,
with a message such as“GEDCOM 4.0 is not supported. Please use GEDCOM 5.5 or later.”, and
abort processing.
When the system picks a GEDCOM reader, it has not checked that the GEDCOM header is valid.
It has merely examined the header to pick the right GEDCOM reader. It is up to the chosen
GEDCOM reader to read the entire GEDCOM header and verify that the GEDCOM header is
valid.
GEDCOM 5.5 & 5.5.1 versus GEDCOM 5.5.5
Many existing systems have a single GEDCOM reader that supports both GEDCOM 5.5 and
GEDCOM 5.5.1. Many of these readers accept errors known to occur in third-party GEDCOM
files, such as illegal tags and invalid GEDCOM headers. After more than two decades of systems
producing sloppy GEDCOM 5.5 and 5.5.1 files, many GEDCOM 5.5.x readers are quite
burdened by the complexity of supporting many known third-party errors.
Those GEDCOM 5.5 and 5.5.1 errors do not occur in GEDCOM 5.5.5 files, so a GEDCOM 5.5.5
reader need not and should not be burdened with that complexity.
Besides, GEDCOM 5.5.5 readers are not allowed to accept invalid GEDCOM.
Genealogy software developersmust notextend their existing GEDCOM 5.5.1 reader to accept
GEDCOM 5.5.5 files. Developersmustcreate a new, separate GEDCOM 5.5.5 reader. GEDCOM
5.5.5 is a leaner, meaner GEDCOM, less complex and simpler to parse. This new reader should
have much simpler and cleaner code, and be noticeable faster than the old GEDCOM 5.5.1
reader. The GEDCOM 5.5.5 readermustmake sure the GEDCOM header is valid, and reject the
ostensible GEDCOM file if it is not.
Newer GEDCOM Versions
If theHEAD.GEDC.VERSvalue is a higher value that the system does not recognise yet, the
systemmustadmit this implementation limitation, and abort. The systemmust nottry to import
the GEDCOM file until explicit support for the new GEDCOM version has been added.
## GEDCOM 5.5.5
A GEDCOM 5.5.5 writermustcreate a correct GEDCOM header, and a GEDCOM readermust
notaccept invalid GEDCOM headers. Detection of GEDCOM 5.5.5 files is quite straightforward,
## 140

especially in comparison to the complexity of correctly distinguishing between GEDCOM 5.5
and 5.5.1 files. A system will call upon its GEDCOM 5.5.5 reader after detecting a
HEAD.GEDC.VERSvalue of5.5.5.
When called upon, the GEDCOM 5.5.5 reader starts reading the GEDCOM file from the
beginning, starting with the GEDCOM header. If the header is not completely valid, the filemust
be rejected asnot GEDCOM, specifically as not even having a correct GEDCOM header.
## GEDCOM 5.5.1
Many GEDCOM readers for GEDCOM 5.5.1 and earlier are quite forgiving about GEDCOM
errors including errors in the GEDCOM header. This is a very undesirable bad practice, that
effectively licenses the creators of sloppy GEDCOM with bad GEDCOM headers to continue
doing so. The existing GEDCOM readers for GEDCOM 5.5.1 and earlier should continue their
current practices for backward compatibility's sake, so as to not break existing user practices.
All developers are encouraged to fix problems with the GEDCOM files produced by their
existing systems. That starts by making sure the system produces a correct and valid GEDCOM
header.
Developers are not merely encouraged to take advantage of GEDCOM validators to verify the
GEDCOM produced by their systems, but strongly encouraged to make validator usage an
integral part of their software development cycle.
Developers of systems that do not support GEDCOM 5.5.5 yet, should make sure that their
systems recognise GEDCOM 5.5.5, admits the implementation limitation with a message such as
“GEDCOM 5.5.5 not supported yet”, and then aborts processing.
Developers are encouraged to add GEDCOM 5.5.5 support as soon as possible.
## 141

GEDCOM 5.5.1 Version Detection
GEDCOM 5.5.1 version detection is complicated by the fact that several applications produce
GEDCOM 5.5.1 files that incorrectly claim to be version5.5files instead of5.5.1files.
In fact, nowadays (2019CE), most GEDCOM files that claim to be GEDCOM 5.5 files are
actually GEDCOM 5.5.1 files.
FamilySearchPAF is the best known application to lie about the GEDCOM version used, but not
the only one. Other products that use GEDCOM 5.5.1 but lie that they are using GEDCOM 5.5
includeAncestral Quest,MyHeritage Family Tree Builder,Ancestry.com's New Family Tree
Maker,Family Tree Heritage,Geni.com,GEDitCOM II,gramps,Heredis 98,Kith and Kin,
Legacy Family Tree,Ancestry.com's Online Family Tree,Personal Ancestry Writer II,Reunion,
The Next Generation of Genealogy Sitebuilding (TNG), andWikiTree.
Some products that correctly identify their use of GEDCOM 5.5.1 includeAhnenblatt,Family
Echo,Ancestry.com's New Family Tree Maker,findmypast Family Tree,gedcom4j,Legacy
Family Tree,MacFamilyTree,Picturae's Memorix Maior,phpGedView,RootsMagic, and
WebTrees.
Some products appear in both list because some versions of the product get it wrong, while later
versions get it right. For the detection algorithm presented here, all that matters is when products
started using GEDCOM 5.5.1 yet continued to label their GEDCOM files (incorrectly) as
GEDCOM 5.5. It does not matter whether or when the developers fixed their product to start
labelling their GEDCOM 5.5.1 files correctly.
GEDCOM 5.5 versus GEDCOM 5.5.1 File Content
It is possible to distinguish between GEDCOM 5.5 and GEDCOM 5.5.1 files based on their
content, for example with the following rules:
▪if the GEDCOM files contains aOBJE.BLOBrecord, it is GEDCOM 5.5
▪if the GEDCOM files contains aPLAC.MAPrecord, it is GEDCOM 5.5.1
However, a GEDCOM reader should be able to determine the actual GEDCOM version without
looking beyond the GEDCOM header.
GEDCOM 5.5.1 Detection Algorithm
This is a the algorithm for distinguishing between GEDCOM 5.5 and GEDCOM 5.5.1. Numbered
steps should be performed in the order shown. As soon as a rule matches and the actual
GEDCOM version is known, no further tests should be performed.
▪Detect the character encoding first
▪read theHEAD.GEDC.VERSline value
▪if the value is5.5.1, it is GEDCOM 5.5.1
▪if the value is5.5, it may be either GEDCOM 5.5 or GEDCOM 5.5.1
1.(Optional): check the system identifier (HEAD.SOURline value)
against a list of system identifiers for products discontinued before (or some time
after) the introduction of GEDCOM 5.5.1:
if there is a match, it's definitely GEDCOM 5.5, and not GEDCOM 5.5.1.
2.Check the GEDCOM encoding
▪if the character encoding is UTF-8, it is GEDCOM 5.5.1
3.Check for tags introduced in GEDCOM 5.5.1
▪if the header contains aHEAD.SOUR.CORP.ADR3record, it is GEDCOM 5.5.1
▪if the header contains aHEAD.SOUR.CORP.EMAILrecord, it is GEDCOM
## 5.5.1
## 142

▪if the header contains aHEAD.SOUR.CORP.FAXrecord, it is GEDCOM 5.5.1
▪if the header contains aHEAD.SOUR.CORP.WWWrecord, it is GEDCOM
## 5.5.1
4.Check for known products and versions.
1.Make sure you have a system identifier.
▪if the system identifier is too long (it is forThe Next Generation of
Genealogy Sitebuilding), issue a non-fatal error and continue
▪If the (HEAD.SOURline value is missing (illegal!)
▪try to identify the correct system identifier by other means (see
section onMacFamilyTreebelow)
▪if you failed to identify it, issue a fatal error and abort
▪if you managed to identify it, issue a non-fatal error and continue
with that system identifier
2.Make sure you have a version number.
▪If the (HEAD.VERSline value is missing, issue a fatal error and
abort.
▪If the (HEAD.VERSline value isn't a proper version number
▪try to extract the version number (see section onFamily Tree
## Makerbelow)
▪if you failed to extract it, issue a fatal error and abort
▪if you managed extract it, issue a non-fatal error and continue with
that version number
3.Perform the known product / version number checks.
▪if the system identifier isPAF
▪if the version number is less than5.0, it is GEDCOM 5.5
▪if the version number is5.0or more, it is GEDCOM 5.5.1
▪See the table below for more products and version numbers.
5.Check for user-defined tags being used instead of GEDCOM 5.5.1 tags
▪if the header contains aHEAD.SOUR.CORP._EMAILrecord, it must be
## GEDCOM 5.5
▪if the header contains aHEAD.SOUR.CORP._FAXrecord, it must be GEDCOM
## 5.5
▪if the header contains aHEAD.SOUR.CORP._WWWrecord, it must be
## GEDCOM 5.5
6.None of the previous rules matched? Assume it is 5.5 as stated.
▪if theHEAD.GEDC.VERSvalue is5.5, but the actual GEDCOM version is 5.5.1, issue a
non-fatal error
▪Issue an informative message that the file will be processed as GEDCOM 5.5 or GEDCOM
5.5.1, whichever version was detected
Notice the last two instructions in the algorithm. It is good to let the user know that an ostensible
GEDCOM 5.5 file is really a GEDCOM 5.5.1 file. It is good to explicitly inform the user how the
file will be processed.
## 143

## Product Table
Version of product that started using GEDCOM 5.5.1
applicationsystem identifierversion
Personal Ancestral FilePAF5.0
Ancestral QuestAncestQuest12.0
Family Tree MakerFTM21.0.0.466
GenoProGenoPro2.0
grampsGramps2.0
LifelinesLifelines3.0
MacFamilyTreeMacFamilyTree5.7.8
MagiKey Family TreeMagiKey Family Tree
all
versions
Family Tree BuilderMYHERITAGE5.5
ReunionReunion9.0
RootsMagicRootsMagic
all
versions
The Next Generation of Genealogy
## Sitebuilding
The Next Generation of Genealogy
## Sitebuilding
## 7.0
## PRO-GENPRO-GEN3.0
This list is not exhaustive.
## Product Information
## Family Tree Maker Version Number
TheFamily Tree Makername is used for what are really three different, consecutive products
(and then there's alsoFamily Tree Maker for Macintosh):
▪the originalFamily Tree Maker, an MS-DOS application
▪Family Tree Maker for Windowsa Windows applications
▪NewFamily Tree Maker for Windows, a Microsoft.NET application
GEDCOM System Identifiers
Those three different products use only two different GEDCOM system identifiers.Family Tree
Maker for MS-DOSusesFTMFamily Tree Maker for WindowsusesFTWandNew Family Tree
Maker for WindowsusesFTMagain.
This is wrong, and may mess up some tests, but does not mess up this test, because the version
numbers continued to increase with new products.Family Tree Maker 2012Service Pack 2
(version 21.0.0.46) is the first version to produce ostensible GEDCOM 5.5 files that are really
GEDCOM 5.5.1 files.Family Tree Maker for MS-DOSpre-dates GEDCOM 5.5.1, and all its
versions numbers are considerably lower than those ofNew Family Tree Maker for Windows. So,
if theFamily Tree Makeversion number is 21.0.0.466 or later, it is GEDCOM 5.5.1.
FTM Version Number
WhenAncestry.comcreatedNew Family Tree Maker for Windows, they messed up the version
number record, by practically treating it as product name record. This was only fixed after
Software MacKievbecame the owner ofFamily Tree Maker.
Family Tree Maker 2012's version number is21.0.0.38, but theHEAD.SOUR.VERSline
value isn't21.0.0.38, it isFamily Tree Maker (21.0.0.38)instead. That value is
illegal, for two reasons:
▪it clearly isn't a proper version number
▪this value (29 characters) is longer than the maximumHEAD.SOUR.VERSline value length
## 144

of 15 code units
A GEDCOM reader should definitely issue an error when encountering this, and it is okay for
that error to be an fatal error; it is fine to reject an ostensible GEDCOM file if it does not even
have a valid GEDCOM header.
It is not difficult to recognise theFamily Tree Maker (version number)pattern and
extract the version number from it, and this is what a GEDCOM reader has to do before it can
perform this test.
32-bit versus 64-bit Version Number
FromFamily Tree Maker 2014onwards,Family Tree Makercomes in both a 32-bit and a 64-bit
build, and those two different builds have different version numbers. The version number of the
32-bitFamily Tree Maker 2014is22.0.0.207, while the version number of the 64-bitFamily
## Tree Maker 2014is22.0.0.1207.
This does not complicate the test, as the switch to GEDCOM 5.5.1 happened with versionFamily
Tree Maker 2012Service Pack 2 (version 21.0.0.46), for which there is only a 32-bit build, and
therefore just one version number to compare to.
Family Tree Maker for Macintosh
There are twoFamily Tree Maker for Macproducts.
▪Family Tree Maker for Mac, based onFamily Tree Maker for Windows, released by
Broderbundin 1997CE
▪Family Tree Maker for Mac, based onNew Family Tree Maker, released byAncestry.comin
## 2010
The newFamily Tree Maker for Macuses the same system identifier (FTM) asNew Family Tree
Maker(for Windows), and that is wrong, because it is definitely another product.Family Tree
Maker for Macuses the same version numbering asNew Family Tree Maker, and the older
Ancestry.comFamily Tree Maker for Macalso uses the same illegalHEAD.SOUR.VERSformat.
The GEDCOM 5.5.1 detection code forFamily Tree Makerdoes not to distinguish between
Family Tree Maker(for Windows) andFamily Tree Maker for Mac.
Recognising MacFamilyTree GEDCOM files
RecognisingMacFamilyTreeGEDCOM files is harder than it should be. In many
MacFamilyTreeGEDCOM files, theHEAD.SOURvalue is empty. This is illegal, and a
GEDCOM reader should definitely issue an error, and it is okay for that error to be an fatal error,
because it's fine to reject an ostensible GEDCOM file if it does not even have a valid GEDCOM
header.
It is possible for a GEDCOM reader to recognise the GEDCOM file asMacFamilyTree
GEDCOM file; if theHEAD.SOURline value is empty, but theHEAD.SOUR.NAMEline value
isMacFamilyTree, it is a MacFamilyTree GEDCOM file.
## Legacy Family Tree
Legacy Family TreeGEDCOM files may lack the GEDCOM version number! See theLegacy
Family Tree GEDCOM Versionannotation.
## Table Updates
This algorithm can be improved by updating the table with more product-specific information.
This bonus chapter is based on and practically identical to theGEDCOM 5.5.1 Version Detection
article, which is likely to be updated sooner and more frequently than this chapter.
## 145

## References
GEDCOM 5.5.1 Version Detection
GEDCOM Version Detection
Truncated GEDCOM Version
GEDCOM System Identifiers
New Family Tree Maker versions
Ancestry.com & Software MacKiev Family Tree Maker GEDCOM Header
## 146

Event GEDCOM
Back in 1994,CommSoft, the creators of the Roots series of genealogy applications, defined an
alternative GEDCOM form. It was originally called InterGED, but best known as Event
GEDCOM. Event GEDCOM was first supported by ROOTS IV.
Although Event GEDCOM is arguably superior to the Lineage-Linked Form, Event GEDCOM
never caught on. Event GEDCOM was only ever supported by Roots IV, Roots V, Family
Gathering and Ultimate Family Tree.
Event GEDCOM files are rare, and backward compatible with GEDCOM 5.3 lineage-linked
GEDCOM files.
FamilySearch Misinformation
FamilySearch's statement about CommSoft's Event GEDCOM in GEDCOM 5.4, 5.5, 5.5.1 (and
even the 5.6 draft) is incorrect. Event GEDCOMdoes notuse the line value
"EVENT_LINEAGE_LINKED", neither with nor without quotes. Event GEDCOM files are
backward compatible with lineage-linked GEDCOM files, and therefore use the line value
LINEAGE-LINKED,as instructed by theFamilySearchGEDCOM specification:“Systems will
use this value to specify GEDCOM compatible with these specifications.”.
Actual Event GEDCOM
Event GEDCOM 1.0 files contain a additional subrecord,HEAD.FORM.FORMrecord with the
valueEVENT(illegal in LINEAGE-LINKED GEDCOM), and, although based on GEDCOM 5.3,
claims to be GEDCOM version 1.0.
## 0 HEAD
## ...
## 1 SOUR FAMGATH
## 2 VERS 1.0
2 NAME Family Gathering
2 CORP Palladium Interactive, Inc.
## ...
## 1 GEDC
## 2 VERS 1.0
## 2 FORM LINEAGE-LINKED
## 3 FORM EVENT
## 1 DEST FAMGATH
## ...
Family Gathering 1.0 Event GEDCOM header.
## References
GEDCOM Form
Event GEDCOM Detection
## 147

Known GEDCOM Form Errors
Many GEDCOM 5.5 and 5.5.1 readers correct for known GEDCOM 5.5 and 5.5.1 GEDCOM
LINEAGE-LINKEDspelling errors. A GEDCOM 5.5.5 readerneed notandmust notcorrect for
spelling errors.
If a GEDCOM 5.5.5 reader encounters an unknown GEDCOM form, itmust notcontinue
processing, but must abort with anunsupported GEDCOM formmessage.
LINEAGE_LINKEDinstead ofLINEAGE-LINKED(underscore instead of
dash)
Millennia's Legacy Family Tree (now owned by MyHeritage) is perhaps the best known but not
the only genealogy application to get this wrong. This error occurs in GEDCOM files produced
by EasyTree, FamilyMatters, GEDitCOM, Généamania, GenoPro, Secere Family Tree and
WebSSG.
LINAGE-LINKEDinstead ofLINEAGE-LINKED(first E missing):
This error occurs in GEDCOM files created by GenoPro.
Lineage - Linkedinstead ofLINEAGE-LINKED(spaces before and
after the dash):
The French application Genealogic by Infoduc and the French site Genealogie.com created
GEDCOM files containing this error.
## 148

More than One <<SUBMITTER_RECORD>>
A GEDCOM 5.5.5 file contains exactly one <<SUBMITTER_RECORD>>, directly after the
## <<HEADER>>
A typical GEDCOM 5.5.1 file contains exactly one <<SUBMITTER_RECORD>>, referenced by
HEAD.SUBM, but GEDCOM 5.5.1 allowed multiple submitter records.
Both the<<INDIVIDUAL_RECORD>>and the<<FAM_GROUP_RECORD>>optionally
reference a submitter record. This allows multiple submitters to be associated with different
records.
This GEDCOM 5.5.1 feature remained widely unsupported. It makes little sense for single-user
applications, and even collaborative applications (social genealogy sites) do not use it. All
genealogy applications, includingFamilySearchPAFsupport only one submitter per GEDCOM
file.
The editor and reviewers are not aware of any genealogy application that supports more than
submitter per GEDCOM file. Even if there is one, other genealogy applications are not able to
import and process that data. The GEDCOM 5.5.1 Annotated Edition strongly deprecated this
feature. The GEDCOM 5.5.5 specification demands exactly one submitter record.
GEDCOM Writer Best Practice
▪use GEDCOM 5.5.5 or later
GEDCOM 5.5.1 Writer Best Practice
▪create exactly one submitter record
▪haveHEAD.SUBMreference this submitter record
▪write the submitter record immediately after the GEDCOM header
GEDCOM 5.5.1 Reader Best Practice
▪Remember theHEAD.SUBMcross-reference identifier
▪Keep track of submitter record identifiers like you keep track of other identifiers
▪if any cross-reference identifier is reused, issue a fatal error (identifier already used) and
abort the import
▪if the referenced submitter record is not found, issue a fatal error (referenced record not
found) and abort the import
▪Until you have the right submitter record:
▪Accept each submitter record you encounter (overwriting the previous one, if any)
▪issue an error if it isn't the one referenced byHEAD.SUBM
▪Once you have the right submitter record, for each additional submitter record:
▪donotoverwrite the submitter record you already found
▪issue animplementation limitationerror (only one submitter record supported) and move
on
## 149

No Standard for Multimedia File Transfer
The GEDCOM specification defines a<<MULTIMEDIA_RECORD>>. Each multimedia record
provides a link to an external file. The GEDCOM specification does not provide a standard for
bundling multimedia files with a GEDCOM file.
As long as the source and destination system are two different applications on the same computer
(or mirrored systems), the multimedia file links are efficient, but for sharing multimedia files to
another system, a locally valid link is inadequate.
Links to web resources do remain valid between different systems, but their permanence cannot
be guaranteed, and performance is likely to suffer.
TheFamilySearchGEDCOM specification does not provide any standard, any rules or guidelines
for bundling multimedia files with a GEDCOM file. It is not uncommon to bundle a GEDCOM
file and media together in a ZIP file, but that only takes care of the media transfer, not the file
paths, which are almost sure to be different on different systems, especially if these are managed
by different users.
Some desktop applications have built-in smarts to try and repair files references, and several
desktop applications provide syncing of desktop databases with web databases.
## Best Practices
Applications should maintain links to media,notstore media inside their database. Storing media
inside the database bloats the database, and makes the media inaccessible to other tools.
Genealogy software developers and applications should encourage users to collect and keep all
related media in one directory (with subdirectories).
## 150

## GEDCOM 5.5 <<MULTIMEDIA_RECORD>>
The FamilySearch GEDCOM 5.5.1 <<MULTIMEDIA_RECORD>> is different from the
## GEDCOM 5.5 <<MULTIMEDIA_RECORD>>.
This is the GEDCOM 5.5.1 <<MULTIMEDIA_RECORD>> (corrected to use
<MULTIMEDIA_FILE_REFERENCE> instead of the non-existing
## <MULTIMEDIA_FILE_REFN>):
## MULTIMEDIA_RECORD:=
n@<XREF:OBJE>@OBJE
## +1FILE<MULTIMEDIA_FILE_REFERENCE>
## +2FORM<MULTIMEDIA_FORMAT>
## +3TYPE<SOURCE_MEDIA_TYPE>
## +2TITL<DESCRIPTIVE_TITLE>
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1 <<NOTE_STRUCTURE>>
## +1 <<SOURCE_CITATION>>
## +1 <<CHANGE_DATE>>
TheBLOBcontext of the multimedia record was removed in version 5.5.1. A reference
to a multimedia file was added to the record structure.The file reference occurs one to
many times so that multiple files can be grouped together, each pertaining to the same
context. For example, if you wanted to associate a sound clip and a photo, you would
reference each multimedia file and indicate the format using theFORMtag subordinate
to each file reference.
The <<SOURCE_CITATION>> line is not new in GEDCOM 5.5.1.
It was added to GEDCOM 5.5 through the GEDCOM 5.5 errata sheet.
The GEDCOM 5.5.1 <<MULTIMEDIA_RECORD>> allows a singleOBJErecord to link to
multiple related files.
This feature is not widely supported; many genealogy application will read only the first
OBJE.FILE. To avoid loss of data, it is recommended to have just oneOBJE.FILEsubrecord per
OBJErecord. The GEDCOM 5.5.5 specification simplified the multimedia record: one
multimedia record per file, one file per multimedia record.
This is the GEDCOM 5.5 <<MULTIMEDIA_RECORD>> for comparison:
## MULTIMEDIA_RECORD:=
n@<XREF:OBJE>@OBJE
## +1FORM<MULTIMEDIA_FORMAT>
## +1TITL<DESCRIPTIVE_TITLE>
## +1 <<NOTE_STRUCTURE>>
## +1 <<SOURCE_CITATION>>
## +1BLOB
## +2CONT<ENCODED_MULTIMEDIA_LINE>
+1OBJE@<XREF:OBJE>@/* chain to continued object */
## +1REFN<USER_REFERENCE_NUMBER>
## +2TYPE<USER_REFERENCE_TYPE>
## +1RIN<AUTOMATED_RECORD_ID>
## +1 <<CHANGE_DATE>>
Large whole multimedia objects embedded in a GEDCOM file would break some systems.
For this purpose, large multimedia files should be divided into smaller multimedia records
by using the subordinate OBJE tag to chain to the next <MULTIMEDIA_RECORD>
## {1:1}
## {1:1}
## {1:1}
## {0:1}
## {0:1}
## {0:M}
## {0:1}
## {0:1}
## {0:M}
## {0:M}
## {0:1}
## {1:1}
## {1:1}
## {0:1}
## {0:M}
## {0:M}{0:1}
## {1:M}
## {0:1}
## {0:M}
## {0:1}
## {0:1}
## {0:1}
## 151

fragment. This will allow GEDCOM records to be maintained below the 32K limit for use
in systems with limited resources.
Within the definition above, theBLOBsubrecord has been marked as deprecated (in GEDCOM
5.5), because on second thoughts,FamilySearchconsidered BLOBs a bad idea, so they
discontinued BLOB support in GEDCOM 5.5.1.
However, it is best to think of this entire GEDCOM 5.5 record as obsolete. Developers should
pay attention to the small differences between the GEDCOM 5.5 and 5.5.1 definition, and not
simply reuse old code, but make sure that they are using the GEDCOM 5.5.1 definition.
## Chain Pointer
The <XREF:OBJE> pointer within theBLOBsubrecord (on the line highlighted because it
includes an illegal C-style comment) isn't a circular reference. As the GEDCOM 5.5 definition
explains, it's there because encoded media file are likely to be larger thanthe (now obsolete)
maximum top-level record size of 32 KB. A GEDCOM 5.5 writer must break the encoded media
files into pieces of less than 32KB, and then chain those pieces together. A GEDCOM 5.5 reader
must follow the chain pointers and put the encoded media file together again.
## 152

## GEDCOM 5.5.1 <MULTIMEDIA_LINK>
This is the GEDCOM 5.5.5<<MULTIMEDIA_LINK>>definition:
## MULTIMEDIA_LINK:=
nOBJE<XREF:OBJE>
A <<MULTIMEDIA_LINK>> is a link to a<<MULTIMEDIA_RECORD>>(which is
a link to a multimedia file).
There should be one multi-media record per file. There may be multiple multi-media
links to a multi-media record.
That GEDCOM 5.5.5 <<MULTIMEDIA_LINK>> is a significant simplification of the
GEDCOM 5.5.1 definition (without page numbers, but with annotations & corrections from the
## Annotated Edition):
## MULTIMEDIA_LINK:=
## [
nOBJE@<XREF:OBJE>@
## |
nOBJE
## +1FILE<MULTIMEDIA_FILE_REFN>
## +1FILE<MULTIMEDIA_FILE_REFERENCE>
## +2FORM<MULTIMEDIA_FORMAT>
## +3MEDI<SOURCE_MEDIA_TYPE>
## +1TITL<DESCRIPTIVE_TITLE>
## ]
Note: some systems may have output the following 5.5 structure. The new context
above was introduced in order to allow a grouping of related multimedia files to a
particular context.
n OBJE
## +1 FILE<MULTIMEDIA_FILE_REFERENCE>
## +1 FORM <MULTIMEDIA_FORMAT>
## +2 MEDI <SOURCE_MEDIA_TYPE>
## +1 TITLE <DESCRIPTIVE_TITLE>
## +1 <<NOTE_STRUCTURE>>
Non-Existent <MULTIMEDIA_FILE_REFN>
The<<MULTIMEDIA_LINK>>syntax references
<MULTIMEDIA_FILE_REFN>, but the GEDCOM lineage-linked form
doesn't define <MULTIMEDIA_FILE_REFN>, it defines
## <MULTIMEDIA_FILE_REFERENCE>.
This is theactualGEDCOM 5.5 <MULTIMEDIA_LINK> definition:
## MULTIMEDIA_LINK:=
[/* embedded form */
nOBJE@<XREF:OBJE>@
|/* linked form */
## {1:1}
## {1:1}
## {1:M}{1:M}
## {1:1}
## {0:1}
## {0:1}
## {1:1}
## 153

nOBJE
## +1FORM<MULTIMEDIA_FORMAT>
## +1TITL<DESCRIPTIVE_TITLE>
## +1FILE<MULTIMEDIA_FILE_REFERENCE>
## +1 <<NOTE_STRUCTURE>>
## ]
This structure provides two options in handling the GEDCOM multimedia interface.
The first alternative (embedded) includes all of the data, including the multimedia
object, within the transmission file. The embedded method includes pointers to
GEDCOM records that contain encoded image or sound objects. Each record
represents a multimedia object or object fragment. An object fragment is created by
breaking the multimedia files into several multimedia object records of 32K or less.
These fragments are tied together by chaining from one multimedia object fragment to
the next in sequence. This procedure will help manage the size of a multimedia
GEDCOM record so that existing systems which are not expecting large multimedia
records may discard the records without crashing due to the size of the record. Systems
which handle embedded multimedia can reconstitute the multimedia fragments by
decoding the object fragments and concatenating them to the assigned multimedia file.
The second method allows the GEDCOM context to be connected to an external
multimedia file. This process is only managed by GEDCOM in the sense that the
appropriate file name is included in the GEDCOM file in context, but the maintenance
and transfer of the multimedia files are external to GEDCOM.
Two <<MULTIMEDIA_LINK>> Forms
The GEDCOM 5.5 and GEDCOM 5.5.1 <<MULTIMEDIA_LINK>> definition allows two
alternative forms The first form, called theembedded form, uses an <XREF:OBJE>, a link to a
<<MULTIMEDIA_RECORD>>, while the second form, called thelinked form, contains details
for an external multimedia file.
TheGEDCOM 5.5 <<MULTIMEDIA_LINK>> definitionmakes it clear that the so-called
embedded formwas meant for embedded multimedia objects only, and GEDCOM 5.5.1 does not
support embedded multimedia objects.
TheGEDCOM 5.5.1. Annotated Editionnotes that you might think that this implies that the
embedded formis obsolete now, but that it is not; on the contrary, it is the preferred form.
The so-calledlinked formof the GEDCOM 5.5.1 <<MULTIMEDIA_LINK>> record offers a
subset of the GEDCOM 5.5.1 <<MULTIMEDIA_RECORD>> features. That makes it
superfluous, and that is why theAnnotated Editiondeprecated thelinked form.
TheGEDCOM 5.5.1. Annotated Editionprovides the following best practice for GEDCOM 5.5.1:
It is recommended that all multimedia files be recorded in GEDCOM 5.5.1 using the top-
levelOBJErecord, and that all instances of the <MULTIMEDIA_LINK> record are
<XREF:OBJE> links to these <<MULTIMEDIA_RECORD>> records.
Consider the so-calledlinked formof the <<MULTIMEDIA_LINK>> record deprecated.
GEDCOM 5.5.1 Specification misrepresents GEDCOM 5.5
## <<MULTIMEDIA_LINK>>
The GEDCOM 5.5.1 <<MULTIMEDIA_LINK>> definition claims that the (linked form of the)
GEDCOM 5.5 <<MULTIMEDIA_LINK>> definition (after the indicated corrections) looks like
this:
## {1:1}
## {0:1}
## {1:M}
## {0:M}
## 154

## MULTIMEDIA_LINK:=
nOBJE
## +1FILE<MULTIMEDIA_FILE_REFERENCE>
## +1FORM<MULTIMEDIA_FORMAT>
## +2MEDI<SOURCE_MEDIA_TYPE>
## +1TITL<DESCRIPTIVE_TITLE>
However, that is not correct. The linked form of the GEDCOM 5.5 <<MULTIMEDIA_LINK>>
definition looks like this:
## MULTIMEDIA_LINK:=
nOBJE
## +1FORM<MULTIMEDIA_FORMAT>
## +1TITL<DESCRIPTIVE_TITLE>
## +1FILE<MULTIMEDIA_FILE_REFERENCE>
## +1 <<NOTE_STRUCTURE>>
The GEDCOM 5.5 definition does not include aMEDIsubrecord at all, neither as direct
subrecord of theOBJErecord, nor as a subrecord of theOBJE.FORMrecord. The GEDCOM 5.5
definition allows notes, while the GEDCOM 5.5.1 definition does not.
## Editing Error
The misrepresentation of the GEDCOM 5.5 syntax seems an unintentional editing error. The two
differences between the GEDCOM5.5 and 5.5.1 definitions that the author probably wanted to
draw the reader's attention to, are:
▪The GEDCOM 5.5 record allows just one file, while the GEDCOM 5.5.1 record allows a
group of files
▪The GEDCOM 5.5 record has theFORMrecord as a direct subrecord of theOBJErecord,
while the GEDCOM 5.5.1 record has theFORMrecord as a subrecord of theOBJE.FILE
record.
## Syntax Exception
The real point of the remark is to demand a syntax exception for“some systems”that use
GEDCOM 5.5.1, but still createMULTIMEDIA_LINKrecords in GEDCOM 5.5 format! The
implied demand is that GEDCOM 5.5.1 readers should accept GEDCOM5.5
MULTIMEDIA_LINKrecords, even though they are not part of GEDCOM5.5.1.
GEDCOM 5.5.1 specification <<MULTIMEDIA_LINK>>
## Clairvoyance
TheFamilySearch GEDCOM 5.5.1 specificationstates that some systems“may have output”
(past tense) the GEDCOM 5.5 structure within GEDCOM 5.5.1 files. That sounds like a helpful
annotation, but it is a rather remarkable one.
On the day thatFamilySearchintroduced GEDCOM 5.5.1,FamilySearchalready knew that some
applications would use GEDCOM5.5.1, yet continue to use the GEDCOM 5.5
<MULTIMEDIA_LINK>structure instead of GEDCOM 5.5.1<MULTIMEDIA_LINK>
structure?
Unless the FamilySearch GEDCOM editors own a time machine, something is wrong with their
claim, or at least their presentation of it.
## {1:M}
## {1:1}
## {0:1}
## {0:1}
## {1:1}
## {0:1}
## {1:M}
## {0:M}
## 155

## PAF GEDCOM
What the GEDCOM 5.5.1 specification really demands, without being open and honest about it,
is that third parties are expected to accommodateFamilySearch's unwillingness to follow their
own specification in their own product!
FamilySearch's Personal Ancestral File 5.x uses GEDCOM 5.5.1, but still uses the GEDCOM 5.5
<MULTIMEDIA_LINK>structure. So, thisFamilySearchstatement tells us that, when they were
still writing the GEDCOM 5.5.1 specification,FamilySearchhad already decided that PAF 5
would use GEDCOM 5.5.1, but keep using the GEDCOM 5.5<MULTIMEDIA_LINK>
structure, and then put this note about“some systems”in to get third parties to support PAF's
misbehaviour.
GEDCOM 5.5.1 Writer Best Practice
▪Use GEDCOM 5.5.1 records within GEDCOM 5.5.1 files.
▪Do not use records from other GEDCOM versions within GEDCOM 5.5.1 (unless they are
identical).
GEDCOM 5.5.1 Reader Best Practice
▪Because PAF will never be updated again, and still has significant market share, third parties
should indeed accept the GEDCOM 5.5<MULTIMEDIA_LINK>structure within PAF
GEDCOM 5.5.1 files - but still issue an error for each occurrence.
GEDCOM 5.5.5 Reader Best Practice
▪Demand GEDCOM 5.5.5 records. Reject everything else as a fatal error.
## 156

one- and two-digit years illegal
The GEDCOM 5.5.1 specification has this definition of <YEAR>:
YEAR:={Size=3:4}
A numeric representation of the calendar year in which an event occurred.
Years 1 through 99 must be padded out to at least 3 digits by using leading zeroes.
Notice that a year is a number that is at least 3 characters long; theFamilySearchGEDCOM
specification does not allow years of less than 3 digits. One-digit and two-digit years are illegal.
Three or Four Digits
GEDCOM 3.0 and 4.0 demand that all years be 4 digits long. It was only with GEDCOM 5.0 that
FamilySearchstarted to allow 3-digit dates, even while itsHow to record datessection still
instructs the reader to enter a 4-digit date:
Type the day (one or two characters) first, then the month (capitalize the first three letters of
the English name of the month; do not use a period at the end), and then the year (four-
character numeric year). The day and month may be omitted if unknown.
The demand that year be at least 3 digits long remains present in all subsequent version of
GEDCOM, including GEDCOM 5.6.
No Year less than 100
There is no year zero in the Julian or Gregorian Calendar, the year 1CE is preceded by the year
## 1BCE.
The demand that years must have at least three digits can be interpreted as theFamilySearch
GEDCOM specification not allowing the years 1CE through 99CE, nor 99BCE through 1BCE.
This interpretation is certainly encouraged byFamilySearch'sPAF 2.1 Family Records Data
Structure Description(23Jun1988), which contains the following definition for an 11-bit year
field within a 3-byte date field:
YEAR(bits 0-11) - A number between 100 and 2047
That's a remarkable definition; it explicitly excludes the years 1 through 99, without giving a
reason for doing so.
PAF is based on Ancestral Quest 3.0, and one of the changes listed for Ancestral Quest 3.0 on its
version history page is“Allowed for dates to preceed [sic] 100 AD”.
Treat as Date Phrase
The GEDCOM 5.0 specification has this definition of <YEAR>:
YEAR:={Size=3:4, Type=NUMBER}
A numeric representation of the calendar year in which an event occurred. Years less than 3
digits long will be treated as a number in a phrase.
The second sentence of this definition,“Years less than 3 digits long will be treated as a number
in a phrase.”, only occurs in GEDCOM 5.0. It's gone in GEDCOM 5.3, which suggests that
## 157

FamilySearchreconsidered, and did not think that particular instruction a good idea.
Still, this definition makes it crystal clear thatFamilySearchdoes not like years of two digits or
less, that the minimum length of 3 characters is quite deliberate.FamilySearchdoes not explain
this limitation, nor what to do with years smaller than 100.
This restriction does not exist to combat the tendency of people to abbreviate dates, by leaving off
the century. Such a genealogy would be so confusing to read, that the author would quickly start
using full years. Moreover, genealogy consistency checks will quickly alert users to such a
mistake.
The actual reason is a practical one, revealed by PAF's behaviour on entering short years.
## Personal Ancestral File
FamilySearchPAF 5.2.18 from 2002CE is the closest thing we have to a reference
implementation. When you enter a year less than 1000 in PAF, PAF will pad it out to 4 digits by
using leading zeroes on screen, and export those leading zeroes to GEDCOM.
Additional PAF behaviour revealswhyFamilySearchdoes not like years of less than 3 digits. If
you enter a year (without leading zeroes) of 31 or less, PAF does not add leading zeroes, but
presents a pop-up message-box instead, with the complaint that“The date you typed is not
standard”. That's a rather generic message, one that PAF even pops up for things that GEDCOM
allows, but PAF does not support.
PAF only does this when the year is 31 or less, and that reveals the reason why. Not only are
GEDCOM date formats quite flexible, users in different locales may also want to format dates
differently. PAF simply does not know whether you mean30 Mar 15when you type15 Mar
- The demand to use at least three digits for years is to avoid ambiguity between years and
days.
Years must be at least three digits long to easily distinguish between days and years.
## References
FamilySearch GEDCOM Specifications
## Ancestral Question Version History: Version 3.0 Features
## 158

Alias ALIA
TheALIArecord has a remarkable history.
FamilySearchGEDCOM 3.0 and 4.0 defined theALIA(alias) record as way to record alternate
names.FamilySearchGEDCOM 5.0 and later specify that alternate names must be recorded
using multipleNAMErecords. At the same time,FamilySearchGEDCOM 5.0 defined a new
ALIArecord, namely as a way to record that anotherINDIrecord is possibly for the same person.
There was no reason to create confusion by calling this theALIArecord. In fact, there was no
reason to create this record type at all, because GEDCOM already supports the
<<ASSOCIATION_STRUCTURE>> (ASSOrecord).
TheASSOrecord should be used for all relationships that aren't direct family relationships.
Possibly duplicateINDIrecords can be associated with each other using theASSOrecord;
possible-duplicateis a goodASSO.RELAvalue for that usage.
In practice, many products kept creatingALIArecord to record alternate names. All versions of
Ancestry.comFamily Tree Maker kept creatingALIArecords.Software MacKievFamily Tree
Maker 2014.1 stopped creatingALIArecords; it uses multipleNAMErecords as it should.
The newALIArecord, a link to anotherINDIrecord, has never been used. It only occurs in
GEDCOM test files.
GEDCOM 5.5.1 Annotated Edition deprecated theINDI.ALIArecord. GEDCOM 5.5.5 removed
theINDI.ALIArecord. TheINDI.ALIArecord is illegal now.
GEDCOM 5.5.1 Best Practice
GEDCOM Writer
▪Do not useALIAto record alternate names
▪Use multipleNAMErecords to record alternate names
▪Export the main name first
▪Use additionalNAMErecords to support alternate names
▪Use slashes to delimit the surname on everyNAMErecord
▪Do not useINDI.ALIAfor linking to otherINDI; consider it a deprecated feature
▪You can use theASSOrecord to link anINDIrecord to anotherINDIrecord
GEDCOM Reader
▪Read multipleNAMErecords containing alternate names
▪Assume the firstNAMErecord is the main, preferred name
▪Optionally, readINDI.ALIAandINDI.NAME.ALIArecords containing alternate names
▪If theINDI.ALIAline value appears to be a reference, do not import it, but warn that this legal
usage is considered deprecated and not supported
## References
## GEDCOM ALIA
## FTM 2017 GEDCOM
## 159

## NOTE.SOUR.NOTE.SOUR...
The GEDCOM 5.5 errata sheet states that an optional reference to aSOURrecord should be
added to theNOTE_STRUCTUREdefinition, like this:
## [
n NOTE@<XREF:NOTE>@{1:1}
## +1 SOUR@<XREF:SOUR>@
## |
n NOTE [<SUBMITTER_TEXT> | <NULL>] {1:1}
## +1 [CONC|CONT] <SUBMITTER_TEXT> {0:M}
## +1 SOUR@<XREF:SOUR>@
## ]
The GEDCOM 5.5.1 specification doesnotinclude the additional lines.
## Loop
FamilySearchprobably realised that this addition was a bad idea, because it allowed notes to have
sources, which may have notes, which may sources, and so on,ad infinitum, and thus includes the
possibility of a loop.
GEDCOM 5.5.1 allows source citations on top-levelNOTErecords, and allows notes on source
records, but does not allow source citation on thoseSOUR.NOTEnote records.
## 160

## Maximum Path Length
## Maximum Length
Arguably, the GEDCOM specification should not impose a maximum length on file paths, but
instead merely demand that the file path is legal and - at least in the context of the source system -
valid.
The GEDCOM 5.5.1 lineage-linked specification for<MULTIMEDIA_FILE_REFERENCE>
states that the file name should be a full path, yet allows only 30 characters. That is not a realistic
maximum length for a full path. This is a mistake, plain and simple.
The GEDCOM 5.5.5 changed the maximum to 259 code units, and the GEDCOM 5.5.1
Annotated Edition already strongly suggested that GEDCOM 5.5.1 readers, writers and validators
treat the maximum length as 259 characters. The length of 259 characters corresponds to the
maximum path length for Windows APIs without long path support;MAX_PATH -1, the minus
1 is becauseMAX_PATHincludes space for a terminating null character.
This is a legacy limitation; the NTFS file system and Windows APIs with long path support allow
paths up to 32K.
CONCandCONT
The maximum <MULTIMEDIA_FILE_REFERENCE> length that will fit on a single CR/LF-
terminated GEDCOM line is 247 characters.The GEDCOM grammar supports line values longer
than the maximum line length through theCONCtag.
However, because of the misleading explicit inclusion ofCONCandCONTtags in the
GEDCOM 5.5 and 5.5.1 lineage-linked specification, some GEDCOM 5.5 and 5.5.1 readers still
feature limited support forCONC.
A GEDCOM reader that supportsCONCcorrectly, is able to accept file paths of any length.
Genealogy software developers whose products do not fully supportCONCandCONTyet, are
strongly encouraged to fix their GEDCOM readers.
## References
MSDN: Naming Files, Paths and Namespaces
## 161

The ANSEL Header Demand
This is about a fundamental issue with theFamilySearchGEDCOM 5.5.1 specification, that has
been fixed in GEDCOM 5.5.5.
The GEDCOM 5.5.1 <<HEADER>> description contains the following demand (bolding by
FamilySearch):
“All character codes greater than 0x7Fmust be converted to ANSEL”
## Catch-22
A GEDCOM writer specifies the character encoding used through theHEAD.CHARline value. A
GEDCOM reader must process the GEDCOM file using the specified encoding. There is a
catch-22 here: A GEDCOM reader must read the GEDCOM header to discover the character
encoding used, but it cannot read the GEDCOM header until it knows the encoding of the file.
FamilySearch“Solution”
FamilySearch's preposterous“solution”to this catch-22 is to demand that the header is encoded
using ANSEL, regardless of the encoding the header specifies for the file. That demand is both
impossible and impractical.
It is generally impossible because ANSEL supports only a tiny subset of Unicode; most Unicode
characters cannot be converted to ANSEL. It is immensely impractical because a GEDCOM
reader detects the end of a record by detecting the beginning of the next record, and now it would
have to do that while the next record may use a different character encoding - that imposes
considerable complexity.
Perhaps the most fundamental issue of all is that if you put an ANSEL-encoded header in front of
an UTF-16 encoded GEDCOM file, it is no longer an UTF-16 encoded GEDCOM file. In fact, if
you put an ANSEL-encoded header in front of anything but an ANSEL-encoded file, it probably
isn't a text file anymore.
By the way, you may be tempted to assume that this ANSEL demand is some holdover from a
pre-Unicode version of GEDCOM, but it is not. Unicode support was added in GEDCOM 5.3,
and this ANSEL demand was added in GEDCOM 5.4.
Even stranger
FamilySearchsurely meant their ANSEL-demand to say that the entire header should be encoded
using ANSEL, but what they actually wrote is even stranger; only characters above 0x7F must be
converted to ANSEL, so a header for a UTF-16 GEDCOM should use UTF-16 for code points
0x00 through 0x7F, and use ANSEL for all other code points, resulting in an messy mix of
UTF-16 and ANSEL encoded characters...
## Contradiction
The ANSEL demand made in the <<HEADER>> description is contradicted by GEDCOM 5.5.1
Chapter 3 Using Character Sets in GEDCOM:
If the Unicode environment is used to produce a GEDCOMtransmissionfile, the header
record would also be in Unicode, requiring receiving systems to determine whether the
transmissionGEDCOM fileis Unicode or ASCII before they could interpret the GEDCOM
header.
That sentence is sloppy in more ways than one, but still clearly communicates that a GEDCOM
file encoded in UTF-16 has a GEDCOM header encoded in UTF-16, not ANSEL.
Another sentence in GEDCOM 5.5.1Chapter 3 Using Character Sets in GEDCOMis even
clearer:
## 162

The character set for an entiretransmissionGEDCOM fileis specified in the character set
line of the header record.
That statement leaves no doubt: the entire file (“transmission”is confusedFamilySearch-speak
for file) uses one encoding, the one specified in the GEDCOM header.
## One Encoding Throughout
GEDCOM files are supposed to be text files. To be text files, they must use a single encoding and
single line terminator throughout the file.
The GEDCOM header must use the same encoding as the rest of the file.
Real-World Practice
FamilySearch's defective ANSEL demand is universally ignored. Not one genealogy software
developer has ever tried to implement it in any product. All genealogy software uses the encoding
specified in the header for the entire file, including the header itself.
EvenFamilySearchthemselves do not do whatFamilySearchdemands!FamilySearch'sPersonal
Ancestral Fileencodes each GEDCOM header the same way as the rest of the GEDCOM file.
Recognising the Encoding
Thereisa catch-22. The key to reading a GEDCOM file correctly is to read the header first, and
the key to reading a GEDCOM header correctly is to figure out the encoding first. There is much
to say about reading a GEDCOM header correctly, but to keep this brief: the solution to the
catch-22 is to start with an analysis pass through the header which only figures out the encoding,
before actually reading the header.
GEDCOM Writer Best Practice
▪choose one legal encoding
▪use that encoding for the entire GEDCOM file
▪specify the encoding used through theHEAD.CHARline value
## References
GEDCOM header encoding
## 163

## HEAD.CHAR.VERS
## History
GEDCOM 5.5.1 defined aHEAD.CHAR.VERSrecord, that was, confusedly, supposed to contain
a version number for the character encoding specified inHEAD.CHAR.VERS. The superfluous
HEAD.CHAR.VERSrecord was never used as intended, but has been abused in odd ways, to
specify one character set inHEAD.CHARand (not really specify) another character set (instead of
a version number) inHEAD.CHAR.VERS. The bonus chapterHEAD.CHAR.VERSdiscusses
this in some detail.
GEDCOM 5.5.5 has eliminated this superfluous subrecord from the GEDCOM header; its
inclusion in a GEDCOM header is illegal now. This ends the abuse of this superfluous record, and
the complexity that abuse imposes on GEDCOM readers trying to the right thing when faced with
a wrong header.
GEDCOM writers must specify the character encoding used inHEAD.CHAR.
## HEAD.CHAR.VERS
The mandatoryHEAD.CHARline value specifies the character encoding used. The optional
HEAD.CHAR.VERSis a version number, so presumably specifies a version number for that
character encoding.
TheHEAD.CHAR.VERSvalue is never used (but it is abused), and few GEDCOM readers
support it.
## Support
Character sets can have version numbers, but are designed such that regular applications need not
be aware which version they are using. Different versions of Windows support different versions
of Unicode, but most Windows developers are not even aware of that.
FamilySearchnever made it clear just why they included an optionalHEAD.CHAR.VERS
record. The most likely reason is simply that they mistakenly assumed that it would be a good
idea. The truth is that is completely superfluous.
Real-World HEAD.CHAR.VERS Abusage
TheHEAD.CHAR.VERSrecord has been creatively abused by GEDitCOM, MacFamilyTree and
## Ahnenblatt.
## Reunion
Reunion is a MacOS application that supports the MacRoman character set. Reunion specifies the
use of this illegal character set just like any other character set, legal or not, through the
HEAD.CHARline value, like this:
## 1 CHAR MACINTOSH
The MacRoman character set should not be used, but when it is used anyway, that is how it
should be specified.
GEDitCOM
GEDitCOM is another MacOS application that supports the MacRoman character set.
GEDitCOM specifies the usage of this illegal character set like this:
## 164

## 1 CHAR ASCII
2 VERS MacOS Roman
This is completely wrong. GEDitCOM starts by lying that the character set used is ASCII. Then,
it claims that MacRoman is a particular version of ASCII (it is not), and we are supposed to
interpret that claim as the statement that MacRoman is being used.
GEDitCOM should not use MacRoman at all, but when it does, it should be honest about it and
specify it in a straightforward, non-confusing way, like Reunion.
This self-contradictory abusage ofHEAD.CHAR.VERSdoes not deserve to be supported.
GEDitCOM itself has to support it, but only because genealogy applications should be able to
read GEDCOM and not-quite-GEDCOM files produced by itself, including earlier versions of
itself.
If the character set specified is ASCII, the GEDCOM file should be interpreted as ASCII, and
processing should end with a fatal error as soon as a non-ASCII code is encountered.
MacFamilyTree
MacFamilyTree up to version 6 or so specifies MacRoman in exactly the same erroneous ways as
GEDitCOM does. From around version 6 up to and including version 8.3.4, MacFamilyTree uses
a minor variation of the same syntax:
## 1 CHAR ASCII
## 2 VERS MACINTOSH
This was fixed in MacFamilyTree 8.3.5, released in April 2018; MacFamilyTree 8.3.5 and later
uses1 CHAR MACINTOSHas it should.
## Ahnenblatt
This is how Ahnenblatt abuses theHEAD.CHAR.VERSvalue:
## 1 CHAR ANSI
## 2 VERS 1252
TheHEAD.CHARvalue specifies that Ahnenblatt is using Windows ANSI. That is an illegal
choice, but this is the right way to specify it.
However, theHEAD.CHAR.VERSvalue below it is nonsense. There is no Windows ANSI
version 1252.
The intention is to specify code page 1252, but theHEAD.CHAR.VERSvalue is not for code
pages, it is for version numbers.
What's more, if there were a way to specify the Windows ANSI code page, it would not be
necessary to specify code page 1252. There is no way to specify a particular Windows ANSI code
page. GEDCOM does not allow Windows ANSI. In practice, Windows ANSI is assumed to be
code page 1252.
ThisHEAD.CHAR.VERSabusage does not deserve to be supported either. Applications should
not be using Windows ANSI at all, it is illegal. Readers for GEDCOM 5.5.1 and earlier that do
support Windows ANSI, should always assume code page 1252.
Ahnenblatt 3.0 (2019CE), exports to UTF-8 exclusively.
GEDCOM Reader Best Practice
▪read theHEAD.CHARvalue
▪upon encountering aHEAD.CHAR.VERSrecord, issue the warning thatHEAD.CHAR.VERS
is not supported
## 165

▪report an error if theHEAD.CHAR.VERSline value does not look like a version number
(demand at least two numbers separated by a dot)
GEDCOM Writer Best Practice
▪use only legal encodings
▪specify the encoding used through theHEAD.CHARvalue
▪do not use theHEAD.CHAR.VERSrecord to specify a character set version
▪do not abuse theHEAD.CHAR.VERSrecord for anything else either
GEDCOM Validator Best Practice
▪upon encountering aHEAD.CHAR.VERSrecord, warn that it has never been used, only
abused
▪report an error if theHEAD.CHAR.VERSline value does not look like a version number
(demand at least two numbers separated by a dot)
## References
GEDCOM Character Encodings
End of Specification & Bonus
The end of the GEDCOM 5.5.5 specification and Bonus Chapters.
## 166
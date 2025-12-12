var tags = {
    /* System */
    "RIN": {
        name: "Record ID Number",
        description: "A number assigned to a record by an originating automated system that can be used by a receiving system to report results pertaining to that record.",
        visible: false
    },
    "_UID": {
        name: "* _UID",
        visible: false
    },
    "_UPD": {
        name: "* _UPD",
        visible: false
    },
    "_PRIM": {
        name: "* _PRIM",
        visible: false
    },
    "_PRIM_CUTOUT": {
        name: "* _PRIM_CUTOUT",
        visible: false
    },
    "_POSITION": {
        name: "* _POSITION",
        visible: false
    },
    "_PHOTO_RIN": {
        name: "* _PHOTO_RIN",
        visible: false
    },
    "_FILESIZE": {
        name: "* _FILESIZE",
        visible: false
    },
    "_CUTOUT": {
        name: "* _CUTOUT",
        visible: false
    },
    /* Relations and Children */
    "FAM": {
        name: "Family",
        description: "Identifies a legal, common law, or other customary relationship of man and woman and their children, if any, or a family created by virtue of the birth of a child to its biological father and mother.",
        visible: false
    },
    "FAMS": {
        name: "Family Spouse",
        description: "Identifies the family in which an individual appears as a spouse.",
        visible: false
    },
    "FAMC": {
        name: "Family Child",
        description: "Identifies the family in which an individual appears as a child.",
        visible: false
    },
    /* User facing */
    "NAME": {
        name: "Name",
        description: "A word or combination of words used to help identify an individual, title, or other item. More than one NAME line should be used for people who were known by multiple names.",
        visible: true
    },
    "GIVN": {
        name: "Given Name",
        description: "A given or earned name used for official identification of a person.",
        visible: true
    },
    "SURN": {
        name: "Surname",
        description: "A family name passed on or used by members of a family.",
        visible: true
    },
    "SEX": {
        name: "Sex",
        description: "Indicates the sex of an individual.",
        visible: true
    },
    "BIRT": {
        name: "Birth",
        description: "The event of entering into life.",
        visible: true
    },
    "DATE": {
        name: "Date",
        description: "The time of an event in a calendar format.",
        visible: true
    },
    "PLAC": {
        name: "Place",
        description: "A jurisdictional name to identify the place or location of an event.",
        visible: true
    },
    "DEAT": {
        name: "Death",
        description: "The event when mortal life terminates.",
        visible: true
    },
    "NOTE": {
        name: "Note",
        description: "Additional information provided by the submitter for understanding the enclosing data.",
        visible: true,
        field: "textarea"
    },
    "OBJE": {
        name: "Object",
        description: "Pertaining to a grouping of attributes used in describing something. Usually referring to the data required to represent a multimedia object, such an audio recording, a photograph of a person, or an image of a document.",
        visible: true,
        collapseChildren: true
    },
    "FORM": {
        name: "Format",
        description: "An assigned name given to a consistent format in which information can be conveyed.",
        visible: true
    },
    "TITL": {
        name: "Title",
        description: "A description of a specific writing or other work, such as the title of a book when used in a source context, or a formal designation used by an individual in connection with positions of royalty or other social status, such as Grand Duke.",
        visible: true
    },
    "FILE": {
        name: "File",
        description: "An information storage place that is ordered and arranged for preservation and reference.",
        visible: true
    },
    "SOUR": {
        name: "Source",
        description: "The initial or original material from which information was obtained.",
        visible: false
    },
    "PAGE": {
        name: "Page",
        description: "A number or description to identify where information can be found in a referenced work.",
        visible: true
    },
    "EVEN": {
        name: "Event",
        description: "A noteworthy happening related to an individual, a group, or an organization.",
        visible: true
    },
    "ROLE": {
        name: "Role",
        description: "A name given to a role played by an individual in connection with an event.",
        visible: true
    },
    "DATA": {
        name: "Data",
        description: "Pertaining to stored automated information.",
        visible: true
    },
    "TEXT": {
        name: "Text",
        description: "The exact wording found in an original source document.",
        visible: true,
        field: "textarea"
    },
    // Others
    "ABBR": {
        name: "Abbreviation",
        description: "A short name of a title, description, or name.",
        visible: false
    },
    "ADDR": {
        name: "Address",
        description: "The contemporary place, usually required for postal purposes, of an individual, a submitter of information, a repository, a business, a school, or a company.",
        visible: true,
        field: "textarea"
    },
    "ADR1": {
        name: "Address 1",
        description: "The first line of an address.",
        visible: false
    },
    "ADR2": {
        name: "Address 2",
        description: "The second line of an address.",
        visible: false
    },
    "ADOP": {
        name: "Adoption",
        description: "Pertaining to creation of a child-parent relationship that does not exist biologically.",
        visible: false
    },
    "AFN": {
        name: "Ancestral File Number",
        description: "Ancestral File Nummer, a unique permanent record file number of an individual record stored in Ancestral File.",
        visible: false
    },
    "AGE": {
        name: "Age",
        description: "The age of the individual at the time an event occurred, or the age listed in the document.",
        visible: false
    },
    "AGNC": {
        name: "Agency",
        description: "The institution or individual having authority and/or responsibility to manage or govern.",
        visible: false
    },
    "ALIA": {
        name: "Alias",
        description: "An indicator to link different record descriptions of a person who may be the same person.",
        visible: false
    },
    "ANCE": {
        name: "Ancestors",
        description: "Pertaining to forbearers of an individual.",
        visible: false
    },
    "ANCI": {
        name: "Ancestor Interest",
        description: "Indicates an interest in additional research for ancestors of this individual. (See also DESI)",
        visible: false
    },
    "ANUL": {
        name: "Annulment",
        description: "Declaring a marriage void from the beginning (never existed).",
        visible: false
    },
    "ASSO": {
        name: "Associates",
        description: "An indicator to link friends, neighbors, relatives, or associates of an individual.",
        visible: false
    },
    "AUTH": {
        name: "Author",
        description: "The name of the individual who created or compiled information.",
        visible: false
    },
    "BAPL": {
        name: "Baptism LDS",
        description: "The event of baptism performed at age eight or later by priesthood authority of the LDS Church. (See also BAPM)",
        visible: false
    },
    "BAPM": {
        name: "Baptism",
        description: "The event of baptism (not LDS), performed in infancy or later. (See also BAPL and CHR)",
        visible: true
    },
    "BARM": {
        name: "Bar Mitzvah",
        description: "The ceremonial event held when a Jewish boy reaches age 13.",
        visible: false
    },
    "BASM": {
        name: "Bas Mitzvah",
        description: "The ceremonial event held when a Jewish girl reaches age 13, also known as Bat Mitzvah.",
        visible: false
    },
    "BLES": {
        name: "Blessing",
        description: "A religious event of bestowing divine care or intercession. Sometimes given in connection with a naming ceremony.",
        visible: false
    },
    "BLOB": {
        name: "Binary Object",
        description: "A grouping of data used as input to a multimedia system that processes binary data to represent images, sound, and video.",
        visible: false
    },
    "BURI": {
        name: "Burial",
        description: "The event of the proper disposing of the mortal remains of a deceased person.",
        visible: true
    },
    "CALN": {
        name: "Call Number",
        description: "The number used by a repository to identify the specific items in its collections.",
        visible: false
    },
    "CAST": {
        name: "Caste",
        description: "The name of an individual's rank or status in society, based on racial or religious differences, or differences in wealth, inherited rank, profession, occupation, etc.",
        visible: true
    },
    "CAUS": {
        name: "Cause",
        description: "A description of the cause of the associated event or fact, such as the cause of death.",
        visible: true
    },
    "CENS": {
        name: "Census",
        description: "The event of the periodic count of the population for a designated locality, such as a national or state Census.",
        visible: true
    },
    "CHAN": {
        name: "Change",
        description: "Indicates a change, correction, or modification. Typically used in connection with a DATE to specify when a change in information occurred.",
        visible: false
    },
    "CHAR": {
        name: "Character",
        description: "An indicator of the character set used in writing this automated information.",
        visible: false
    },
    "CHIL": {
        name: "Child",
        description: "The natural, adopted, or sealed (LDS) child of a father and a mother.",
        visible: false
    },
    "CHR": {
        name: "Christening",
        description: "The religious event (not LDS) of baptizing and/or naming a child.",
        visible: true
    },
    "CHRA": {
        name: "Adult Christening",
        description: "The religious event (not LDS) of baptizing and/or naming an adult person.",
        visible: false
    },
    "CITY": {
        name: "City",
        description: "A lower level jurisdictional unit. Normally an incorporated municipal unit.",
        visible: false
    },
    "CONC": {
        name: "Concatenation",
        description: "An indicator that additional data belongs to the superior value. The information from the CONC value is to be connected to the value of the superior preceding line without a space and without a carriage return and/or new line character. Values that are split for a CONC tag must always be split at a non-space. If the value is split on a space the space will be lost when concatenation takes place. This is because of the treatment that spaces get as a GEDCOM delimiter, many GEDCOM values are trimmed of trailing spaces and some systems look for the first non-space starting after the tag to determine the beginning of the value.",
        visible: false
    },
    "CONF": {
        name: "Confirmation",
        description: "The religious event (not LDS) of conferring the gift of the Holy Ghost and, among protestants, full church membership.",
        visible: false
    },
    "CONL": {
        name: "Confirmation LDS",
        description: "The religious event by which a person receives membership in the LDS Church.",
        visible: false
    },
    "CONT": {
        name: "Continued",
        description: "An indicator that additional data belongs to the superior value. The information from the CONT value is to be connected to the value of the superior preceding line with a carriage return and/or new line character. Leading spaces could be important to the formatting of the resultant text. When importing values from CONT lines the reader should assume only one delimiter character following the CONT tag. Assume that the rest of the leading spaces are to be a part of the value.",
        visible: false
    },
    "COPR": {
        name: "Copyright",
        description: "A statement that accompanies data to protect it from unlawful duplication and distribution.",
        visible: false
    },
    "CORP": {
        name: "Corporate",
        description: "A name of an institution, agency, corporation, or company.",
        visible: false
    },
    "CREM": {
        name: "Cremation",
        description: "Disposal of the remains of a person's body by fire.",
        visible: true
    },
    "CTRY": {
        name: "Country",
        description: "The name or code of the country.",
        visible: false
    },
    "DESC": {
        name: "Descendants",
        description: "Pertaining to offspring of an individual.",
        visible: false
    },
    "DESI": {
        name: "Descendant Interest",
        description: "Indicates an interest in research to identify additional descendants of this individual. (See also ANCI)",
        visible: false
    },
    "DEST": {
        name: "Destination",
        description: "A system receiving data.",
        visible: false
    },
    "DIV": {
        name: "Divorce",
        description: "An event of dissolving a marriage through civil action.",
        visible: false
    },
    "DIVF": {
        name: "Divorce Filed",
        description: "An event of filing for a divorce by a spouse.",
        visible: false
    },
    "DSCR": {
        name: "Physical Description",
        description: "The physical characteristics of a person, place, or thing.",
        visible: true
    },
    "EDUC": {
        name: "Education",
        description: "Indicator of a level of education attained.",
        visible: true
    },
    "EMAIL": {
        name: "Email",
        description: "An electronic address that can be used for contact such as an email address...",
        visible: false
    },
    "EMIG": {
        name: "Emigration",
        description: "An event of leaving one's homeland with the intent of residing elsewhere.",
        visible: true
    },
    "ENDL": {
        name: "Endowment",
        description: "A religious event where an endowment ordinance for an individual was performed by priesthood authority in an LDS temple.",
        visible: false
    },
    "ENGA": {
        name: "Engagement",
        description: "An event of recording or announcing an agreement between two people to become married.",
        visible: false
    },
    "FACT": {
        name: "Fact",
        description: "Pertaining to a noteworthy attribute or fact concerning an individual, a group, or an organization. A FACT structure is usually qualified or classified by a subordinate use of the TYPE tag.",
        visible: false
    },
    "FAMF": {
        name: "Family File",
        description: "Pertaining to, or the name of, a family file. Names stored in a file that are assigned to a family for doing temple ordinance work.",
        visible: false
    },
    "FAX": {
        name: "Fax",
        description: "A FAX telephone number appropriate for sending data facsimiles.",
        visible: false
    },
    "FCOM": {
        name: "First Communion",
        description: "A religious rite, the first act of sharing in the Lord's supper as part of church worship.",
        visible: false
    },
    "FONE": {
        name: "Phonetic",
        description: "A phonetic variation of a superior text string.",
        visible: false
    },
    "GEDC": {
        name: "GEDCOM",
        description: "Information about the use of GEDCOM in a transmission.",
        visible: false
    },
    "GRAD": {
        name: "Graduation",
        description: "An event of awarding educational diplomas or degrees to individuals.",
        visible: true
    },
    "HEAD": {
        name: "Header",
        description: "Identifies information pertaining to an entire GEDCOM transmission.",
        visible: false
    },
    "HUSB": {
        name: "Husband",
        description: "An individual in the family role of a married man or father.",
        visible: false
    },
    "IDNO": {
        name: "Identification Number",
        description: "A number assigned to identify a person within some significant external system.",
        visible: true
    },
    "IMMI": {
        name: "Immigration",
        description: "An event of entering into a new locality with the intent of residing there.",
        visible: true
    },
    "INDI": {
        name: "Individual",
        description: "A person.",
        visible: false
    },
    "LANG": {
        name: "Language",
        description: "The name of the language used in a communication or transmission of information.",
        visible: false
    },
    "LATI": {
        name: "Latitude",
        description: "A value indicating a coordinate position on a line, plane, or space.",
        visible: false
    },
    "LEGA": {
        name: "Legatee",
        description: "A role of an individual acting as a person receiving a bequest or legal devise.",
        visible: false
    },
    "LONG": {
        name: "Longitude",
        description: "A value indicating a coordinate position on a line, plane, or space.",
        visible: false
    },
    "MAP": {
        name: "Map",
        description: "Pertains to a representation of measurements usually presented in a graphical form.",
        visible: false
    },
    "MARB": {
        name: "Marriage Bann",
        description: "An event of an official public notice given that two people intend to marry.",
        visible: false
    },
    "MARC": {
        name: "Marriage Contract",
        description: "An event of recording a formal agreement of marriage, including the prenuptial agreement in which marriage partners reach agreement about the property rights of one or both, securing property to their children.",
        visible: false
    },
    "MARL": {
        name: "Marriage License",
        description: "An event of obtaining a legal license to marry.",
        visible: false
    },
    "MARR": {
        name: "Marriage",
        description: "A legal, common-law, or customary event of creating a family unit of a man and a woman as husband and wife.",
        visible: false
    },
    "MARS": {
        name: "Marriage Settlement",
        description: "An event of creating an agreement between two people contemplating marriage, at which time they agree to release or modify property rights that would otherwise arise from the marriage.",
        visible: false
    },
    "MEDI": {
        name: "Media",
        description: "Identifies information about the media or having to do with the medium in which information is stored.",
        visible: false
    },
    "NATI": {
        name: "Nationality",
        description: "The national heritage of an individual.",
        visible: true
    },
    "NATU": {
        name: "Naturalization",
        description: "The event of obtaining citizenship.",
        visible: true
    },
    "NCHI": {
        name: "Children Count",
        description: "The number of children that this person is known to be the parent of (all marriages) when subordinate to an individual, or that belong to this family when subordinate to a FAM_RECORD.",
        visible: false
    },
    "NICK": {
        name: "Nickname",
        description: "A descriptive or familiar that is used instead of, or in addition to, one's proper name.",
        visible: true
    },
    "NMR": {
        name: "Marriage Count",
        description: "The number of times this person has participated in a family as a spouse or parent.",
        visible: false
    },
    "NPFX": {
        name: "Name Prefix",
        description: "Text which appears on a name line before the given and surname parts of a name. i.e. ( Lt. Cmndr. ) Joseph /Allen/ jr. In this example Lt. Cmndr. is considered as the name prefix portion.",
        visible: false
    },
    "NSFX": {
        name: "Name Suffix",
        description: "Text which appears on a name line after or behind the given and surname parts of a name. i.e. Lt. Cmndr. Joseph /Allen/ ( jr. ) In this example jr. is considered as the name suffix portion.",
        visible: false
    },
    "OCCU": {
        name: "Occupation",
        description: "The type of work or profession of an individual.",
        visible: true
    },
    "ORDI": {
        name: "Ordinance",
        description: "Pertaining to a religious ordinance in general.",
        visible: false
    },
    "ORDN": {
        name: "Ordination",
        description: "A religious event of receiving authority to act in religious matters.",
        visible: false
    },
    "PEDI": {
        name: "Pedigree",
        description: "Information pertaining to an individual to parent lineage chart.",
        visible: false
    },
    "PHON": {
        name: "Phone",
        description: "A unique number assigned to access a specific telephone.",
        visible: false
    },
    "POST": {
        name: "Postal Code",
        description: "A code used by a postal service to identify an area to facilitate mail handling.",
        visible: false
    },
    "PROB": {
        name: "Probate",
        description: "An event of judicial determination of the validity of a will. May indicate several related court activities over several dates.",
        visible: true
    },
    "PROP": {
        name: "Property",
        description: "Pertaining to possessions such as real estate or other property of interest.",
        visible: false
    },
    "PUBL": {
        name: "Publication",
        description: "Refers to when and/or were a work was published or created.",
        visible: false
    },
    "QUAY": {
        name: "Quality Of Data",
        description: "An assessment of the certainty of the evidence to support the conclusion drawn from evidence.",
        visible: false
    },
    "REFN": {
        name: "Reference",
        description: "A description or number used to identify an item for filing, storage, or other reference purposes.",
        visible: false
    },
    "RELA": {
        name: "Relationship",
        description: "A relationship value between the indicated contexts.",
        visible: false
    },
    "RELI": {
        name: "Religion",
        description: "A religious denomination to which a person is affiliated or for which a record applies.",
        visible: true
    },
    "REPO": {
        name: "Repository",
        description: "An institution or person that has the specified item as part of their collection(s).",
        visible: false
    },
    "RESI": {
        name: "Residence",
        description: "The act of dwelling at an address for a period of time.",
        visible: true
    },
    "RESN": {
        name: "Restriction",
        description: "A processing indicator signifying access to information has been denied or otherwise restricted.",
        visible: false
    },
    "RETI": {
        name: "Retirement",
        description: "An event of exiting an occupational relationship with an employer after a qualifying time period.",
        visible: true
    },
    "RFN": {
        name: "Record File Number",
        description: "A permanent number assigned to a record that uniquely identifies it within a known file.",
        visible: false
    },
    "ROMN": {
        name: "Romanized",
        description: "A romanized variation of a superior text string.",
        visible: false
    },
    "SLGC": {
        name: "Sealing Child",
        description: "A religious event pertaining to the sealing of a child to his or her parents in an LDS temple ceremony.",
        visible: false
    },
    "SLGS": {
        name: "Sealing Spouse",
        description: "A religious event pertaining to the sealing of a husband and wife in an LDS temple ceremony.",
        visible: false
    },
    "SPFX": {
        name: "Surnme Prefix",
        description: "A name piece used as a non-indexing pre-part of a surname.",
        visible: false
    },
    "SSN": {
        name: "Social Security Number",
        description: "A number assigned by the United States Social Security Administration. Used for tax identification purposes.",
        visible: true
    },
    "STAE": {
        name: "State",
        description: "A geographical division of a larger jurisdictional area, such as a State within the United States of America.",
        visible: false
    },
    "STAT": {
        name: "Status",
        description: "An assessment of the state or condition of something.",
        visible: false
    },
    "SUBM": {
        name: "Submitter",
        description: "An individual or organization who contributes genealogical data to a file or transfers it to someone else.",
        visible: false
    },
    "SUBN": {
        name: "Submission",
        description: "Pertains to a collection of data issued for processing.",
        visible: false
    },
    "TEMP": {
        name: "Temple",
        description: "The name or code that represents the name a temple of the LDS Church.",
        visible: false
    },
    "TIME": {
        name: "Time",
        description: "A time value in a 24-hour clock format, including hours, minutes, and optional seconds, separated by a colon (:). Fractions of seconds are shown in decimal notation.",
        visible: false
    },
    "TRLR": {
        name: "Trailer",
        description: "At level 0, specifies the end of a GEDCOM transmission.",
        visible: false
    },
    "TYPE": {
        name: "Type",
        description: "A further qualification to the meaning of the associated superior tag. The value does not have any computer processing reliability. It is more in the form of a short one or two word note that should be displayed any time the associated data is displayed.",
        visible: false
    },
    "VERS": {
        name: "Version",
        description: "Indicates which version of a product, item, or publication is being used or referenced.",
        visible: false
    },
    "WIFE": {
        name: "Wife",
        description: "An individual in the role as a mother and/or married woman.",
        visible: false
    },
    "WWW": {
        name: "Web",
        description: "World Wide Web home page.",
        visible: false
    },
    "WILL": {
        name: "Will",
        description: "A legal document treated as an event, by which a person disposes of his or her estate, to take effect after death. The event date is the date the will was signed while the person was alive. (See also PROBate)",
        visible: true
    },

}
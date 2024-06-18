const cat1 = "Honors Seminar";
const cat2 = "Honors Core Classes";
const cat3 = "Freshman Seminar";
const cat4 = "Research Methodology";
const cat5 = "CRACAD Presentation";
const cat6 = "Service Events";

const stuCatalog = [
  {
    "cat1": {
      catName: 'Honors Seminar',
      class1: {
        className: "FS187-007 Freshman Seminar",
        semester: {
          FA24: {
            s001: [422134, 234425, 124532, 235235],
            s002: [234234, 234234, 234234, 234234]
          },
          SP25: {
            s001: [234234, 234234, 234234, 234234],
            s002: [234234, 234234, 234234, 234234]
          }
        }
      },
      class2: {
        className: "HS201-001 Honors Seminar",
        semester: {
          FA24: {
            s001: [234234, 234234, 234234, 234234],
            s002: [234234, 234234, 234234, 234234]
          },
          SP25: {
            s001: [234234, 234234, 234234, 234234],
            s002: [234234, 234234, 234234, 234234]
          }
        }
      }
    },
  },
];

export default stuCatalog;

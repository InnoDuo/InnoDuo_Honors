import React from "react";

const currentYear = new Date().getFullYear();
const nextFiveYears = Array.from({ length: 5 }, (_, i) => currentYear + i);

const StudentInfoFields = ({
  bindId,
  bindFirstName,
  bindLastName,
  bindEmail,
  bindAdvisor,
  bindGradYear,
  bindMajor,
  bindPhoneNo,
  disableField,
}) => {
  return (
    <div className="student-info-fields">
      <div className={`student-info-field`}>
        <label htmlFor="student-id">Student ID:</label>
        <div className="input-field-wrap">
          <input
            type="number"
            name="student-id"
            id="student-id"
            {...bindId}
            disabled={disableField}
            required
          />
        </div>
      </div>
      <div className={`student-info-field`}>
        <label htmlFor="student-email">Email:</label>
        <div className="input-field-wrap">
          <input
            type="email"
            name="student-email"
            id="student-email"
            {...bindEmail}
            disabled={disableField}
            required
          />
        </div>
      </div>
      <div className={`student-info-field`}>
        <label htmlFor="student-first-name">First Name:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="student-first-name"
            id="student-first-name"
            {...bindFirstName}
            disabled={disableField}
          />
        </div>
      </div>
      <div className={`student-info-field`}>
        <label htmlFor="student-last-name">Last Name:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="student-last-name"
            id="student-last-name"
            {...bindLastName}
            disabled={disableField}
          />
        </div>
      </div>
      <div className="student-info-field">
        <label htmlFor="student-major">Major:</label>
        <select
          className="input-field-wrap"
          defaultValue={"not-selected"}
          type="text"
          name="student-major"
          id="student-major"
          {...bindMajor}
        >
          <option value="not-selected"></option>
          <option value="Combined B.S. in Psychology / M.A. in Applied Behavior Analysis">
            Combined B.S. in Psychology / M.A. in Applied Behavior Analysis
          </option>
          <option value="Pathways to ABA">Pathways to ABA</option>
          <option value="Art">Art</option>
          <option value="Art Therapy Double Major in Art and Psychology">
            Art Therapy Double Major in Art and Psychology
          </option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Studio Art">Studio Art</option>
          <option value="Accounting">Accounting</option>
          <option value="Business Administration">
            Business Administration
          </option>
          <option value="Business Analytics">Business Analytics</option>
          <option value="Business and English">Business and English</option>
          <option value="Management Information Systems">
            Management Information Systems
          </option>
          <option value="Computer Science">Computer Science</option>
          <option value="Esports Management">Esports Management</option>
          <option value="Financial Economics">Financial Economics</option>
          <option value="Five-Year Combined B.S/M.B.A">
            Five-Year Combined B.S/M.B.A
          </option>
          <option value="Five-Year Combined B.S./M.S.">
            Five-Year Combined B.S./M.S.
          </option>
          <option value="Healthcare Administration">
            Healthcare Administration
          </option>
          <option value="Marketing">Marketing</option>
          <option value="Sport Management">Sport Management</option>
          <option value="Supply Chain Management">
            Supply Chain Management
          </option>
          <option value="Communication and Media Studies">
            Communication and Media Studies
          </option>
          <option value="Education-Combined B.A/M.A Program">
            Education – Combined B.A/M.A Program
          </option>
          <option value="Elementary Education (K-6 Certification)">
            Elementary Education (K-6 Certification)
          </option>
          <option value="Secondary Education (K-12 Certification)">
            Secondary Education (K-12 Certification)
          </option>
          <option value="School Nurse Certification – Instructional">
            School Nurse Certification – Instructional
          </option>
          <option value="School Nurse Certification – Non-Instructional">
            School Nurse Certification – Non-Instructional
          </option>
          <option value="English">English</option>
          <option value="Biology ">Biology </option>
          <option value="Communication Science and Disorders">
            Communication Science and Disorders
          </option>
          <option value="Health Science">Health Science</option>
          <option value="Healthcare Administration">
            Healthcare Administration
          </option>
          <option value="Medical Imaging">Medical Imaging</option>
          <option value="Medical Technology">Medical Technology</option>
          <option value="Nursing">Nursing</option>
          <option value="Pre-Medical ">Pre-Medical </option>
          <option value="Public Health Education">
            Public Health Education
          </option>
          <option value="School Nurse Certification – Instructional">
            School Nurse Certification – Instructional
          </option>
          <option value="School Nurse Certification – Non-Instructional">
            School Nurse Certification – Non-Instructional
          </option>
          <option value="History and Political Science">
            History and Political Science
          </option>
          <option value="History">History</option>
          <option value="Political Science">Political Science</option>
          <option value="Social Studies">Social Studies</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Applied Language">Applied Language</option>
          <option value="Spanish ">Spanish </option>
          <option value="Music">Music</option>
          <option value="Natural Sciences">Natural Sciences</option>
          <option value="Biology">Biology</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Environmental Science">Environmental Science</option>
          <option value="Exercise Science">Exercise Science</option>
          <option value="Health Science">Health Science</option>
          <option value="Medical Technology ">Medical Technology</option>
          <option value="Pre-Medical ">Pre-Medical </option>
          <option value="Nursing and Public Health">
            Nursing and Public Health
          </option>
          <option value="Communication Science and Disorders">
            Communication Science and Disorders
          </option>
          <option value="Nursing">Nursing</option>
          <option value="Public Health Education">
            Public Health Education
          </option>
          <option value="School Nurse Certification – Instructional">
            School Nurse Certification – Instructional
          </option>
          <option value="School Nurse Certification – Non-Instructional">
            School Nurse Certification – Non-Instructional
          </option>
          <option value="Psychology and Counseling">
            Psychology and Counseling
          </option>
          <option value="Combined B.S in Psychology/ M.A. in Counseling (Available in All Specialization)">
            Combined B.S in Psychology/ M.A. in Counseling (Available in All
            Specialization)
          </option>
          <option value="Psychology">Psychology</option>
          <option value="Psychology – Combined B.S./ M.A. in Applied Behavioral Analysis">
            Psychology – Combined B.S./ M.A. in Applied Behavioral Analysis
          </option>
          <option value="Sociology and Criminal Justice">
            Sociology and Criminal Justice
          </option>
          <option value="Criminal justice">Criminal justice</option>
          <option value="Sociology">Sociology</option>
          <option value="Theology and Philosophy">
            Theology and Philosophy
          </option>
          <option value="Theology ">Theology </option>
        </select>
      </div>
      <div className="student-info-field">
        <label htmlFor="student-gradYear">Graduation Year:</label>
        <select
          defaultValue={"not-selected"}
          className="input-field-wrap"
          name="student-gradYear"
          id="student-gradYear"
          {...bindGradYear}
        >
          <option value="not-selected"></option>
          {nextFiveYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="student-info-field">
        <label htmlFor="student-contact">Mobile Number:</label>
        <div className="input-field-wrap">
          <input
            type="number"
            name="student-contact"
            id="student-contact"
            {...bindPhoneNo}
          />
        </div>
      </div>
      <div className="student-info-field">
        <label htmlFor="student-advisor">Advisor:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="student-advisor"
            id="student-advisor"
            {...bindAdvisor}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentInfoFields;

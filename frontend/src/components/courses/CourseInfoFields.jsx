import React, { useState } from "react";

const CourseInfoFields = ({ courseData, onUpdate }) => {
  // Initialize state for form fields using courseData as initial values
  const [updatedCourse, setUpdatedCourse] = useState({ ...courseData });

  // Handler to update the state when a field is changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  // Submit handler to send updated data
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/updateCourse/${updatedCourse.courseCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );

      const result = await response.json();
      if (response.ok) {
        onUpdate(result); // Callback function to notify parent of success
        alert("Course updated successfully!");
      } else {
        alert("Failed to update course: " + result.message);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="course-info-fields">
      {/* Course Code */}
      <div className="course-info-field">
        <label htmlFor="course-code">Course Code:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="courseCode"
            id="course-code"
            value={updatedCourse.courseCode || ""}
            onChange={handleChange}
            disabled
            required
          />
        </div>
      </div>

      {/* Course Name */}
      <div className="course-info-field">
        <label htmlFor="course-name">Course Name:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="courseName"
            id="course-name"
            value={updatedCourse.courseName || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Course Description */}
      <div className="course-info-field">
        <label htmlFor="course-description">Course Description:</label>
        <textarea
          name="courseDescription"
          id="course-description"
          value={updatedCourse.courseDescription || ""}
          onChange={handleChange}
        />
      </div>

      {/* Instructor */}
      <div className="course-info-field">
        <label htmlFor="course-instructor">Instructor:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="instructor"
            id="course-instructor"
            value={updatedCourse.instructor || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Duration */}
      <div className="course-info-field">
        <label htmlFor="course-duration">Duration:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="duration"
            id="course-duration"
            value={updatedCourse.duration || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Period */}
      <div className="course-info-field">
        <label htmlFor="course-period">Period:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="period"
            id="course-period"
            value={updatedCourse.period || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Location */}
      <div className="course-info-field">
        <label htmlFor="course-location">Location:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="location"
            id="course-location"
            value={updatedCourse.location || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Semester */}
      <div className="course-info-field">
        <label htmlFor="course-semester">Semester:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="semester"
            id="course-semester"
            value={updatedCourse.semester || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Section */}
      <div className="course-info-field">
        <label htmlFor="course-section">Section:</label>
        <div className="input-field-wrap">
          <input
            type="text"
            name="section"
            id="course-section"
            value={updatedCourse.sectionId || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Max Students */}
      <div className="course-info-field">
        <label htmlFor="course-max-students">Max Students:</label>
        <div className="input-field-wrap">
          <input
            type="number"
            name="maxStudents"
            id="course-max-students"
            value={updatedCourse.maxStudents || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Course Credit */}
      <div className="course-info-field">
        <label htmlFor="course-credit">Course Credit:</label>
        <div className="input-field-wrap">
          <input
            type="number"
            name="courseCredit"
            id="course-credit"
            value={updatedCourse.courseCredit || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <a type="button" className="primary-btn" onClick={handleUpdate}>
        <p>Update Course</p>
      </a>
    </div>
  );
};

export default CourseInfoFields;

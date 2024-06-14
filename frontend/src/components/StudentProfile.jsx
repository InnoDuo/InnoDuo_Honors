import React from 'react'

const StudentProfile = () => {
  return (
    <div>
        <div className="student-info-container">
            <div className="student-name">
                <h2>Student Name</h2>
            </div>
            <div className="student-info-content">
                <form action="" className="student-info-form">
                    <div className="student-info-fields">
                        <div className="student-info-field">
                            <label htmlFor="student-id">ID:
                            </label>
                                <div className="input-field-wrap">
                                <input type="number" name="student-id" id="student-id" />
                                </div>
                        </div>
                        <div className="student-info-field">
                            <label htmlFor="student-email">Email:
                            </label>
                                <div className="input-field-wrap">
                                <input type="email" name="student-email" id="student-email" />
                                </div>
                        </div>
                        <div className="student-info-field">
                            <label htmlFor="student-major">Major:
                            </label>
                                <div className="input-field-wrap">
                                <input type="text" name="student-major" id="student-major" />
                                </div>
                        </div>
                        <div className="student-info-field">
                            <label htmlFor="student-classification">Classification:
                            </label>
                                <div className="input-field-wrap">
                                <input type="text" name="student-classification" id="student-classification" />
                                </div>
                        </div>
                        <div className="student-info-field">
                            <label htmlFor="student-contact">Mobile Number:
                            </label>
                                <div className="input-field-wrap">
                                <input type="text" name="student-contact" id="student-contact" />
                                </div>
                        </div>
                        <div className="student-info-field">
                            <label htmlFor="student-advisor">Advisor:
                            </label>
                                <div className="input-field-wrap">
                                <input type="text" name="student-advisor" id="student-advisor" />
                                </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default StudentProfile
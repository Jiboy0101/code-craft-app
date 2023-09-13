import React from 'react';

function EnrollmentTable() {
  return (
    <div className="enrollment-table">
      <h2>How to Enroll</h2>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>
              FRESHMAN ADMISSION
              <ul>
                <li>The OAS processes and facilitates the enrollment applications of those who passed the PUPCET. The Office evaluates the authenticity of the applicant's application documents and the applicant's qualifications for admission, adhering to the University admission requirements/criteria.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              Steps to follow
              <ul>
                <li>Visit the PUP website. Apply for PUP College Entrance Test through the iApply, read the information provided and click the iApplyNow button. <a href="https://iapply.pup.edu.ph" target="_blank" rel="noopener noreferrer">https://iapply.pup.edu.ph</a></li>
                <li>Click proceed to begin your on-line registration and select your intended campus and program, then submit the on-line application.</li>
                <li>Upon successful submission of your on-line application, go to Display Voucher to print your Payment Voucher.</li>
                <li>Go to the nearest LandBank Branch to remit payment via online collection or pay directly to the Cashier Office of the Branch.</li>
                <li>Claim ePermit on-line. Allow five (5) working days after payment to LandBank before claiming your Test Permit online.</li>
                <li>Go to PUP Testing Center 30 minutes before your time schedule as printed in your PUPCET Test Permit.</li>
                <li>Visit the PUP website to check your score and online confirmation of the schedule date of processing of admission credentials, interview, and enrolment.</li>
                <li>Fill out the Student Admission Records Form 1 (SAR Form 1).</li>
                <li>Click the PRINT button to print the SAR Form 1 with Route and Approval Slip.</li>
                <li>On the scheduled date of processing your credentials, follow the steps in enrollment as indicated in your SAR Form.</li>
                <li>For ALS qualities and those high school graduates whose final grade in English is 80 or lower.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>
              REGULAR STUDENT ADMISSION
            </td>
          </tr>
          <tr>
            <td>4.</td>
            <td>
              ADMISSION OF TRANSFEREES FROM ANOTHER SCHOOL
              <ul>
                <li>The OAS processes and facilitates transfer of students, preferably incoming 2nd Year, from another school or University to PUP, subject to the availability of slots and upon the approval of the Branch/Campus Director. PUP accepts transfer students from another school every first semester only.</li>
                <li>Fees: P300.00 (from State Colleges and Universities) P500.00 (from Private School)</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>5.</td>
            <td>
              Steps to follow
              <ul>
                <li>Submit transfer credentials for evaluation</li>
                <li>Upon approval of Office of evaluated credentials, proceed to Office of the Student Affairs and Services for schedule of Psychological Examination.</li>
                <li>Proceed to the Cashier Office for Payment of Psychological Exam.</li>
                <li>Take the Psychological Exam.</li>
                <li>Proceed to Registrar Office and submit admission credentials for evaluation.</li>
                <li>Proceed to the Office of the Academic Programs/College of choice and copy the subjects.</li>
                <li>Send R-zero to OVPBC for tagging of subjects.</li>
                <li>Proceed to Cashier’s Office for Payment of tuition fee.</li>
                <li>Proceed to the Admission Office for printing of Registration Certificate and ID processing.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentTable;

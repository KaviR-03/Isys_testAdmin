import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
import ApplicationTable from 'src/views/masters/ApplicationTable'
const initialValuesone = {
  applicationCode:'',
  applicationName: '',
  description: '',
  isActive: '',
}
const ApplicationForm = () => {
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const handleSubmitCheck = (event) => {
    console.log("Submitted Values are", values)
    const form = event.currentTarget
    if (!values.applicationCode || !values.applicationName || !values.description) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      handleSubmit(event)
      console.log('submitted')
    }
    setValidated(true)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...values,
     // companyId: values.companyId.id,
      createdBy: "admin",
      updatedBy: "admin"
    }
    console.log('....final', finalData)
    //let AccessToken = localStorage.getItem('AccessToken')
    // let res = await fetch(' http://localhost:8080/api/v1/create_department', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: AccessToken,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(finalData),
    // })

    // if (res.status === 201) {
    //   setValidated(false)
    //   setValues(initialValuesone)
    //   setMessage('Data saved successfully')
    //   console.log({ message })
    //   console.log({ message })
    //   setTimeout(function () {
    //     setMessage('')
    //   }, 2000)
    // } else {
    //   setMessage('')
    //   window.alert('Application Name Already Exit')
    // }
  }
  function handleInputChangeCheckbox(e) {
    const { name, checked } = e.target
    setValues({
      ...values,
      [name]: checked,
    })
  }
  function handleTypeFuncitonCompany(values) {
    setValues((prevState) => ({
      ...prevState,
      companyId: values,
    }))
  }
  
  function handleInputChange(e) {
    const { name, value } = e.target
    let newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
    if (newValue !== value) {
      alert('Should not contain symbols')
    }
    setValues({
      ...values,
      [name]: newValue,
    })
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Application Form</h5>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmitCheck}
              >
                <CCol md={12}>
                  <CRow>
                    {/* <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommon
                        selectedOption={values.companyId}
                        isMulti={false}
                        url="get_all_company?search"
                        id="companyId"
                        keyId="companyId"
                        keyName="companyName"
                        {...(values.companyId && {
                          color: values.companyId ? '' : '1px solid red',
                        })}
                        handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                      />
                    </CCol> */}
                        <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Application Code</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder="Application Code"
                        id="applicationCode"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="applicationCode"
                        value={values.applicationCode}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Application Name</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder="Application Name"
                        id="applicationName"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="applicationName"
                        value={values.applicationName}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Description</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder=" Description"
                        id="description"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                <CFormLabel htmlFor="inputEmail4">
                  <strong>Is Active</strong>
                </CFormLabel>
                <div className="form-check pt-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={values.isactive}
                    id="flexCheckDefault"
                    name="isActive"
                     onChange={handleInputChangeCheckbox}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Yes
                  </label>
                </div>
              </CCol>
                  </CRow>
                </CCol>
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                {message ? (
                  <CButton disabled className={styles.btnColorDisabled}>
                    Data Saved &#10004;
                  </CButton>
                ) : (
                  <CButton onClick={handleSubmitCheck}>Create</CButton>
                )}
                <div className={styles.btnPadding}></div>
              </CCol>
            </CCardHeader>
          </CCard>
        </CCol>
        <ApplicationTable/> 
             
            {/* responsibleNameView = 'Contract'
            accessNameView = 'update'
            responsibleNameDelete = 'Contract'
            accessNameDelete = 'delete'
          /> */}
      </CRow>
    </>
  )
}

export default ApplicationForm

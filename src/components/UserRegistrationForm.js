import { useEffect, useState } from "react";
import "./UserRegistrationForm.css";

const UserRegistrationForm = ({
  id = "",
  firstName = "",
  lastName = "",
  email = "",
  contact = "",
  department = "",
  designation = "",
  experience = "",
  saveUpdateHandler,
  cancelHandler,
}) => {
  const [formData, setFormData] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    contact: contact,
    department: department,
    designation: designation,
    experience: experience,
  });
  const [invalidForm, setInvalidForm] = useState(true);

  const [formError, setFormError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    contact: false,
    department: false,
    designation: false,
    experience: false,
  });

  const blurHandler = (e) => {
    if (e.target.value == "") {
      setFormError((prev) => {
        return {
          ...prev,
          [e.target.id]: true,
        };
      });
    } else {
      setFormError((prev) => {
        return {
          ...prev,
          [e.target.id]: false,
        };
      });
    }
  };

  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
    if (e.target.id === "email") {
      if (
        new RegExp(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ).test(e.target.value)
      ) {
        setFormError((prev) => {
          return {
            ...prev,
            email: false,
          };
        });
      } else {
        setFormError((prev) => {
          return {
            ...prev,
            email: true,
          };
        });
      }
    }
  };

  const submitHandler = () => {
    const isEmailValid = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(formData.email);
    if (isEmailValid) {
      saveUpdateHandler(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        department: "",
        designation: "",
        experience: "",
      });
      setInvalidForm(true);
    } else {
      setFormError((prev) => {
        return {
          ...prev,
          email: true,
        };
      });
    }
  };

  useEffect(() => {
    const firstNameValue = formData.firstName;
    const emailValue = formData.email;
    const departmentValue = formData.department;
    const designationValue = formData.designation;
    const experienceValue = formData.experience;

    const validEmail = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(emailValue);
    if (
      firstNameValue.length > 0 &&
      validEmail &&
      departmentValue.length > 0 &&
      designationValue.length > 0 &&
      experienceValue.length > 0
    ) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [formError]);

  return (
    <>
      <table className="outer-table">
        <thead>
          <tr>
            <td>
              <h1 className="user-heading" data-testid="user-heading">
                User Registration
              </h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className="inner-table">
                <tbody>
                  <tr>
                    <td>*First Name:</td>
                    <td>
                      <input
                        type="text"
                        id="firstName"
                        data-testid="firstName"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.firstName}
                      ></input>
                      <br />
                      {formError.firstName && (
                        <span className="error" name="name-error">
                          First Name is required
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>
                      <input
                        type="text"
                        id="lastName"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.lastName}
                      ></input>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>*Email:</td>
                    <td>
                      <input
                        type="text"
                        id="email"
                        data-testid="email"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.email}
                      ></input>
                      <br />
                      {formError.email && (
                        <span className="error" name="error">
                          Invalid Email
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>Contact:</td>
                    <td>
                      <input
                        type="text"
                        id="contact"
                        onChange={changeHandler}
                        value={formData.contact}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>*Department:</td>
                    <td>
                      <input
                        type="text"
                        id="department"
                        data-testid="department"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.department}
                      ></input>
                      <br />
                      {formError.department && (
                        <span className="error" name="error">
                          Department is required
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>*Designation:</td>
                    <td>
                      <input
                        type="text"
                        id="designation"
                        data-testid="designation"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.designation}
                      ></input>
                      <br />
                      {formError.designation && (
                        <span className="error" name="error">
                          Designation is required
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>*Experience:</td>
                    <td>
                      <input
                        type="number"
                        id="experience"
                        data-testid="experience"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.experience}
                      ></input>
                      <br />
                      {formError.experience && (
                        <span className="error  " name="error">
                          Experience is required
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="submit"
                                name="submit"
                                id="submit"
                                data-testid="submit"
                                value="Add User"
                                disabled={invalidForm}
                                onClick={submitHandler}
                              />
                            </td>
                            <td>
                              <input
                                type="button"
                                name="cancel"
                                id="cancel"
                                value="Cancel"
                                onClick={cancelHandler}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserRegistrationForm;

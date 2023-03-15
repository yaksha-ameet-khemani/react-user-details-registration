import { useEffect, useState } from "react";
import "./UserRegistrationForm.css";

const UserRegistrationForm = ({
  id = "",
  name = "",
  email = "",
  contact = "",
  saveUpdateHandler,
  cancelHandler,
}) => {
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    email: email,
    contact: contact,
  });
  const [formValidData, setFormValidData] = useState({
    validEmail: true,
    validContact: true,
  });

  const [invalidForm, setInvalidForm] = useState(true);

  const [formError, setFormError] = useState({
    name: false,
    email: false,
    contact: false,
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
      setFormData({ name: "", email: "", contact: "" });
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
    const nameValue = formData.name;
    const emailValue = formData.email;
    const validEmail = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(emailValue);
    if (nameValue.length > 0 && validEmail) {
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
                    <td>*Name:</td>
                    <td>
                      <input
                        type="text"
                        id="name"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.name}
                      ></input>
                      <br />
                      {formError.name && (
                        <span className="email-error" name="name-error">
                          Name is required
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>*Email:</td>
                    <td>
                      <input
                        type="text"
                        id="email"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formData.email}
                      ></input>
                      <br />
                      {formError.email && (
                        <span className="email-error" name="email-error">
                          Invalid Email
                        </span>
                      )}
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
                      <table className="btn-table">
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="submit"
                                name="submit"
                                id="submit"
                                value={
                                  email.length ? "Updated User" : "Add User"
                                }
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

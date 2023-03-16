import { useEffect, useState } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import "./UserDetails.css";

const dummyData = [
  {
    id: 1,
    firstName: "first",
    lastName: "last",
    email: "first@mail.com",
    contact: "7878787878",
    department: "dept 1",
    designation: "desig 1",
    experience: "1",
  },
  {
    id: 2,
    firstName: "seond",
    lastName: "last",
    email: "second@mail.com",
    contact: "",
    department: "dept 2",
    designation: "desig 2",
    experience: "2",
  },
];

const UserDetails = ({ setDummyData = true }) => {
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    experience: "",
  });
  const [users, setUsers] = useState({});
  const [userForm, setUserForm] = useState(false);
  const tempUsers = {};

  useEffect(() => {
    if (setDummyData) {
      dummyData.forEach((data, index) => {
        tempUsers[index + 1] = data;
      });
      setUsers(tempUsers);
    }
  }, []);

  const userFormHandler = () => {
    if (userForm == false) {
      setUserData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        department: "",
        designation: "",
        experience: "",
      });
    }
    setUserForm(!userForm);
  };

  const editHandler = (id) => {
    setUserForm(true);
    setUserData({
      id: users[id]?.id,
      firstName: users[id]?.firstName,
      lastName: users[id]?.lastName,
      email: users[id]?.email,
      contact: users[id]?.contact,
      department: users[id]?.department,
      designation: users[id]?.designation,
      experience: users[id]?.experience,
    });
  };

  const deleteHandler = (id) => {
    setUserForm(false);
    const updatedUsers = Object.keys(users)
      .filter((key) => id != key)
      .reduce((obj, key) => {
        obj[key] = users[key];
        return obj;
      }, {});
    setUsers(updatedUsers);
  };

  const saveUpdateHandler = ({
    id,
    firstName,
    lastName,
    email,
    contact,
    department,
    designation,
    experience,
  }) => {
    const tempUsers = JSON.parse(JSON.stringify(users));
    if (id != 0) {
      tempUsers[id] = {
        id,
        firstName,
        lastName,
        email,
        contact,
        department,
        designation,
        experience,
      };
    } else {
      tempUsers[Object.values(tempUsers).length + 1] = {
        id: Object.values(tempUsers).length + 1,
        firstName,
        lastName,
        email,
        contact,
        department,
        designation,
        experience,
      };
    }
    setUsers(tempUsers);
    setUserForm(false);
  };

  const cancelHandler = () => setUserForm(false);

  return (
    <div className="user-details-div">
      <h1 className="users-heading" id="users-heading">
        Users List
      </h1>
      <div className="toggle-btn">
        <button
          id="toggle-btn"
          data-testid="toggle-btn"
          name="toggle-btn"
          aria-label="toggle-btn"
          role="button"
          onClick={userFormHandler}
        >
          Toggle User Form
        </button>
        <br />
        <br />
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Experience</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && Object.entries(users).length ? (
              <>
                {Object.entries(users).map(([key, note], index) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{note.firstName}</td>
                    <td>{note.lastName}</td>
                    <td>{note.email}</td>
                    <td>{note.contact}</td>
                    <td>{note.department}</td>
                    <td>{note.designation}</td>
                    <td>{note.experience}</td>
                    <td>
                      <i
                        className="material-icons"
                        onClick={() => editHandler(key)}
                      >
                        edit
                      </i>
                    </td>
                    <td>
                      <i
                        className="material-icons"
                        onClick={() => deleteHandler(key)}
                      >
                        delete
                      </i>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td>No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {userForm && (
        <div className="user-registration-form">
          <UserRegistrationForm
            id={userData.id}
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            contact={userData.contact}
            department={userData.department}
            designation={userData.designation}
            experience={userData.experience}
            saveUpdateHandler={saveUpdateHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetails;

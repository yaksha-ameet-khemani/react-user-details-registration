import { useEffect, useState } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import "./UserDetails.css";

const dummyData = [
  {
    id: 1,
    name: "first",
    email: "first@mail.com",
    contact: "7878787878",
  },
  { id: 2, name: "second", email: "second@mail.com" },
];

const UserDetails = ({ setDummyData = true }) => {
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
    contact: "",
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
        name: "",
        email: "",
        contact: "",
      });
    }
    setUserForm(!userForm);
  };

  const editHandler = (id) => {
    setUserForm(true);
    setUserData({
      id: users[id]?.id,
      name: users[id]?.name,
      email: users[id]?.email,
      contact: users[id]?.contact,
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

  const saveUpdateHandler = ({ id, name, email, contact }) => {
    const tempUsers = JSON.parse(JSON.stringify(users));
    if (id != 0) {
      tempUsers[id] = {
        id,
        name,
        email,
        contact,
      };
    } else {
      tempUsers[Object.values(tempUsers).length + 1] = {
        id: Object.values(tempUsers).length + 1,
        name,
        email,
        contact,
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
        <button id="toggle-btn" data-testid="toggle-btn" name="toggle-btn" aria-label="toggle-btn" role="button" onClick={userFormHandler}>
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
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
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
                    <td>{note.name}</td>
                    <td>{note.email}</td>
                    <td>{note.contact}</td>
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
            name={userData.name}
            email={userData.email}
            contact={userData.contact}
            saveUpdateHandler={saveUpdateHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetails;

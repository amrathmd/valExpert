import React,{useState} from 'react';
import './project.css'
import DashboardContext from '../../contexts/dashboardContext';
interface Users {
    _idu: string;
    name: string;
    mobile: string;
    email:string;
    status:string;
}

interface TableProps {
    users: Users[];
     onUpdateUsers: (updatedUsers: Users[]) => void;
     onDeleteUser: (userId: string) => void;
}

const UserTable: React.FC<TableProps> = (props) => {
    const { users, onUpdateUsers,onDeleteUser } = props;
    const { dashboardState, setDashboardState } = React.useContext(DashboardContext);
      const [isBlinking, setIsBlinking] = useState(false);
      const [editingUserId, setEditingUserId] = React.useState<string>('');
       const [editedUserData, setEditedUserData] = React.useState<Partial<Users>>({});

    const handleUser = () => {
        setDashboardState(1);
    }
    const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
  };
  const handleDeleteUser = (userId: string) => {
  //   API call to delete the user
   const updatedUsers = users.filter((user) => user._idu !== userId);
  onUpdateUsers(updatedUsers);
};
  const handleSaveUser = () => {
    const editedUserIndex = users.findIndex((user) => user._idu === editingUserId);
    if (editedUserIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[editedUserIndex] = {
        ...updatedUsers[editedUserIndex],
        ...editedUserData,
      };
      // api call- save functionality here
      onUpdateUsers(updatedUsers);
      setEditingUserId('');
      setEditedUserData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId('');
     setEditedUserData({});
  };

  const isEditing = (userId: string) => {
    return editingUserId === userId;
  };
     const handleInputChange = (field: keyof Users, value: string) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Manage user</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._idu}>
                        <td>{user._idu}</td>
                               <td>
              {isEditing(user._idu) ? (
                <input
                  type="text"
                  value={editedUserData.name ?? user.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {isEditing(user._idu) ? (
                <input
                  type="text"
                  value={editedUserData.mobile ?? user.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                />
              ) : (
                user.mobile
              )}
            </td>
            <td>
              {isEditing(user._idu) ? (
                <input
                  type="text"
                  value={editedUserData.email ?? user.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {isEditing(user._idu) ? (
                <input
                  type="text"
                  value={editedUserData.status ?? user.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                />
              ) : (
                user.status
              )}
            </td>
                         <td>
              {isEditing(user._idu) ? (
                <>
                    <div className='action-icon'>
                  <button className="button" onClick={handleSaveUser}>Save</button>
                  <button className="button" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                <div className='action-icon'> 
                  <img
                    src="../../../public/edit.png"
                    alt="Edit"
                    className="edit-icon"
                    title="Edit User"
                    onClick={() => handleEditUser(user._idu)}
                  />
                  <img
                    src="../../../public/bin.png"
                    alt="Delete"
                    className="edit-icon"
                    title="Delete  User"
                    onClick={() => handleDeleteUser(user._idu)}
                  />
                  </div>
                </>
              )}
            </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;

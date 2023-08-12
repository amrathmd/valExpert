import React from 'react';
import UserForm from './UserForm';
interface User {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    mobile: string;
    status: string;
    group: string[];
    country: string;
    office: string;
    department: string;
    password: string;
}
interface UserEditFormProps {
    userDetails: User;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ userDetails }) => {
    return <UserForm userDetails={userDetails} isEditMode={true} />;
};

export default UserEditForm;

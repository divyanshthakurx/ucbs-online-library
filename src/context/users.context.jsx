import { createContext, useState, useEffect } from "react";
import { listUsers, deleteUser, getUser, createUser, updateUser } from '../lib/user.appwrite';

export const UsersContext = createContext ({
    Users: null,
    setUsers: () => null,
    getThisUser: () => null,
    createThisUser: () => null,
    deleteThisUser: () => null,
    updateThisUser: () => null,
    clickedUser: {},
    setclickedUser: () => null,
    ibookclick: false,
})

const CreateUser = (User, Users) => {
  if (!User){
    return console.log("no User");
  }
  let exist = false;
  Users && Users.map((curUser) => {
    if (curUser.name === User.name || parseInt(curUser.s_no) === User.s_no) {
      exist = true;
    }
    return [];
  });
  if (exist === true){
    return "exists";
  } else{
    try{
        createUser(User);
        return "added";
    } catch(error){
        return "error";
    }
  }
}

const DeleteUser = (User) => {
  deleteUser(User.$id);
}

const UpdateUser = (User) => {
  updateUser(User);
}

const GetUser = (User, setclickedUser) => {
  const result = getUser(User.$id);
  result.then(result => setclickedUser(result));
}


export const UsersProvider = ({children}) => {
    const [Users, setUsers] = useState();
    const [clickedUser, setclickedUser] = useState({});
    const [ibookclick, setibookclick] = useState();

    useEffect(()=>{
        listUsers().then(result => setUsers(result.documents));
    }, []);

    const createThisUser = (User) => {
        return CreateUser(User, Users);
    }

    const deleteThisUser = (User) => {
        return DeleteUser(User);
    }
    const updateThisUser = (User) => {
        return UpdateUser(User);
    }
    const getThisUser = (User) => {
        return GetUser(User, setclickedUser);
    }

    const value = {Users, setUsers, getThisUser, createThisUser, deleteThisUser, updateThisUser, clickedUser, setclickedUser, ibookclick, setibookclick};

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
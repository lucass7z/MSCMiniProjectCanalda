import {useState} from "react";


export function SideBar({users, addUser, removeUser, ...rest}) {
    const [id,setId] = useState(0)
    const addNewUser = ()=>{
        addUser({id: id, name: 'User '+(id+1)})
        setId(id+1)
    }
    return (
        <div {...rest}>
            <h2>Sidebar</h2>
            {users.length > 0 &&
                <>
                    <h3>Users</h3>
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.name}
                                <button onClick={() => removeUser(user)}>Remove</button>
                            </li>
                        )}
                    </ul>
                </>
            }
            <button onClick={() => addNewUser({id: id, name: 'User '+(id+1)})}>Add User 1</button>
        </div>
    )
}

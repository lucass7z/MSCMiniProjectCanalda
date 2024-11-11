import {useState} from "react";


/**
 * Sidebar component
 * @param {{id: number, name: string, location: {id: number, name: string, lat: number, lng:number}}[]} users
 * @param {(user: {id: number, name: string, location: {id: number, name: string, lat: number, lng:number}}) => void} addUser
 * @param {(user: {id: number, name: string, location: {id: number, name: string, lat: number, lng:number}}) => void} removeUser
 * @param {location: {id: number, name: string, lat: number, lng:number}[]} locationList
 * @param {()=>void}makeRdv
 * @param rest
 */
export function SideBar({users, addUser, removeUser, locationList, makeRdv,...rest}) {
    const [id,setId] = useState(0)
    const [name,setName] = useState('User 1')
    const [locationId, setLocationId] = useState(locationList[0].id)
    const addNewUser = ()=>{
        addUser({id: id, name: name, location: getLocation(locationId)})
        setId(id+1)
        setName('User ' + (id + 2))
    }
    const onInputChange = (e)=>{
        setName(e.target.value)
    }

    function getLocation(id) {
        return locationList.find(location => location.id === parseInt(id));
    }

    const onLocationChange = (e)=>{
        setLocationId(e.currentTarget.value)
    }

    return (
        <div {...rest}>
            <h2>Sidebar</h2>
            {users.length > 0 &&
                <>
                    <h3>Users</h3>
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>
                                {user.name} at {user.location.name}
                                <button onClick={() => removeUser(user)}>Remove</button>
                            </li>
                        )}
                    </ul>
                </>
            }
            <div>
                <input type="text" onChange={onInputChange} value={name}/>
                <label>
                    Pick a location:
                    <select value={locationId} onChange={onLocationChange}>
                         {locationList.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                    </select>
                </label>
                <button type="submit" onClick={() => addNewUser()}>Add {name}</button>
            </div>
            <button onClick={makeRdv} disabled={users.length<2}>Make a Rendez Vous</button>
        </div>
    )
}

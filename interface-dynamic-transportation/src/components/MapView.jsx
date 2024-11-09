import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

export function MapView({...rest}) {
    const position = [51.505, -0.09]

    return(
        <div {...rest}>
            <h1>Map</h1>
        </div>
    )
}

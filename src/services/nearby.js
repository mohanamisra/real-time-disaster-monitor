export const fetchNearbyHospitals = async(latitude, longitude, radius=5000) => {
    let result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            // The body contains the query
            // to understand the query language see "The Programmatic Query Language" on
            // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
            body: "data="+ encodeURIComponent(`
            [bbox:30.618338,-96.323712,30.591028,-96.330826]
            [out:json]
            [timeout:90]
            ;
            node
                [amenity=hospital]
                (around:${radius}, ${latitude}, ${longitude}); // Radius in meters, then lat, lon
            out;`)
        },
    ).then(
        (data)=>data.json()
    )
    return result.elements.length;
}

export const fetchAffectedHospitals = async(latitude, longitude, radius=500) => {
    let result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            // The body contains the query
            // to understand the query language see "The Programmatic Query Language" on
            // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
            body: "data="+ encodeURIComponent(`
            [bbox:30.618338,-96.323712,30.591028,-96.330826]
            [out:json]
            [timeout:90]
            ;
            node
                [amenity=hospital]
                (around:${radius}, ${latitude}, ${longitude}); // Radius in meters, then lat, lon
            out;`)
        },
    ).then(
        (data)=>data.json()
    )
    return result.elements;
}

export const fetchAffectedSchools = async(latitude, longitude, radius=500) => {
    let result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            // The body contains the query
            // to understand the query language see "The Programmatic Query Language" on
            // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
            body: "data="+ encodeURIComponent(`
            [bbox:30.618338,-96.323712,30.591028,-96.330826]
            [out:json]
            [timeout:90]
            ;
            node
                [amenity=school]
                (around:${radius}, ${latitude}, ${longitude}); // Radius in meters, then lat, lon
            out;`)
        },
    ).then(
        (data)=>data.json()
    )
    return result.elements;
}

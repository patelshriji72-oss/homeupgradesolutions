function initMap() {
    // PNTC, Prahlad Nagar Trade Center का सटीक अक्षांश और देशांतर
    const PNTC_LOCATION = { lat: 23.0094114, lng: 72.5229752 };

    // कस्टम मैप स्टाइल (हल्का, ग्रेस्केल लुक)
    const mapStyles = [
        {
            "elementType": "geometry",
            "stylers": [{ "color": "#f5f5f5" }]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#616161" }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#f5f5f5" }]
        },
        { // सड़कें
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#ffffff" }]
        },
        { // पानी (वॉटर)
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#c9c9c9" }]
        },
        { // लैंडस्केप/पार्क
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{ "color": "#e5e5e5" }]
        }
    ];

    // मैप को इनिशियलाइज़ करें
    const map = new google.maps.Map(document.getElementById("customMap"), {
        zoom: 16,
        center: PNTC_LOCATION,
        styles: mapStyles, // कस्टम स्टाइल यहाँ लागू होती है
        disableDefaultUI: true // डिफ़ॉल्ट UI जैसे ज़ूम बटन हटाएँ
    });

    // गूगल का डिफ़ॉल्ट मार्कर (यदि आप चाहते हैं तो आप इसे हटा सकते हैं)
    // new google.maps.Marker({
    //     position: PNTC_LOCATION,
    //     map: map,
    //     title: "PNTC"
    // });
    
    // नोट: चूंकि हमने HTML में ओवरले (map-marker-overlay) का उपयोग किया है, 
    // हमें Google के डिफ़ॉल्ट मार्कर की आवश्यकता नहीं है।
}
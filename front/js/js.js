//list of places in chandigarh
var location= [
  { //name ,lat,long defination
    name: "Sukhna Lake",
		lat: 30.7333304 ,
		lng: 76.8166634,
		show: true,//means show it
		selected: false//but infobox not shown if not selected
	
  },
  {
    name: "Rose Garden",
		lat: 30.7461143,
		lng: 76.7819774,
		show: true,
		selected: false
		
  },
  {
    name: "Rock Garden",
		lat: 30.752535,
		lng: 76.8101038,
		show: true,
		selected: false
		
  },
  {
    name: "Chattbir zoo",
		lat: 30.603913,
		lng: 76.792463,
		show: true,
		selected: false
  },
  {
    name: "Pinjore Garden",
		lat: 30.7940877,
		lng: 76.9147109,
		show: true,
		selected: false
  },
  {
    name: "Elante Mall",
		lat: 30.7055869,
		lng: 76.80127089999999,
		show: true,
		selected: false
  },
  {
    name: "Government Museum and Art Gallery",
		lat: 30.7489118,
		lng: 76.78746749999999,
		show: true,
		selected: false
  },
  {
        name: "Chandigarh Capitol Complex",
		lat: 30.756714,
		lng: 76.8021677,
		show: true,
		selected: false
  },
  {
        name: "Open Hand Monument",
		lat: 30.7564556,
		lng: 76.80193810000002,
		show: true,
		selected: false
  },
  {
        name: "International Dolls Museum",
		lat: 30.7416365,
		lng: 76.7708432,
		show: true,
		selected: false
  }
];
//if a place is selected its info is taken
var selected_location=function(data){
	this.name = data.name;
	this.lat = data.lat;
	this.lng = data.lng;
	this.URL = "";
	this.street = "";
	this.city = "";
	this.visible = ko.observable(true);//to make infobox visible
    //foursquare api used
	var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ this.lat + ','
	+ this.lng + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + this.name;
//values received from foursquare are stored
$.getJSON(foursquareURL).done(function(data) {
	//response are stored in var
		var answer = data.response.venues[0];
		self.URL = answer.url;
		if (typeof self.URL === 'undefined'){
			self.URL = "url not found";
		}
		//street is stored
		self.street = results.location.formattedAddress[0];
		if(typeof self.street === 'undefined'){
			self.street = "street not found";
		}
		//city is stored
     	self.city = results.location.formattedAddress[1];
			if(typeof self.city === 'undefined'){
				self.city = "city not found";
			}
				}).fail(function() {
					//error handling i.e if foursquare doesnot work 
		alert("foursquare not working");
	});
				//content displays in infowindow
	this.content = '<div class="info-window-content"><div class="title"><em><strong>' + 
	data.name + "</em></strong></div>" +//name displayed
        '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +//url displayed
        '<div class="content">' + "street="+self.street + "</div>" +//street displayed
        '<div class="content">' + "city="+self.city + "</div>" ;//city displayed
        this.infoWindow = new google.maps.InfoWindow({content: self.content});
     //marker set
    this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(data.lat, data.lng),
		map: map,
		title: data.name
	});
	//marker displayed
	this.showMarker = ko.computed(function() {
		if(this.visible() === true) {
			this.marker.setMap(map);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);
	//when marker clicked infobox is displayed
	this.marker.addListener('click', function(){
		this.content = '<div class="info-window-content"><div class="title"><em><strong>' + 
	    data.name + "</em></strong></div>" +//name displayed
        '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +//url displayed
        '<div class="content">' + "street="+self.street + "</div>" +//street displayed
        '<div class="content">' + "city="+self.city + "</div>" ;//city displayed
        self.infoWindow.setContent(self.contentString);
        self.infoWindow.open(map, this);
        //marker
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
      	setTimeout(function() {
      		self.marker.setAnimation(null);
     	}, 2500);
        //infobox
			setTimeout(function(){
				  self.infoWindow.close(map,this);
				},2500
			);
	});
    
	this.bounce = function(place) {
		google.maps.event.trigger(self.marker, 'click');
	};


//};







const getAthleteInfo = (z, bundle) => {
  z.console.log('hello from a console log!');
  const promise = z.request(`${process.env.API_URL}/athlete`);
  return promise.then((response) => JSON.parse(response.content));
};

module.exports = {
  key: 'athlete',
  noun: 'Athlete',
  display: {
    label: 'Athlete Change',
    description: 'Trigger when an athlete profile is changed'
  },
  operation: {
    perform: getAthleteInfo,
    sample:{
      "id" : 1234567890987654321,
      "username" : "marianne_v",
      "resource_state" : 3,
      "firstname" : "Marianne",
      "lastname" : "V.",
      "city" : "San Francisco",
      "state" : "CA",
      "country" : "US",
      "sex" : "F",
      "premium" : true,
      "created_at" : "2017-11-14T02:30:05Z",
      "updated_at" : "2018-02-06T19:32:20Z",
      "badge_type_id" : 4,
      "profile_medium" : "https://xxxxxx.cloudfront.net/pictures/athletes/123456789/123456789/2/medium.jpg",
      "profile" : "https://xxxxx.cloudfront.net/pictures/athletes/123456789/123456789/2/large.jpg",
      "friend" : null,
      "follower" : null,
      "follower_count" : 5,
      "friend_count" : 5,
      "mutual_friend_count" : 0,
      "athlete_type" : 1,
      "date_preference" : "%m/%d/%Y",
      "measurement_preference" : "feet",
      "clubs" : [ ],
      "ftp" : null,
      "weight" : 0,
      "bikes" : [ {
        "id" : "b12345678987655",
        "primary" : true,
        "name" : "EMC",
        "resource_state" : 2,
        "distance" : 0
      } ],
      "shoes" : [ {
        "id" : "g12345678987655",
        "primary" : true,
        "name" : "adidas",
        "resource_state" : 2,
        "distance" : 4904
      } ]
    }
  }
};

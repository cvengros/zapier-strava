// milestones in km
const MILESTONES = {
  Ride: 500,
  Run: 50,
  Swim: 10
}

const HUMANIZATION_DISTANCE = 1000;
const roundStat = (stat, type) => {
  // all stats are in meters
  const statKm = stat/HUMANIZATION_DISTANCE;
  const milestone = MILESTONES[type];
  // getting the last milestone reached
  return Math.floor(statKm/milestone) * milestone;
}

const STATS = {
  ytd_ride_totals: 'Ride',
  all_ride_totals: 'Ride',
  ytd_run_totals: 'Run',
  all_run_totals: 'Run',
  ytd_swim_totals: 'Swim',
  all_swim_totals: 'Swim'
}

const roundAllStats = (stats) => {
  // take all needed stats and round them, return in an object
  return Object.keys(STATS).reduce(function(o, k){
    o[k] = {
      distance: roundStat(stats[k].distance, STATS[k]) 
    }; 
    return o;
  }, {});
}

const concatStats = (roundedStats) => {
  // take all rounded stats (sorted by its key so that it's consistent)
  // and join them into a string
  return Object.keys(roundedStats).sort().map((k) => roundedStats[k].distance).join(' ');
}

const humanizeDistances = (stats) => {
  // for all keys, divide by 1000 and round it to one decimal
  const statKeys = Object.keys(STATS);
  for (let i = 0; i < statKeys.length; i++) {
    let k = statKeys[i];
    let humanized = stats[k].distance / HUMANIZATION_DISTANCE;
    // omg js
    let rounded = Math.round( humanized * 10) / 10
    stats[k].distance = rounded
  }
  return stats;
}

const getAthleteStats = (z, bundle) => {

  // get the athlete to see the id
  const athletePromise = z.request(`${process.env.API_URL}/athlete`);
  return athletePromise.then(function(response){
    const athleteInfo = JSON.parse(response.content);
    const athleteId = athleteInfo.id;
    z.console.log(`Athlete id: ${athleteId}`);
    
    // do a request to the stats
    const statsPromise = z.request(`${process.env.API_URL}/athletes/${athleteId}/stats`);

    // and to the activities
    const activitiesPromise = z.request(`${process.env.API_URL}/athlete/activities?per_page=25`);
    // )
    return Promise.all([statsPromise, activitiesPromise]).then((responses) => {
      // get stats
      z.console.log(`stats: ${responses[0].content}`);
      const stats = z.JSON.parse(responses[0].content);

      // get activities
      const acts = responses[1].content;

      // get rid of the backslashes
      const parsable_acts = acts.replace(/\\/g,'')
      const parsed_acts = z.JSON.parse(parsable_acts);
      z.console.log(parsed_acts);

      // round all the watched stats
      stats.rounded = roundAllStats(stats);
      // hack the id into a concat of all watched stats
      stats.id = concatStats(stats.rounded);

      // iterate over the recent activities, see if some has gone 
      // over a milestone
      // clone the stats so that we don't overwrite the current ones
      const s = JSON.parse(JSON.stringify(stats));
      for (let i = 0; i < parsed_acts.length; i++) {
        let a = parsed_acts[i];
        z.console.log(a);
        
        let activityType = a.type.toLowerCase();
        let yearKey = `ytd_${activityType}_totals`;
        let totalKey = `all_${activityType}_totals`;
        
        // if there's a stat for the activity type
        // subtract the distance from the stats
        if (s.hasOwnProperty(totalKey)){
          s[totalKey].distance -= a.distance;
          s[yearKey].distance -= a.distance;
        } else {
          z.console.log(`skipping activity type ${activityType}`);
          continue;
        }

        z.console.log(`${yearKey}: ${s[yearKey].distance}`);

        // round it subtracted and see if it's the same as the rounded current
        let roundedTotal = roundStat(s[totalKey].distance, a.type);
        let roundedYear = roundStat(s[yearKey].distance, a.type);

        z.console.log(`${yearKey} rounded: ${roundedYear}`);

        // if not, we've got it. save it and break
        // overall:
        if (roundedTotal < stats.rounded[totalKey].distance){
          stats.rounded.type_changed = a.type;
          stats.rounded.year_or_total_changed = 'Total';
          stats.rounded.distance_changed = stats.rounded[totalKey].distance;
          stats.rounded.activity_link_changed = `https://www.strava.com/activities/${a.id}`;
          stats.rounded.activity_name_changed = a.name;
          break;
        }

        // year
        if (roundedYear < stats.rounded[yearKey].distance){
          stats.rounded.type_changed = a.type;
          stats.rounded.year_or_total_changed = 'This Year';
          stats.rounded.distance_changed = stats.rounded[yearKey].distance;
          stats.rounded.activity_link_changed = `https://www.strava.com/activities/${a.id}`;
          stats.rounded.activity_name_changed = a.name;
          break;
        }
      }
      let humanizedStats = humanizeDistances(stats)
      z.console.log(humanizedStats);
      return [humanizedStats];
    });
  });
};

module.exports = {
  key: 'athleteStats',
  noun: 'Athlete Stat',
  display: {
    label: 'Athlete Stats Updated',
    description: 'Trigger when an athlete stats have been updated'
  },
  operation: {
    perform: getAthleteStats,
    sample:{
      "id": 123,
      "rounded": {
        "ytd_ride_totals": {
          "distance": 1000
        },
        "type_changed": "Ride",
        "year_or_total_changed": "Total",
        "distance_changed": 1000,
        "activity_link_changed": "https://www.strava.com/activities/13456",
        "activity_name_changed": "New Activity"
      },
      "biggest_ride_distance": 198794.0,
      "biggest_climb_elevation_gain": 1158.0,
      "recent_ride_totals": {
        "count": 4,
        "distance": 110801.0,
        "moving_time": 18868,
        "elapsed_time": 21646,
        "elevation_gain": 1154.7627563476562,
        "achievement_count": 32
      },
      "recent_run_totals": {
        "count": 4,
        "distance": 45933.0,
        "moving_time": 15051,
        "elapsed_time": 15636,
        "elevation_gain": 978.2162322998047,
        "achievement_count": 21
      },
      "recent_swim_totals": {
        "count": 1,
        "distance": 2300.0,
        "moving_time": 2709,
        "elapsed_time": 4947,
        "elevation_gain": 0.0,
        "achievement_count": 0
      },
      "ytd_ride_totals": {
        "count": 7,
        "distance": 258167,
        "moving_time": 39317,
        "elapsed_time": 42609,
        "elevation_gain": 2363
      },
      "ytd_run_totals": {
        "count": 23,
        "distance": 232820,
        "moving_time": 76892,
        "elapsed_time": 82007,
        "elevation_gain": 4951
      },
      "ytd_swim_totals": {
        "count": 5,
        "distance": 8900,
        "moving_time": 11071,
        "elapsed_time": 20905,
        "elevation_gain": 0
      },
      "all_ride_totals": {
        "count": 806,
        "distance": 31823684,
        "moving_time": 5777722,
        "elapsed_time": 6885142,
        "elevation_gain": 530344
      },
      "all_run_totals": {
        "count": 218,
        "distance": 1704306,
        "moving_time": 593373,
        "elapsed_time": 656025,
        "elevation_gain": 21792
      },
      "all_swim_totals": {
        "count": 121,
        "distance": 194266,
        "moving_time": 303366,
        "elapsed_time": 341130,
        "elevation_gain": 388
      }
    }
  }
};
